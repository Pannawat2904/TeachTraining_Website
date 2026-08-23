"use client"

import { use, useState, useEffect } from "react"
import { teachingLogConfig, teachingLogs } from "@/data/siteData"
import { notFound } from "next/navigation"
import { fetchGoogleSheet } from "@/actions/googleSheets"
import { Reveal } from "@/components/Reveal"

export default function TeachingLogPage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterNum = term === 'semester-1' ? 1 : 2;
  const sheetUrl = term === 'semester-1' ? teachingLogConfig.semester1Url : teachingLogConfig.semester2Url;
  const logData = term === 'semester-1' ? teachingLogs.semester1 : teachingLogs.semester2;

  // View Mode: 'interactive' (daily log cards) or 'sheet' (google sheets iframe)
  const [viewMode, setViewMode] = useState<'interactive' | 'sheet'>('interactive');

  // Track expanded week numbers (Week 1 open by default)
  const [openWeeks, setOpenWeeks] = useState<string[]>(["01"]);

  const [googleWeeks, setGoogleWeeks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (viewMode === 'interactive' && logData.googleSheetConfig) {
      setIsLoading(true);
      const fetchAll = async () => {
        try {
          const sheetNames = logData.googleSheetConfig.sheetNames;
          const spreadsheetId = logData.googleSheetConfig.spreadsheetId;
          
          const promises = sheetNames.map(async (name: string, index: number) => {
            const res = await fetchGoogleSheet(spreadsheetId, name);
            if (res.success && res.data && res.data.length > 0) {
              const data = res.data;
              
              // Find the row with week info
              let weekNumStr = name;
              let dateRangeStr = "";
              let headerRowIdx = -1;
              
              for(let i=0; i<Math.min(5, data.length); i++) {
                const row = data[i] as string[];
                const joined = row.join(' ');
                if (joined.includes('สัปดาห์ที่')) {
                // try to extract date range anywhere in the header rows (must have numbers to avoid matching just "วันที่ ")
                const matchCell = row.find((cell: string) => cell && /วันที่\s*\d+/.test(cell));
                if (matchCell) {
                  const match = matchCell.match(/วันที่\s*(.*?)(?=\s*หมายเหตุ|$)/);
                  if (match) {
                    dateRangeStr = match[0].trim();
                  }
                }
                }
                if (joined.includes('การทำงาน') || joined.includes('วันที่')) {
                  headerRowIdx = i;
                  break;
                }
              }

              const days = [];
              if (headerRowIdx !== -1) {
                for(let i = headerRowIdx + 1; i < data.length; i++) {
                  const row = data[i] as string[];
                  if (!row || !row[0]) continue;
                  
                  const dateStr = row[0] || '';
                  const workStr = row[1] || '';
                  const remarkStr = row[2] || '';
                  
                  // skip empty days
                  if (!dateStr && !workStr) continue;

                  // Extract day number from "5/5/26" -> "5"
                  const dateParts = dateStr.split('/');
                  const dayNum = dateParts[0] || dateStr;
                  
                  let monthStr = '';
                  let yearStr = '';
                  if (dateParts.length >= 2) {
                    const thaiMonths = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
                    const m = parseInt(dateParts[1], 10);
                    if (!isNaN(m) && m >= 1 && m <= 12) {
                      monthStr = thaiMonths[m - 1];
                    }
                  }
                  if (dateParts.length >= 3) {
                    let y = parseInt(dateParts[2], 10);
                    if (!isNaN(y)) {
                      if (y < 100) y += 2000;
                      yearStr = String(y + 543).slice(-2);
                    }
                  }
                  const formattedDayName = monthStr ? `${monthStr} ${yearStr}`.trim() : 'Day';

                  days.push({
                    dayName: formattedDayName, 
                    dayNum: dayNum,
                    title: 'รายละเอียดการปฏิบัติงาน',
                    status: 'present',
                    statusText: 'มาปฏิบัติงาน',
                    activities: [
                      workStr,
                      ...(remarkStr ? [`หมายเหตุ: ${remarkStr}`] : [])
                    ]
                  });
                }
              }

              return {
                weekNum: String(index + 1).padStart(2, '0'),
                title: weekNumStr,
                dateRange: dateRangeStr || "ไม่ระบุวันที่",
                presentDays: days.length,
                leaveDays: 0,
                filename: name + '.csv',
                days: days
              };
            }
            return null;
          });

          const results = await Promise.all(promises);
          setGoogleWeeks(results.filter(Boolean));
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAll();
    } else {
      setIsLoading(false);
    }
  }, [viewMode, logData]);

  // Use googleWeeks if available, else fallback to static data
  const displayWeeks = logData.googleSheetConfig && googleWeeks.length > 0 ? googleWeeks : logData.weeks;

  const [calculatedStats, setCalculatedStats] = useState(logData.stats);

  useEffect(() => {
    if (!displayWeeks || displayWeeks.length === 0) {
      setCalculatedStats(logData.stats);
      return;
    }

    let recordedWeeks = 0;
    let workDays = 0;
    let leaveDays = 0;

    displayWeeks.forEach((week: any) => {
      // If a week has any valid days parsed, we count it as a recorded week
      if (week.days && week.days.length > 0) {
        recordedWeeks++;
        week.days.forEach((day: any) => {
          // Attempt to detect leave from activities/remark
          const activitiesText = day.activities ? day.activities.join(' ') : '';
          if (activitiesText.includes('ลาป่วย') || activitiesText.includes('ลากิจ') || activitiesText.includes('วันหยุด')) {
            leaveDays++;
          } else {
            workDays++;
          }
        });
      }
    });

    const pct = Math.round((recordedWeeks / 18) * 100);

    setCalculatedStats({
      recordedWeeks,
      workDays,
      leaveDays,
      semesterPct: `${pct}%`
    });
  }, [displayWeeks, logData.stats]);


  const toggleWeek = (weekNum: string) => {
    setOpenWeeks(prev => 
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  return (
    <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '50px 0 90px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อบันทึกการฝึกสอน) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">teaching_log_semester_{semesterNum}.config</span>
            <span className="tag">ภาคเรียนที่ {semesterNum}/2569</span>
          </div>
        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '14px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600 }}>
                // teaching.log --order=asc
              </div>
              <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                <span style={{ fontSize: '0.75em', color: 'var(--violet-c)' }}>&lt;/&gt;</span>
                บันทึกการฝึกสอน (ภาคเรียนที่ {semesterNum}/2569)
              </h1>
              <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '15px' }}>
                บันทึกการปฏิบัติงานและรายละเอียดกิจกรรมการสอนประจำวัน เรียงลำดับจากสัปดาห์ที่ 1 เป็นต้นไป
              </p>
            </div>

            {/* Mode Switcher Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setViewMode('interactive')}
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-prompt), sans-serif',
                  cursor: 'pointer',
                  border: viewMode === 'interactive' ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                  background: viewMode === 'interactive' ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                  color: viewMode === 'interactive' ? '#ffffff' : 'var(--ink)',
                  boxShadow: viewMode === 'interactive' ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                📅 บันทึกประจำวัน
              </button>

              {sheetUrl && (
                <button
                  onClick={() => setViewMode('sheet')}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '999px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-prompt), sans-serif',
                    cursor: 'pointer',
                    border: viewMode === 'sheet' ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                    background: viewMode === 'sheet' ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                    color: viewMode === 'sheet' ? '#ffffff' : 'var(--ink)',
                    boxShadow: viewMode === 'sheet' ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📊 ดู Google Sheets
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>

      {viewMode === 'sheet' && sheetUrl ? (
        /* Google Sheets Embedded View */
        <Reveal delay={100}>
          <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">teaching_log_spreadsheet.gsheet</span>
            <a 
              href={sheetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 600, color: 'var(--blue-c)', textDecoration: 'none' }}
            >
              เปิดเต็มจอใน Google Sheets ↗
            </a>
          </div>
          <div style={{ padding: '16px', background: '#ffffff' }}>
            <iframe 
              src={sheetUrl} 
              style={{ width: '100%', height: 'clamp(420px, 75vh, 780px)', border: 0, borderRadius: '12px' }}
              title="Teaching Log Google Sheets"
            ></iframe>
          </div>
        </div>
        </Reveal>
      ) : (
        /* Interactive Daily Log View */
        <>
          {/* Progress Overview Panel */}
          {calculatedStats && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: '20px 28px', marginBottom: '24px', background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(16px)', boxShadow: '0 14px 40px rgba(61,107,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--blue-c)' }}>{calculatedStats.recordedWeeks}</b>
                  <span style={{ fontSize: '12px', color: 'var(--muted-c)' }}>สัปดาห์ที่บันทึกแล้ว</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '22px', fontWeight: 700, color: '#0a8f82' }}>{calculatedStats.workDays}</b>
                  <span style={{ fontSize: '12px', color: 'var(--muted-c)' }}>วันที่มาปฏิบัติงาน</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '22px', fontWeight: 700, color: '#c73143' }}>{calculatedStats.leaveDays}</b>
                  <span style={{ fontSize: '12px', color: 'var(--muted-c)' }}>วันลา</span>
                </div>

                {/* Progress bar */}
                <div style={{ flex: 1, minWidth: '180px', height: '10px', borderRadius: '999px', background: 'rgba(16,21,43,0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: calculatedStats.semesterPct || '0%', borderRadius: '999px', background: 'linear-gradient(90deg, var(--blue-c), var(--violet-c), var(--cyan-c))', transition: 'width 1s ease' }}></div>
                </div>
                <span style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '14px', fontWeight: 700, color: 'var(--blue-c)' }}>
                  {calculatedStats.semesterPct} ของภาคเรียน
                </span>
              </div>
            </div>
          )}

          {/* Standard Work Hours Notice */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px', padding: '14px 24px', borderRadius: '16px', background: 'rgba(61,107,255,0.06)', border: '1px solid rgba(61,107,255,0.18)', fontSize: '13px', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--blue-c)', fontWeight: 700 }}>📌 มาตรฐานเวลาปฏิบัติงาน:</span>
            <span>เข้าแถว <b style={{ color: 'var(--ink)' }}>07:40 – 08:00 น.</b></span>
            <span>ปฏิบัติงาน <b style={{ color: 'var(--ink)' }}>08:00 – 16:30 น.</b></span>
            <span style={{ color: 'var(--muted-c)' }}>(วันจันทร์ – ศุกร์)</span>
          </div>

          {/* Weekly Accordions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {isLoading && viewMode === 'interactive' && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--blue-c)', fontWeight: 600 }}>
                กำลังดึงข้อมูลจาก Google Sheets... ⏳
              </div>
            )}
            {displayWeeks && displayWeeks.length > 0 ? (
              displayWeeks.map((week: any) => {
                const isOpen = openWeeks.includes(week.weekNum);

                return (
                  <div 
                    key={week.weekNum} 
                    className="glass-panel"
                    style={{ 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      padding: 0, 
                      background: 'var(--panel-c)', 
                      border: '1px solid var(--border-strong-c)', 
                      backdropFilter: 'blur(16px)', 
                      boxShadow: '0 14px 40px rgba(61,107,255,0.08)'
                    }}
                  >
                    {/* IDE Chrome Header Bar */}
                    <div className="chrome" style={{ cursor: 'pointer' }} onClick={() => toggleWeek(week.weekNum)}>
                      <span className="r"></span><span className="y"></span><span className="g"></span>
                      <span className="fname">{week.filename || `teaching_log_week_${week.weekNum}.log`}</span>
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: 'rgba(14,201,184,0.12)', color: '#0a8f82', border: '1px solid rgba(14,201,184,0.3)' }}>
                          มา {week.presentDays} วัน
                        </span>
                        {week.leaveDays > 0 && (
                          <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '999px', background: 'rgba(239,91,106,0.12)', color: '#c73143', border: '1px solid rgba(239,91,106,0.3)' }}>
                            ลา {week.leaveDays} วัน
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Week Title Bar (Clickable) */}
                    <div 
                      onClick={() => toggleWeek(week.weekNum)}
                      style={{ 
                        padding: '20px 28px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '18px', 
                        cursor: 'pointer', 
                        borderBottom: isOpen ? '1px solid var(--border-c)' : 'none',
                        background: 'rgba(255,255,255,0.4)',
                        userSelect: 'none'
                      }}
                    >
                      {/* Week Num Badge */}
                      <div 
                        style={{ 
                          width: '44px', 
                          height: '44px', 
                          borderRadius: '14px', 
                          background: 'linear-gradient(135deg, var(--blue-c), var(--violet-c))', 
                          color: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 700, 
                          fontSize: '15px', 
                          fontFamily: 'var(--font-prompt), sans-serif',
                          boxShadow: '0 4px 14px rgba(61,107,255,0.25)'
                        }}
                      >
                        {week.weekNum}
                      </div>

                      {/* Title & Range */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>
                          {week.title}
                        </h3>
                        <div style={{ fontSize: '13px', color: 'var(--muted-c)', marginTop: '2px', fontWeight: 500 }}>
                          {week.dateRange}
                        </div>
                      </div>

                      {/* Thin Line Chevron Icon */}
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ 
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                          transition: 'transform 0.3s ease', 
                          color: 'var(--muted-c)',
                          flexShrink: 0
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>

                    {/* Daily Logs List Container */}
                    {isOpen && (
                      <div style={{ padding: '8px 28px 24px' }}>
                        {week.days.map((day: any, idx: number) => {
                          const isLeave = day.status === 'sick' || day.status === 'personal';
                          const statusBg = day.status === 'present' ? 'rgba(14,201,184,0.12)' : day.status === 'sick' ? 'rgba(239,91,106,0.12)' : 'rgba(255,176,32,0.14)';
                          const statusColor = day.status === 'present' ? '#0a8f82' : day.status === 'sick' ? '#c73143' : '#c98008';
                          const statusBorder = day.status === 'present' ? 'rgba(14,201,184,0.35)' : day.status === 'sick' ? 'rgba(239,91,106,0.35)' : 'rgba(255,176,32,0.35)';

                          return (
                            <div 
                              key={idx}
                              style={{ 
                                display: 'flex', 
                                gap: '20px', 
                                padding: '20px 0', 
                                borderBottom: idx < week.days.length - 1 ? '1px solid var(--border-c)' : 'none' 
                              }}
                            >
                              {/* Day Badge */}
                              <div 
                                style={{ 
                                  width: '58px', 
                                  height: '58px', 
                                  borderRadius: '16px', 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  background: isLeave ? 'rgba(239,91,106,0.08)' : 'rgba(16,21,43,0.04)', 
                                  border: `1px solid ${isLeave ? 'rgba(239,91,106,0.25)' : 'var(--border-strong-c)'}`,
                                  flexShrink: 0
                                }}
                              >
                                <span style={{ fontSize: '11px', color: 'var(--muted-c)', fontWeight: 600 }}>{day.dayName}</span>
                                <span style={{ fontSize: '18px', fontWeight: 700, color: isLeave ? '#c73143' : 'var(--ink)' }}>{day.dayNum}</span>
                              </div>

                              {/* Day Content */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>
                                    {day.title}
                                  </h4>
                                  <span 
                                    style={{ 
                                      fontSize: '11.5px', 
                                      fontWeight: 600, 
                                      padding: '3px 12px', 
                                      borderRadius: '999px', 
                                      background: statusBg, 
                                      color: statusColor, 
                                      border: `1px solid ${statusBorder}` 
                                    }}
                                  >
                                    ● {day.statusText}
                                  </span>
                                </div>

                                {day.times && (
                                  <div style={{ fontSize: '13px', color: 'var(--muted-c)', marginBottom: '10px', fontWeight: 500 }}>
                                    ⏱️ {day.times}
                                  </div>
                                )}

                                {day.activities && day.activities.length > 0 && (
                                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {day.activities.map((act: string, actIdx: number) => (
                                      <li key={actIdx} style={{ fontSize: '14px', color: 'var(--ink)', opacity: 0.9, lineHeight: '1.6', paddingLeft: '18px', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, top: '2px', color: 'var(--cyan-c)', fontWeight: 700 }}>▸</span>
                                        {act}
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {day.leaveNote && (
                                  <div style={{ fontSize: '14px', color: 'var(--muted-c)', lineHeight: '1.6', background: 'rgba(239,91,106,0.06)', padding: '10px 16px', borderRadius: '12px', border: '1px solid rgba(239,91,106,0.18)', marginTop: '4px' }}>
                                    <span style={{ color: '#c73143', fontWeight: 700, marginRight: '6px' }}>&gt;</span>
                                    {day.leaveNote}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="glass-panel" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', background: 'var(--panel-c)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>ยังไม่มีข้อมูลบันทึกการสอนในภาคเรียนนี้</h3>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}

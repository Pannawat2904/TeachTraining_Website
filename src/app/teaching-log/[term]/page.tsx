"use client"

import { use, useState, useEffect, useMemo, useRef } from "react"
import { teachingLogConfig, teachingLogs, supervisions } from "@/data/siteData"
import { notFound } from "next/navigation"
import { fetchGoogleSheet } from "@/actions/googleSheets"
import { Reveal } from "@/components/Reveal"
import { ClipboardList, CalendarCheck, FileText } from "lucide-react"

function AutoSlideshow({ images, weekNum }: { images: string[]; weekNum: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % images.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: scrollRef.current.clientWidth * nextIndex,
            behavior: 'smooth'
          });
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', minHeight: '300px', display: 'flex', flexDirection: 'column', background: 'var(--border-c)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
      <div 
        ref={scrollRef}
        style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          scrollBehavior: 'smooth', 
          flex: 1, 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="hide-scrollbar"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const index = Math.round(target.scrollLeft / target.clientWidth);
          if (index !== currentIndex) {
            setCurrentIndex(index);
          }
        }}
      >
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {images.map((img: string, i: number) => (
          <img key={i} src={img} alt={`Activities week ${weekNum} - ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', flexShrink: 0, scrollSnapAlign: 'start' }} />
        ))}
      </div>
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
          {images.map((_, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentIndex === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', transition: 'background 0.3s ease' }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeachingLogPage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterNum = term === 'semester-1' ? 1 : 2;
  const sheetUrl = term === 'semester-1' ? teachingLogConfig.semester1Url : teachingLogConfig.semester2Url;
  const logData = term === 'semester-1' ? teachingLogs.semester1 : teachingLogs.semester2;
  const supervisionsData = term === 'semester-1' ? supervisions.semester1 : supervisions.semester2;

  // View Mode: 'interactive' (daily log cards) or 'sheet' (google sheets iframe)
  const [viewMode, setViewMode] = useState<'interactive' | 'sheet'>('interactive');

  // Track expanded week numbers (Week 1 open by default)
  const [openWeeks, setOpenWeeks] = useState<string[]>(["01"]);

interface DayLogItem {
  dayName: string;
  dayNum: string;
  title: string;
  status: string;
  statusText?: string;
  times?: string;
  leaveNote?: string;
  activities?: string[];
  dayOfWeek?: number;
}

interface WeekLogItem {
  weekNum: string;
  title: string;
  dateRange: string;
  presentDays: number;
  leaveDays: number;
  totalHoursStr?: string;
  filename: string;
  images?: string[];
  days: DayLogItem[];
}

  const [googleWeeks, setGoogleWeeks] = useState<WeekLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (viewMode === 'interactive' && logData.googleSheetConfig) {
      let isMounted = true;
      const fetchAll = async () => {
        setIsLoading(true);
        try {
          const sheetNames = logData.googleSheetConfig.sheetNames;
          const spreadsheetId = logData.googleSheetConfig.spreadsheetId;
          
          const promises = sheetNames.map(async (name: string, index: number) => {
            const res = await fetchGoogleSheet(spreadsheetId, name);
            if (res.success && res.data && res.data.length > 0) {
              const data = res.data;
              
              // Find the row with week info
              const weekNumStr = name;
              let dateRangeStr = "";
              let headerRowIdx = -1;
              
              for(let i=0; i<Math.min(10, data.length); i++) {
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
                
                // Exact match for the true header row to avoid false positives with the title row
                const col0 = (row[0] || '').trim();
                const col1 = (row[1] || '').trim();
                if (col0 === 'วันที่' || (col0.includes('วันที่') && col1.includes('การทำงาน'))) {
                  headerRowIdx = i;
                  break;
                }
              }

              const days: DayLogItem[] = [];
              if (headerRowIdx !== -1) {
                for(let i = headerRowIdx + 1; i < data.length; i++) {
                  const row = data[i] as string[];
                  if (!row || !row[0]) continue;
                  
                  const dateStr = (row[0] || '').trim();
                  const workStr = (row[1] || '').trim();
                  const remarkStr = (row[2] || '').trim();
                  
                  // A valid day MUST have a date (to avoid parsing footers/signatures)
                  // and we also ensure the date has at least a number or is not just empty.
                  if (!dateStr || !workStr || !/\d/.test(dateStr)) continue;

                  // Extract day number from "5/5/26" -> "5"
                  const dateParts = dateStr.split('/');
                  const dayNum = dateParts[0] || dateStr;
                  
                  let dayOfWeek = -1;
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
                    let m = parseInt(dateParts[1], 10);
                    let d = parseInt(dateParts[0], 10);
                    if (!isNaN(y)) {
                      if (y < 100) y += 2000; // Assuming 2000s for 2-digit years
                      
                      // Calculate day of week (0=Sun, 1=Mon...6=Sat)
                      if (!isNaN(d) && !isNaN(m)) {
                        const dateObj = new Date(y, m - 1, d);
                        dayOfWeek = dateObj.getDay();
                      }
                      
                      yearStr = String(y + 543).slice(-2);
                    }
                  }
                  const formattedDayName = monthStr ? `${monthStr} ${yearStr}`.trim() : 'Day';

                  let status = 'present';
                  let statusText = 'มาปฏิบัติงาน';
                  let times = ''; // user requested to hide times here
                  let title = 'รายละเอียดการปฏิบัติงาน';
                  let acts = [
                    workStr,
                    ...(remarkStr ? [`หมายเหตุ: ${remarkStr}`] : [])
                  ];

                  // Check for leave/holiday but prevent false positive from the word 'เวลา' (time)
                  const isLeave = workStr.trim() === 'ลา' || 
                                  workStr.includes('วันหยุด') || 
                                  workStr.includes('ลาป่วย') || 
                                  workStr.includes('ลากิจ');
                  if (isLeave) {
                    status = 'sick'; // This maps to the red UI theme
                    statusText = workStr.includes('วันหยุด') ? 'วันหยุดราชการ' : 'ลา';
                    title = workStr;
                    times = '';
                    acts = [];
                  }

                  days.push({
                    dayName: formattedDayName, 
                    dayNum: dayNum,
                    title: title,
                    status: status,
                    statusText: statusText,
                    times: times,
                    activities: acts,
                    dayOfWeek: dayOfWeek
                  });
                }
              }

              const presentCount = days.filter(d => d.status === 'present').length;
              const leaveCount = days.length - presentCount;
              const totalMins = presentCount * 530; // 07:40 - 16:30 is 8 hours 50 mins = 530 mins
              const totalHoursStr = `${Math.floor(totalMins / 60)} ชม.`;

              const staticWeek = logData.weeks.find((w: any) => w.weekNum === String(index + 1).padStart(2, '0'));
              const weekNumFormatted = String(index + 1).padStart(2, '0');
              
              // Automatically use images from the term folder if not specified in static fallback
              const weekImages = staticWeek?.images && staticWeek.images.length > 0 
                ? staticWeek.images 
                : [
                    `/images/teaching-log/term1/week${weekNumFormatted}/1.jpg`,
                    `/images/teaching-log/term1/week${weekNumFormatted}/2.jpg`
                  ];

              return {
                weekNum: weekNumFormatted,
                title: weekNumStr,
                dateRange: dateRangeStr || "ไม่ระบุวันที่",
                presentDays: presentCount,
                leaveDays: leaveCount,
                totalHoursStr: totalHoursStr,
                filename: name + '.csv',
                images: weekImages,
                days: days
              } as WeekLogItem;
            }
            return null;
          });

          const results = await Promise.all(promises);
          if (isMounted) {
            setGoogleWeeks(results.filter((item): item is WeekLogItem => item !== null));
          }
        } catch (e) {
          console.error(e);
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      };
      
      fetchAll();
      return () => {
        isMounted = false;
      };
    }
  }, [viewMode, logData]);

  // Use googleWeeks if available, else fallback to static data
  const displayWeeks = logData.googleSheetConfig && googleWeeks.length > 0 ? googleWeeks : logData.weeks;

  const calculatedStats = useMemo(() => {
    if (!displayWeeks || displayWeeks.length === 0) {
      return logData.stats;
    }

    let recordedWeeks = 0;
    let workDays = 0;
    let leaveDays = 0;

    displayWeeks.forEach((week) => {
      // If a week has any valid days parsed, we count it as a recorded week
      if (week.days && week.days.length > 0) {
        recordedWeeks++;
        workDays += week.presentDays || 0;
        leaveDays += week.leaveDays || 0;
      }
    });

    const totalMins = workDays * 530;
    const hours = Math.floor(totalMins / 60);
    const totalHoursStr = `${hours} ชม.`;

    return {
      recordedWeeks,
      workDays,
      leaveDays,
      totalHoursStr,
      semesterPct: `${Math.round((recordedWeeks / 20) * 100)}%`
    };
  }, [displayWeeks, logData]);


  const toggleWeek = (weekNum: string) => {
    setOpenWeeks(prev => 
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อบันทึกการฝึกสอน) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">teaching_log_semester_{semesterNum}.config</span>
            <span className="tag">ภาคเรียนที่ {semesterNum}/2569</span>
          </div>
        <div style={{ padding: 'clamp(18px, 3.5vw, 24px) clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ClipboardList size={15} />
                บันทึกการปฏิบัติงานสอน
              </div>
              <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 30px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                <CalendarCheck style={{ color: 'var(--violet-c)', width: '28px', height: '28px', flexShrink: 0 }} />
                <span>บันทึกการฝึกสอน (ภาคเรียนที่ {semesterNum}/2569)</span>
              </h1>
              <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '14px', lineHeight: 1.5 }}>
                บันทึกการปฏิบัติงานและรายละเอียดกิจกรรมการสอนประจำวัน เรียงลำดับจากสัปดาห์ที่ 1 เป็นต้นไป
              </p>
            </div>

            {/* Mode Switcher Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%', maxWidth: '100%' }}>
              <button
                onClick={() => setViewMode('interactive')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-prompt), sans-serif',
                  cursor: 'pointer',
                  border: viewMode === 'interactive' ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                  background: viewMode === 'interactive' ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                  color: viewMode === 'interactive' ? '#ffffff' : 'var(--ink)',
                  boxShadow: viewMode === 'interactive' ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                  minHeight: '40px'
                }}
              >
                📅 บันทึกประจำวัน
              </button>

              {sheetUrl && (
                <button
                  onClick={() => setViewMode('sheet')}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-prompt), sans-serif',
                    cursor: 'pointer',
                    border: viewMode === 'sheet' ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                    background: viewMode === 'sheet' ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                    color: viewMode === 'sheet' ? '#ffffff' : 'var(--ink)',
                    boxShadow: viewMode === 'sheet' ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                    transition: 'all 0.2s ease',
                    minHeight: '40px'
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
              เปิดเต็มจอ ↗
            </a>
          </div>
          <div style={{ padding: '12px', background: '#ffffff' }}>
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
          {isLoading ? (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(14px, 3vw, 20px) clamp(16px, 3.5vw, 28px)', marginBottom: '20px', background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(16px)', boxShadow: '0 14px 40px rgba(61,107,255,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ width: '40px', height: '24px', borderRadius: '4px', background: 'rgba(61,107,255,0.1)', animation: 'pulse 1.5s infinite ease-in-out' }}></div>
                    <div style={{ width: '70px', height: '12px', borderRadius: '4px', background: 'rgba(61,107,255,0.05)', animation: 'pulse 1.5s infinite ease-in-out' }}></div>
                  </div>
                ))}
              </div>
              <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: 'rgba(16,21,43,0.05)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '30%', borderRadius: '999px', background: 'rgba(61,107,255,0.1)', animation: 'pulse 1.5s infinite ease-in-out' }}></div>
              </div>
              <style>{`
                @keyframes pulse {
                  0% { opacity: 0.5; }
                  50% { opacity: 1; }
                  100% { opacity: 0.5; }
                }
              `}</style>
            </div>
          ) : calculatedStats ? (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(14px, 3vw, 20px) clamp(16px, 3.5vw, 28px)', marginBottom: '20px', background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(16px)', boxShadow: '0 14px 40px rgba(61,107,255,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: 'var(--blue-c)' }}>{calculatedStats.recordedWeeks}</b>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted-c)' }}>สัปดาห์ที่บันทึก</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: '#0a8f82' }}>{calculatedStats.workDays}</b>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted-c)' }}>วันที่มาสอน</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: '#c73143' }}>{calculatedStats.leaveDays}</b>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted-c)' }}>วันลา</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: 'var(--blue-c)' }}>{(calculatedStats as any).totalHoursStr || "0 ชม."}</b>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted-c)' }}>ชั่วโมงปฏิบัติงานรวม</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <b style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, color: 'var(--violet-c)' }}>{calculatedStats.semesterPct}</b>
                  <span style={{ fontSize: '11.5px', color: 'var(--muted-c)' }}>ความคืบหน้า</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: 'rgba(16,21,43,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: calculatedStats.semesterPct || '0%', borderRadius: '999px', background: 'linear-gradient(90deg, var(--blue-c), var(--violet-c), var(--cyan-c))', transition: 'width 1s ease' }}></div>
              </div>
            </div>
          ) : null}

          {/* Standard Work Hours Notice */}
          <div style={{ display: 'flex', gap: '10px 16px', flexWrap: 'wrap', marginBottom: '20px', padding: '12px 18px', borderRadius: '16px', background: 'rgba(61,107,255,0.06)', border: '1px solid rgba(61,107,255,0.18)', fontSize: '13px', color: 'var(--ink)' }}>
            <span style={{ color: 'var(--blue-c)', fontWeight: 700 }}>📌 เวลาปฏิบัติงาน:</span>
            <span>เข้าแถว <b style={{ color: 'var(--ink)' }}>07:40–08:00</b></span>
            <span>ปฏิบัติงาน <b style={{ color: 'var(--ink)' }}>08:00–16:30</b></span>
            <span style={{ color: 'var(--muted-c)' }}>(จันทร์–ศุกร์)</span>
          </div>

          {/* Weekly Accordions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isLoading && viewMode === 'interactive' ? (
              <div style={{ padding: '64px 32px', textAlign: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: '24px', border: '1px dashed var(--border-strong-c)' }}>
                <style>{`
                  @keyframes spin-custom { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(61,107,255,0.1)', color: 'var(--blue-c)', marginBottom: '16px' }}>
                  <svg style={{ animation: 'spin-custom 1s linear infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>กำลังซิงค์ข้อมูล</h3>
                <p style={{ color: 'var(--muted-c)', fontSize: '14px', margin: 0 }}>กำลังดึงข้อมูลบันทึกการสอนล่าสุดจาก Google Sheets...</p>
              </div>
            ) : displayWeeks && displayWeeks.length > 0 ? (
              displayWeeks.map((week) => {
                const isOpen = openWeeks.includes(week.weekNum);

                return (
                  <div 
                    key={week.weekNum} 
                    className="glass-panel"
                    style={{ 
                      borderRadius: '20px', 
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
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'rgba(14,201,184,0.12)', color: '#0a8f82', border: '1px solid rgba(14,201,184,0.3)' }}>
                          มา {week.presentDays} วัน {(week as any).totalHoursStr ? `(${(week as any).totalHoursStr})` : ''}
                        </span>
                        {week.leaveDays > 0 && (
                          <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: 'rgba(239,91,106,0.12)', color: '#c73143', border: '1px solid rgba(239,91,106,0.3)' }}>
                            ลา/หยุด {week.leaveDays} วัน
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Week Title Bar (Clickable) */}
                    <div 
                      onClick={() => toggleWeek(week.weekNum)}
                      style={{ 
                        padding: 'clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 24px)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '14px', 
                        cursor: 'pointer', 
                        borderBottom: isOpen ? '1px solid var(--border-c)' : 'none',
                        background: 'rgba(255,255,255,0.4)',
                        userSelect: 'none'
                      }}
                    >
                      {/* Week Num Badge */}
                      <div 
                        style={{ 
                          width: '38px', 
                          height: '38px', 
                          borderRadius: '12px', 
                          background: 'linear-gradient(135deg, var(--blue-c), var(--violet-c))', 
                          color: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 700, 
                          fontSize: '14px', 
                          fontFamily: 'var(--font-prompt), sans-serif',
                          boxShadow: '0 4px 14px rgba(61,107,255,0.25)',
                          flexShrink: 0
                        }}
                      >
                        {week.weekNum}
                      </div>

            {/* Title & Range */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                          {week.title}
                        </h3>
                        <div style={{ fontSize: '12.5px', color: 'var(--muted-c)', marginTop: '2px', fontWeight: 500 }}>
                          {week.dateRange}
                        </div>
                      </div>

                      {/* Thin Line Chevron Icon */}
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
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
                      <div 
                        className="week-logs-container"
                        style={{ 
                          padding: '16px clamp(14px, 3.5vw, 24px) 24px',
                          display: 'grid',
                          gridTemplateColumns: week.images && week.images.length > 0 ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
                          gap: '32px'
                        }}
                      >
                        {/* Slideshow / Image Section */}
                        {week.images && week.images.length > 0 && (
                          <AutoSlideshow images={week.images} weekNum={week.weekNum} />
                        )}

                        {/* Daily Logs List */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {week.days.map((day, idx: number) => {
                            const isLeave = day.status === 'sick' || day.status === 'personal';
                            const statusBg = day.status === 'present' ? 'rgba(14,201,184,0.12)' : day.status === 'sick' ? 'rgba(239,91,106,0.12)' : 'rgba(255,176,32,0.14)';
                            const statusColor = day.status === 'present' ? '#0a8f82' : day.status === 'sick' ? '#c73143' : '#c98008';
                            const statusBorder = day.status === 'present' ? 'rgba(14,201,184,0.35)' : day.status === 'sick' ? 'rgba(239,91,106,0.35)' : 'rgba(255,176,32,0.35)';

                                const typedDay = day as DayLogItem;
                                // Determine day color
                                let dayColor = 'var(--ink)';
                                let badgeBg = '#ffffff';
                                let badgeBorder = 'var(--border-strong-c)';
                                
                                if (typedDay.dayOfWeek !== undefined && typedDay.dayOfWeek !== -1) {
                                  switch(typedDay.dayOfWeek) {
                                    case 0: dayColor = '#ef4444'; break; // Sun - Red
                                    case 1: dayColor = '#eab308'; break; // Mon - Yellow
                                    case 2: dayColor = '#ec4899'; break; // Tue - Pink
                                    case 3: dayColor = '#22c55e'; break; // Wed - Green
                                    case 4: dayColor = '#f97316'; break; // Thu - Orange
                                    case 5: dayColor = '#3b82f6'; break; // Fri - Blue
                                    case 6: dayColor = '#a855f7'; break; // Sat - Purple
                                  }
                                } else if (typedDay.dayName) {
                                  // Fallback for static data
                                  if (typedDay.dayName.includes('อาทิตย์')) dayColor = '#ef4444';
                                  else if (typedDay.dayName.includes('จันทร์')) dayColor = '#eab308';
                                  else if (typedDay.dayName.includes('อังคาร')) dayColor = '#ec4899';
                                  else if (typedDay.dayName.includes('พุธ')) dayColor = '#22c55e';
                                  else if (typedDay.dayName.includes('พฤหัส')) dayColor = '#f97316';
                                  else if (typedDay.dayName.includes('ศุกร์')) dayColor = '#3b82f6';
                                  else if (typedDay.dayName.includes('เสาร์')) dayColor = '#a855f7';
                                }

                                if (dayColor !== 'var(--ink)') {
                                  // Create a subtle tinted background using the hex color
                                  // We'll use a hack to add opacity to hex or just use a fallback light color
                                  badgeBorder = `1px solid ${dayColor}40`; // 25% opacity border
                                  badgeBg = `${dayColor}08`; // 5% opacity bg
                                }
                                
                                if (isLeave) {
                                  badgeBg = 'rgba(239,91,106,0.05)';
                                  badgeBorder = '1px dashed rgba(239,91,106,0.3)';
                                }

                                return (
                                  <div 
                                    key={idx}
                                    style={{ 
                                      display: 'flex', 
                                      gap: '16px', 
                                      padding: '16px 0', 
                                      borderBottom: idx < week.days.length - 1 ? '1px dashed var(--border-strong-c)' : 'none' 
                                    }}
                                  >
                                    {/* Day Badge */}
                                    <div 
                                      style={{ 
                                        width: '54px', 
                                        height: '54px', 
                                        borderRadius: '14px', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        background: badgeBg,
                                        border: badgeBorder,
                                        boxShadow: isLeave ? 'none' : '0 4px 12px rgba(0,0,0,0.02)',
                                        flexShrink: 0
                                      }}
                                    >
                                      <span style={{ fontSize: '11px', color: isLeave ? '#c73143' : dayColor, fontWeight: 600, textTransform: 'uppercase', opacity: isLeave ? 1 : 0.8 }}>{day.dayName.split(' ')[0]}</span>
                                      <span style={{ fontSize: '20px', fontWeight: 700, color: isLeave ? '#c73143' : dayColor, lineHeight: '1.1' }}>{day.dayNum}</span>
                                    </div>

                                {/* Day Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                    <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                                      {day.title}
                                    </h4>
                                    <span 
                                      style={{ 
                                        fontSize: '11px', 
                                        fontWeight: 600, 
                                        padding: '3px 10px', 
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
                                    <div style={{ fontSize: '12px', color: 'var(--muted-c)', marginBottom: '10px', fontWeight: 500, display: 'inline-flex', padding: '3px 8px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
                                      ⏱️ {day.times}
                                    </div>
                                  )}

                                  {day.activities && day.activities.length > 0 && (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      {day.activities.map((act: string, actIdx: number) => (
                                        <li key={actIdx} style={{ fontSize: '13.5px', color: 'var(--ink)', opacity: 0.85, lineHeight: '1.6', paddingLeft: '18px', position: 'relative' }}>
                                          <span style={{ position: 'absolute', left: 0, top: '2px', color: 'var(--violet-c)', fontWeight: 700 }}>▸</span>
                                          {act}
                                        </li>
                                      ))}
                                    </ul>
                                  )}

                                  {day.leaveNote && (
                                    <div style={{ fontSize: '13px', color: 'var(--muted-c)', lineHeight: '1.6', background: 'rgba(239,91,106,0.06)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(239,91,106,0.18)', marginTop: '8px' }}>
                                      <span style={{ color: '#c73143', fontWeight: 700, marginRight: '6px' }}>&gt;</span>
                                      {day.leaveNote}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
    </div>
  );
}

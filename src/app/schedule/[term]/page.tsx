"use client"
import { use } from "react"
import { scheduleData, schedulePdfConfig } from "@/data/siteData"
import { notFound } from "next/navigation"

export default function SchedulePage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterKey = term === 'semester-1' ? 'semester1' : 'semester2';
  const data = scheduleData[semesterKey];
  const pdfUrl = term === 'semester-1' ? schedulePdfConfig.semester1Url : schedulePdfConfig.semester2Url;

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 0 90px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อ + ปุ่มดูไฟล์ตารางสอนตัวจริง) */}
      <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(16px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
        <div className="chrome">
          <span className="r"></span><span className="y"></span><span className="g"></span>
          <span className="fname">schedule_header.config</span>
        </div>
        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '14px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600 }}>
                // schedule.official_timetable
              </div>
              <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                <span style={{ fontSize: '0.75em', color: 'var(--violet-c)' }}>&lt;/&gt;</span>
                ตารางสอน {data.schoolName || 'วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี'}
              </h1>
              <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '15px' }}>
                ผู้สอน: {data.teacher || 'นายปาณวัฐ รักรอดจิต'} ({data.role || 'นักศึกษาฝึกประสบการณ์วิชาชีพครู'})
              </p>
              <div style={{ fontSize: '14px', color: 'var(--blue-c)', fontWeight: 600, marginTop: '4px' }}>
                {data.department}
              </div>
            </div>

            {/* ปุ่มคลิกดูไฟล์ตารางสอนตัวจริง */}
            <a 
              href={pdfUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, rgba(61,107,255,0.12), rgba(139,92,246,0.12))',
                border: '1px solid rgba(61,107,255,0.3)',
                color: 'var(--blue-c)',
                fontFamily: 'var(--font-prompt), sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(61,107,255,0.12)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(61,107,255,0.22), rgba(139,92,246,0.22))'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'linear-gradient(135deg, rgba(61,107,255,0.12), rgba(139,92,246,0.12))'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              คลิกดูไฟล์ตารางสอนตัวจริง (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* 2. Schedule Card for Semester 1/2569 (กรอบตารางสอนเทอม 1/2569) */}
      <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(16px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)' }}>
        {/* IDE Chrome Header Bar */}
        <div className="chrome">
          <span className="r"></span><span className="y"></span><span className="g"></span>
          <span className="fname">official_schedule_semester_1_2569.config</span>
          <span className="tag">ภาคเรียนที่ {data.academicYear || "1/2569"}</span>
        </div>

        {/* Card Body Container */}
        <div style={{ padding: '28px 32px' }}>
          {/* SECTION 1: Course Summary Table (ตารางสรุปรายวิชา) */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--blue-c)' }}>//</span> สรุปรายวิชาที่สอน ภาคเรียนที่ {data.academicYear}
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: 'rgba(61,107,255,0.08)' }}>
                    <th style={{ padding: '12px 16px', borderRadius: '12px 0 0 12px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', width: '140px' }}>รหัสวิชา</th>
                    <th style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', textAlign: 'left' }}>ชื่อรายวิชา</th>
                    <th style={{ padding: '12px 12px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', width: '60px' }}>ท.</th>
                    <th style={{ padding: '12px 12px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', width: '60px' }}>ป.</th>
                    <th style={{ padding: '12px 12px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', width: '60px' }}>น.</th>
                    <th style={{ padding: '12px 16px', borderRadius: '0 12px 12px 0', fontSize: '14px', fontWeight: 700, color: 'var(--ink)', textAlign: 'center', width: '70px' }}>ช.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.coursesSummary && data.coursesSummary.length > 0 ? (
                    data.coursesSummary.map((c, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-c)' }}>
                        <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 700, color: 'var(--blue-c)', fontFamily: 'var(--font-prompt), sans-serif' }}>{c.code}</td>
                        <td style={{ padding: '14px 16px', fontSize: '15px', fontWeight: 500, color: 'var(--ink)' }}>{c.name}</td>
                        <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--ink)' }}>{c.t}</td>
                        <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--ink)' }}>{c.p}</td>
                        <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--ink)' }}>{c.n}</td>
                        <td style={{ padding: '14px 16px', fontSize: '15px', textAlign: 'center', fontWeight: 600, color: 'var(--ink)' }}>{c.c}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--muted-c)' }}>ยังไม่มีข้อมูลรายวิชาในภาคเรียนนี้</td>
                    </tr>
                  )}
                  {data.totals && data.coursesSummary.length > 0 && (
                    <tr style={{ background: 'rgba(61,107,255,0.04)', fontWeight: 700 }}>
                      <td colSpan={2} style={{ padding: '14px 16px', fontSize: '15px', textAlign: 'right', color: 'var(--ink)' }}>รวมทั้งหมด:</td>
                      <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--blue-c)' }}>{data.totals.t}</td>
                      <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--blue-c)' }}>{data.totals.p}</td>
                      <td style={{ padding: '14px 12px', fontSize: '15px', textAlign: 'center', color: 'var(--blue-c)' }}>{data.totals.n}</td>
                      <td style={{ padding: '14px 16px', fontSize: '15px', textAlign: 'center', color: 'var(--violet-c)' }}>{data.totals.c}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid var(--border-strong-c)', margin: '28px 0' }} />

          {/* SECTION 2: Official Timetable Grid Card (ตารางเวลาการสอนประจำสัปดาห์) */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--violet-c)' }}>//</span> ตารางเวลาการสอนประจำสัปดาห์ ({data.periods ? data.periods.length - 1 : 11} คาบ)
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '980px', textAlign: 'center' }}>
                <thead>
                  {/* Row 1: Time Range Header */}
                  <tr style={{ background: 'rgba(16,21,43,0.85)', color: '#ffffff' }}>
                    <th style={{ padding: '10px 8px', fontSize: '13px', border: '1px solid var(--border-strong-c)', width: '90px', color: '#fff' }}>เวลา</th>
                    {data.timeSlots.map((ts, idx) => (
                      <th key={idx} style={{ padding: '10px 4px', fontSize: '12px', border: '1px solid var(--border-strong-c)', color: '#fff', whiteSpace: 'nowrap' }}>
                        {ts}
                      </th>
                    ))}
                  </tr>
                  {/* Row 2: Period Header */}
                  <tr style={{ background: 'rgba(61,107,255,0.12)', color: 'var(--ink)' }}>
                    <th style={{ padding: '8px', fontSize: '13px', fontWeight: 700, border: '1px solid var(--border-strong-c)' }}>วัน/คาบ</th>
                    {data.periods.map((p, idx) => (
                      <th key={idx} style={{ padding: '8px 4px', fontSize: '13px', fontWeight: 700, border: '1px solid var(--border-strong-c)' }}>
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.days.map((dayName, dayIdx) => (
                    <tr key={dayIdx}>
                      {/* Day Column */}
                      <td style={{ padding: '14px 8px', fontSize: '14px', fontWeight: 700, background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-strong-c)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                        {dayName}
                      </td>

                      {/* Flag Ceremony Column (07:40 - 08:00 - Col 0) */}
                      {dayIdx === 0 && (
                        <td rowSpan={5} style={{ verticalAlign: 'middle', background: 'rgba(61,107,255,0.06)', border: '1px solid var(--border-strong-c)', padding: '12px 4px', fontSize: '13px', fontWeight: 600, color: 'var(--blue-c)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em' }}>
                          กิจกรรมหน้าเสาธง
                        </td>
                      )}

                      {/* Period Columns (Col 1 to N -> indices 1 to N in timeSlots) */}
                      {Array.from({ length: (data.periods?.length || 12) - 1 }).map((_, periodIdx) => {
                        const colIndex = periodIdx + 1; // 1 to N

                        // Find if any class matches this day & starting period
                        const targetClass = data.classes?.find(c => c.day === dayName && c.periodStart === colIndex);
                        const isInsideSpan = data.classes?.some(c => c.day === dayName && colIndex > c.periodStart && colIndex <= c.periodEnd);

                        if (isInsideSpan) {
                          return null;
                        }

                        if (targetClass) {
                          const spanCount = targetClass.periodEnd - targetClass.periodStart + 1;
                          const bgColor = targetClass.color === 'violet' ? 'rgba(139,92,246,0.14)' : targetClass.color === 'cyan' ? 'rgba(14,201,184,0.16)' : 'rgba(61,107,255,0.14)';
                          const borderColor = targetClass.color === 'violet' ? 'rgba(139,92,246,0.35)' : targetClass.color === 'cyan' ? 'rgba(14,201,184,0.4)' : 'rgba(61,107,255,0.35)';
                          const textColor = targetClass.color === 'violet' ? 'var(--violet-c)' : targetClass.color === 'cyan' ? '#0a8f82' : 'var(--blue-c)';

                          return (
                            <td key={colIndex} colSpan={spanCount} style={{ padding: '8px', border: '1px solid var(--border-strong-c)', verticalAlign: 'middle', background: bgColor }}>
                              <div style={{ padding: '10px 8px', borderRadius: '12px', border: `1px solid ${borderColor}`, background: 'rgba(255,255,255,0.6)' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: textColor, fontFamily: 'var(--font-prompt), sans-serif' }}>
                                  {targetClass.code}
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
                                  {targetClass.name}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--ink)', opacity: 0.85, marginTop: '4px', fontWeight: 500 }}>
                                  {targetClass.room}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--muted-c)', marginTop: '2px', fontWeight: 500 }}>
                                  {targetClass.group}
                                </div>
                              </div>
                            </td>
                          );
                        }

                        // Empty slot
                        return (
                          <td key={colIndex} style={{ padding: '8px', border: '1px solid var(--border-strong-c)', background: dayIdx === 1 && colIndex >= 5 && colIndex <= 6 ? 'rgba(16,21,43,0.04)' : 'transparent' }}>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

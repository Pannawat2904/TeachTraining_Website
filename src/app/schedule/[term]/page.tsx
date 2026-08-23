"use client"
import { use } from "react"
import { scheduleData, schedulePdfConfig } from "@/data/siteData"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/Reveal"

export default function SchedulePage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterKey = term === 'semester-1' ? 'semester1' : 'semester2';
  const data = scheduleData[semesterKey];
  const rawPdfUrl = term === 'semester-1' ? schedulePdfConfig.semester1Url : schedulePdfConfig.semester2Url;
  const pdfEmbedUrl = rawPdfUrl ? rawPdfUrl.replace(/\/view(\?.*)?$/, '/preview') : '';

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 0 90px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อ + ปุ่มดูไฟล์ตารางสอนตัวจริง) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
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
                href={rawPdfUrl || "#"} 
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
      </Reveal>

      {/* 2. Responsive Google Drive PDF Viewer Frame */}
      <Reveal delay={150}>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)' }}>
          {/* IDE Chrome Header Bar */}
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">official_schedule_semester_{semesterKey === 'semester1' ? '1' : '2'}_2569.pdf</span>
            <span className="tag">ภาคเรียนที่ {data.academicYear || (semesterKey === 'semester1' ? "1/2569" : "2/2569")}</span>
          </div>

          {/* Card Body Container */}
          <div style={{ padding: '32px' }}>
            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'center',
                background: 'rgba(16,21,43,0.03)',
                padding: '24px 16px',
                borderRadius: '20px',
                border: '1px solid var(--border-c)'
              }}
            >
              <div 
                style={{ 
                  width: '100%', 
                  maxWidth: '850px', 
                  aspectRatio: '1 / 1.414',
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(0,0,0,0.12)', 
                  boxShadow: '0 16px 40px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.06)', 
                  background: '#ffffff'
                }}
              >
                {pdfEmbedUrl ? (
                  <iframe 
                    src={pdfEmbedUrl} 
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allow="autoplay"
                    title="Schedule PDF"
                  ></iframe>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted-c)', fontSize: '15px' }}>
                    ยังไม่มีข้อมูลตารางสอนในภาคเรียนนี้
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}

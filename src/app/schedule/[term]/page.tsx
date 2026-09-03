"use client"
import { use } from "react"
import { scheduleData, schedulePdfConfig } from "@/data/siteData"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/Reveal"
import { DocumentPreview } from "@/components/DocumentPreview"
import { Calendar, CalendarDays } from "lucide-react"

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

  // Use uploaded image for semester 1
  const scheduleImage = term === 'semester-1' ? '/images/others/schedule_term1.jpg' : undefined;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อ + ข้อมูลผู้สอน) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">schedule_header.config</span>
            <span className="tag">ภาคเรียนที่ {data.academicYear || (semesterKey === 'semester1' ? "1/2569" : "2/2569")}</span>
          </div>
          <div style={{ padding: 'clamp(18px, 3.5vw, 24px) clamp(16px, 4vw, 28px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ flex: '1 1 280px', minWidth: 0 }}>
                <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarDays size={15} />
                  ตารางสอนรายภาคเรียน
                </div>
                <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 30px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                  <Calendar style={{ color: 'var(--violet-c)', width: '28px', height: '28px', flexShrink: 0 }} />
                  <span>ตารางสอน {data.schoolName || 'วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี'}</span>
                </h1>
                <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '14px', lineHeight: 1.5 }}>
                  ผู้สอน: {data.teacher || 'นายปาณวัฐ รักรอดจิต'} ({data.role || 'นักศึกษาฝึกประสบการณ์วิชาชีพครู'})
                </p>
                <div style={{ fontSize: '13.5px', color: 'var(--blue-c)', fontWeight: 600, marginTop: '4px' }}>
                  {data.department}
                </div>
              </div>

              {/* Direct Open Button */}
              {rawPdfUrl && (
                <div style={{ flexShrink: 0 }}>
                  <a 
                    href={rawPdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      minHeight: '44px',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, rgba(61,107,255,0.12), rgba(139,92,246,0.12))',
                      border: '1px solid rgba(61,107,255,0.3)',
                      color: 'var(--blue-c)',
                      fontFamily: 'var(--font-prompt), sans-serif',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(61,107,255,0.12)',
                      transition: 'all 0.25s ease',
                      whiteSpace: 'nowrap'
                    }}
                    className="hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    เปิดไฟล์ตารางสอน (PDF)
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Direct Document / Image Preview Component */}
      <Reveal delay={150}>
        <DocumentPreview
          title={`ตารางสอนประจำภาคเรียน ${data.academicYear || (semesterKey === 'semester1' ? "1/2569" : "2/2569")}`}
          subtitle={data.schoolName || 'วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี'}
          badge={`ภาคเรียนที่ ${data.academicYear || (semesterKey === 'semester1' ? "1/2569" : "2/2569")}`}
          details={`ตารางสอนทางการ แผนกวิชา${data.department || 'ธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ'}`}
          imageUrl={scheduleImage}
          pdfUrl={pdfEmbedUrl}
          driveUrl={rawPdfUrl}
          filename={scheduleImage ? `schedule_semester_${term}.jpg` : `official_schedule_${term}.pdf`}
        />
      </Reveal>
    </div>
  );
}

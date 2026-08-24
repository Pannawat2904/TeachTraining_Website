"use client"

import { use, useState } from "react"
import { lessonPlans } from "@/data/siteData"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/Reveal"
import { DocumentPreview } from "@/components/DocumentPreview"
import { BookOpen, BookOpenCheck } from "lucide-react"

export default function LessonPlansPage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterNum = term === 'semester-1' ? 1 : 2;
  const plans = term === 'semester-1' ? lessonPlans.semester1 : lessonPlans.semester2;

  // Selected filter (all or courseCode)
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const filteredPlans = selectedCourse === "all" 
    ? plans 
    : plans.filter(p => p.courseCode === selectedCourse);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อหน้าแผนการสอน) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">lesson_plans_semester_{semesterNum}.config</span>
            <span className="tag">ภาคเรียนที่ {semesterNum}/2569</span>
          </div>
          <div style={{ padding: 'clamp(18px, 3.5vw, 24px) clamp(16px, 4vw, 28px)' }}>
            <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpenCheck size={15} />
              แผนการจัดการเรียนรู้รายวิชา
            </div>
            <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 30px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
              <BookOpen style={{ color: 'var(--violet-c)', width: '28px', height: '28px', flexShrink: 0 }} />
              <span>แผนการจัดการเรียนรู้ (ภาคเรียนที่ {semesterNum}/2569)</span>
            </h1>
            <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '14px', lineHeight: 1.5 }}>
              แยกตามรายวิชาที่สอนในภาคเรียนที่ {semesterNum}/2569 จำนวน {plans.length} รายวิชา สามารถกดเปิดใน Google Drive หรือคลิกดูตัวอย่างในหน้านี้
            </p>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCourse("all")}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-prompt), sans-serif',
                  cursor: 'pointer',
                  border: selectedCourse === "all" ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                  background: selectedCourse === "all" ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                  color: selectedCourse === "all" ? '#ffffff' : 'var(--ink)',
                  boxShadow: selectedCourse === "all" ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                  minHeight: '38px'
                }}
              >
                ทุกรายวิชา ({plans.length})
              </button>
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedCourse(p.courseCode)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-prompt), sans-serif',
                    cursor: 'pointer',
                    border: selectedCourse === p.courseCode ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                    background: selectedCourse === p.courseCode ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                    color: selectedCourse === p.courseCode ? '#ffffff' : 'var(--ink)',
                    boxShadow: selectedCourse === p.courseCode ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                    transition: 'all 0.2s ease',
                    minHeight: '38px'
                  }}
                >
                  {p.courseCode} {p.courseName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Course Cards with On-Demand Document Preview */}
      {filteredPlans.length === 0 ? (
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', background: 'var(--panel-c)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>ยังไม่มีข้อมูลแผนการสอนสำหรับวิชานี้</h3>
        </div>
      ) : (
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredPlans.map((plan) => (
              <DocumentPreview
                key={plan.id}
                title={plan.title}
                subtitle={`วิชา ${plan.courseCode} ${plan.courseName}`}
                badge={`รหัสวิชา ${plan.courseCode}`}
                details={`${plan.details} · ● ${plan.statusText}`}
                pdfUrl={plan.pdfUrl}
                driveUrl={plan.driveUrl || plan.pdfUrl}
                filename={plan.filename}
              />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}

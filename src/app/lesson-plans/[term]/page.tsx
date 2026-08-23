"use client"

import { use, useState } from "react"
import { lessonPlans } from "@/data/siteData"
import { notFound } from "next/navigation"
import { Reveal } from "@/components/Reveal"

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

  // Track collapsed state of PDF viewers for each plan (empty array means ALL are expanded by default!)
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);

  const togglePdf = (id: string) => {
    setCollapsedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredPlans = selectedCourse === "all" 
    ? plans 
    : plans.filter(p => p.courseCode === selectedCourse);

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '50px 0 90px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card (กรอบหัวข้อหน้าแผนการสอน) */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">lesson_plans_semester_{semesterNum}.config</span>
            <span className="tag">ภาคเรียนที่ {semesterNum}/2569</span>
          </div>
          <div style={{ padding: '24px 32px' }}>
            <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '14px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600 }}>
              // lesson.plans_by_subject
            </div>
            <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
              <span style={{ fontSize: '0.75em', color: 'var(--violet-c)' }}>&lt;/&gt;</span>
              แผนการจัดการเรียนรู้ (ภาคเรียนที่ {semesterNum}/2569)
            </h1>
            <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '15px' }}>
              แยกตามรายวิชาที่สอนในภาคเรียนที่ {semesterNum}/2569 จำนวน 3 รายวิชา แสดงตัวอย่างไฟล์ PDF จาก Google Drive แบบโต้ตอบ
            </p>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCourse("all")}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-prompt), sans-serif',
                  cursor: 'pointer',
                  border: selectedCourse === "all" ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                  background: selectedCourse === "all" ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                  color: selectedCourse === "all" ? '#ffffff' : 'var(--ink)',
                  boxShadow: selectedCourse === "all" ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                ทุกรายวิชา (3)
              </button>
              {plans.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedCourse(p.courseCode)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    fontFamily: 'var(--font-prompt), sans-serif',
                    cursor: 'pointer',
                    border: selectedCourse === p.courseCode ? '1px solid var(--blue-c)' : '1px solid var(--border-strong-c)',
                    background: selectedCourse === p.courseCode ? 'linear-gradient(135deg, var(--blue-c), var(--violet-c))' : 'rgba(255,255,255,0.7)',
                    color: selectedCourse === p.courseCode ? '#ffffff' : 'var(--ink)',
                    boxShadow: selectedCourse === p.courseCode ? '0 4px 14px rgba(61,107,255,0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {p.courseCode} {p.courseName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Course Cards with Embedded Google Drive PDF Viewers */}
      {filteredPlans.length === 0 ? (
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', background: 'var(--panel-c)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>ยังไม่มีข้อมูลแผนการสอนสำหรับวิชานี้</h3>
        </div>
      ) : (
        <Reveal delay={150}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {filteredPlans.map((plan) => {
            const isExpanded = !collapsedIds.includes(plan.id);

            return (
              <div 
                key={plan.id} 
                className="glass-panel" 
                style={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  padding: 0, 
                  background: 'var(--panel-c)', 
                  border: '1px solid var(--border-strong-c)', 
                  backdropFilter: 'blur(16px)', 
                  boxShadow: '0 16px 46px rgba(61,107,255,0.08)'
                }}
              >
                {/* IDE Window Chrome Header */}
                <div className="chrome">
                  <span className="r"></span><span className="y"></span><span className="g"></span>
                  <span className="fname">{plan.filename}</span>
                  <span className="tag">
                    {plan.courseCode}
                  </span>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--blue-c)', background: 'rgba(61,107,255,0.1)', padding: '4px 14px', borderRadius: '999px', border: '1px solid rgba(61,107,255,0.2)' }}>
                          รหัสวิชา {plan.courseCode}
                        </span>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#0a8f82', background: 'rgba(14,201,184,0.12)', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(14,201,184,0.3)' }}>
                          ● {plan.statusText}
                        </span>
                      </div>

                      <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--ink)', lineHeight: '1.35' }}>
                        {plan.title}
                      </h2>

                      <div style={{ fontSize: '14px', color: 'var(--muted-c)', marginTop: '8px', display: 'flex', gap: '18px', flexWrap: 'wrap', fontWeight: 500 }}>
                        <span>📊 {plan.details}</span>
                      </div>
                    </div>

                    {/* Action Buttons: Open Drive & Toggle Preview */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => togglePdf(plan.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '11px 20px',
                          borderRadius: '999px',
                          background: isExpanded ? 'rgba(61,107,255,0.15)' : 'rgba(255,255,255,0.85)',
                          border: '1px solid var(--border-strong-c)',
                          color: 'var(--ink)',
                          fontFamily: 'var(--font-prompt), sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {isExpanded ? 'ซ่อนพรีวิว PDF' : 'แสดงพรีวิว PDF'}
                      </button>

                      <a
                        href={plan.driveUrl || plan.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '11px 22px',
                          borderRadius: '999px',
                          background: 'linear-gradient(135deg, var(--blue-c), var(--violet-c))',
                          color: '#ffffff',
                          fontFamily: 'var(--font-prompt), sans-serif',
                          fontSize: '14px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          boxShadow: '0 4px 16px rgba(61,107,255,0.25)',
                          transition: 'all 0.25s ease'
                        }}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        เปิดไฟล์ใน Google Drive
                      </a>
                    </div>
                  </div>

                  {/* Embedded Google Drive PDF Viewer Frame (A4 Paper Proportions) */}
                  {isExpanded && (
                    <div 
                      style={{ 
                        marginTop: '22px', 
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
                        <iframe 
                          src={plan.pdfUrl} 
                          style={{ width: '100%', height: '100%', border: 0 }}
                          allow="autoplay"
                          title={plan.title}
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </Reveal>
      )}
    </main>
  );
}

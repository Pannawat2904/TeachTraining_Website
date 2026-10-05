import React, { use } from 'react';
import { notFound } from "next/navigation";
import { researchDocuments } from "@/data/siteData";
import { Reveal } from '@/components/Reveal';
import { DocumentPreview } from '@/components/DocumentPreview';
import { FileText, GraduationCap, Sparkles, ArrowUpRight, Presentation } from 'lucide-react';
import { TermSelector } from "@/components/TermSelector";

export default function ClassroomResearchPage(props: { params: Promise<{ term: string }> }) {
  const params = use(props.params);
  const { term } = params;
  
  if (term !== 'semester-1' && term !== 'semester-2') {
    notFound()
  }

  const semesterNum = term === 'semester-1' ? 1 : 2;
  const docs = term === 'semester-1' ? researchDocuments.semester1 : researchDocuments.semester2;
  const doc = docs[0];
  const rawPdfUrl = doc?.pdfUrl || "";
  const openDriveUrl = rawPdfUrl.includes("/preview") ? rawPdfUrl.replace("/preview", "/view") : rawPdfUrl;
  const projectUrl = (doc as any)?.projectUrl || "https://dbase-learning.vercel.app";
  const presentationUrl = (doc as any)?.presentationUrl || "";

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      <TermSelector currentTerm={term} basePath="/classroom-research" />
      {/* 1. Research Title & Meta Header Card with Workpiece Button */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">classroom_research_semester_{semesterNum}.paper</span>
            <span className="tag">ภาคเรียนที่ {semesterNum}/2569</span>
          </div>

          <div style={{ padding: 'clamp(18px, 3.5vw, 24px) clamp(16px, 4vw, 28px)' }}>
            <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={16} />
              โครงร่างงานวิจัยในชั้นเรียน
            </div>
            <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.45, color: 'var(--ink)', marginBottom: '14px', wordBreak: 'break-word', overflowWrap: 'anywhere', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FileText style={{ color: 'var(--violet-c)', width: '26px', height: '26px', flexShrink: 0, marginTop: '2px' }} />
              <span>{doc?.title || "ยังไม่มีข้อมูลงานวิจัยในชั้นเรียนสำหรับภาคเรียนนี้"}</span>
            </h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', fontSize: '13.5px', color: 'var(--muted-c)', fontWeight: 500 }}>
                <span>ผู้วิจัย: <b style={{ color: 'var(--ink)' }}>นายปาณวัฐ รักรอดจิต</b></span>
                <span>รายวิชา: <b style={{ color: 'var(--ink)' }}>21910-2012 โปรแกรมฐานข้อมูล</b></span>
              </div>

              {/* Action Button for Innovation / Workpiece Link */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '9px 18px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #0ec9b8, #3d6bff)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-prompt), sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(14,201,184,0.3)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    minHeight: '40px'
                  }}
                  className="hover:scale-[1.03] active:scale-[0.98] transition-transform"
                >
                  <Sparkles size={15} />
                  <span>เปิดดูชิ้นงาน (DBase Learning)</span>
                  <ArrowUpRight size={14} />
                </a>

                {presentationUrl && (
                  <a
                    href={presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 18px',
                      borderRadius: '999px',
                      background: 'var(--surface-c)',
                      color: 'var(--violet-c)',
                      border: '1px solid var(--violet-c)',
                      fontFamily: 'var(--font-prompt), sans-serif',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      minHeight: '40px'
                    }}
                    className="hover:scale-[1.03] active:scale-[0.98] transition-transform"
                  >
                    <Presentation size={15} />
                    <span>สไลด์นำเสนอ</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {docs.length === 0 ? (
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '48px', textAlign: 'center', background: 'var(--panel-c)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>ยังไม่มีข้อมูลงานวิจัยสำหรับภาคเรียนนี้</h3>
        </div>
      ) : (
        <Reveal delay={150}>
          <DocumentPreview
            title="โครงร่างงานวิจัยในชั้นเรียน"
            subtitle={`รายวิชาโปรแกรมฐานข้อมูล (21910-2012) ภาคเรียนที่ ${semesterNum}/2569`}
            badge="โครงร่างงานวิจัย"
            details="ผู้วิจัย: นายปาณวัฐ รักรอดจิต · แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ"
            pdfUrl={rawPdfUrl}
            driveUrl={openDriveUrl}
            filename={`classroom_research_proposal_sem_${semesterNum}.pdf`}
          />
        </Reveal>
      )}
    </div>
  );
}

import React from 'react';
import { researchDocuments } from "@/data/siteData";
import { Reveal } from '@/components/Reveal';
import { DocumentPreview } from '@/components/DocumentPreview';
import { FileText, GraduationCap, Sparkles, ArrowUpRight } from 'lucide-react';

export default function ClassroomResearchPage() {
  const doc = researchDocuments[0];
  const rawPdfUrl = doc?.pdfUrl || "";
  const openDriveUrl = rawPdfUrl.includes("/preview") ? rawPdfUrl.replace("/preview", "/view") : rawPdfUrl;
  const projectUrl = (doc as any)?.projectUrl || "https://dbase-learning.vercel.app";

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Research Title & Meta Header Card with Workpiece Button */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">classroom_research.paper</span>
            <span className="tag">ภาคเรียนที่ 1/2569</span>
          </div>

          <div style={{ padding: '24px 28px' }}>
            <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={16} />
              โครงร่างงานวิจัยในชั้นเรียน
            </div>
            <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 26px)', lineHeight: 1.45, color: 'var(--ink)', marginBottom: '14px', wordBreak: 'break-word', overflowWrap: 'anywhere', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <FileText style={{ color: 'var(--violet-c)', width: '28px', height: '28px', flexShrink: 0, marginTop: '2px' }} />
              <span>การพัฒนาบทเรียนออนไลน์ด้วยปัญญาประดิษฐ์ร่วมกับแชทบอทอัจฉริยะเพื่อส่งเสริมการเรียนรู้รายวิชาโปรแกรมฐานข้อมูล สำหรับนักเรียนระดับประกาศนียบัตรวิชาชีพ</span>
            </h1>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '14px', color: 'var(--muted-c)', fontWeight: 500 }}>
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
                    padding: '10px 20px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #0ec9b8, #3d6bff)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-prompt), sans-serif',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(14,201,184,0.3)',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:scale-[1.03] active:scale-[0.98] transition-transform"
                >
                  <Sparkles size={16} />
                  <span>เปิดดูชิ้นงาน (DBase Learning)</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. On-Demand Document Preview Component */}
      <Reveal delay={150}>
        <DocumentPreview
          title="โครงร่างงานวิจัยในชั้นเรียน"
          subtitle="รายวิชาโปรแกรมฐานข้อมูล (21910-2012) ภาคเรียนที่ 1/2569"
          badge="โครงร่างงานวิจัย"
          details="ผู้วิจัย: นายปาณวัฐ รักรอดจิต · แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ"
          pdfUrl={rawPdfUrl}
          driveUrl={openDriveUrl}
          filename="classroom_research_proposal.pdf"
        />
      </Reveal>
    </div>
  );
}

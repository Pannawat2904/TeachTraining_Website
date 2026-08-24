import React from 'react';
import { researchDocuments } from "@/data/siteData";
import { Reveal } from '@/components/Reveal';
import { DocumentPreview } from '@/components/DocumentPreview';
import { FileText, GraduationCap, ExternalLink, Sparkles, Globe, Bot, Layers, ArrowUpRight } from 'lucide-react';

export default function ClassroomResearchPage() {
  const doc = researchDocuments[0];
  const rawPdfUrl = doc?.pdfUrl || "";
  const openDriveUrl = rawPdfUrl.includes("/preview") ? rawPdfUrl.replace("/preview", "/view") : rawPdfUrl;
  const projectUrl = (doc as any)?.projectUrl || "https://dbase-learning.vercel.app";

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Research Title & Meta Header Card */}
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

              {/* Quick Action Button for Innovation Link */}
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

      {/* 2. Research Innovation & Workpiece Showcase Banner */}
      <Reveal delay={100}>
        <div 
          className="glass-panel" 
          style={{ 
            borderRadius: '24px', 
            overflow: 'hidden', 
            padding: 0, 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.85) 100%)', 
            border: '1px solid rgba(61,107,255,0.25)', 
            backdropFilter: 'blur(12px)', 
            boxShadow: '0 20px 48px rgba(61,107,255,0.12)', 
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <div 
            className="chrome" 
            style={{ 
              padding: '12px 18px', 
              background: 'rgba(61,107,255,0.06)', 
              borderBottom: '1px solid rgba(61,107,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname" style={{ fontSize: '13px', color: 'var(--blue-c)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Globe size={14} /> dbase-learning.vercel.app
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>LIVE WEB APP</span>
            </div>
          </div>

          <div style={{ padding: '28px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: '1 1 500px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span 
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: 'var(--violet-c)', 
                      background: 'rgba(139,92,246,0.12)', 
                      padding: '4px 12px', 
                      borderRadius: '999px', 
                      border: '1px solid rgba(139,92,246,0.25)',
                    }}
                  >
                    <Sparkles size={13} />
                    ชิ้นงาน / นวัตกรรมการวิจัย
                  </span>
                  <span 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: 'var(--blue-c)', 
                      background: 'rgba(61,107,255,0.08)', 
                      padding: '4px 10px', 
                      borderRadius: '999px' 
                    }}
                  >
                    Vercel App
                  </span>
                </div>

                <h2 
                  style={{ 
                    fontFamily: 'var(--font-prompt), sans-serif', 
                    fontSize: 'clamp(20px, 2.4vw, 24px)', 
                    fontWeight: 700, 
                    color: 'var(--ink)', 
                    lineHeight: 1.35, 
                    marginBottom: '8px' 
                  }}
                >
                  DBase Learning — ระบบบทเรียนออนไลน์ด้วยปัญญาประดิษฐ์และแชทบอท
                </h2>
                
                <p style={{ fontSize: '14.5px', color: 'var(--muted-c)', margin: 0, lineHeight: 1.6 }}>
                  นวัตกรรมสื่อการเรียนรู้รายวิชาโปรแกรมฐานข้อมูล (21910-2012) สำหรับนักเรียนระดับประกาศนียบัตรวิชาชีพ (ปวช.) 
                  ส่งเสริมการเรียนรู้แบบบูรณาการด้วยระบบแชทบอทอัจฉริยะช่วยตอบคำถามและแนะนำเนื้อหาตลอด 24 ชั่วโมง
                </p>

                {/* Feature Tags */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--ink)', background: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <Bot size={15} style={{ color: 'var(--violet-c)' }} />
                    <span>AI Assistant & Chatbot</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--ink)', background: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <Layers size={15} style={{ color: 'var(--cyan-c)' }} />
                    <span>บทเรียนฐานข้อมูลออนไลน์</span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--ink)', background: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <Globe size={15} style={{ color: 'var(--blue-c)' }} />
                    <span>รองรับการเข้าถึงทุกอุปกรณ์</span>
                  </div>
                </div>
              </div>

              {/* Call to action button */}
              <div style={{ flexShrink: 0 }}>
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--blue-c) 0%, var(--violet-c) 100%)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-prompt), sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 10px 26px rgba(61,107,255,0.35)',
                    transition: 'all 0.25s ease',
                  }}
                  className="hover:scale-[1.04] hover:shadow-lg active:scale-[0.98] transition-all"
                >
                  <Sparkles size={18} />
                  <span>เข้าสู่เว็บไซต์ชิ้นงาน</span>
                  <ExternalLink size={17} />
                </a>
                <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '12px', color: 'var(--muted2-c)' }}>
                  เปิดในแท็บใหม่ (vercel.app)
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3. On-Demand Document Preview Component */}
      <Reveal delay={200}>
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

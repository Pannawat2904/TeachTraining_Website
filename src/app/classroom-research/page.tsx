"use client"

import React from 'react';
import { researchDocuments } from "@/data/siteData";

export default function ClassroomResearchPage() {
  // Using the URL from siteData
  const pdfUrl = researchDocuments[0]?.pdfUrl || "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .research-page {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .doc .head { padding: 30px 32px 26px; border-bottom: 1px solid var(--border-c, rgba(16,21,43,0.08)); }
        .doc .head .eyebrow { font-family: var(--font-mono, monospace); font-size: 12px; color: var(--blue-c, #3d6bff); margin-bottom: 12px; font-weight: 600; }
        .doc .head h1 { font-family: var(--font-prompt, sans-serif); font-weight: 600; font-size: clamp(20px, 2.6vw, 27px); line-height: 1.45; margin-bottom: 16px; color: var(--ink, #10152b); }
        .doc .head .meta { display: flex; gap: 20px; flex-wrap: wrap; font-family: var(--font-mono, monospace); font-size: 13px; color: var(--muted, rgba(16,21,43,0.58)); }
        .doc .head .meta b { color: var(--ink, #10152b); font-weight: 600; font-family: var(--font-prompt, sans-serif); }
        
        .doc .body { padding: 32px; }
        
        @media(max-width: 700px) {
          .doc .head, .doc .body { padding-left: 20px; padding-right: 20px; }
          .doc .head .meta { gap: 12px; flex-direction: column; }
        }
      `}} />
      
      <div className="research-page max-w-[1200px] mx-auto" style={{ padding: '50px 0 90px' }}>
        <div className="glass-panel doc" style={{ padding: 0, overflow: 'hidden' }}>
          
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">classroom_research.paper</span>
            <span className="tag">ภาคเรียนที่ 1/2569</span>
          </div>

          <div className="head">
            <div className="eyebrow">// research.title</div>
            <h1>การพัฒนาบทเรียนออนไลน์ด้วยปัญญาประดิษฐ์ร่วมกับแชทบอทอัจฉริยะเพื่อส่งเสริมการเรียนรู้รายวิชาโปรแกรมฐานข้อมูล สําหรับนักเรียนระดับประกาศนียบัตรวิชาชีพ</h1>
            <div className="meta">
              <span>ผู้วิจัย: <b>นายปาณวัฐ รักรอดจิต</b></span>
              <span>รายวิชา: <b>21910-2012</b></span>
              <span>กลุ่มเป้าหมาย: <b>ปวช.2/1 (32 คน)</b></span>
            </div>
          </div>

          <div className="body">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
               <a 
                 href={pdfUrl.replace('/preview', '/view')} 
                 target="_blank" 
                 rel="noreferrer"
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: '8px',
                   padding: '8px 16px',
                   background: 'rgba(61,107,255,0.1)',
                   color: 'var(--blue-c)',
                   borderRadius: '999px',
                   fontSize: '13px',
                   fontWeight: 500,
                   textDecoration: 'none',
                   transition: 'all 0.2s ease'
                 }}
               >
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                   <polyline points="15 3 21 3 21 9"></polyline>
                   <line x1="10" y1="14" x2="21" y2="3"></line>
                 </svg>
                 เปิดไฟล์ใน Google Drive
               </a>
            </div>
            
            {/* Embedded Google Drive PDF Viewer Frame (A4 Paper Proportions) */}
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
                <iframe 
                  src={pdfUrl} 
                  style={{ width: '100%', height: '100%', border: 0 }}
                  allow="autoplay"
                  title="Classroom Research PDF"
                ></iframe>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </>
  );
}

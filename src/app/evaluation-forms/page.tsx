"use client"

import React from 'react';
import { evaluationDocuments } from "@/data/siteData";
import { Reveal } from '@/components/Reveal';

export default function EvaluationFormsPage() {
  const pdfUrl = evaluationDocuments[0]?.pdfUrl || "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .doc .head { padding: 30px 32px 26px; border-bottom: 1px solid var(--border-c, rgba(16,21,43,0.08)); display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .doc .head .eyebrow { font-family: var(--font-mono, monospace); font-size: 12px; color: var(--blue-c, #3d6bff); margin-bottom: 8px; font-weight: 600; }
        .doc .head h1 { font-family: var(--font-prompt, sans-serif); font-weight: 600; font-size: clamp(24px, 3vw, 34px); display: flex; align-items: center; gap: 10px; color: var(--ink, #10152b); margin-bottom: 8px; }
        .doc .head h1::before { content: '</>'; font-family: var(--font-mono, monospace); font-size: 0.6em; color: var(--violet-c, #8b5cf6); }
        .doc .head p { color: var(--muted, rgba(16,21,43,0.58)); font-size: 14px; max-width: 500px; line-height: 1.5; }
        
        .new-btn { padding: 12px 20px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, var(--blue-c, #3d6bff), var(--violet-c, #8b5cf6)); box-shadow: 0 10px 26px rgba(61,107,255,0.3); white-space: nowrap; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .new-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(61,107,255,0.4); }

        .doc .body { padding: 32px; }
        
        @media(max-width: 700px) {
          .doc .head, .doc .body { padding-left: 20px; padding-right: 20px; }
        }
      `}} />
      
      <div className="evaluation-page max-w-[1200px] mx-auto" style={{ padding: '50px 0 90px' }}>
        <Reveal>
          <div className="glass-panel doc" style={{ padding: 0, overflow: 'hidden' }}>
            
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">evaluation_forms.pdf</span>
              <span className="tag">ภาคเรียนที่ 1/2569</span>
            </div>

            <div className="head">
              <div>
                <div className="eyebrow">// evaluation.summary</div>
                <h1>แบบประเมิน</h1>
                <p>สรุปผลการประเมินการฝึกปฏิบัติการสอนจากครูพี่เลี้ยงและอาจารย์นิเทศก์</p>
              </div>
              <a className="new-btn" href={pdfUrl} target="_blank" rel="noreferrer">+ เปิดใน Google Drive</a>
            </div>

            <div className="body">
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
                    title="Evaluation Form PDF"
                  ></iframe>
                </div>
              </div>
              
            </div>
            
          </div>
        </Reveal>
      </div>
    </>
  );
}


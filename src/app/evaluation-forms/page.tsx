"use client"

import React from 'react';
import { evaluationDocuments } from "@/data/siteData";
import { Reveal } from '@/components/Reveal';
import { DocumentPreview } from '@/components/DocumentPreview';

export default function EvaluationFormsPage() {
  const doc = evaluationDocuments[0];
  const rawPdfUrl = doc?.pdfUrl || "";
  const openDriveUrl = rawPdfUrl.includes("/preview") ? rawPdfUrl.replace("/preview", "/view") : rawPdfUrl;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      {/* 1. Header Card */}
      <Reveal>
        <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 46px rgba(61,107,255,0.1)', marginBottom: '24px' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">evaluation_summary.config</span>
            <span className="tag">ภาคเรียนที่ 1/2569</span>
          </div>

          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="eyebrow" style={{ fontFamily: 'var(--font-prompt), sans-serif', fontSize: '13px', color: 'var(--blue-c)', marginBottom: '6px', fontWeight: 600 }}>
                  // evaluation.summary
                </div>
                <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 3vw, 32px)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--ink)' }}>
                  <span style={{ fontSize: '0.75em', color: 'var(--violet-c)' }}>&lt;/&gt;</span>
                  แบบประเมินการฝึกสอน
                </h1>
                <p style={{ color: 'var(--ink)', opacity: 0.85, marginTop: '6px', fontSize: '15px' }}>
                  สรุปผลการประเมินการฝึกปฏิบัติการสอนจากครูพี่เลี้ยงและอาจารย์นิเทศก์ ประจำภาคเรียนที่ 1/2569
                </p>
              </div>

              {/* Direct Drive Button */}
              <a 
                href={openDriveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
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
        </div>
      </Reveal>

      {/* 2. On-Demand Document Preview Component */}
      <Reveal delay={150}>
        <DocumentPreview
          title="แบบประเมินผลการฝึกปฏิบัติการสอนในสถานศึกษา"
          subtitle="ภาคเรียนที่ 1 ปีการศึกษา 2569"
          badge="แบบประเมิน"
          details="สรุปผลการประเมินจากครูพี่เลี้ยงและอาจารย์นิเทศก์ วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี"
          pdfUrl={rawPdfUrl}
          driveUrl={openDriveUrl}
          filename="evaluation_forms_semester_1.pdf"
        />
      </Reveal>
    </div>
  );
}

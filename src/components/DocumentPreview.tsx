"use client"

import React, { useState } from "react"

export interface DocumentPreviewProps {
  title: string
  subtitle?: string
  badge?: string
  details?: string
  pdfUrl: string
  driveUrl?: string
  filename?: string
  defaultOpen?: boolean
  className?: string
}

export function DocumentPreview({
  title,
  subtitle,
  badge,
  details,
  pdfUrl,
  driveUrl,
  filename,
  defaultOpen = false,
  className = ""
}: DocumentPreviewProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // Ensure embed URL ends in /preview
  const embedUrl = pdfUrl.includes("/view")
    ? pdfUrl.replace(/\/view(\?.*)?$/, "/preview")
    : pdfUrl

  const openDriveUrl = driveUrl || (pdfUrl.includes("/preview") ? pdfUrl.replace("/preview", "/view") : pdfUrl)

  return (
    <div 
      className={`doc-card ${className}`} 
      style={{ 
        position: 'relative',
        borderRadius: '20px', 
        background: 'var(--panel-strong-c)', 
        border: '1px solid var(--border-strong-c)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 12px 36px rgba(61,107,255,0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Optional Minimal Filename Header */}
      {filename && (
        <div 
          className="chrome" 
          style={{ 
            padding: '10px 16px', 
            background: 'rgba(255,255,255,0.4)', 
            borderBottom: '1px solid var(--border-c)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span className="r"></span>
          <span className="y"></span>
          <span className="g"></span>
          <span className="fname" style={{ fontSize: '12.5px', color: 'var(--muted2-c)' }}>{filename}</span>
          {badge && <span className="tag" style={{ fontSize: '11px', padding: '3px 10px' }}>{badge}</span>}
        </div>
      )}

      {/* Main Info & Action Header */}
      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            {badge && !filename && (
              <span 
                style={{ 
                  display: 'inline-block',
                  fontSize: '12px', 
                  fontWeight: 700, 
                  color: 'var(--blue-c)', 
                  background: 'rgba(61,107,255,0.1)', 
                  padding: '4px 12px', 
                  borderRadius: '999px', 
                  border: '1px solid rgba(61,107,255,0.2)',
                  marginBottom: '8px'
                }}
              >
                {badge}
              </span>
            )}
            
            <h3 
              style={{ 
                fontFamily: 'var(--font-prompt), sans-serif', 
                fontSize: 'clamp(17px, 2.2vw, 20px)', 
                fontWeight: 700, 
                color: 'var(--ink)', 
                lineHeight: 1.35,
                margin: 0,
                wordBreak: 'break-word',
                overflowWrap: 'anywhere'
              }}
            >
              {title}
            </h3>

            {subtitle && (
              <div style={{ fontSize: '14px', color: 'var(--blue-c)', fontWeight: 600, marginTop: '4px' }}>
                {subtitle}
              </div>
            )}

            {details && (
              <p style={{ fontSize: '13.5px', color: 'var(--muted-c)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                {details}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', width: 'auto' }}>
            {/* Secondary Button: Toggle In-Page Preview */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 18px',
                minHeight: '44px',
                borderRadius: '999px',
                background: isOpen ? 'rgba(61,107,255,0.14)' : 'rgba(255,255,255,0.9)',
                border: '1px solid var(--border-strong-c)',
                color: isOpen ? 'var(--blue-c)' : 'var(--ink)',
                fontFamily: 'var(--font-prompt), sans-serif',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flex: '1 1 auto'
              }}
            >
              {isOpen ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  ปิดตัวอย่าง
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  ดูตัวอย่างในหน้านี้
                </>
              )}
            </button>

            {/* Primary Button: Open in Google Drive */}
            <a
              href={openDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 20px',
                minHeight: '44px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, var(--blue-c), var(--violet-c))',
                color: '#ffffff',
                fontFamily: 'var(--font-prompt), sans-serif',
                fontSize: '13.5px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(61,107,255,0.25)',
                transition: 'all 0.2s ease',
                flex: '1 1 auto'
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
        </div>

        {/* Embedded Iframe (Only mounted when user explicitly requests preview) */}
        {isOpen && (
          <div 
            style={{ 
              marginTop: '18px', 
              paddingTop: '16px',
              borderTop: '1px solid var(--border-c)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted-c)', fontWeight: 500 }}>
                ตัวอย่างไฟล์เอกสาร PDF
              </span>
              <a 
                href={openDriveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontSize: '12.5px', color: 'var(--blue-c)', fontWeight: 600, textDecoration: 'none' }}
              >
                เปิดเต็มหน้าจอใน Google Drive ↗
              </a>
            </div>

            <div className="doc-viewer-container">
              <iframe
                src={embedUrl}
                loading="lazy"
                style={{ width: '100%', height: '100%', border: 0 }}
                allow="autoplay"
                title={title}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

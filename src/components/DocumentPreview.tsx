"use client"

import React from "react"
import Image from "next/image"

export interface DocumentPreviewProps {
  title: string
  subtitle?: string
  badge?: string
  details?: string
  pdfUrl?: string
  driveUrl?: string
  imageUrl?: string
  filename?: string
  className?: string
}

export function DocumentPreview({
  title,
  subtitle,
  badge,
  details,
  pdfUrl = "",
  driveUrl,
  imageUrl,
  filename,
  className = ""
}: DocumentPreviewProps) {
  // Ensure embed URL ends in /preview
  const embedUrl = pdfUrl && pdfUrl.includes("/view")
    ? pdfUrl.replace(/\/view(\?.*)?$/, "/preview")
    : pdfUrl

  const openDriveUrl = driveUrl || (pdfUrl.includes("/preview") ? pdfUrl.replace("/preview", "/view") : pdfUrl)

  return (
    <div 
      className={`doc-card ${className}`} 
      style={{ 
        position: 'relative',
        borderRadius: '24px', 
        background: 'var(--panel-strong-c)', 
        border: '1px solid var(--border-strong-c)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 16px 46px rgba(61,107,255,0.08)',
        overflow: 'hidden',
        marginBottom: '24px'
      }}
    >
      {/* Chrome Header */}
      {filename && (
        <div 
          className="chrome" 
          style={{ 
            padding: '12px 18px', 
            background: 'rgba(255,255,255,0.5)', 
            borderBottom: '1px solid var(--border-c)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span className="r"></span>
          <span className="y"></span>
          <span className="g"></span>
          <span className="fname" style={{ fontSize: '13px', color: 'var(--muted2-c)' }}>{filename}</span>
          {badge && <span className="tag" style={{ fontSize: '11px', padding: '4px 12px' }}>{badge}</span>}
        </div>
      )}

      {/* Main Info & Action Header */}
      <div style={{ padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3.5vw, 28px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div style={{ flex: '1 1 260px', minWidth: 0 }}>
            {badge && !filename && (
              <span 
                style={{ 
                  display: 'inline-block',
                  fontSize: '11.5px', 
                  fontWeight: 700, 
                  color: 'var(--blue-c)', 
                  background: 'rgba(61,107,255,0.1)', 
                  padding: '3px 10px', 
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
                fontSize: 'clamp(17px, 2.2vw, 22px)', 
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
              <div style={{ fontSize: '13.5px', color: 'var(--blue-c)', fontWeight: 600, marginTop: '4px' }}>
                {subtitle}
              </div>
            )}

            {details && (
              <p style={{ fontSize: '13px', color: 'var(--muted-c)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                {details}
              </p>
            )}
          </div>


        </div>
      </div>

      {/* Direct Preview (Flush to Edges) */}
      <div 
        style={{ 
          borderTop: '1px solid var(--border-strong-c)',
          background: '#ffffff',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {imageUrl ? (
          <div style={{ position: 'relative', width: '100%', minHeight: '300px' }}>
            <Image 
              src={imageUrl} 
              alt={title} 
              width={1200}
              height={850}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        ) : embedUrl ? (
          <div className="doc-viewer-container" style={{ margin: 0, borderRadius: 0, maxWidth: '100%', border: 'none', boxShadow: 'none' }}>
            <iframe
              src={embedUrl}
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              allow="autoplay"
              title={title}
            ></iframe>
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--muted-c)' }}>
            ยังไม่มีไฟล์เอกสาร
          </div>
        )}
      </div>
    </div>
  )
}

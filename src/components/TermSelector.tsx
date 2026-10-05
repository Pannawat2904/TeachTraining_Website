"use client";
import Link from 'next/link';

export function TermSelector({ currentTerm, basePath }: { currentTerm: string, basePath: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '24px', 
      background: 'var(--panel-c, rgba(255,255,255,0.7))', 
      padding: '6px', 
      borderRadius: '16px', 
      width: 'fit-content', 
      border: '1px solid var(--border-strong-c)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <Link 
        href={`${basePath}/semester-1`}
        style={{
          padding: '10px 24px',
          borderRadius: '12px',
          fontSize: '14.5px',
          fontFamily: 'var(--font-prompt), sans-serif',
          fontWeight: currentTerm === 'semester-1' ? 600 : 500,
          background: currentTerm === 'semester-1' ? 'linear-gradient(135deg, var(--blue-c), #5b82ff)' : 'transparent',
          color: currentTerm === 'semester-1' ? '#fff' : 'var(--muted-c)',
          textDecoration: 'none',
          transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          boxShadow: currentTerm === 'semester-1' ? '0 4px 14px rgba(61,107,255,0.3)' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: currentTerm === 'semester-1' ? '#fff' : 'transparent',
          transition: 'all 0.2s ease'
        }}></span>
        ภาคเรียนที่ 1/2569
      </Link>
      <Link 
        href={`${basePath}/semester-2`}
        style={{
          padding: '10px 24px',
          borderRadius: '12px',
          fontSize: '14.5px',
          fontFamily: 'var(--font-prompt), sans-serif',
          fontWeight: currentTerm === 'semester-2' ? 600 : 500,
          background: currentTerm === 'semester-2' ? 'linear-gradient(135deg, var(--violet-c), #9f75ff)' : 'transparent',
          color: currentTerm === 'semester-2' ? '#fff' : 'var(--muted-c)',
          textDecoration: 'none',
          transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          boxShadow: currentTerm === 'semester-2' ? '0 4px 14px rgba(139,92,246,0.3)' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span style={{ 
          width: '6px', 
          height: '6px', 
          borderRadius: '50%', 
          background: currentTerm === 'semester-2' ? '#fff' : 'transparent',
          transition: 'all 0.2s ease'
        }}></span>
        ภาคเรียนที่ 2/2569
      </Link>
    </div>
  );
}

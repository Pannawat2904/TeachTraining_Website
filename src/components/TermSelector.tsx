"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export function TermSelector({ currentTerm, basePath }: { currentTerm: string, basePath: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      marginBottom: '32px', 
      background: 'rgba(255, 255, 255, 0.4)', 
      padding: '6px', 
      borderRadius: '20px', 
      width: 'fit-content', 
      border: '1px solid rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
      position: 'relative'
    }}>
      <Link 
        href={`${basePath}/semester-1`}
        style={{
          position: 'relative',
          padding: '12px 28px',
          borderRadius: '16px',
          fontSize: '15px',
          fontFamily: 'var(--font-prompt), sans-serif',
          fontWeight: currentTerm === 'semester-1' ? 600 : 500,
          color: currentTerm === 'semester-1' ? 'var(--blue-c)' : 'var(--ink)',
          textDecoration: 'none',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'color 0.3s ease'
        }}
      >
        {currentTerm === 'semester-1' && (
          <motion.div
            layoutId="term-selector-bg"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
              zIndex: -1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: currentTerm === 'semester-1' ? 'var(--blue-c)' : 'transparent',
          transition: 'all 0.3s ease',
          boxShadow: currentTerm === 'semester-1' ? '0 0 10px var(--blue-c)' : 'none'
        }}></span>
        ภาคเรียนที่ 1/2569
      </Link>
      
      <Link 
        href={`${basePath}/semester-2`}
        style={{
          position: 'relative',
          padding: '12px 28px',
          borderRadius: '16px',
          fontSize: '15px',
          fontFamily: 'var(--font-prompt), sans-serif',
          fontWeight: currentTerm === 'semester-2' ? 600 : 500,
          color: currentTerm === 'semester-2' ? 'var(--violet-c)' : 'var(--ink)',
          textDecoration: 'none',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'color 0.3s ease'
        }}
      >
        {currentTerm === 'semester-2' && (
          <motion.div
            layoutId="term-selector-bg"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)',
              zIndex: -1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        )}
        <span style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: currentTerm === 'semester-2' ? 'var(--violet-c)' : 'transparent',
          transition: 'all 0.3s ease',
          boxShadow: currentTerm === 'semester-2' ? '0 0 10px var(--violet-c)' : 'none'
        }}></span>
        ภาคเรียนที่ 2/2569
      </Link>
    </div>
  );
}

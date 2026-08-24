"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Menu, 
  X, 
  Home, 
  Building2, 
  Calendar, 
  BookOpen, 
  ClipboardList, 
  Images, 
  FileText, 
  Award 
} from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "หน้าแรก", href: "/", icon: Home },
    { name: "สถานศึกษา", href: "/practicum-site", icon: Building2 },
    { name: "ตารางสอน", href: "/schedule", icon: Calendar },
    { name: "แผนการสอน", href: "/lesson-plans", icon: BookOpen },
    { name: "บันทึกการฝึกสอน", href: "/teaching-log", icon: ClipboardList },
    { name: "กิจกรรม", href: "/activities", icon: Images },
    { name: "วิจัยในชั้นเรียน", href: "/classroom-research", icon: FileText },
    { name: "แบบการประเมิน", href: "/evaluation-forms", icon: Award },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <nav className="pill">
        <Link href="/" className="brand" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(61,107,255,0.2)', boxShadow: '0 2px 8px rgba(61,107,255,0.15)', background: '#ffffff' }}>
            <Image 
              src="/images/others/logo_comedu.jpeg" 
              alt="ภาควิชาคอมพิวเตอร์ศึกษา" 
              width={28} 
              height={28} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              priority
            />
          </div>
          <span className="brand-text hidden sm:inline">รายงานฝึกปฏิบัติการสอน</span>
          <span className="brand-text sm:hidden">รายงานฝึกสอน</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
              style={{ whiteSpace: 'nowrap', fontSize: '15px' }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Hamburger Button */}
        <div className="lg:hidden flex items-center ml-auto">
          <button 
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--ink)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div 
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(16, 21, 43, 0.45)',
          zIndex: 90,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}
      />

      {/* Mobile Drawer (Pure CSS Transitions, zero framer-motion lockup) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(82vw, 320px)',
          background: 'var(--panel-strong-c, #ffffff)',
          borderLeft: '1px solid var(--border-strong-c)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
          overflowY: 'auto'
        }}
      >
        {/* Drawer Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '18px 20px', 
            borderBottom: '1px solid var(--border-c)',
            background: 'rgba(255, 255, 255, 0.6)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(61,107,255,0.2)', background: '#ffffff' }}>
              <Image 
                src="/images/others/logo_comedu.jpeg" 
                alt="ComEdu Logo" 
                width={24} 
                height={24} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)' }}>เมนูนำทาง</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            aria-label="Close navigation menu"
            style={{ 
              background: 'rgba(16, 21, 43, 0.06)', 
              border: 'none', 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer',
              color: 'var(--ink)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((link) => {
            const active = isActive(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px', 
                  borderRadius: '12px',
                  textDecoration: 'none', 
                  color: active ? 'var(--blue-c)' : 'var(--ink)', 
                  fontWeight: active ? 700 : 500,
                  fontSize: '15px',
                  background: active ? 'rgba(61, 107, 255, 0.08)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={18} style={{ color: active ? 'var(--blue-c)' : 'var(--muted-c)' }} />
                  <span>{link.name}</span>
                </div>
                {active && (
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue-c)' }}></span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Drawer Footer Info */}
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--border-c)', fontSize: '12px', color: 'var(--muted-c)' }}>
          <div>รายงานผลการฝึกปฏิบัติการสอน 2569</div>
          <div style={{ marginTop: '2px', color: 'var(--blue-c)', fontWeight: 600 }}>วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี</div>
        </div>
      </div>
    </>
  )
}

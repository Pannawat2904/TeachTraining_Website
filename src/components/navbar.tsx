"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "สถานศึกษา", href: "/practicum-site" },
    { name: "ตารางสอน", href: "/schedule" },
    { name: "แผนการสอน", href: "/lesson-plans" },
    { name: "บันทึกการฝึกสอน", href: "/teaching-log" },
    { name: "กิจกรรม", href: "/activities" },
    { name: "วิจัยในชั้นเรียน", href: "/classroom-research" },
    { name: "แบบการประเมิน", href: "/evaluation-forms" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className="pill">
        <Link href="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="dot"></span>
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

        {/* Mobile Menu Button (Accessible 44x44px touch target) */}
        <div className="lg:hidden flex items-center ml-auto">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
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
              borderRadius: '50%',
              padding: 0
            }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[40]" 
              style={{ background: 'rgba(16,21,43,0.3)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsOpen(false)}
            ></motion.div>
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-[50] w-full max-w-xs flex flex-col overflow-y-auto"
              style={{ background: 'var(--bg2)', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border-c)' }}>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>เมนู</span>
                <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(16,21,43,0.05)', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                  <X size={20} color="var(--ink)" />
                </button>
              </div>
              <div className="p-6 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    style={{ 
                      display: 'block', 
                      padding: '10px 0', 
                      textDecoration: 'none', 
                      color: isActive(link.href) ? 'var(--blue-c)' : 'var(--ink)', 
                      fontWeight: isActive(link.href) ? 600 : 500,
                      fontSize: '15px'
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface StudentInfo {
  name: string
  studentId: string
  major: string
  department: string
  faculty: string
  university: string
  profileImageUrl?: string
}

export function IdCard({ student }: { student: StudentInfo }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [imgSrc, setImgSrc] = useState(student.profileImageUrl || "/images/others/Profile.JPG")

  // 3D Tilt logic for Card
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let ticking = false
    const onMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          card.style.transform = `rotateY(${px * 3}deg) rotateX(${-py * 3}deg)`
          ticking = false
        })
        ticking = true
      }
    }
    const onMouseLeave = () => {
      card.style.transform = 'rotateY(0) rotateX(0)'
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div className="id-card" ref={cardRef}>
      <div className="chrome">
        <span className="r"></span><span className="y"></span><span className="g"></span>
        <span className="fname">student_profile.json</span>
        <span className="tag">รายงานฝึกปฏิบัติการสอน 2569</span>
      </div>
      <div className="body">
        <div 
          style={{ 
            position: 'relative', 
            width: 'clamp(120px, 35vw, 140px)', 
            height: 'clamp(152px, 44vw, 178px)', 
            flexShrink: 0, 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-strong-c)', 
            boxShadow: '0 14px 34px rgba(16,21,43,0.18)' 
          }}
        >
          <Image 
            src={imgSrc}
            alt="รูปนักศึกษา" 
            fill
            sizes="(max-width: 480px) 130px, 148px"
            style={{ objectFit: 'cover' }}
            priority
            onError={() => {
              setImgSrc("https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=400&auto=format&fit=crop")
            }}
          />
        </div>
        <div className="id-info">
          <div className="eyebrow"><span className="key">&lt;</span>รายงานการฝึกปฏิบัติการสอน<span className="key">/&gt;</span></div>
          <h1>{student.name}</h1>
          <div className="id-num"><span className="k">id:</span> {student.studentId}</div>
          <p>
            {student.major}<br/>
            {student.department} {student.faculty}<br/>
            <span style={{ display: 'inline-block', overflowWrap: 'anywhere', wordBreak: 'normal' }}>{student.university}</span>
          </p>
        </div>
      </div>
      <div className="bar"></div>
    </div>
  )
}

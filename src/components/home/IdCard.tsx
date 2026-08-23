"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { 
  GraduationCap, 
  Laptop, 
  Building2, 
  School, 
  MapPin 
} from "lucide-react"

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
  const [imgSrc, setImgSrc] = useState(student.profileImageUrl || "/images/others/profile_author2.jpg")

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
          card.style.transform = `rotateY(${px * 2}deg) rotateX(${-py * 2}deg)`
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

  // Clean prefix labels for clear value scanning
  const cleanMajor = student.major.replace(/^สาขาวิชา\s*|^สาขา\s*/, "") || student.major
  const cleanDepartment = student.department.replace(/^ภาควิชา\s*/, "") || student.department
  const cleanFaculty = student.faculty.replace(/^คณะ\s*/, "") || student.faculty
  const cleanUniversity = student.university

  return (
    <div className="id-card" ref={cardRef}>
      <div className="chrome">
        <span className="r"></span>
        <span className="y"></span>
        <span className="g"></span>
        <span className="fname">student_profile.json</span>
        <span className="tag">รายงานฝึกปฏิบัติการสอน 2569</span>
      </div>

      <div className="id-card-body body">
        {/* Left Column: Natural 3:4 Portrait Photo & Badge */}
        <div className="id-photo-col">
          <div className="id-photo-frame">
            <Image 
              src={imgSrc}
              alt={student.name} 
              fill
              sizes="(max-width: 768px) 160px, 205px"
              style={{ objectFit: 'cover' }}
              priority
              onError={() => {
                setImgSrc("https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=400&auto=format&fit=crop")
              }}
            />
          </div>
          <div className="id-badge">
            STUDENT TEACHER · 2569
          </div>
        </div>

        {/* Right Column: Info Dashboard */}
        <div className="id-info-col">
          {/* Header Info */}
          <div className="id-header-block">
            <div className="id-eyebrow">
              <span className="key">&lt;/&gt;</span> ข้อมูลนักศึกษาฝึกประสบการณ์วิชาชีพ
            </div>

            <h2 className="id-title-name">
              {student.name}
            </h2>

            <div className="id-chip-row">
              <div className="id-chip">
                <span className="chip-label">ID:</span>
                <span className="chip-val">{student.studentId}</span>
              </div>
              <div className="id-chip-status">
                <span className="dot"></span>
                <span>กำลังฝึกปฏิบัติการสอน</span>
              </div>
            </div>
          </div>

          <hr className="id-divider" />

          {/* 2x2 Bento Education Cards (Symmetric & Compact) */}
          <div className="id-bento-grid">
            <div className="bento-item">
              <div className="bento-icon">
                <Laptop size={15} />
              </div>
              <div className="bento-text">
                <span className="bento-label">สาขาวิชา</span>
                <span className="bento-val">{cleanMajor}</span>
              </div>
            </div>

            <div className="bento-item">
              <div className="bento-icon">
                <GraduationCap size={15} />
              </div>
              <div className="bento-text">
                <span className="bento-label">ภาควิชา</span>
                <span className="bento-val">{cleanDepartment}</span>
              </div>
            </div>

            <div className="bento-item">
              <div className="bento-icon">
                <Building2 size={15} />
              </div>
              <div className="bento-text">
                <span className="bento-label">คณะ</span>
                <span className="bento-val">{cleanFaculty}</span>
              </div>
            </div>

            <div className="bento-item">
              <div className="bento-icon">
                <School size={15} />
              </div>
              <div className="bento-text">
                <span className="bento-label">สถาบัน</span>
                <span className="bento-val">{cleanUniversity}</span>
              </div>
            </div>
          </div>

          {/* Practicum Site Footer Banner */}
          <div className="id-practicum-meta">
            <div className="pm-left">
              <div className="pm-icon">
                <MapPin size={15} />
              </div>
              <div className="pm-text">
                <span className="pm-label">สถานที่ฝึกปฏิบัติการสอน</span>
                <span className="pm-val">วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี</span>
              </div>
            </div>
            <div className="pm-badge">
              แผนกธุรกิจดิจิทัลฯ
            </div>
          </div>
        </div>
      </div>

      <div className="bar"></div>
    </div>
  )
}

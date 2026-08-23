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

      <div className="id-card-body">
        {/* Left Column: Photo & Badge */}
        <div className="id-photo-col">
          <div className="id-photo-frame">
            <Image 
              src={imgSrc}
              alt={student.name} 
              fill
              sizes="(max-width: 768px) 160px, 220px"
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
          <div className="id-eyebrow">
            <span className="key">&lt;/&gt;</span> รายงานการฝึกปฏิบัติการสอน
          </div>

          <h1 className="id-title-name">
            {student.name}
          </h1>

          <div className="id-chip">
            <span className="chip-label">ID:</span>
            <span className="chip-val">{student.studentId}</span>
          </div>

          <hr className="id-divider" />

          <dl className="id-meta-grid">
            <div className="meta-item">
              <dt className="meta-label">สาขาวิชา</dt>
              <dd className="meta-value">{cleanMajor}</dd>
            </div>
            <div className="meta-item">
              <dt className="meta-label">ภาควิชา</dt>
              <dd className="meta-value">{cleanDepartment}</dd>
            </div>
            <div className="meta-item">
              <dt className="meta-label">คณะ</dt>
              <dd className="meta-value">{cleanFaculty}</dd>
            </div>
            <div className="meta-item meta-item-full">
              <dt className="meta-label">มหาวิทยาลัย</dt>
              <dd className="meta-value meta-uni">{cleanUniversity}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bar"></div>
    </div>
  )
}

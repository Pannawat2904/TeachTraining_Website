"use client"

import { siteData, activities } from "@/data/siteData"
import Link from "next/link"
import { useRef, useEffect } from "react"

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)
  const reelRef = useRef<HTMLDivElement>(null)

  // Drag scroll logic for gallery reel
  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      reel.classList.add('active')
      startX = e.pageX - reel.offsetLeft
      scrollLeft = reel.scrollLeft
    }
    const onMouseLeave = () => {
      isDown = false
      reel.classList.remove('active')
    }
    const onMouseUp = () => {
      isDown = false
      reel.classList.remove('active')
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - reel.offsetLeft
      const walk = (x - startX) * 2
      reel.scrollLeft = scrollLeft - walk
    }

    reel.addEventListener('mousedown', onMouseDown)
    reel.addEventListener('mouseleave', onMouseLeave)
    reel.addEventListener('mouseup', onMouseUp)
    reel.addEventListener('mousemove', onMouseMove)

    return () => {
      reel.removeEventListener('mousedown', onMouseDown)
      reel.removeEventListener('mouseleave', onMouseLeave)
      reel.removeEventListener('mouseup', onMouseUp)
      reel.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

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
    <div id="site">
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero">
        <div className="wrap hero-grid">
          {/* Main IDE Profile Card */}
          <div className="id-card" ref={cardRef}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">student_profile.json</span>
              <span className="tag">รายงานฝึกปฏิบัติการสอน 2569</span>
            </div>
            <div className="body">
              <img 
                className="id-photo" 
                src="/images/others/Profile.JPG" 
                alt="รูปนักศึกษา" 
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=400&auto=format&fit=crop" }}
              />
              <div className="id-info">
                <div className="eyebrow"><span className="key">&lt;</span>รายงานการฝึกปฏิบัติการสอน<span className="key">/&gt;</span></div>
                <h1>{siteData.student.name}</h1>
                <div className="id-num"><span className="k">id:</span> {siteData.student.studentId}</div>
                <p>
                  {siteData.student.major}<br/>
                  {siteData.student.department} {siteData.student.faculty}<br/>
                  <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{siteData.student.university}</span>
                </p>
              </div>
            </div>
            <div className="bar"></div>
          </div>

          {/* Right Side Cards */}
          <div className="side-stack">
            {/* Quick Menu IDE Card */}
            <div className="glass-panel quick-menu" style={{ overflow: 'hidden', padding: 0 }}>
              <div className="chrome">
                <span className="r"></span><span className="y"></span><span className="g"></span>
                <span className="fname">quick_actions.json</span>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <h3>เมนูด่วน</h3>
                <Link className="quick-btn" href="/practicum-site">ข้อมูลสถานศึกษา <span>›</span></Link>
                <Link className="quick-btn" href="/teaching-log">บันทึกการฝึกสอน <span>›</span></Link>
              </div>
            </div>

            {/* Subjects Taught IDE Card */}
            <div className="glass-panel subjects" style={{ overflow: 'hidden', padding: 0 }}>
              <div className="chrome">
                <span className="r"></span><span className="y"></span><span className="g"></span>
                <span className="fname">courses_list.ts</span>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <h3>รายวิชาที่สอน</h3>
                {siteData.practicum.courses?.map((course, i) => (
                  <div className="subj-row" key={i}>
                    <div>
                      <div className="subj-code">{course.courseCode}</div>
                      <div className="subj-name">{course.courseName}</div>
                    </div>
                    <div className="subj-status">ตามตาราง</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFO ROW SECTION */}
      <section className="info-row" id="info">
        <div className="wrap info-grid">
          {/* Practicum Site Card */}
          <div className="glass-panel info-card" style={{ overflow: 'hidden', padding: 0 }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">school_location.config</span>
            </div>
            <div style={{ padding: '22px 24px' }}>
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"></path>
                  <circle cx="12" cy="10" r="2.5"></circle>
                </svg>
              </div>
              <h4>สถานที่ฝึกปฏิบัติการสอน</h4>
              <div className="role">{siteData.practicum.schoolName}</div>
              <p>{siteData.practicum.department}</p>
              <div className="hours">{siteData.practicum.teachingDays}</div>
            </div>
          </div>

          {/* Mentor Card */}
          <div className="glass-panel info-card violet" style={{ overflow: 'hidden', padding: 0 }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">mentor_profile.json</span>
            </div>
            <div style={{ padding: '22px 24px' }}>
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M8.5 13 7 22l5-3 5 3-1.5-9"></path>
                </svg>
              </div>
              <h4>ครูพี่เลี้ยง</h4>
              <div className="role" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                {siteData.mentor.name.split(',').map((name, idx) => (
                  <div key={idx}>{name.trim()}</div>
                ))}
              </div>
              <p style={{ marginTop: '8px' }}>{siteData.mentor.department}</p>
            </div>
          </div>

          {/* Supervisor Card */}
          <div className="glass-panel info-card amber" style={{ overflow: 'hidden', padding: 0 }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">supervisor_profile.json</span>
            </div>
            <div style={{ padding: '22px 24px' }}>
              <div className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M8.5 13 7 22l5-3 5 3-1.5-9"></path>
                </svg>
              </div>
              <h4>อาจารย์นิเทศก์</h4>
              <div className="role" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                <div>{siteData.supervisor.name}</div>
              </div>
              <p style={{ marginTop: '8px' }}>{siteData.supervisor.department}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GALLERY SECTION */}
      <section className="gallery" id="gallery">
        <div className="head">
          <h2>ประมวลภาพกิจกรรมล่าสุด</h2>
          <Link className="see-all" href="/activities">ดูทั้งหมด ›</Link>
        </div>
        <div className="reel" ref={reelRef}>
          {activities.semester1[0]?.images?.slice(0, 4).map((img, i) => (
            <div className={`reel-item ${i % 2 !== 0 ? 'small' : ''}`} key={i}>
              <img src={img} alt="Activity" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop" }} />
              <div className="caption">
                <div className="d">NEW</div>
                <div className="t">{activities.semester1[0].title}</div>
              </div>
            </div>
          ))}
          <div className="reel-item">
            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop" alt="" />
            <div className="caption"><div className="d">ARCHIVE</div><div className="t">สอนวิชาโปรแกรมมัลติมีเดีย</div></div>
          </div>
          <div className="reel-item small">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop" alt="" />
            <div className="caption"><div className="d">ARCHIVE</div><div className="t">นิเทศการสอน</div></div>
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="map-sec">
        <div className="wrap">
          <div className="glass-panel map-frame" style={{ overflow: 'hidden', padding: 0 }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">location_map.embed</span>
            </div>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
              <iframe
                src={siteData.practicum.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location Map"
              ></iframe>
              <div className="overlay-card">
                <h5>{siteData.practicum.schoolName}</h5>
                <p>สุราษฎร์ธานี</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

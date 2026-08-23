import { siteData, activities } from "@/data/siteData"
import Link from "next/link"
import { IdCard } from "@/components/home/IdCard"
import { GalleryReel } from "@/components/home/GalleryReel"
import { Reveal } from "@/components/Reveal"

export default function Home() {
  const activityImages = activities.semester1[0]?.images?.slice(0, 4) || []
  const activityTitle = activities.semester1[0]?.title || "กิจกรรมการสอน"

  return (
    <div id="site">
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero">
        <Reveal>
          <div className="wrap hero-grid">
            {/* Main IDE Profile Card (Client Component with 3D Tilt) */}
            <IdCard student={siteData.student} />

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
        </Reveal>
      </section>

      {/* 2. INFO ROW SECTION */}
      <section className="info-row" id="info">
        <Reveal>
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
        </Reveal>
      </section>

      {/* 3. GALLERY SECTION (Client Component with Drag Scroll) */}
      <section className="gallery" id="gallery">
        <Reveal>
          <div className="head">
            <h2>ประมวลภาพกิจกรรมล่าสุด</h2>
            <Link className="see-all" href="/activities">ดูทั้งหมด ›</Link>
          </div>
          <GalleryReel initialImages={activityImages} activityTitle={activityTitle} />
        </Reveal>
      </section>

      {/* 4. MAP SECTION */}
      <section className="map-sec">
        <Reveal>
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
        </Reveal>
      </section>
    </div>
  )
}


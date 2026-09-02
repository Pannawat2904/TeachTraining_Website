import { siteData, activities, supervisions, teachingLogs } from "@/data/siteData"
import fs from "fs"
import path from "path"
import Link from "next/link"
import { IdCard } from "@/components/home/IdCard"
import { GalleryReel } from "@/components/home/GalleryReel"
import { Reveal } from "@/components/Reveal"
import { 
  Sparkles, 
  BookOpen, 
  School, 
  UserCheck, 
  GraduationCap, 
  Images, 
  MapPin, 
  Building2,
  Clock
} from "lucide-react"

export default function Home() {
  // Gather images for gallery from various sources
  const galleryItems: { src: string; title: string; badge: string; alt: string }[] = []

  // 1. From activities in JSON file
  try {
    const activitiesPath = path.join(process.cwd(), 'public', 'data', 'activities.json')
    const activitiesData = JSON.parse(fs.readFileSync(activitiesPath, 'utf8'))
    activitiesData.forEach((act: any) => {
      const img = Array.isArray(act.img) && act.img.length > 0 ? act.img[0] : act.img
      if (img) {
        galleryItems.push({
          src: img,
          title: act.title,
          badge: "ACTIVITY",
          alt: act.title
        })
      }
    })
  } catch (error) {
    console.error("Error loading activities for gallery:", error)
  }

  // 2. From supervisions
  supervisions.semester1.forEach(sup => {
    const img = (sup.images && sup.images.length > 0) ? sup.images[0] : sup.image
    if (img) {
      galleryItems.push({
        src: img,
        title: sup.title,
        badge: "ARCHIVE",
        alt: sup.title
      })
    }
  })
  
  // 3. From teaching logs
  teachingLogs.semester1.weeks.forEach(week => {
    if (week.images && week.images.length > 0) {
      const img = week.images[0]
      if (!galleryItems.some(item => item.src === img)) {
        galleryItems.push({
          src: img,
          title: `บันทึกการสอน ${week.title}`,
          badge: "LOG",
          alt: week.title
        })
      }
    }
  })

  // Shuffle array randomly to show variety
  for (let i = galleryItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [galleryItems[i], galleryItems[j]] = [galleryItems[j], galleryItems[i]];
  }

  const displayItems = galleryItems.slice(0, 8) // Limit to a reasonable number

  return (
    <div id="site">
      {/* 1. HERO SECTION */}
      <section className="hero" id="hero">
        <Reveal>
          <div className="wrap hero-grid">
            {/* Left Column Stack: Header Banner + Student Profile */}
            <div className="left-hero-stack" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
              {/* Top Title Card */}
              <div className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', padding: 0, background: 'var(--panel-strong-c)', border: '1px solid var(--border-strong-c)', backdropFilter: 'blur(10px)', boxShadow: '0 16px 40px rgba(61,107,255,0.08)' }}>
                <div className="chrome">
                  <span className="r"></span><span className="y"></span><span className="g"></span>
                  <span className="fname">teaching_practicum_report.config</span>
                  <span className="tag">ภาคเรียนที่ 1/2569</span>
                </div>
                <div style={{ padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '11.5px', fontWeight: 700, color: 'var(--blue-c)', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--violet-c)' }}>&lt;/&gt;</span> TEACHING PRACTICUM REPORT
                  </div>
                  <h1 style={{ fontFamily: 'var(--font-prompt), sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--ink)', margin: '0 0 4px 0', lineHeight: 1.25 }}>
                    รายงานฝึกปฏิบัติการสอน
                  </h1>
                  <p style={{ margin: '0 0 14px 0', fontSize: '13px', color: 'var(--muted-c)', fontWeight: 500, lineHeight: 1.45 }}>
                    คณะครุศาสตร์อุตสาหกรรม · มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '12px', borderTop: '1px dashed var(--border-c)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--ink)', fontWeight: 600 }}>
                      <Building2 size={15} style={{ color: 'var(--blue-c)' }} />
                      <span>วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี</span>
                    </div>
                    <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(61,107,255,0.08)', border: '1px solid rgba(61,107,255,0.2)', fontSize: '12px', fontWeight: 600, color: 'var(--blue-c)' }}>
                      แผนกธุรกิจดิจิทัลฯ
                    </span>
                  </div>
                </div>
              </div>

              {/* Main IDE Profile Card (Client Component with 3D Tilt) */}
              <IdCard student={siteData.student} />
            </div>

            {/* Right Side Cards */}
            <div className="side-stack">
              {/* Quick Menu Card */}
              <div className="glass-panel quick-menu" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="chrome">
                  <span className="r"></span><span className="y"></span><span className="g"></span>
                  <span className="fname">quick_actions.json</span>
                </div>
                <div style={{ padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 24px)' }}>
                  <h3>
                    <Sparkles className="w-4 h-4 text-blue-600" style={{ color: 'var(--blue-c)' }} />
                    เมนูด่วน
                  </h3>
                  <Link className="quick-btn" href="/practicum-site">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={17} style={{ color: 'var(--blue-c)' }} />
                      ข้อมูลสถานศึกษา
                    </span>
                    <span>›</span>
                  </Link>
                  <Link className="quick-btn" href="/teaching-log">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={17} style={{ color: 'var(--violet-c)' }} />
                      บันทึกการฝึกสอน
                    </span>
                    <span>›</span>
                  </Link>
                </div>
              </div>

              {/* Subjects Taught Card */}
              <div className="glass-panel subjects" style={{ overflow: 'hidden', padding: 0 }}>
                <div className="chrome">
                  <span className="r"></span><span className="y"></span><span className="g"></span>
                  <span className="fname">courses_list.ts</span>
                </div>
                <div style={{ padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 24px)' }}>
                  <h3>
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--violet-c)' }} />
                    รายวิชาที่สอน
                  </h3>
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
              <div style={{ padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 24px)' }}>
                <div className="icon-badge">
                  <School style={{ color: 'var(--blue-c)' }} />
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
              <div style={{ padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 24px)' }}>
                <div className="icon-badge">
                  <UserCheck style={{ color: 'var(--violet-c)' }} />
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
              <div style={{ padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 24px)' }}>
                <div className="icon-badge">
                  <GraduationCap style={{ color: '#d97706' }} />
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
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Images style={{ color: 'var(--blue-c)', width: '22px', height: '22px' }} />
              ประมวลภาพกิจกรรมล่าสุด
            </h2>
            <Link className="see-all" href="/activities">ดูทั้งหมด ›</Link>
          </div>
          <GalleryReel items={displayItems} />
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <MapPin size={16} style={{ color: 'var(--blue-c)' }} />
                    <h5 style={{ margin: 0 }}>{siteData.practicum.schoolName}</h5>
                  </div>
                  <p style={{ margin: 0, paddingLeft: '22px' }}>สุราษฎร์ธานี</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

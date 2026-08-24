"use client"

import Image from "next/image"
import { Reveal } from "@/components/Reveal"
import { Building2, Users, GraduationCap, Network, MapPin } from "lucide-react"

export default function PracticumSitePage() {
  return (
    <>
      <style jsx>{`
        /* Hero banner */
        .banner {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          height: 300px;
          margin-bottom: 26px;
          border: 1px solid var(--border-strong-c, rgba(16,21,43,0.12));
          box-shadow: 0 20px 60px rgba(61,107,255,0.14);
        }
        .banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(16,21,43,0.88), rgba(16,21,43,0.2) 60%);
        }
        .banner-content {
          position: absolute;
          left: 32px;
          right: 32px;
          bottom: 26px;
          color: #fff;
          z-index: 1;
        }
        .banner-content .eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          letter-spacing: 0.1em;
          color: #8fd8ff;
          margin-bottom: 8px;
        }
        .banner-content h1 {
          font-family: var(--font-prompt), sans-serif;
          font-weight: 700;
          font-size: clamp(20px, 3vw, 32px);
          margin-bottom: 8px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .banner-content p {
          font-size: 13.5px;
          opacity: 0.95;
          max-width: 700px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .banner { height: 260px; border-radius: 18px; margin-bottom: 20px; }
          .banner-content { left: 16px; right: 16px; bottom: 18px; }
          .banner-content h1 { font-size: 20px; }
          .banner-content p { font-size: 12.5px; line-height: 1.4; }
        }

        /* People grid */
        .section-title {
          font-family: var(--font-prompt), sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--ink, #10152b);
          margin: 40px 0 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        @media (max-width: 640px) {
          .section-title { font-size: 18px; margin: 30px 0 16px; }
        }
        .people-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 18px;
        }
        .person-card {
          padding: 0;
          text-align: left;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          min-height: 150px;
          border-radius: 18px;
        }
        .person-card .avatar {
          width: 130px;
          min-height: 150px;
          position: relative;
          flex-shrink: 0;
          border-radius: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(61,107,255,0.1);
          border-right: 1px solid rgba(61,107,255,0.25);
          overflow: hidden;
        }
        @media (max-width: 480px) {
          .person-card {
            min-height: 120px;
          }
          .person-card .avatar {
            width: 100px;
            min-height: 120px;
          }
          .person-card .info {
            padding: 16px 14px !important;
          }
          .person-card h4 {
            font-size: 14.5px !important;
          }
          .person-card p {
            font-size: 12px !important;
          }
        }
        .person-card.violet .avatar {
          background: rgba(139,92,246,0.1);
          border-color: rgba(139,92,246,0.28);
        }
        .person-card.amber .avatar {
          background: rgba(255,176,32,0.14);
          border-color: rgba(255,176,32,0.35);
        }
        .person-card.cyan .avatar {
          background: rgba(14,201,184,0.1);
          border-color: rgba(14,201,184,0.28);
        }
        .person-card .role {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted, rgba(16,21,43,0.58));
          margin-bottom: 4px;
        }
        .person-card h4 {
          font-family: var(--font-prompt), sans-serif;
          font-size: 15.5px;
          font-weight: 600;
          margin-bottom: 4px;
          color: var(--ink);
        }
        .person-card p {
          font-size: 13px;
          color: var(--muted, rgba(16,21,43,0.58));
          line-height: 1.5;
        }

        /* Info + facility columns */
        .cols {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 20px;
          margin-top: 16px;
          align-items: start;
        }
        @media(max-width:900px){
          .cols { grid-template-columns: 1fr; gap: 16px; }
        }
        .info-list {
          padding: 20px 24px;
        }
        @media (max-width: 640px) {
          .info-list { padding: 16px 14px; }
        }
        .info-list .row {
          display: flex;
          gap: 14px;
          padding: 10px 0;
          border-top: 1px solid var(--border, rgba(16,21,43,0.08));
        }
        .info-list .row:first-child {
          border-top: none;
          padding-top: 0;
        }
        .info-list .row svg {
          width: 18px;
          height: 18px;
          stroke: var(--blue-c, #3d6bff);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .info-list .row .k {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--muted2, rgba(16,21,43,0.4));
          margin-bottom: 2px;
        }
        .info-list .row .v {
          font-size: 13px;
          color: var(--ink, #10152b);
        }

        .chip-panel {
          padding: 20px 24px;
        }
        @media (max-width: 640px) {
          .chip-panel { padding: 16px 14px; }
        }
        .chip-panel h4 {
          font-family: var(--font-prompt), sans-serif;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chips span {
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(61,107,255,0.08);
          border: 1px solid rgba(61,107,255,0.2);
          color: var(--ink, #10152b);
        }

        /* Map */
        .map-frame {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          height: 320px;
          border: 1px solid var(--border-strong-c, rgba(16,21,43,0.12));
          box-shadow: 0 20px 60px rgba(61,107,255,0.12);
          margin-top: 16px;
        }
        @media (max-width: 640px) {
          .map-frame { border-radius: 18px; height: 280px; }
        }

        .glass-panel {
          border-radius: 24px;
          background: var(--panel-c, rgba(255,255,255,0.6));
          border: 1px solid var(--border-strong-c, rgba(16,21,43,0.12));
          backdrop-filter: blur(16px) saturate(160%);
          box-shadow: 0 16px 46px rgba(61,107,255,0.1), inset 0 1px 0 rgba(255,255,255,0.7);
        }
        @media(max-width:640px){ 
          .glass-panel { border-radius: 18px; } 
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', paddingBottom: '40px' }}>
        <Reveal>
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', marginBottom: '26px' }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">school_profile.config</span>
            </div>
            <div className="banner" style={{ margin: 0, borderRadius: 0, border: 'none', boxShadow: 'none', position: 'relative' }}>
              <Image src="/images/others/svc1.png" alt="สถานศึกษา" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
              <div className="banner-content">
                <div className="eyebrow" style={{ marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Building2 size={15} />
                  ข้อมูลสถานศึกษา
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Image 
                    src="/images/others/logo_svc.png" 
                    alt="โลโก้ วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี" 
                    width={56}
                    height={56}
                    style={{ width: '56px', height: 'auto', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
                  />
                  <h1>วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี</h1>
                </div>
                <p>สถานที่ฝึกปฏิบัติการสอน ภาคเรียนที่ 1 ปีการศึกษา 2569 · ตำบลตลาด อำเภอเมือง จังหวัดสุราษฎร์ธานี</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="cols">
            <div className="glass-panel info-list">
              <div className="row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
                <div><div className="k">ที่อยู่</div><div className="v">456/3 ถ.ตลาดใหม่ ต.ตลาด อ.เมือง จ.สุราษฎร์ธานี 84000</div></div>
              </div>
              <div className="row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>
                <div><div className="k">โทรศัพท์</div><div className="v">0-7728-2001</div></div>
              </div>
              <div className="row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <div><div className="k">แฟกซ์</div><div className="v">0-7727-2631</div></div>
              </div>
              <div className="row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>
                <div><div className="k">อีเมล</div><div className="v">saraban@svc.ac.th</div></div>
              </div>
              <div className="row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>
                <div><div className="k">เวลาทำการ</div><div className="v">วันจันทร์ – ศุกร์ · 08:00 – 16:30 น.</div></div>
              </div>
            </div>

            <div className="glass-panel chip-panel">
              <h4>สาขาวิชาที่เปิดสอนในแผนก</h4>
              <div className="chips">
                <span>เทคโนโลยีธุรกิจดิจิทัล</span>
                <span>เทคโนโลยีสารสนเทศ</span>
                <span>คอมพิวเตอร์เกมและแอนิเมชัน</span>
              </div>
              <h4 style={{ marginTop: '22px' }}>ห้องปฏิบัติการที่ใช้สอน</h4>
              <div className="chips">
                <span>ห้องปฏิบัติการคอมพิวเตอร์ 2</span>
                <span>ห้องปฏิบัติการคอมพิวเตอร์ 4</span>
                <span>ห้องปฏิบัติการคอมพิวเตอร์ 9</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} />
            บุคลากร / ครูพี่เลี้ยง
          </div>
          <div className="people-grid">
            <div className="glass-panel person-card cyan">
              <div className="avatar" style={{ padding: 0, border: 'none', position: 'relative' }}>
                <Image src="/images/others/ครูวินิต.jpg" alt="ครูวินิต สืบสอน" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="info" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="role">ครูพี่เลี้ยง</div>
                <h4>ครูวินิต สืบสอน</h4>
                <p>วิชาเทคโนโลยีการนำเข้าข้อมูลเข้าสู่ระบบคอมพิวเตอร์</p>
              </div>
            </div>
            <div className="glass-panel person-card cyan">
              <div className="avatar" style={{ padding: 0, border: 'none', position: 'relative' }}>
                <Image src="/images/others/ครูเมธาสิทธิ์.png" alt="ครูเมธาสิทธิ์ พลวัชรินทร์" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="info" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="role">ครูพี่เลี้ยง</div>
                <h4>ครูเมธาสิทธิ์ พลวัชรินทร์</h4>
                <p>วิชาโปรแกรมฐานข้อมูล</p>
              </div>
            </div>
            <div className="glass-panel person-card cyan">
              <div className="avatar" style={{ padding: 0, border: 'none', position: 'relative' }}>
                <Image src="/images/others/ครูสุพัตตรา.jpg" alt="ครูสุพัตรา เมืองฤกษ์" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="info" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="role">ครูพี่เลี้ยง</div>
                <h4>ครูสุพัตรา เมืองฤกษ์</h4>
                <p>วิชาโปรแกรมมัลติมีเดีย</p>
              </div>
            </div>

            <div className="section-title" style={{ gridColumn: '1 / -1', margin: '24px 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={16} />
              อาจารย์นิเทศก์
            </div>
            <div className="glass-panel person-card amber">
              <div className="avatar" style={{ padding: 0, border: 'none', position: 'relative' }}>
                <Image src="/images/others/อาจารย์แนน.jpg" alt="ดร. พุทธิดา สกุลวิริยกิจกุล" fill sizes="140px" style={{ objectFit: 'cover' }} />
              </div>
              <div className="info" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="role">อาจารย์นิเทศก์</div>
                <h4>ดร. พุทธิดา สกุลวิริยกิจกุล</h4>
                <p>อาจารย์ประจำภาควิชาคอมพิวเตอร์ศึกษา มจพ.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Network size={16} />
            แผนผังโครงสร้างแผนกวิชา
          </div>
          <div className="glass-panel" style={{ padding: 'clamp(14px, 3vw, 28px)', marginTop: '16px', overflow: 'hidden', position: 'relative' }}>
            {/* Decorative background glow for the org chart */}
            <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '150px', background: 'radial-gradient(ellipse, rgba(61,107,255,0.15), transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }}></div>
            
            <h4 style={{ 
              fontFamily: 'var(--font-prompt), sans-serif', 
              fontSize: '20px', 
              fontWeight: 700, 
              marginBottom: '24px', 
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <Network style={{ width: '22px', height: '22px', color: 'var(--blue-c)' }} />
              <span style={{ background: 'linear-gradient(90deg, var(--ink, #10152b), var(--blue-c, #3d6bff))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                แผนผังองค์กร แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ
              </span>
            </h4>
            
            <div style={{ 
              borderRadius: '20px', 
              overflow: 'hidden', 
              border: '1px solid var(--border-strong-c, rgba(16,21,43,0.12))', 
              background: '#ffffff',
              boxShadow: '0 12px 32px rgba(61,107,255,0.08), 0 0 0 4px rgba(255,255,255,0.5)',
              padding: '12px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'zoom-in'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(61,107,255,0.12), 0 0 0 4px rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(61,107,255,0.08), 0 0 0 4px rgba(255,255,255,0.5)';
            }}>
              <Image 
                src="/images/others/DIT_SVC.jpg" 
                alt="แผนผังองค์กร แผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ" 
                width={1200}
                height={800}
                sizes="(max-width: 1280px) 100vw, 1200px"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} />
            แผนที่ตั้งสถานศึกษา
          </div>
          <div className="map-frame" style={{ padding: 0, overflow: 'hidden' }}>
            <iframe
              src="https://maps.google.com/maps?q=วิทยาลัยอาชีวศึกษาสุราษฎร์ธานี&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Reveal>
      </div>
    </>
  )
}

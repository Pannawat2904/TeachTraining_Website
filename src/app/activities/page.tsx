"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Camera, Images } from 'lucide-react';
import { supervisions } from '@/data/siteData';

import { motion, AnimatePresence } from 'framer-motion';



function ActivitySlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', overflow: 'hidden', touchAction: 'pan-y' }}>
        <motion.div
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            if (offset.x < -50 || velocity.x < -500) {
              setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
            } else if (offset.x > 50 || velocity.x > 500) {
              setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
          }}
          style={{ display: 'flex', width: '100%', height: '100%', cursor: 'grab' }}
        >
          {images.map((img, i) => (
            <div key={i} style={{ width: '100%', height: '100%', flexShrink: 0, position: 'relative' }}>
              <Image src={img} alt={`${alt} - ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: 'cover', pointerEvents: 'none' }} />
            </div>
          ))}
        </motion.div>
      </div>
      
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 2 }}>
          {images.map((_, i) => (
            <div 
              key={i} 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentIndex === i ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)', boxShadow: '0 2px 4px rgba(0,0,0,0.4)', transition: 'all 0.3s ease', cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ActivitiesPage() {
  const [filter, setFilter] = useState('all');

  const [activitiesList, setActivitiesList] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/data/activities.json')
      .then(res => res.json())
      .then(data => setActivitiesList(data))
      .catch(err => console.error('Error fetching activities:', err));
  }, []);

  const allSupervisions = [...supervisions.semester1, ...supervisions.semester2];
  const supervisionActivities = allSupervisions.map((sup: any) => ({
    id: `sup-${sup.id}`,
    cat: 'supervision',
    img: sup.images && sup.images.length > 0 ? sup.images : (sup.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'),
    tag: 'การนิเทศการสอน',
    tagColor: 'cyan',
    date: sup.date,
    title: sup.title,
    desc: `วิชา: ${sup.subject} | อาจารย์นิเทศ: ${sup.supervisor}`
  }));

  const combinedActivities = [...supervisionActivities, ...activitiesList];
  const filteredActivities = combinedActivities.filter(a => filter === 'all' || a.cat === filter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .activities-page .page-head { margin-bottom:26px; }
        .activities-page .page-head .eyebrow { font-family:var(--font-mono, monospace); font-size:12px; color:var(--blue-c, #3d6bff); margin-bottom:8px; }
        .activities-page .page-head h1 { font-family:var(--font-prompt, sans-serif); font-weight:600; font-size:clamp(24px,3vw,34px); display:flex; align-items:center; gap:10px; color:var(--ink, #10152b); }
        .activities-page .page-head h1::before { content:'</>'; font-family:var(--font-mono, monospace); font-size:0.6em; color:var(--violet-c, #8b5cf6); }
        .activities-page .page-head p { color:var(--muted, rgba(16,21,43,0.58)); margin-top:8px; font-size:14px; max-width:520px; }

        .activities-page .filters { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:26px; }
        .activities-page .filters button {
          font-family:var(--font-ibm, sans-serif); font-size:13px; padding:10px 18px; border-radius:999px; cursor:pointer;
          background:rgba(255,255,255,0.6); border:1px solid rgba(16,21,43,0.12); color:var(--muted, rgba(16,21,43,0.58));
          backdrop-filter:blur(10px); transition:all .25s ease; outline: none;
        }
        .activities-page .filters button.active { background:linear-gradient(135deg,var(--blue-c, #3d6bff),var(--violet-c, #8b5cf6)); color:#fff; border-color:transparent; font-weight: 500; box-shadow: 0 4px 14px rgba(61,107,255,0.25); }
        .activities-page .filters button:hover:not(.active) { color:var(--ink, #10152b); background:rgba(255,255,255,0.9); }

        .activities-page .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 300px),1fr)); gap:20px; }
        .activities-page .card {
          border-radius:20px; overflow:hidden; position:relative;
          background:rgba(255,255,255,0.82); border:1px solid rgba(16,21,43,0.12);
          box-shadow:0 14px 40px rgba(61,107,255,0.08);
          transition:transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease;
          display: flex; flex-direction: column;
        }
        .activities-page .card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(61,107,255,0.18); }
        .activities-page .card .img { height:200px; overflow:hidden; position:relative; }
        .activities-page .card .img img { transition:transform .5s ease; }
        .activities-page .card:hover .img img { transform:scale(1.06); }
        .activities-page .card .body { padding:22px; flex-grow: 1; display: flex; flex-direction: column; }
        .activities-page .card .tag { font-family:var(--font-mono, monospace); font-size:11px; padding:4px 12px; border-radius:999px; display:inline-block; margin-bottom:12px; font-weight: 500; width: fit-content; }
        .activities-page .card .tag.blue { background:rgba(61,107,255,0.1); color:var(--blue-c, #3d6bff); border:1px solid rgba(61,107,255,0.25); }
        .activities-page .card .tag.violet { background:rgba(139,92,246,0.1); color:var(--violet-c, #8b5cf6); border:1px solid rgba(139,92,246,0.25); }
        .activities-page .card .tag.cyan { background:rgba(14,201,184,0.1); color:#0a8f82; border:1px solid rgba(14,201,184,0.28); }
        .activities-page .card .tag.amber { background:rgba(255,176,32,0.14); color:#c98008; border:1px solid rgba(255,176,32,0.35); }
        .activities-page .card h3 { font-family:var(--font-prompt, sans-serif); font-size:16px; font-weight:600; margin-bottom:8px; line-height:1.4; color:var(--ink, #10152b); }
        .activities-page .card .date { font-family:var(--font-mono, monospace); font-size:11.5px; color:rgba(16,21,43,0.5); margin-bottom:10px; }
        .activities-page .card p { font-size:13.5px; color:var(--muted, rgba(16,21,43,0.58)); line-height:1.7; flex-grow: 1; }
      `}} />
      
      <div className="activities-page max-w-[1440px] mx-auto" style={{ paddingBottom: '40px' }}>
        <Reveal>
          <div className="glass-panel" style={{ padding: 0, marginBottom: '26px', overflow: 'hidden' }}>
            <div className="chrome">
              <span className="r"></span><span className="y"></span><span className="g"></span>
              <span className="fname">activities_gallery.config</span>
            </div>
            <div className="page-head" style={{ padding: '24px 32px', marginBottom: 0 }}>
              <div className="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Camera size={16} />
                ประมวลภาพกิจกรรม
              </div>
              <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Images style={{ color: 'var(--violet-c)', width: '28px', height: '28px', flexShrink: 0 }} />
                กิจกรรม
              </h1>
              <p>ประมวลภาพและบันทึกกิจกรรมต่างๆ ที่ได้เข้าร่วมตลอดการฝึกปฏิบัติการสอน</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>ทั้งหมด</button>
            <button className={filter === 'supervision' ? 'active' : ''} onClick={() => setFilter('supervision')}>การนิเทศการสอน</button>
            <button className={filter === 'teach' ? 'active' : ''} onClick={() => setFilter('teach')}>กิจกรรมการสอน</button>
            <button className={filter === 'school' ? 'active' : ''} onClick={() => setFilter('school')}>กิจกรรมวิทยาลัย</button>
            <button className={filter === 'student' ? 'active' : ''} onClick={() => setFilter('student')}>กิจกรรมนักเรียน</button>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="grid">
            {filteredActivities.map(a => (
              <div key={a.id} className="card" data-cat={a.cat}>
                <div className="img">
                  {Array.isArray(a.img) ? (
                    <ActivitySlideshow images={a.img} alt={a.title} />
                  ) : (
                    <>
                      <Image src={a.img} alt={a.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                    </>
                  )}
                </div>
                <div className="body">
                  <span className={`tag ${a.tagColor}`}>{a.tag}</span>
                  <div className="date">ปีการศึกษา 1/2569</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  )
}

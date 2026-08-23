"use client"
import React, { useState } from 'react';

export default function ActivitiesPage() {
  const [filter, setFilter] = useState('all');

  const activitiesList = [
    {
      id: 1,
      cat: 'teach',
      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมการสอน',
      tagColor: 'blue',
      date: '12 ส.ค. 2569',
      title: 'กิจกรรมเสริมทักษะปฏิบัติการคอมพิวเตอร์',
      desc: 'จัดกิจกรรมฝึกปฏิบัติเสริมทักษะให้นักเรียนกลุ่มที่ต้องพัฒนาเพิ่มเติม'
    },
    {
      id: 2,
      cat: 'teach',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมการสอน',
      tagColor: 'violet',
      date: '10 ส.ค. 2569',
      title: 'สอนปฏิบัติการโปรแกรมมัลติมีเดีย',
      desc: 'คาบปฏิบัติการตัดต่อวิดีโอเบื้องต้นของนักเรียนชั้น ปวช.2'
    },
    {
      id: 3,
      cat: 'teach',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมการสอน',
      tagColor: 'cyan',
      date: '07 ส.ค. 2569',
      title: 'นิเทศการสอนโดยอาจารย์นิเทศก์',
      desc: 'รับการนิเทศและข้อเสนอแนะเพื่อพัฒนาการจัดการเรียนการสอน'
    },
    {
      id: 4,
      cat: 'school',
      img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมวิทยาลัย',
      tagColor: 'amber',
      date: '03 ส.ค. 2569',
      title: 'กิจกรรมหน้าเสาธงและเข้าแถวประจำวัน',
      desc: 'ร่วมกิจกรรมเข้าแถวเคารพธงชาติและแจ้งข่าวสารประจำสัปดาห์'
    },
    {
      id: 5,
      cat: 'school',
      img: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมวิทยาลัย',
      tagColor: 'amber',
      date: '29 ก.ค. 2569',
      title: 'ประชุมแผนกวิชาประจำเดือน',
      desc: 'เข้าร่วมประชุมแผนกวิชาธุรกิจดิจิทัลและเทคโนโลยีสารสนเทศ'
    },
    {
      id: 6,
      cat: 'student',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop',
      tag: 'กิจกรรมนักเรียน',
      tagColor: 'violet',
      date: '25 ก.ค. 2569',
      title: 'กิจกรรมแนะแนวและปฐมนิเทศนักเรียนใหม่',
      desc: 'ร่วมจัดกิจกรรมต้อนรับและแนะแนวนักเรียนชั้นปีที่ 1'
    }
  ];

  const filteredActivities = activitiesList.filter(a => filter === 'all' || a.cat === filter);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .activities-page {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
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
        .activities-page .card .img { height:200px; overflow:hidden; }
        .activities-page .card .img img { width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
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
      
      <div className="activities-page max-w-[1200px] mx-auto" style={{ padding: '50px 0 90px' }}>
        <div className="glass-panel" style={{ padding: 0, marginBottom: '26px', overflow: 'hidden' }}>
          <div className="chrome">
            <span className="r"></span><span className="y"></span><span className="g"></span>
            <span className="fname">activities_gallery.config</span>
          </div>
          <div className="page-head" style={{ padding: '24px 32px', marginBottom: 0 }}>
            <div className="eyebrow">// activities.gallery</div>
            <h1>กิจกรรม</h1>
            <p>ประมวลภาพและบันทึกกิจกรรมต่างๆ ที่ได้เข้าร่วมตลอดการฝึกปฏิบัติการสอน</p>
          </div>
        </div>

        <div className="filters">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>ทั้งหมด</button>
          <button className={filter === 'teach' ? 'active' : ''} onClick={() => setFilter('teach')}>กิจกรรมการสอน</button>
          <button className={filter === 'school' ? 'active' : ''} onClick={() => setFilter('school')}>กิจกรรมวิทยาลัย</button>
          <button className={filter === 'student' ? 'active' : ''} onClick={() => setFilter('student')}>กิจกรรมนักเรียน</button>
        </div>

        <div className="grid">
          {filteredActivities.map(a => (
            <div key={a.id} className="card" data-cat={a.cat}>
              <div className="img"><img src={a.img} alt={a.title} /></div>
              <div className="body">
                <span className={`tag ${a.tagColor}`}>{a.tag}</span>
                <div className="date">{a.date}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

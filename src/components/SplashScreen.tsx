"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Only show splash on root path '/' and only if not dismissed in this session
    if (pathname !== "/") {
      document.body.style.overflow = '';
      return;
    }

    const wasDismissed = sessionStorage.getItem("splash_dismissed");
    if (wasDismissed === "true") {
      document.body.style.overflow = '';
      return;
    }

    // Show splash screen on first visit to '/'
    const timer = setTimeout(() => {
      setIsDismissed(false);
      document.body.style.overflow = 'hidden';
    }, 0);

    const dismissSplash = () => {
      setIsLeaving(true);
      sessionStorage.setItem("splash_dismissed", "true");
      document.body.style.overflow = '';
      setTimeout(() => {
        setIsDismissed(true);
      }, 350);
    };

    window.addEventListener('wheel', dismissSplash, { once: true, passive: true });
    window.addEventListener('touchmove', dismissSplash, { once: true, passive: true });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter') dismissSplash();
    });

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('wheel', dismissSplash);
      window.removeEventListener('touchmove', dismissSplash);
    };
  }, [pathname]);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsLeaving(true);
    sessionStorage.setItem("splash_dismissed", "true");
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsDismissed(true);
    }, 350);
  };

  return (
    <div id="splash" className={isLeaving ? 'leaving' : ''} onClick={handleDismiss}>
      {/* Glass Logos Row at the Top */}
      <div className="splash-logos-row">
        <div className="logo-badge">
          <Image src="/images/others/logo_kmutnb.png" alt="KMUTNB Logo" width={68} height={68} style={{ width: '100%', height: '100%', objectFit: 'contain' }} priority />
        </div>
        <div className="logo-badge">
          <Image src="/images/others/logo_comedu.jpeg" alt="ComEdu Logo" width={68} height={68} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} priority />
        </div>
        <div className="logo-badge">
          <Image src="/images/others/logo_svc.png" alt="SVC Logo" width={68} height={68} style={{ width: '100%', height: '100%', objectFit: 'contain' }} priority />
        </div>
      </div>

      {/* Tech Eyebrow Badge */}
      <div className="splash-eyebrow">
        <span className="dot"></span>
        TEACHING PRACTICUM REPORT 2569
      </div>

      {/* Gradient Title & Styled Subtitle ABOVE Code Window */}
      <h1>รายงานผลการฝึกปฏิบัติการสอน</h1>
      <div className="sub">คณะครุศาสตร์อุตสาหกรรม · มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</div>

      {/* Code Window Block */}
      <div className="splash-window">
        <div className="chrome">
          <span className="r"></span><span className="y"></span><span className="g"></span>
          <span className="fname">profile.tsx</span>
        </div>
        <div className="body">
          <div className="l1">const <span className="key">student</span> = {'{'}</div>
          <div className="l2">&nbsp;&nbsp;name: <span className="str">{`"ปาณวัฐ รักรอดจิต"`}</span>,</div>
          <div className="l2">&nbsp;&nbsp;studentId: <span className="str">{`"6602041620106"`}</span>,</div>
          <div className="l2">&nbsp;&nbsp;major: <span className="str">{`"เทคโนโลยีคอมพิวเตอร์"`}</span>,</div>
          <div className="l3">&nbsp;&nbsp;status: <span className="str">{`"กำลังฝึกสอน"`}</span><span className="cursor"></span></div>
          <div className="l1">{'};'}</div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="scroll-cue" id="enterSite">
        <div className="scroll-cue-pill">
          <span>เลื่อนหรือคลิกเพื่อเข้าสู่เว็บไซต์</span>
          <svg className="chev" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="เลื่อนขึ้นบนสุด"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 49,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border-strong-c, rgba(61, 107, 255, 0.2))",
            boxShadow: "0 8px 24px rgba(61, 107, 255, 0.18), 0 2px 6px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--blue-c, #3d6bff)",
            outline: "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(61, 107, 255, 0.28)";
            e.currentTarget.style.background = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(61, 107, 255, 0.18)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
          }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

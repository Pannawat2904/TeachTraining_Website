"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  title?: string;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  title,
}: ImageModalProps) {
  // Handle keyboard events (ESC to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onIndexChange && images.length > 1) {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight" && onIndexChange && images.length > 1) {
        onIndexChange((currentIndex + 1) % images.length);
      }
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(10, 15, 30, 0.88)",
          backdropFilter: "blur(16px)",
          padding: "clamp(12px, 3vw, 32px)",
        }}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1200px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              background: "rgba(16, 21, 43, 0.75)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#ffffff",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
              <Maximize2 size={16} style={{ color: "#3d6bff", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-prompt), sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title || "ดูภาพขยาย"}
              </span>
              {images.length > 1 && (
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-mono), monospace",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.8)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="ปิด"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image Viewport */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "calc(82vh - 60px)",
              minHeight: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#080c18",
              overflow: "hidden",
            }}
          >
            {/* Background Blur */}
            <div
              style={{
                position: "absolute",
                inset: -30,
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(30px)",
                opacity: 0.35,
                transform: "scale(1.1)",
              }}
            />

            {/* Main Image */}
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={currentImage}
                alt={title || "Image"}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{ objectFit: "contain", zIndex: 2 }}
                priority
              />
            </div>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange?.((currentIndex - 1 + images.length) % images.length);
                }}
                style={{
                  position: "absolute",
                  left: "16px",
                  zIndex: 5,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(16, 21, 43, 0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--blue-c, #3d6bff)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16, 21, 43, 0.7)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="รูปก่อนหน้า"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange?.((currentIndex + 1) % images.length);
                }}
                style={{
                  position: "absolute",
                  right: "16px",
                  zIndex: 5,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(16, 21, 43, 0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--blue-c, #3d6bff)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16, 21, 43, 0.7)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="รูปถัดไป"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Dots Indicator */}
          {images.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                padding: "12px",
                background: "rgba(16, 21, 43, 0.8)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                zIndex: 10,
              }}
            >
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndexChange?.(idx);
                  }}
                  style={{
                    width: currentIndex === idx ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background:
                      currentIndex === idx
                        ? "linear-gradient(90deg, #3d6bff, #8b5cf6)"
                        : "rgba(255, 255, 255, 0.35)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s ease",
                  }}
                  aria-label={`ไปที่รูปที่ ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

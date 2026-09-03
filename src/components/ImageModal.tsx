"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

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
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(225, 235, 255, 0.65)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          padding: "clamp(12px, 3vw, 32px)",
        }}
      >
        {/* Modal Container (IDE Glass Panel Theme) */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 26, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1280px",
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.92)",
            border: "1px solid var(--border-strong-c, rgba(61, 107, 255, 0.2))",
            boxShadow: "0 24px 60px rgba(61, 107, 255, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.9) inset",
          }}
        >
          {/* Top IDE Chrome Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              background: "rgba(255, 255, 255, 0.8)",
              borderBottom: "1px solid var(--border-c, rgba(16, 21, 43, 0.08))",
              zIndex: 10,
            }}
          >
            {/* Left: macOS dots + filename + title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11.5px",
                  color: "var(--muted-c, rgba(16, 21, 43, 0.45))",
                  display: "inline-block",
                  paddingRight: "8px",
                  borderRight: "1px solid rgba(16, 21, 43, 0.1)",
                }}
                className="hidden sm:inline-block"
              >
                preview_image.view
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                <Images size={16} style={{ color: "var(--blue-c, #3d6bff)", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "var(--font-prompt), sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--ink, #10152b)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title || "ดูภาพขยาย"}
                </span>
              </div>

              {images.length > 1 && (
                <span
                  style={{
                    fontSize: "11.5px",
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(61, 107, 255, 0.08)",
                    border: "1px solid rgba(61, 107, 255, 0.2)",
                    color: "var(--blue-c, #3d6bff)",
                    flexShrink: 0,
                  }}
                >
                  {currentIndex + 1} / {images.length}
                </span>
              )}
            </div>

            {/* Right: Close button */}
            <button
              onClick={onClose}
              style={{
                background: "rgba(16, 21, 43, 0.04)",
                border: "1px solid rgba(16, 21, 43, 0.1)",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink, #10152b)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.35)";
                e.currentTarget.style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(16, 21, 43, 0.04)";
                e.currentTarget.style.borderColor = "rgba(16, 21, 43, 0.1)";
                e.currentTarget.style.color = "var(--ink, #10152b)";
              }}
              aria-label="ปิด"
            >
              <X size={18} />
            </button>
          </div>

          {/* Image Viewport Canvas */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "calc(82vh - 60px)",
              minHeight: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #f3f6fd 0%, #f7f5ff 100%)",
              overflow: "hidden",
            }}
          >
            {/* Subtle soft background glow of the image */}
            <div
              style={{
                position: "absolute",
                inset: -30,
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(40px)",
                opacity: 0.18,
                transform: "scale(1.1)",
              }}
            />

            {/* Main Image with floating drop shadow */}
            <div style={{ position: "relative", width: "100%", height: "100%", padding: "16px" }}>
              <Image
                src={currentImage}
                alt={title || "Image"}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{
                  objectFit: "contain",
                  zIndex: 2,
                  filter: "drop-shadow(0 14px 34px rgba(61, 107, 255, 0.14))",
                }}
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
                  left: "18px",
                  zIndex: 5,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(61, 107, 255, 0.2)",
                  color: "var(--blue-c, #3d6bff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 6px 20px rgba(61, 107, 255, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, var(--blue-c, #3d6bff), var(--violet-c, #8b5cf6))";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.color = "var(--blue-c, #3d6bff)";
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
                  right: "18px",
                  zIndex: 5,
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(61, 107, 255, 0.2)",
                  color: "var(--blue-c, #3d6bff)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 6px 20px rgba(61, 107, 255, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, var(--blue-c, #3d6bff), var(--violet-c, #8b5cf6))";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.color = "var(--blue-c, #3d6bff)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="รูปถัดไป"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Dots Indicator Bar */}
          {images.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                padding: "12px",
                background: "rgba(255, 255, 255, 0.85)",
                borderTop: "1px solid var(--border-c, rgba(16, 21, 43, 0.08))",
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
                    width: currentIndex === idx ? "26px" : "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background:
                      currentIndex === idx
                        ? "linear-gradient(90deg, #3d6bff, #8b5cf6)"
                        : "rgba(61, 107, 255, 0.2)",
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

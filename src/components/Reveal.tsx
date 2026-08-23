"use client"

import React, { useRef, useEffect, useState } from "react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export function Reveal({ children, className = "", style = {}, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      requestAnimationFrame(() => setIsRevealed(true))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${isRevealed ? "is-revealed" : ""} ${className}`}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  )
}
export default Reveal

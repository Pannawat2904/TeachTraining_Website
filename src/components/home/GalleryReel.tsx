"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

function ReelItem({ 
  src, 
  alt, 
  badge, 
  title 
}: { 
  src: string; 
  alt: string; 
  badge: string; 
  title: string 
}) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <div className={`reel-item`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80vw, 380px"
        style={{ objectFit: 'cover' }}
        onError={() => {
          setImgSrc('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop')
        }}
      />
      <div className="caption">
        <div className="d">{badge}</div>
        <div className="t">{title}</div>
      </div>
    </div>
  )
}

export function GalleryReel({ 
  items
}: { 
  items: { src: string; title: string; badge: string; alt: string }[];
}) {
  const reelRef = useRef<HTMLDivElement>(null)

  // Drag scroll logic for gallery reel
  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      reel.classList.add('active')
      startX = e.pageX - reel.offsetLeft
      scrollLeft = reel.scrollLeft
    }
    const onMouseLeave = () => {
      isDown = false
      reel.classList.remove('active')
    }
    const onMouseUp = () => {
      isDown = false
      reel.classList.remove('active')
    }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - reel.offsetLeft
      const walk = (x - startX) * 2
      reel.scrollLeft = scrollLeft - walk
    }

    reel.addEventListener('mousedown', onMouseDown)
    reel.addEventListener('mouseleave', onMouseLeave)
    reel.addEventListener('mouseup', onMouseUp)
    reel.addEventListener('mousemove', onMouseMove)

    return () => {
      reel.removeEventListener('mousedown', onMouseDown)
      reel.removeEventListener('mouseleave', onMouseLeave)
      reel.removeEventListener('mouseup', onMouseUp)
      reel.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="reel" ref={reelRef}>
      {items.map((item, i) => (
        <ReelItem 
          key={i} 
          src={item.src} 
          alt={item.alt} 
          badge={item.badge} 
          title={item.title} 
        />
      ))}
    </div>
  )
}

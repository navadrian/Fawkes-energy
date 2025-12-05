'use client'

import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface HeroScrollIndicatorProps {
  targetId: string
}

export default function HeroScrollIndicator({ targetId }: HeroScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      setIsVisible(window.scrollY < 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`absolute bottom-6 right-6 md:bottom-10 md:right-12 flex flex-col items-center gap-1 text-white/70 transition-all duration-300 hover:text-white focus:outline-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      aria-label="Scroll to next section"
    >
      {[0, 1, 2].map((index) => (
        <ChevronDown
          key={index}
          className="w-4 h-4 md:w-5 md:h-5 animate-chevron-soft"
          style={{ animationDelay: `${index * 0.18}s` }}
        />
      ))}
    </button>
  )
}





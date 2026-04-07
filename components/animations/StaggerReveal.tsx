'use client'

import { useRef, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  y?: number
  delay?: number
}

export default function StaggerReveal({
  children,
  className = '',
  stagger = 0.08,
  y = 30,
  delay = 0,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      if (!ref.current) return

      const items = Array.from(ref.current.children)
      if (items.length === 0) return

      gsap.set(items, { opacity: 0, y, scale: 0.97 })

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

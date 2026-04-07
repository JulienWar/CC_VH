'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import HeroScrollCaret from '@/components/ui/HeroScrollCaret'

interface HeroProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export default function Hero({ title, subtitle, imageSrc, imageAlt }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const bgWrapRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const words = title.split(' ')

  useGSAP(() => {
    const container = containerRef.current
    const bgWrap = bgWrapRef.current
    const bg = bgRef.current
    if (!container || !bgWrap || !bg) return

    gsap.registerPlugin(ScrollTrigger)

    const wordEls = container.querySelectorAll('[data-word]')

    // Page load entry sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Background: subtle zoom in (scale 1.08 → 1.0)
    gsap.set(bg, { scale: 1.08 })
    tl.to(bg, { scale: 1.0, duration: 1.6, ease: 'power2.out' }, 0)

    // 2. Subtitle fade in
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 })
      tl.to(subtitleRef.current, { opacity: 0.8, y: 0, duration: 0.7 }, 0.4)
    }

    // 3. Title words stagger slide up
    gsap.set(wordEls, { y: '110%' })
    tl.to(wordEls, {
      y: '0%',
      duration: 0.85,
      stagger: 0.08,
    }, 0.55)

    // Scroll parallax on bg
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bgWrap, { yPercent: self.progress * 30 })
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-dvh overflow-hidden">
      {/* Background image */}
      <div ref={bgWrapRef} className="absolute inset-0">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f5efe0] px-5">
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-xs font-medium tracking-widest uppercase mb-4"
          >
            {subtitle}
          </p>
        )}
        <h1
          className="text-[clamp(48px,8vw,96px)] leading-[1.05]"
          style={{ fontWeight: 375 }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <HeroScrollCaret />
    </section>
  )
}

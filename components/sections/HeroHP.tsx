'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface HeroHPProps {
  backgroundImage?: string
  cardTitle?: string
  cardText?: string
  cardLink?: string
  cardLinkLabel?: string
}

export default function HeroHP({
  backgroundImage = '/images/event-1.jpg',
  cardTitle = "Don\u2019t Miss",
  cardText = 'AlUla Arts Festival 2026 \u2013 Vertigo performance at Wadi Al Fann',
  cardLink = '#',
  cardLinkLabel = 'Book now',
}: HeroHPProps) {
  const containerRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bg = bgRef.current
    const logo = logoRef.current
    const card = cardRef.current
    if (!bg || !logo || !card) return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    gsap.set(bg, { scale: 1.08 })
    tl.to(bg, { scale: 1.0, duration: 1.6, ease: 'power2.out' }, 0)

    gsap.set(logo, { opacity: 0, y: 20 })
    tl.to(logo, { opacity: 1, y: 0, duration: 1.0 }, 0.4)

    gsap.set(card, { opacity: 0, y: 20 })
    tl.to(card, { opacity: 1, y: 0, duration: 0.7 }, 0.8)

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bg, { yPercent: self.progress * 25 })
      },
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="relative w-full h-dvh overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 w-full h-full">
          <Image
            src={backgroundImage}
            alt="AlUla landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      </div>

      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative shrink-0"
          style={{ width: 'min(575px, 80vw)', aspectRatio: '575 / 255' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-logo-arabic.svg"
            alt="\u0641\u064A\u0644\u0627 \u0627\u0644\u062D\u062C\u0631"
            className="absolute"
            style={{ left: '6.96%', top: '22.75%', width: '61.59%', height: '27.37%' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-logo-latin.svg"
            alt=""
            className="absolute"
            style={{ left: '6.96%', top: '53.33%', width: '61.71%', height: '16.78%' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-logo-monogram.svg"
            alt=""
            className="absolute"
            style={{ left: '75.65%', top: '16.47%', width: '17.47%', height: '67.06%' }}
          />
        </div>
      </div>

      <div ref={cardRef} className="absolute bottom-12 left-12">
        <div className="bg-[#2c2923] p-[24px] flex flex-col justify-between gap-[16px]" style={{ width: 336, height: 336 }}>
          <div className="flex flex-col gap-[16px] text-[#f5efe0] text-[32px] leading-[1.2]">
            <p style={{ fontWeight: 500 }}>{cardTitle}</p>
            <p style={{ fontWeight: 375 }}>{cardText}</p>
          </div>
          <Link
            href={cardLink}
            className="inline-flex self-start items-center gap-2 whitespace-nowrap text-[18px] text-[#f5efe0] border-b-2 border-[#f5efe0] py-[4px] hover:opacity-70 transition-opacity"
            style={{ fontWeight: 500 }}
          >
            {cardLinkLabel}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <svg
          width="24"
          height="40"
          viewBox="0 0 24 40"
          fill="none"
          className="text-[#f5efe0] opacity-60 animate-bounce"
        >
          <path d="M12 2v20M5 15l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

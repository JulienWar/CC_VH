'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const mainNav = [
  { label: 'The Villa', href: '/the-villa' },
  { label: 'Venue', href: '/venue' },
  { label: 'Programming', href: '/programming' },
  { label: 'Residencies', href: '/residencies' },
  { label: 'Research and Exchanges', href: '/research' },
]

const secondaryNav = [
  { label: 'Access & Contact', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Support us', href: '#' },
  { label: 'Team', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookies', href: '#' },
]

// Orange diamond for hover state
function NavDiamondOrange() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="#ce6223" aria-hidden="true" className="shrink-0">
      <path d="M10 0L20 10L10 20L0 10Z"/>
    </svg>
  )
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const initialised = useRef(false)

  useEffect(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) return

    const navItems = panel.querySelectorAll('[data-nav-item]')

    if (!initialised.current) {
      gsap.set(panel, { x: '100%' })
      gsap.set(backdrop, { opacity: 0, pointerEvents: 'none' })
      gsap.set(navItems, { y: 40, opacity: 0 })
      initialised.current = true
      return
    }

    tlRef.current?.kill()
    const tl = gsap.timeline()
    tlRef.current = tl

    if (isOpen) {
      tl.set(backdrop, { pointerEvents: 'auto' })
        .to(backdrop, { opacity: 1, duration: 0.3, ease: 'none' })
        .to(panel, { x: '0%', duration: 0.6, ease: 'power3.out' }, 0)
        .to(navItems, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.06,
        }, 0.25)
    } else {
      tl.to(navItems, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.in',
          stagger: 0.04,
        })
        .to(panel, { x: '100%', duration: 0.5, ease: 'power3.in' }, 0.1)
        .to(backdrop, { opacity: 0, duration: 0.4, ease: 'none' }, 0)
        .set(backdrop, { pointerEvents: 'none' })
    }

    return () => { tl.kill() }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-[99] bg-black/20"
        onClick={onClose}
      />

      {/* Panel — right side, 624px, cream bg */}
      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-[100] w-[624px] max-w-full h-dvh bg-[#f5efe0] flex flex-col"
        style={{ boxShadow: '-40px 0px 50px rgba(44,41,35,0.15)' }}
      >
        {/* Top bar: logo + close */}
        <div className="flex items-start justify-between px-8 lg:px-[130px] pt-8 lg:pt-12 shrink-0">
          <Link href="/" onClick={onClose} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/menu-logo.svg"
              alt="Villa Hegra"
              className="block w-[50px] lg:w-[72px]"
              style={{ aspectRatio: '72.15 / 123' }}
            />
          </Link>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-[#2c2923] hover:opacity-60 transition-opacity -mr-2 -mt-2"
            aria-label="Close menu"
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
              <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
            </svg>
          </button>
        </div>

        {/* Nav content — flex grow to fill available space */}
        <div className="flex-1 flex flex-col justify-center gap-8 lg:gap-12 px-8 lg:px-[130px] overflow-y-auto py-6">

          {/* Main nav — diamond on hover, text left-aligned */}
          <nav className="flex flex-col gap-[clamp(8px,1.5vh,24px)]" aria-label="Main navigation">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                data-nav-item
                className="group relative flex items-center"
              >
                <span className="absolute -left-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <NavDiamondOrange />
                </span>
                <span
                  className="text-[clamp(20px,3.5vh,32px)] leading-none text-[#2c2923] group-hover:text-[#ce6223] group-hover:border-b-[3px] group-hover:border-[#ce6223] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Secondary nav */}
          <nav className="flex flex-col gap-[clamp(2px,0.5vh,8px)]" aria-label="Secondary navigation">
            {secondaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                data-nav-item
                className="flex items-center text-[clamp(14px,2.5vh,24px)] leading-[1.5] text-[#2c2923] hover:opacity-60 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar — EN + socials */}
        <div className="shrink-0 px-8 lg:px-[130px] pb-6 flex items-center justify-between">
          {/* EN + chevron */}
          <button className="flex items-center gap-[5px] text-[16px] text-[#2c2923] hover:opacity-70 transition-opacity" style={{ fontWeight: 500 }}>
            EN
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
               className="w-10 h-10 flex items-center justify-center text-[#2c2923] opacity-80 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15V9l5.2 3L10 15z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
               className="w-10 h-10 flex items-center justify-center text-[#2c2923] opacity-80 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="w-10 h-10 flex items-center justify-center text-[#2c2923] opacity-80 hover:opacity-100 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17.5" cy="6.5" r="1.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

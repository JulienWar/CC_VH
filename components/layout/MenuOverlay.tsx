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
      // Silent first mount — set off-screen without transitioning
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

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed right-0 top-0 z-[100] w-[624px] max-w-full h-full bg-[#f5efe0] flex flex-col px-[50px] lg:px-[130px] py-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-3xl font-light text-[#2c2923] hover:opacity-60 transition-opacity"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Logo mark */}
        <div className="mb-12 text-xl font-medium tracking-wider text-[#2c2923]">
          VH
        </div>

        {/* Main nav */}
        <nav className="flex flex-col gap-6 mb-10" aria-label="Main navigation">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              data-nav-item
              className="text-[32px] font-medium text-[#2c2923] leading-tight hover:opacity-50 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Secondary nav */}
        <nav className="flex flex-col gap-2.5" aria-label="Secondary navigation">
          {secondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              data-nav-item
              className="text-base text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-[#2c2923]/10">
          <button className="flex items-center gap-1 text-sm font-medium text-[#2c2923]">
            EN <span className="text-xs ml-0.5">▲</span>
          </button>
          <div className="flex gap-4 text-sm text-[#2c2923]">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-60 hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

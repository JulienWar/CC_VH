'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NavbarProps {
  onMenuOpen: () => void
}

export default function Navbar({ onMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'text-[#f5efe0]' : 'text-[#f5efe0]'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 lg:px-12 transition-colors duration-500 ${
        scrolled ? 'bg-[#2c2923] h-[89px]' : 'bg-transparent h-[64px]'
      }`}
    >
      {/* Language selector */}
      <button
        className={`flex items-center gap-[5px] text-[16px] ${textColor} transition-opacity hover:opacity-70`}
        style={{ fontWeight: 500 }}
      >
        EN
        {/* ic:baseline-keyboard-arrow-down */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>

      {/* Logo wordmark — centered, only visible when scrolled */}
      <Link
        href="/"
        className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ gap: '4px' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-group.svg"
          alt="Villa Hegra"
          width="152"
          height="30"
          className="block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-group1.svg"
          alt=""
          width="152"
          height="18"
          className="block"
        />
      </Link>

      {/* Burger — 64×64 touch area */}
      <button
        onClick={onMenuOpen}
        className={`relative w-16 h-16 flex items-center justify-center ${textColor} hover:opacity-70 transition-opacity -mr-4`}
        aria-label="Open navigation menu"
      >
        <svg width="32" height="16" viewBox="0 0 32 16" fill="currentColor" aria-hidden="true">
          <rect x="0" y="0" width="32" height="2"/>
          <rect x="0" y="7" width="32" height="2"/>
          <rect x="0" y="14" width="32" height="2"/>
        </svg>
      </button>
    </header>
  )
}

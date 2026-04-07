'use client'

import { useEffect, useState } from 'react'

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 lg:px-12 transition-colors duration-500 ${
        scrolled
          ? 'bg-[#f5efe0] text-[#2c2923]'
          : 'bg-transparent text-[#f5efe0]'
      }`}
    >
      {/* Language selector */}
      <button className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">
        EN
      </button>

      {/* Burger button */}
      <button
        onClick={onMenuOpen}
        className="flex flex-col gap-[5px] p-2 -mr-2"
        aria-label="Open navigation menu"
      >
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
      </button>
    </header>
  )
}

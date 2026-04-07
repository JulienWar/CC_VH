'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MenuOverlay from '@/components/layout/MenuOverlay'
import GSAPProvider from '@/components/animations/GSAPProvider'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <GSAPProvider>
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <Footer />
    </GSAPProvider>
  )
}

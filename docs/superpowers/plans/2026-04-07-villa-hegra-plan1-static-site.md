# Villa Hegra — Plan 1: Static Site + GSAP Animations

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Villa Hegra website as a static Next.js 15 site with pixel-perfect Figma implementation and GSAP awwwards-level animations — fully runnable at `localhost:3000`.

**Architecture:** Next.js 15 App Router, Tailwind v4 with Figma design tokens as CSS variables, GSAP + ScrollTrigger for all animations. All content is hardcoded in this plan (CMS integration is Plan 2). The site is already structured for locale routing (`/en/`) so Plan 3 (i18n) slots in cleanly.

**Tech Stack:** Next.js 15, TypeScript 5, Tailwind CSS v4, GSAP 3 + @gsap/react, next/font (local), next/image

---

## File Map

```
(root = C:/Users/warin/Desktop/CC_VH)
├── app/
│   ├── layout.tsx                         # Root HTML shell, font vars
│   ├── (site)/
│   │   ├── layout.tsx                     # Site layout: Navbar + MenuOverlay + Footer
│   │   ├── page.tsx                       # Home
│   │   ├── the-villa/page.tsx
│   │   ├── venue/page.tsx
│   │   ├── programming/page.tsx
│   │   ├── residencies/page.tsx
│   │   └── research/page.tsx              # Placeholder
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MenuOverlay.tsx
│   │   └── Footer.tsx
│   ├── animations/
│   │   ├── GSAPProvider.tsx               # Registers ScrollTrigger once
│   │   ├── TextReveal.tsx
│   │   ├── ParallaxImage.tsx
│   │   └── StaggerReveal.tsx
│   ├── ui/
│   │   ├── CTAButton.tsx
│   │   ├── FilterBar.tsx
│   │   ├── EventCard.tsx
│   │   ├── ArtistCard.tsx
│   │   ├── OpenCallItem.tsx
│   │   ├── LogoGrid.tsx
│   │   └── HeroScrollCaret.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── WhatIsOn.tsx
│       ├── ArtistsResidenciesSection.tsx
│       ├── LocationSection.tsx
│       ├── FoundingEntities.tsx
│       ├── PartnersSection.tsx
│       ├── EventsGrid.tsx
│       └── VenueGallery.tsx
├── lib/
│   └── gsap/animations.ts                 # Reusable GSAP timeline factories
├── public/
│   └── fonts/
│       ├── PPNeueMontrealArabic-Book.woff2
│       └── PPNeueMontrealArabic-Medium.woff2
├── styles/globals.css                     # Tailwind v4 + design tokens
├── next.config.ts
├── tsconfig.json
└── CLAUDE.md
```

---

## Task 1: Scaffold Next.js 15 project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Run create-next-app in the project root**

```bash
cd C:/Users/warin/Desktop/CC_VH
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```

Expected: Next.js 15 project scaffolded. You will see `app/`, `public/`, `package.json`, `tailwind.config.ts` (or `postcss.config.js`).

- [ ] **Step 2: Install GSAP**

```bash
npm install gsap @gsap/react
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: default Next.js welcome page.

- [ ] **Step 5: Delete default boilerplate**

```bash
# Delete the default page content — keep the file structure
```

In `app/page.tsx`, replace entire contents with:

```tsx
export default function Home() {
  return <main>Villa Hegra</main>
}
```

In `app/globals.css`, delete all default content (keep the file, we'll replace in Task 3).

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 15 project with GSAP"
```

---

## Task 2: Copy fonts and configure next/font

**Files:**
- Create: `public/fonts/PPNeueMontrealArabic-Book.woff2`
- Create: `public/fonts/PPNeueMontrealArabic-Medium.woff2`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Copy font files**

```bash
mkdir -p public/fonts
cp "C:/Users/warin/Downloads/PPNeueMontrealArabic-Book.woff2" public/fonts/
cp "C:/Users/warin/Downloads/PPNeueMontrealArabic-Medium.woff2" public/fonts/
```

- [ ] **Step 2: Update root layout with font**

Replace `app/layout.tsx` entirely:

```tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const ppNeueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueMontrealArabic-Book.woff2',
      weight: '375',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontrealArabic-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pp-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Villa Hegra',
  description:
    'Villa Hegra is an institution dedicated to cross-cultural cooperation, born from the friendship between Saudi Arabia and France.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ppNeueMontreal.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify font loads**

```bash
npm run dev
```

Open DevTools → Network → filter by Font. Expected: `PPNeueMontrealArabic-Book.woff2` loads with status 200.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add PP Neue Montreal Arabic local fonts"
```

---

## Task 3: Design tokens — Tailwind v4 + CSS variables

**Files:**
- Modify: `styles/globals.css` (or `app/globals.css`)

**Note:** If `create-next-app` generated a `tailwind.config.ts`, that's Tailwind v3. Tailwind v4 configures entirely via CSS. Check your version:

```bash
npx tailwindcss --version
```

If v4 (`4.x`): follow Step 1a. If v3 (`3.x`): follow Step 1b.

- [ ] **Step 1a (Tailwind v4): Replace globals.css**

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-light-cream: #f5efe0;
  --color-dark-cream: #bfb098;
  --color-black-grey: #2c2923;
  --color-orange: #ce6223;
  --color-brown: #59220e;
  --color-gold: #b78d09;
  --color-paper: #8b6546;
  --color-marron-20: #f4ece4;
  --color-orange-action: #f3900d;

  /* Font */
  --font-sans: var(--font-pp-neue), sans-serif;

  /* Spacing scale (8px base) */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-24: 96px;
  --spacing-40: 160px;

  /* Layout */
  --max-w-site: 1512px;
  --gutter-desktop: 48px;
  --gutter-mobile: 20px;

  /* Breakpoints */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1280px;
  --breakpoint-xl: 1512px;
}

/* Base styles */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-light-cream);
  color: var(--color-black-grey);
  font-family: var(--font-sans);
  font-weight: 375;
  -webkit-font-smoothing: antialiased;
}

/* Clip-path mask utility for TextReveal */
.clip-reveal {
  clip-path: inset(0 0 100% 0);
}
```

- [ ] **Step 1b (Tailwind v3): Replace tailwind.config.ts AND globals.css**

`tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-cream': '#f5efe0',
        'dark-cream':  '#bfb098',
        'black-grey':  '#2c2923',
        orange:        '#ce6223',
        brown:         '#59220e',
        gold:          '#b78d09',
        paper:         '#8b6546',
        'marron-20':   '#f4ece4',
        'orange-action': '#f3900d',
      },
      fontFamily: {
        sans: ['var(--font-pp-neue)', 'sans-serif'],
      },
      maxWidth: {
        site: '1512px',
      },
    },
  },
  plugins: [],
}

export default config
```

`app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-light-cream: #f5efe0;
  --color-dark-cream:  #bfb098;
  --color-black-grey:  #2c2923;
  --color-orange:      #ce6223;
  --gutter-desktop:    48px;
  --gutter-mobile:     20px;
}

html { scroll-behavior: smooth; }

body {
  background-color: #f5efe0;
  color: #2c2923;
  -webkit-font-smoothing: antialiased;
}

.clip-reveal {
  clip-path: inset(0 0 100% 0);
}
```

- [ ] **Step 2: Verify tokens in browser**

```bash
npm run dev
```

Open DevTools → Elements → `<body>`. Expected: `background-color` is `#f5efe0` (cream). Text color `#2c2923`.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add design tokens from Figma variables"
```

---

## Task 4: Site route group layout (Navbar + Footer shell)

**Files:**
- Create: `app/(site)/layout.tsx`
- Create: `app/(site)/page.tsx`
- Create: `components/layout/Navbar.tsx` (stub)
- Create: `components/layout/Footer.tsx` (stub)
- Create: `components/layout/MenuOverlay.tsx` (stub)

- [ ] **Step 1: Create route group and move home page**

```bash
mkdir -p app/(site)
```

Create `app/(site)/page.tsx`:
```tsx
export default function Home() {
  return <main className="min-h-screen">Villa Hegra — Home</main>
}
```

Delete `app/page.tsx`.

- [ ] **Step 2: Create Navbar stub**

Create `components/layout/Navbar.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-5 lg:px-12 transition-colors duration-300 ${
        scrolled ? 'bg-[#f5efe0]' : 'bg-transparent'
      }`}
    >
      {/* Language selector */}
      <button className="text-sm font-medium text-[#2c2923] tracking-wide">
        EN
      </button>

      {/* Burger */}
      <button
        onClick={() => setMenuOpen(true)}
        className="flex flex-col gap-[5px] p-2"
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
      </button>
    </header>
  )
}
```

- [ ] **Step 3: Create Footer stub**

Create `components/layout/Footer.tsx`:

```tsx
import Link from 'next/link'

const footerLinks = [
  { label: 'Access & Contact', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Support Us', href: '#' },
  { label: 'Team', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookies', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-12 py-8">
      <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Logo */}
        <div className="text-sm font-medium tracking-widest uppercase">
          Villa Hegra
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs opacity-70 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-4 text-xs opacity-70">
          <a href="#" aria-label="YouTube">YT</a>
          <a href="#" aria-label="LinkedIn">LI</a>
          <a href="#" aria-label="Instagram">IG</a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Create MenuOverlay stub**

Create `components/layout/MenuOverlay.tsx`:

```tsx
'use client'

import Link from 'next/link'

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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-[624px] max-w-full h-full bg-[#f5efe0] flex flex-col px-[130px] py-8">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-2xl"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Logo mark */}
        <div className="mb-12 text-2xl font-medium">VH</div>

        {/* Main nav */}
        <nav className="flex flex-col gap-7 mb-12">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="text-[32px] font-medium text-[#2c2923] leading-tight hover:opacity-60 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Secondary nav */}
        <nav className="flex flex-col gap-3">
          {secondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="text-base text-[#2c2923] opacity-70 hover:opacity-100 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom bar */}
        <div className="mt-auto flex items-center justify-between pt-8">
          <button className="flex items-center gap-1 text-sm">
            EN <span className="text-xs">▲</span>
          </button>
          <div className="flex gap-4 text-sm">
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="LinkedIn">LI</a>
            <a href="#" aria-label="Instagram">IG</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create site layout wiring Navbar + Footer**

Create `app/(site)/layout.tsx`:

```tsx
'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MenuOverlay from '@/components/layout/MenuOverlay'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Navbar onMenuOpen={() => setMenuOpen(true)} scrolled={false} />
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <Footer />
    </>
  )
}
```

Update `components/layout/Navbar.tsx` to accept props:

```tsx
'use client'

import { useEffect, useState } from 'react'

interface NavbarProps {
  onMenuOpen: () => void
  scrolled?: boolean
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
        scrolled ? 'bg-[#f5efe0]' : 'bg-transparent'
      }`}
    >
      <button className={`text-sm font-medium tracking-wide transition-colors ${scrolled ? 'text-[#2c2923]' : 'text-[#f5efe0]'}`}>
        EN
      </button>
      <button
        onClick={onMenuOpen}
        className={`flex flex-col gap-[5px] p-2 transition-colors ${scrolled ? 'text-[#2c2923]' : 'text-[#f5efe0]'}`}
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
        <span className="block w-6 h-px bg-current" />
      </button>
    </header>
  )
}
```

- [ ] **Step 6: Verify**

```bash
npm run dev
```

Visit `localhost:3000`. Expected: cream background, navbar fixed at top (transparent), clicking hamburger opens cream panel with nav links, × closes it. Footer visible at bottom.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: site layout with Navbar, Footer, MenuOverlay"
```

---

## Task 5: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/ui/HeroScrollCaret.tsx`

- [ ] **Step 1: Create HeroScrollCaret**

```tsx
// components/ui/HeroScrollCaret.tsx
'use client'

export default function HeroScrollCaret() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollDown}
      aria-label="Scroll down"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f5efe0] animate-bounce"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}
```

- [ ] **Step 2: Create Hero component**

```tsx
// components/sections/Hero.tsx
import Image from 'next/image'
import HeroScrollCaret from '@/components/ui/HeroScrollCaret'

interface HeroProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export default function Hero({ title, subtitle, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="relative w-full h-dvh overflow-hidden">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        id="hero-bg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f5efe0] px-5">
        {subtitle && (
          <p className="text-sm font-medium tracking-widest uppercase mb-4 opacity-80">
            {subtitle}
          </p>
        )}
        <h1
          id="hero-title"
          className="text-[clamp(48px,8vw,96px)] font-book leading-[1.1] max-w-3xl"
        >
          {title}
        </h1>
      </div>

      <HeroScrollCaret />
    </section>
  )
}
```

- [ ] **Step 3: Use Hero in Home page**

Replace `app/(site)/page.tsx`:

```tsx
import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero
        title="Don't Miss"
        subtitle="AlUla Arts Festival 2026 – Vertigo performance at Wadi Al Fann"
        imageSrc="/images/hero-hp.jpg"
        imageAlt="Villa Hegra hero"
      />
      <div className="min-h-screen bg-[#f5efe0] px-5 lg:px-12 py-24">
        <p className="text-lg max-w-xl">Villa Hegra content coming...</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Add a placeholder hero image**

```bash
mkdir -p public/images
# Place any temporary image at public/images/hero-hp.jpg
# (use a dark photo — can be replaced later with real assets)
```

If you don't have an image yet, use a solid color placeholder by replacing the `<Image>` with:
```tsx
<div className="absolute inset-0 bg-[#2c2923]" />
```
and remove the Image import temporarily.

- [ ] **Step 5: Verify**

```bash
npm run dev
```

Expected: full-viewport dark hero with "Don't Miss" centered in cream text, bouncing chevron at bottom, navbar transparent over it, turns cream on scroll.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: Hero section with scroll caret"
```

---

## Task 6: GSAP setup + GSAPProvider

**Files:**
- Create: `components/animations/GSAPProvider.tsx`
- Create: `lib/gsap/animations.ts`

- [ ] **Step 1: Create GSAPProvider**

This client component registers ScrollTrigger once at app root.

```tsx
// components/animations/GSAPProvider.tsx
'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Add GSAPProvider to site layout**

Edit `app/(site)/layout.tsx` — wrap children:

```tsx
'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MenuOverlay from '@/components/layout/MenuOverlay'
import GSAPProvider from '@/components/animations/GSAPProvider'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
```

- [ ] **Step 3: Create animation helpers**

```ts
// lib/gsap/animations.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Reveal lines of text with a clip-path mask slide-up.
 * Each `line` element inside `container` animates in sequence.
 */
export function revealLines(
  container: Element,
  options: { delay?: number; stagger?: number; trigger?: Element } = {}
) {
  const lines = container.querySelectorAll('[data-line]')

  gsap.set(lines, { y: 80, clipPath: 'inset(0 0 100% 0)' })

  return gsap.to(lines, {
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    duration: 0.9,
    ease: 'power3.out',
    stagger: options.stagger ?? 0.1,
    delay: options.delay ?? 0,
    scrollTrigger: {
      trigger: options.trigger ?? container,
      start: 'top 85%',
      once: true,
    },
  })
}

/**
 * Stagger reveal children (cards, logos, etc.)
 */
export function staggerReveal(
  container: Element,
  options: { stagger?: number; y?: number } = {}
) {
  const items = container.children

  gsap.set(items, { opacity: 0, y: options.y ?? 30, scale: 0.97 })

  return gsap.to(items, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: 'power2.out',
    stagger: options.stagger ?? 0.08,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      once: true,
    },
  })
}

/**
 * Parallax: move an element at `speed` fraction of scroll
 */
export function parallax(element: Element, speed = 0.35) {
  return gsap.to(element, {
    yPercent: speed * 100 * -1,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement ?? element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}
```

- [ ] **Step 4: Verify no console errors**

```bash
npm run dev
```

Expected: no errors in console about ScrollTrigger.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: GSAP + ScrollTrigger setup with animation helpers"
```

---

## Task 7: TextReveal animation component

**Files:**
- Create: `components/animations/TextReveal.tsx`

- [ ] **Step 1: Create component**

```tsx
// components/animations/TextReveal.tsx
'use client'

import { useRef, useEffect, ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TextRevealProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  splitBy?: 'lines' | 'words'
}

// Splits a string into word spans, grouped into line spans by width
function buildLineSpans(text: string): string {
  return text
    .split(' ')
    .map((word) => `<span class="inline-block overflow-hidden"><span data-word class="inline-block">${word}</span></span>`)
    .join(' ')
}

export default function TextReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.05,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return

    const words = ref.current.querySelectorAll('[data-word]')
    gsap.set(words, { y: '110%' })

    gsap.to(words, {
      y: '0%',
      duration: 0.85,
      ease: 'power3.out',
      stagger,
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        once: true,
      },
    })
  }, { scope: ref })

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      dangerouslySetInnerHTML={{ __html: buildLineSpans(children) }}
    />
  )
}
```

- [ ] **Step 2: Test it on the Home page**

In `app/(site)/page.tsx`, temporarily add:

```tsx
import TextReveal from '@/components/animations/TextReveal'

// Inside the content div after Hero:
<TextReveal as="h2" className="text-6xl font-medium" delay={0.1}>
  Artists Residencies
</TextReveal>
```

- [ ] **Step 3: Verify animation**

```bash
npm run dev
```

Scroll past the hero. Expected: "Artists Residencies" words slide up from behind a mask in sequence. If words don't animate, check console for GSAP errors.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: TextReveal GSAP word mask animation"
```

---

## Task 8: ParallaxImage + StaggerReveal components

**Files:**
- Create: `components/animations/ParallaxImage.tsx`
- Create: `components/animations/StaggerReveal.tsx`

- [ ] **Step 1: Create ParallaxImage**

```tsx
// components/animations/ParallaxImage.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.35,
  className = '',
  sizes = '100vw',
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageRef} className="absolute inset-0 scale-[1.3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create StaggerReveal**

```tsx
// components/animations/StaggerReveal.tsx
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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!ref.current) return

    const items = Array.from(ref.current.children)
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
  }, { scope: ref })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: ParallaxImage and StaggerReveal animation components"
```

---

## Task 9: CTAButton + FilterBar UI components

**Files:**
- Create: `components/ui/CTAButton.tsx`
- Create: `components/ui/FilterBar.tsx`

- [ ] **Step 1: CTAButton**

```tsx
// components/ui/CTAButton.tsx
import Link from 'next/link'

type CTAVariant = 'primary' | 'ghost' | 'arrow'

interface CTAButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: CTAVariant
  className?: string
}

export default function CTAButton({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-flex items-center gap-2 text-sm font-medium transition-all duration-200'

  const variants: Record<CTAVariant, string> = {
    primary:
      'border border-[#2c2923] px-5 py-2 hover:bg-[#2c2923] hover:text-[#f5efe0]',
    ghost:
      'underline underline-offset-4 hover:opacity-60',
    arrow:
      'group hover:gap-4',
  }

  const content = (
    <>
      {label}
      {variant === 'arrow' && (
        <span className="transition-transform group-hover:translate-x-1">→</span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </button>
  )
}
```

- [ ] **Step 2: FilterBar**

```tsx
// components/ui/FilterBar.tsx
'use client'

interface FilterOption {
  label: string
  value: string
}

interface FilterBarProps {
  timeFilters?: FilterOption[]
  categoryFilters?: FilterOption[]
  activeTime?: string
  activeCategory?: string
  onTimeChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  showArrows?: boolean
}

export default function FilterBar({
  timeFilters = [],
  categoryFilters = [],
  activeTime,
  activeCategory,
  onTimeChange,
  onCategoryChange,
  showArrows = false,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {/* Time filters */}
      {timeFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onTimeChange?.(f.value)}
          className={`text-sm px-0 pb-1 border-b transition-colors ${
            activeTime === f.value
              ? 'border-[#2c2923] font-medium'
              : 'border-transparent opacity-50 hover:opacity-80'
          }`}
        >
          {f.label}
        </button>
      ))}

      {/* Divider */}
      {timeFilters.length > 0 && categoryFilters.length > 0 && (
        <div className="h-8 w-px bg-[#2c2923] opacity-20 mx-1" />
      )}

      {/* Category filters */}
      {categoryFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onCategoryChange?.(f.value)}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${
            activeCategory === f.value
              ? 'bg-[#2c2923] text-[#f5efe0] border-[#2c2923]'
              : 'border-[#2c2923] opacity-50 hover:opacity-80'
          }`}
        >
          {f.label}
        </button>
      ))}

      {/* Arrows */}
      {showArrows && (
        <div className="ml-auto flex gap-2">
          <button className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors">
            ←
          </button>
          <button className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors">
            →
          </button>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: CTAButton and FilterBar UI components"
```

---

## Task 10: EventCard + ArtistCard components

**Files:**
- Create: `components/ui/EventCard.tsx`
- Create: `components/ui/ArtistCard.tsx`

- [ ] **Step 1: EventCard**

```tsx
// components/ui/EventCard.tsx
import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  image: string
  imageAlt: string
  category: string
  title: string
  date: string
  location: string
  href: string
  size?: 'small' | 'medium'
  isPast?: boolean
}

export default function EventCard({
  image,
  imageAlt,
  category,
  title,
  date,
  location,
  href,
  size = 'small',
  isPast = false,
}: EventCardProps) {
  const cardH = size === 'medium' ? 'h-[761px]' : 'h-[652px]'

  return (
    <article className={`relative ${cardH} flex flex-col overflow-hidden group`}>
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 354px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mt-auto p-4 text-[#f5efe0]">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs opacity-70 mb-2">
          <span>📅 {date}</span>
          <span>📍 {location}</span>
        </div>
        <span className="text-xs uppercase tracking-widest opacity-60 block mb-1">
          {category}
        </span>
        <h3 className="text-base font-medium leading-tight mb-4">{title}</h3>

        {/* CTA */}
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs border border-[#f5efe0] px-3 py-1.5 hover:bg-[#f5efe0] hover:text-[#2c2923] transition-colors"
        >
          {isPast ? 'Discover' : 'Book now'}{' '}
          <span className="text-[10px]">↗</span>
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: ArtistCard**

```tsx
// components/ui/ArtistCard.tsx
import Image from 'next/image'
import Link from 'next/link'

interface ArtistCardProps {
  photo: string
  photoAlt: string
  discipline: string
  name: string
  dates: string
  href: string
}

export default function ArtistCard({
  photo,
  photoAlt,
  discipline,
  name,
  dates,
  href,
}: ArtistCardProps) {
  return (
    <article className="group">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden mb-3">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          sizes="(max-width: 768px) 100vw, 351px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-[#8b6546]">
          ✦ {discipline}
        </p>
        <h3 className="text-lg font-medium leading-tight">{name}</h3>
        <p className="text-sm opacity-60">{dates}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm hover:gap-2 transition-all"
        >
          More info →
        </Link>
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: EventCard and ArtistCard components"
```

---

## Task 11: OpenCallItem + LogoGrid components

**Files:**
- Create: `components/ui/OpenCallItem.tsx`
- Create: `components/ui/LogoGrid.tsx`

- [ ] **Step 1: OpenCallItem**

```tsx
// components/ui/OpenCallItem.tsx
interface OpenCallItemProps {
  discipline: string
  title: string
  description: string
  dateRange: string
  moreInfoUrl?: string
}

export default function OpenCallItem({
  discipline,
  title,
  description,
  dateRange,
  moreInfoUrl = '#',
}: OpenCallItemProps) {
  return (
    <div className="flex items-start justify-between gap-8 py-6 border-b border-[#2c2923]/20 group">
      <div className="flex-1 space-y-1">
        <p className="text-xs uppercase tracking-widest text-[#8b6546]">
          ✦ {discipline}
        </p>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm opacity-60 leading-relaxed max-w-xl">{description}</p>
        <p className="text-xs opacity-40">{dateRange}</p>
      </div>
      <a
        href={moreInfoUrl}
        className="shrink-0 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all mt-1"
      >
        More info →
      </a>
    </div>
  )
}
```

- [ ] **Step 2: LogoGrid**

```tsx
// components/ui/LogoGrid.tsx
import Image from 'next/image'

interface LogoItem {
  src: string
  alt: string
  href?: string
}

interface LogoGridProps {
  logos: LogoItem[]
  className?: string
}

export default function LogoGrid({ logos, className = '' }: LogoGridProps) {
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-6 items-center ${className}`}>
      {logos.map((logo) => {
        const img = (
          <div className="relative w-[163px] h-[90px]">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="163px"
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )

        if (logo.href) {
          return (
            <a key={logo.alt} href={logo.href} target="_blank" rel="noopener noreferrer">
              {img}
            </a>
          )
        }

        return <div key={logo.alt}>{img}</div>
      })}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: OpenCallItem and LogoGrid components"
```

---

## Task 12: Home page — full implementation

**Files:**
- Create: `components/sections/WhatIsOn.tsx`
- Create: `components/sections/ArtistsResidenciesSection.tsx`
- Create: `components/sections/LocationSection.tsx`
- Modify: `app/(site)/page.tsx`

- [ ] **Step 1: WhatIsOn section**

```tsx
// components/sections/WhatIsOn.tsx
'use client'

import { useState } from 'react'
import EventCard from '@/components/ui/EventCard'
import StaggerReveal from '@/components/animations/StaggerReveal'
import FilterBar from '@/components/ui/FilterBar'
import CTAButton from '@/components/ui/CTAButton'
import TextReveal from '@/components/animations/TextReveal'

const SAMPLE_EVENTS = [
  {
    id: '1',
    image: '/images/event-1.jpg',
    imageAlt: 'AlUla Arts Festival 2026 – Vertigo',
    category: 'Events',
    title: 'AlUla Arts Festival 2026 – Vertigo',
    date: 'January – February 2026',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '2',
    image: '/images/event-2.jpg',
    imageAlt: 'AlUla Arts Festival 2026 – Urban dance Showcase',
    category: 'Events',
    title: 'AlUla Arts Festival 2026 – Urban dance Showcase',
    date: 'January – February 2026',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '3',
    image: '/images/event-3.jpg',
    imageAlt: 'Les Mains by Auguste Rodin',
    category: 'Exhibitions',
    title: '"Les Mains" by Auguste Rodin',
    date: 'November 2025',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '4',
    image: '/images/event-4.jpg',
    imageAlt: 'Film Appreciation Programme',
    category: 'Cinema',
    title: 'Film Appreciation Programme',
    date: 'October 2025',
    location: 'Villa Hegra',
    href: '#',
  },
]

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Cinéma', value: 'cinema' },
  { label: 'Exhibitions', value: 'exhibitions' },
  { label: 'Events', value: 'events' },
  { label: 'Workshops', value: 'workshops' },
]

export default function WhatIsOn() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <section className="py-16 lg:py-24">
      {/* Header row */}
      <div className="px-5 lg:px-12 max-w-[1512px] mx-auto mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <TextReveal
          as="h2"
          className="text-[clamp(40px,5vw,80px)] font-book leading-none"
        >
          What's On
        </TextReveal>
        <div className="flex flex-col lg:items-end gap-4">
          <p className="text-base opacity-70 max-w-xs">
            Discover our artistic and cultural programming
          </p>
          <CTAButton label="See all events" href="/programming" variant="arrow" />
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-5 lg:px-12 max-w-[1512px] mx-auto mb-6">
        <FilterBar
          categoryFilters={categoryFilters}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          showArrows
        />
      </div>

      {/* Cards — horizontal scroll */}
      <div className="overflow-x-auto">
        <StaggerReveal
          className="flex gap-1 px-5 lg:px-12"
          stagger={0.06}
        >
          {SAMPLE_EVENTS.map((event) => (
            <div key={event.id} className="shrink-0 w-[354px]">
              <EventCard {...event} />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: ArtistsResidenciesSection**

```tsx
// components/sections/ArtistsResidenciesSection.tsx
import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

const SAMPLE_ARTISTS = [
  'Théo Mercier,',
  'Paul Emilieu Marchesseau,',
  'Badr Ali, Saad Tahaitah,',
]

export default function ArtistsResidenciesSection() {
  return (
    <section className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        {/* Top: title + description */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24 mb-12">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(40px,5vw,80px)] font-book leading-none"
            >
              Artists Residencies
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-8 space-y-6">
            <span className="text-xs uppercase tracking-widest opacity-60">2025</span>
            <p className="text-base opacity-70 leading-relaxed max-w-sm">
              Villa Hegra hosts Saudi and French artists from various disciplines
              (design, visual arts, performing arts, cinema) as part of its
              residency program.
            </p>
          </div>
        </div>

        {/* Artist names — large text list */}
        <div className="mb-10">
          {SAMPLE_ARTISTS.map((name) => (
            <p
              key={name}
              className="text-[clamp(24px,4vw,56px)] font-book leading-tight opacity-80 hover:opacity-100 transition-opacity cursor-default"
            >
              {name}
            </p>
          ))}
        </div>

        <CTAButton label="See all residencies" href="/residencies" variant="ghost" className="text-[#f5efe0] border-[#f5efe0]" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: LocationSection**

```tsx
// components/sections/LocationSection.tsx
import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

export default function LocationSection() {
  return (
    <section className="px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/2 space-y-6">
          <TextReveal
            as="h2"
            className="text-[clamp(40px,5vw,80px)] font-book leading-none"
          >
            Our Location
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-sm">
            Villa Hegra's site is located in central AlUla. All visitors are
            welcomed during working hours to attend our cultural programming.
          </p>
          <CTAButton label="Learn more about Villa Hegra" href="/the-villa" variant="arrow" />
        </div>

        {/* Map placeholder */}
        <div className="lg:w-1/2 h-64 lg:h-96 bg-[#bfb098] flex items-center justify-center">
          <span className="text-sm opacity-50">Map — AlUla, Saudi Arabia</span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Assemble Home page**

Replace `app/(site)/page.tsx`:

```tsx
import Hero from '@/components/sections/Hero'
import WhatIsOn from '@/components/sections/WhatIsOn'
import ArtistsResidenciesSection from '@/components/sections/ArtistsResidenciesSection'
import LocationSection from '@/components/sections/LocationSection'
import AboutIntro from '@/components/sections/AboutIntro'

export default function Home() {
  return (
    <main>
      <Hero
        title="Don't Miss"
        subtitle="AlUla Arts Festival 2026"
        imageSrc="/images/hero-hp.jpg"
        imageAlt="AlUla landscape"
      />
      <AboutIntro />
      <WhatIsOn />
      <ArtistsResidenciesSection />
      <LocationSection />
    </main>
  )
}
```

- [ ] **Step 5: Create AboutIntro section**

```tsx
// components/sections/AboutIntro.tsx
import TextReveal from '@/components/animations/TextReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'
import CTAButton from '@/components/ui/CTAButton'

export default function AboutIntro() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[698px]">
      {/* Text */}
      <div className="flex flex-col justify-end px-5 lg:px-12 py-16 order-2 lg:order-1">
        <p className="text-sm leading-relaxed opacity-80 max-w-sm mb-8">
          Villa Hegra is an institution dedicated to cross-cultural cooperation,
          born from the friendship between Saudi Arabia and France. Villa Hegra
          is located in AlUla, a vast region in northwest Saudi Arabia that holds
          the country's first UNESCO World Heritage designation.
        </p>
        <CTAButton label="Discover" href="/the-villa" variant="primary" />
      </div>

      {/* Image */}
      <div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden">
        <ParallaxImage
          src="/images/about-villa.jpg"
          alt="Villa Hegra building"
          speed={0.3}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Verify Home page**

```bash
npm run dev
```

Visit `localhost:3000`. Expected:
- Full-screen hero
- About intro with text + image
- "What's On" section with event cards + filter bar
- Dark "Artists Residencies" section with large artist names
- "Our Location" section with map placeholder

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: Home page with all sections"
```

---

## Task 13: The Villa page

**Files:**
- Create: `components/sections/FoundingEntities.tsx`
- Create: `components/sections/PartnersSection.tsx`
- Create: `app/(site)/the-villa/page.tsx`

- [ ] **Step 1: Create page**

```tsx
// app/(site)/the-villa/page.tsx
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'
import FoundingEntities from '@/components/sections/FoundingEntities'
import PartnersSection from '@/components/sections/PartnersSection'

export default function TheVillaPage() {
  return (
    <main>
      <Hero
        title="The Villa"
        imageSrc="/images/hero-villa.jpg"
        imageAlt="Villa Hegra exterior"
      />

      {/* Section 1: Villa Hegra intro */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[768px]">
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6">
          <TextReveal as="h2" className="text-[clamp(36px,4vw,64px)] font-book">
            Villa Hegra
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Born from the friendship between Saudi Arabia and France, Villa Hegra
            is a bilateral institution dedicated to cross-cultural cooperation.
            It supports contemporary creation in the fields of visual arts,
            design, cinema and performing arts, providing a space open to
            creativity, education and exchange.
          </p>
        </div>
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <ParallaxImage
            src="/images/villa-section1.jpg"
            alt="Villa Hegra interior"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* Section 2: Viva Villa network */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[756px]">
        <div className="relative h-64 lg:h-auto overflow-hidden order-2 lg:order-1">
          <ParallaxImage
            src="/images/villa-section2.jpg"
            alt="Cultural exchange event"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 order-1 lg:order-2">
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Villa Hegra is part of ¡Viva Villa!, the international network of
            cultural villas, along with Villa Medici in Rome, Villa Kujoyama in
            Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United
            States, and Villa Swagatam in India. These institutions nurture
            creation and cross-cultural dialogue, offering time and space for
            artists to develop their work.
          </p>
        </div>
      </section>

      <FoundingEntities />
      <PartnersSection />
    </main>
  )
}
```

- [ ] **Step 2: FoundingEntities**

```tsx
// components/sections/FoundingEntities.tsx
import TextReveal from '@/components/animations/TextReveal'
import Image from 'next/image'

export default function FoundingEntities() {
  return (
    <section className="bg-[#bfb098] px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/2">
            <TextReveal as="h2" className="text-[clamp(36px,4vw,64px)] font-book">
              Founding entities
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-4">
            <p className="text-base leading-relaxed max-w-md">
              Villa Hegra's founding entities are the Royal Commission for AlUla
              (RCU) and the French Agency for AlUla Development (Afalula).
            </p>
          </div>
        </div>

        {/* Logos */}
        <div className="flex items-center gap-12 flex-wrap">
          <div className="relative w-[163px] h-[90px] bg-white/40 flex items-center justify-center">
            <span className="text-xs opacity-50">RCU Logo</span>
          </div>
          <div className="relative w-[163px] h-[90px] bg-white/40 flex items-center justify-center">
            <span className="text-xs opacity-50">Afalula Logo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: PartnersSection**

```tsx
// components/sections/PartnersSection.tsx
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import LogoGrid from '@/components/ui/LogoGrid'

// Placeholder logos — replace with real assets
const PARTNERS = Array.from({ length: 19 }, (_, i) => ({
  src: `/images/partner-${i + 1}.png`,
  alt: `Partner ${i + 1}`,
}))

export default function PartnersSection() {
  return (
    <section className="px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        <TextReveal as="h2" className="text-[clamp(36px,4vw,64px)] font-book mb-12">
          Partners
        </TextReveal>
        <LogoGrid logos={PARTNERS} />
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Visit `localhost:3000/the-villa`. Expected: hero + 2 split sections + founding entities + partners grid.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: The Villa page"
```

---

## Task 14: Venue page

**Files:**
- Create: `components/sections/VenueGallery.tsx`
- Create: `app/(site)/venue/page.tsx`

- [ ] **Step 1: VenueGallery**

```tsx
// components/sections/VenueGallery.tsx
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const GALLERY_IMAGES = [
  { src: '/images/venue-1.jpg', alt: 'Venue interior 1' },
  { src: '/images/venue-2.jpg', alt: 'Venue interior 2' },
  { src: '/images/venue-3.jpg', alt: 'Venue interior 3' },
  { src: '/images/venue-4.jpg', alt: 'Venue interior 4' },
  { src: '/images/venue-5.jpg', alt: 'Venue interior 5' },
]

export default function VenueGallery() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-8 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto px-5 lg:px-12 pb-4 snap-x snap-mandatory">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.alt}
            className="shrink-0 w-[280px] lg:w-[360px] aspect-[4/3] relative overflow-hidden snap-start cursor-pointer"
            onClick={() => setActive(i)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="360px"
              className={`object-cover transition-all duration-300 ${
                active === i ? 'scale-100' : 'scale-100 brightness-75'
              }`}
            />
            {/* Orange + indicator */}
            <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#ce6223] flex items-center justify-center">
              <span className="text-white text-xs">+</span>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex justify-end gap-2 px-5 lg:px-12 mt-4">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => setActive((p) => Math.min(GALLERY_IMAGES.length - 1, p + 1))}
          className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors"
        >
          →
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Venue page**

```tsx
// app/(site)/venue/page.tsx
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'
import VenueGallery from '@/components/sections/VenueGallery'
import LocationSection from '@/components/sections/LocationSection'

export default function VenuePage() {
  return (
    <main>
      <Hero
        title="Venue"
        imageSrc="/images/hero-venue.jpg"
        imageAlt="Villa Hegra venue"
      />

      {/* Landmark intro */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6">
          <TextReveal as="h2" className="text-[clamp(36px,4vw,64px)] font-book leading-tight">
            A new Cultural Landmark in AlUla
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Villa Hegra opened its doors in central AlUla in October 2025. The
            villa resulting from the renovation of two existing buildings, serves
            as the hub of its artistic and cultural programming. The Villa houses
            two studios, fully equipped studios, an outside workspace, and seven
            apartments for resident artists.
          </p>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            It also includes an exhibition annex, a 50-seat auditorium which is
            the first indoor cinema in AlUla, as well as the city's first
            performing arts studio and workshop spaces designed especially for
            children and teenagers.
          </p>
        </div>
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <ParallaxImage
            src="/images/venue-main.jpg"
            alt="Villa Hegra cultural landmark"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* Gallery */}
      <VenueGallery />

      {/* Permanent building */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] bg-[#bfb098]">
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <ParallaxImage
            src="/images/venue-permanent.jpg"
            alt="Future permanent building"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6">
          <TextReveal as="h2" className="text-[clamp(28px,3vw,48px)] font-book leading-tight">
            Towards a permanent building designed by Lacaton & Vassal
          </TextReveal>
          <p className="text-base opacity-80 leading-relaxed max-w-md">
            Looking ahead, in the Phase 2, Villa Hegra will be housed in a new
            building designed by Pritzker Prize laureates Anne Lacaton and
            Jean-Philippe Vassal.
          </p>
        </div>
      </section>

      <LocationSection />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Visit `localhost:3000/venue`. Expected: hero + landmark section + gallery with arrows + permanent building section + location.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: Venue page with gallery"
```

---

## Task 15: Programming page

**Files:**
- Create: `components/sections/EventsGrid.tsx`
- Create: `app/(site)/programming/page.tsx`

- [ ] **Step 1: EventsGrid**

```tsx
// components/sections/EventsGrid.tsx
'use client'

import { useState } from 'react'
import EventCard from '@/components/ui/EventCard'
import FilterBar from '@/components/ui/FilterBar'
import StaggerReveal from '@/components/animations/StaggerReveal'

interface Event {
  id: string
  image: string
  imageAlt: string
  category: string
  title: string
  date: string
  location: string
  href: string
}

interface EventsGridProps {
  events: Event[]
  showTimeFilter?: boolean
  title?: string
}

const timeFilters = [
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
]

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Cinéma', value: 'cinema' },
  { label: 'Exhibitions', value: 'exhibitions' },
  { label: 'Events', value: 'events' },
  { label: 'Workshops', value: 'workshops' },
]

export default function EventsGrid({
  events,
  showTimeFilter = true,
}: EventsGridProps) {
  const [activeTime, setActiveTime] = useState('month')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? events
      : events.filter(
          (e) => e.category.toLowerCase() === activeCategory
        )

  return (
    <div>
      <div className="px-5 lg:px-12 mb-4">
        <FilterBar
          timeFilters={showTimeFilter ? timeFilters : []}
          categoryFilters={categoryFilters}
          activeTime={activeTime}
          activeCategory={activeCategory}
          onTimeChange={setActiveTime}
          onCategoryChange={setActiveCategory}
          showArrows
        />
      </div>
      <div className="overflow-x-auto">
        <StaggerReveal className="flex gap-1 px-5 lg:px-12" stagger={0.06}>
          {filtered.map((event) => (
            <div key={event.id} className="shrink-0 w-[576px]">
              <EventCard {...event} size="medium" />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Programming page**

```tsx
// app/(site)/programming/page.tsx
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import EventsGrid from '@/components/sections/EventsGrid'

const UPCOMING_EVENTS = [
  { id: '1', image: '/images/event-1.jpg', imageAlt: 'AlUla Arts Festival 2026 – Vertigo', category: 'Events', title: 'AlUla Arts Festival 2026 – Vertigo', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '2', image: '/images/event-2.jpg', imageAlt: 'Not Deserted: AlUla's Archives in Movement Exhibition', category: 'Exhibitions', title: 'Not Deserted: AlUla's Archives in Movement Exhibition', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '3', image: '/images/event-3.jpg', imageAlt: 'Urban dance Showcase', category: 'Events', title: 'AlUla Arts Festival 2026 – Urban dance Showcase', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '4', image: '/images/event-4.jpg', imageAlt: 'Les Mains by Auguste Rodin', category: 'Exhibitions', title: '"Les Mains" by Auguste Rodin', date: 'November 2025', location: 'Villa Hegra', href: '#' },
  { id: '5', image: '/images/event-5.jpg', imageAlt: 'Film Appreciation Programme', category: 'Cinema', title: 'Film Appreciation Programme', date: 'October 2025', location: 'Villa Hegra', href: '#' },
]

const PAST_EVENTS = [
  { id: '6', image: '/images/past-1.jpg', imageAlt: 'Art Paris 2025', category: 'Exhibitions', title: 'Art Paris 2025 – Villa Hegra Exhibition', date: 'April 2025', location: 'Villa Hegra', href: '#' },
  { id: '7', image: '/images/past-2.jpg', imageAlt: 'Crossings by the Junior Ballet', category: 'Events', title: 'Crossings by the Junior Ballet of the Opéra national de Paris', date: 'December 2024', location: 'Villa Hegra', href: '#' },
  { id: '8', image: '/images/past-3.jpg', imageAlt: 'Night with the Opéra national de Paris', category: 'Events', title: 'Night with the Opéra national de Paris', date: 'January 2024', location: 'Villa Hegra', href: '#' },
  { id: '9', image: '/images/past-4.jpg', imageAlt: 'Cine-concerts', category: 'Cinema', title: 'Cine-concerts', date: 'November 2023', location: 'Villa Hegra', href: '#' },
]

export default function ProgrammingPage() {
  return (
    <main>
      <Hero
        title="Programming"
        imageSrc="/images/hero-programming.jpg"
        imageAlt="Cultural event in AlUla"
      />

      {/* Upcoming section header */}
      <section className="px-5 lg:px-12 py-16 max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-24 mb-12">
          <div className="lg:w-1/2">
            <TextReveal as="h2" className="text-[clamp(40px,5vw,80px)] font-book">
              Upcoming Events
            </TextReveal>
          </div>
          <p className="lg:w-1/2 lg:pt-8 text-base opacity-70 max-w-md">
            Villa Hegra's cultural programming includes a wide range of
            initiatives such as Creative Workshops, Cine-Concerts, Performances,
            Masterclasses, Research Projects, and Academic Exchange Programs.
          </p>
        </div>
      </section>

      <EventsGrid events={UPCOMING_EVENTS} showTimeFilter />

      {/* Past events */}
      <section className="px-5 lg:px-12 py-16 max-w-[1512px] mx-auto mt-16">
        <TextReveal as="h2" className="text-[clamp(40px,5vw,80px)] font-book mb-12">
          Past Events
        </TextReveal>
      </section>

      <EventsGrid events={PAST_EVENTS} showTimeFilter={false} />
    </main>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Visit `localhost:3000/programming`. Expected: hero + "Upcoming Events" with time/category filters + horizontal card scroll + "Past Events" with its own grid.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: Programming page with event grids and filters"
```

---

## Task 16: Residencies page

**Files:**
- Create: `app/(site)/residencies/page.tsx`

- [ ] **Step 1: Create page**

```tsx
// app/(site)/residencies/page.tsx
'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import ArtistCard from '@/components/ui/ArtistCard'
import OpenCallItem from '@/components/ui/OpenCallItem'
import FilterBar from '@/components/ui/FilterBar'

const OPEN_CALLS = [
  {
    discipline: 'Photography',
    title: 'Photography Award – Académie des Beaux-Arts',
    description:
      'Photography will soon celebrate its 300th anniversary. On this occasion, a major nationwide programme will honour French photographic creation and heritage from September 2026 to September 2027.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Lorem ipsum dolor sit amet consectetur. Mauris.',
    description:
      'Photography will soon celebrate its 300th anniversary. On this occasion, a major nationwide programme will honour French photographic creation and heritage from September 2026 to September 2027.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Lorem ipsum dolor sit amet consectetur. Mauris.',
    description:
      'Photography will soon celebrate its 300th anniversary. On this occasion, a major nationwide programme will honour French photographic creation and heritage from September 2026 to September 2027.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
]

const ARTISTS = [
  { photo: '/images/artist-1.jpg', photoAlt: 'Théo Mercier', discipline: 'Visual Arts Residency', name: 'Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-2.jpg', photoAlt: 'Paul Emilieu Marchesseau', discipline: 'Design Residency', name: 'Paul Emilieu Marchesseau', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-3.jpg', photoAlt: 'Badr Ali', discipline: 'Design Residency', name: 'Badr Ali', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-4.jpg', photoAlt: 'Rachid Ouramdane', discipline: 'Performing Arts Residency', name: 'Rachid Ouramdane', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-5.jpg', photoAlt: 'Sara Brahim and Ugo Schiavi', discipline: 'Visual Arts Residency', name: 'Sara Brahim and Ugo Schiavi', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-6.jpg', photoAlt: 'Abdulrahman Alsoliman and Théo Mercier', discipline: 'Visual Arts Residency', name: 'Abdulrahman Alsoliman and Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-7.jpg', photoAlt: 'Saad Tahaitah', discipline: 'Film Residency', name: 'Saad Tahaitah', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-8.jpg', photoAlt: 'Bashaer Hawsawi', discipline: 'Design Residency', name: 'Bashaer Hawsawi', dates: 'October 2025', href: '#' },
]

const disciplineFilters = [
  { label: 'Residencies', value: 'all' },
  { label: 'Visual Arts', value: 'visual-arts' },
  { label: 'Design', value: 'design' },
  { label: 'Cinema', value: 'cinema' },
  { label: 'Performing Arts', value: 'performing-arts' },
]

export default function ResidenciesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? ARTISTS
      : ARTISTS.filter((a) =>
          a.discipline.toLowerCase().includes(activeFilter.replace('-', ' '))
        )

  return (
    <main>
      <Hero
        title="Residencies"
        imageSrc="/images/hero-residencies.jpg"
        imageAlt="Residencies at Villa Hegra"
      />

      {/* Apply section */}
      <section className="px-5 lg:px-12 py-16">
        <div className="max-w-[1512px] mx-auto">
          <TextReveal as="h2" className="text-[clamp(40px,5vw,80px)] font-book mb-12">
            Apply for residencies
          </TextReveal>
          <div>
            {OPEN_CALLS.map((call) => (
              <OpenCallItem key={call.title} {...call} />
            ))}
          </div>
        </div>
      </section>

      {/* Artists section */}
      <section className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-12 py-16">
        <div className="max-w-[1512px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-24 mb-10">
            <TextReveal
              as="h2"
              className="text-[clamp(36px,4vw,64px)] font-book lg:w-1/2"
            >
              Villa Hegra residencies
            </TextReveal>
            <p className="lg:w-1/2 lg:pt-4 text-base opacity-70 max-w-sm mt-4 lg:mt-0">
              Villa Hegra hosts Saudi and French artists from various disciplines
              (design, visual arts, performing arts, cinema) as part of its
              residency program.
            </p>
          </div>

          <div className="mb-8">
            <FilterBar
              categoryFilters={disciplineFilters}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
            />
          </div>

          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            stagger={0.06}
          >
            {filtered.map((artist) => (
              <ArtistCard key={artist.name} {...artist} />
            ))}
          </StaggerReveal>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

Visit `localhost:3000/residencies`. Expected: hero + open calls list + dark section with artist cards grid + filter bar.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Residencies page with open calls and artist grid"
```

---

## Task 17: Research placeholder page

**Files:**
- Create: `app/(site)/research/page.tsx`

- [ ] **Step 1: Create placeholder**

```tsx
// app/(site)/research/page.tsx
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'

export default function ResearchPage() {
  return (
    <main>
      <Hero
        title="Research and Exchanges"
        imageSrc="/images/hero-research.jpg"
        imageAlt="Research and exchanges"
      />
      <section className="px-5 lg:px-12 py-24">
        <div className="max-w-[1512px] mx-auto">
          <TextReveal as="h2" className="text-[clamp(36px,4vw,64px)] font-book mb-8">
            Coming soon
          </TextReveal>
          <p className="text-base opacity-70 max-w-lg">
            Villa Hegra's research and exchanges programme is currently being
            developed. Check back soon for updates.
          </p>
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: Research placeholder page"
```

---

## Task 18: MenuOverlay GSAP animation

**Files:**
- Modify: `components/layout/MenuOverlay.tsx`

- [ ] **Step 1: Add GSAP animation to MenuOverlay**

Replace `components/layout/MenuOverlay.tsx` entirely:

```tsx
'use client'

import { useRef, useEffect } from 'react'
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
  const navItemsRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!panelRef.current || !navItemsRef.current) return

    const panel = panelRef.current
    const navItems = navItemsRef.current.querySelectorAll('[data-nav-item]')
    const backdrop = overlayRef.current

    // Kill existing
    tlRef.current?.kill()

    if (isOpen) {
      // Make overlay visible before animation
      gsap.set(panel, { x: '100%' })
      gsap.set(backdrop, { opacity: 0, pointerEvents: 'auto' })

      const tl = gsap.timeline()
      tl.to(backdrop, { opacity: 1, duration: 0.3 })
        .to(panel, { x: '0%', duration: 0.6, ease: 'power3.out' }, 0)
        .fromTo(
          navItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
          0.25
        )

      tlRef.current = tl
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          // After close animation, reset pointer events
          if (backdrop) gsap.set(backdrop, { pointerEvents: 'none' })
        },
      })
      tl.to(navItems, { y: -20, opacity: 0, duration: 0.3, stagger: 0.03 })
        .to(panel, { x: '100%', duration: 0.5, ease: 'power3.in' }, 0.1)
        .to(backdrop, { opacity: 0, duration: 0.4 }, 0)

      tlRef.current = tl
    }
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] pointer-events-none opacity-0"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-[624px] max-w-full h-full bg-[#f5efe0] flex flex-col px-[50px] lg:px-[130px] py-8 translate-x-full"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-3xl font-light"
          aria-label="Close menu"
        >
          ×
        </button>

        {/* Logo mark */}
        <div className="mb-12 text-2xl font-medium tracking-wide">VH</div>

        {/* Nav items wrapper */}
        <div ref={navItemsRef} className="flex flex-col gap-4 flex-1">
          {/* Main nav */}
          <nav className="flex flex-col gap-6 mb-10">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-nav-item
                onClick={onClose}
                className="text-[32px] font-medium text-[#2c2923] leading-tight hover:opacity-50 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Secondary nav */}
          <nav className="flex flex-col gap-2.5">
            {secondaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                data-nav-item
                onClick={onClose}
                className="text-base text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#2c2923]/10">
          <button className="flex items-center gap-1 text-sm font-medium">
            EN <span className="text-xs">▲</span>
          </button>
          <div className="flex gap-4 text-sm">
            <a href="#" aria-label="YouTube" className="opacity-60 hover:opacity-100 transition-opacity">YT</a>
            <a href="#" aria-label="LinkedIn" className="opacity-60 hover:opacity-100 transition-opacity">LI</a>
            <a href="#" aria-label="Instagram" className="opacity-60 hover:opacity-100 transition-opacity">IG</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify animation**

```bash
npm run dev
```

Click the burger icon. Expected: backdrop fades in, panel slides smoothly from right, nav links appear in stagger. Click × or backdrop: reversal animation plays, panel slides back out.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: MenuOverlay GSAP slide animation with stagger"
```

---

## Task 19: Hero GSAP animations (parallax + text reveal)

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Add GSAP to Hero**

Replace `components/sections/Hero.tsx`:

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScrollCaret from '@/components/ui/HeroScrollCaret'

interface HeroProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export default function Hero({ title, subtitle, imageSrc, imageAlt }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current || !bgRef.current) return

    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Page load: zoom-in bg + text reveal
    const tl = gsap.timeline({ delay: 0.1 })

    tl.fromTo(
      bgRef.current,
      { scale: 1.08 },
      { scale: 1, duration: 1.4, ease: 'power2.out' }
    )

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0.3
      )
    }

    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('[data-word]')
      tl.fromTo(
        words,
        { y: '110%' },
        { y: '0%', duration: 0.85, ease: 'power3.out', stagger: 0.06 },
        0.4
      )
    }
  }, { scope: sectionRef })

  // Build word spans for title
  const titleWords = title.split(' ').map((word) => (
    <span key={word} className="inline-block overflow-hidden mr-[0.25em]">
      <span data-word className="inline-block">
        {word}
      </span>
    </span>
  ))

  return (
    <section ref={sectionRef} className="relative w-full h-dvh overflow-hidden">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f5efe0] px-5">
        {subtitle && (
          <p ref={subtitleRef} className="text-xs font-medium tracking-widest uppercase mb-4 opacity-0">
            {subtitle}
          </p>
        )}
        <h1 ref={titleRef} className="text-[clamp(48px,8vw,96px)] font-book leading-[1.05] max-w-3xl">
          {titleWords}
        </h1>
      </div>

      <HeroScrollCaret />
    </section>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npm run dev
```

On any page with a Hero. Expected:
- Page loads: hero image zooms from 108% to 100% over 1.4s
- Title words slide up from below a mask in sequence
- On scroll: hero image moves at 30% speed (parallax)

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: Hero GSAP parallax and load animations"
```

---

## Task 20: CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Create CLAUDE.md**

```markdown
# Villa Hegra — Developer Guide

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build check
npm run lint       # ESLint
```

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 App Router | ISR via Sanity webhooks (Plan 2) |
| Styles | Tailwind CSS v4 | Design tokens in `styles/globals.css` |
| Animations | GSAP 3 + ScrollTrigger | See `components/animations/` |
| CMS | Sanity v3 | Plan 2 — not yet integrated |
| i18n | next-intl | Plan 3 — EN + FR |
| Font | PP Neue Montreal Arabic | `public/fonts/` — Book (375) + Medium (500) |

## Figma Sources

| Page | Node ID | URL |
|---|---|---|
| Components | 4189-50296 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| HP | 3898-19788 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| Menu | 5293-17902 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| Residencies | 3898-20068 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| The Villa | 3898-21566 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| Venue | 3898-22533 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| Programming | 3898-19963 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |
| Icons | 4189-50304 | [Figma](https://www.figma.com/design/JOZsVjqPleL1ijTs2oCDjg) |

File key: `JOZsVjqPleL1ijTs2oCDjg`

## Design Tokens

Colors, typography, and spacing are defined as CSS variables in `styles/globals.css`.
Always use tokens instead of raw hex values:

```tsx
// ✅ Correct
className="bg-[var(--color-light-cream)] text-[var(--color-black-grey)]"
// or with Tailwind aliases:
className="bg-light-cream text-black-grey"

// ❌ Wrong
className="bg-[#f5efe0]"
```

## Animation Patterns

### Text reveal (headings + body)
```tsx
import TextReveal from '@/components/animations/TextReveal'

<TextReveal as="h2" className="text-6xl font-book" delay={0.1}>
  Your heading text here
</TextReveal>
```
Always use `TextReveal` for section headings. It handles the GSAP word mask on scroll.

### Parallax images
```tsx
import ParallaxImage from '@/components/animations/ParallaxImage'

<div className="relative h-96 overflow-hidden">
  <ParallaxImage src="/images/photo.jpg" alt="..." speed={0.3} className="absolute inset-0 h-full w-full" />
</div>
```
Parent must have `overflow-hidden`. Image scales to 130% to cover parallax offset.

### Card stagger
```tsx
import StaggerReveal from '@/components/animations/StaggerReveal'

<StaggerReveal className="grid grid-cols-4 gap-4" stagger={0.08}>
  <Card />
  <Card />
</StaggerReveal>
```

## Git Workflow with Worktrees

For feature work, use git worktrees to avoid disrupting your main working directory:

```bash
# Create a new branch + worktree
git worktree add ../villa-hegra-feat-menu feat/menu-animation

# Work in the isolated copy
cd ../villa-hegra-feat-menu
npm install
npm run dev   # runs on a different port automatically

# When done, remove the worktree
git worktree remove ../villa-hegra-feat-menu
```

Each worktree is on its own branch. Commit, push, open a PR from there.

## Localhost-first Workflow

1. Implement locally → validate visually at `localhost:3000`
2. Client/designer reviews
3. Once approved → `git commit` → `git push` → GitHub PR → Vercel preview auto-deploys
4. Sign-off on Vercel preview → merge to `main` → production

## Environment Variables

For Plan 2 (Sanity), you will need:

```bash
# Create .env.local (never commit this file)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
SANITY_REVALIDATE_SECRET=your_secret
```

Pull from Vercel: `vercel env pull .env.local`

## Adding a New Page

1. Create `app/(site)/your-page/page.tsx`
2. Add the route to `mainNav` in `components/layout/MenuOverlay.tsx`
3. Add a `Hero` component at the top
4. Use `TextReveal` for all headings
5. Use `ParallaxImage` for full-bleed images

## Font Licensing

PP Neue Montreal Arabic is a commercial font. The `.woff2` files in `public/fonts/`
are for development only. Ensure the client has a valid license for production use.
Contact: [Pangram Pangram Foundry](https://pangrampangram.com)
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md team guide"
```

---

## Task 21: TypeScript + ESLint check + final build

- [ ] **Step 1: Fix any TypeScript errors**

```bash
npx tsc --noEmit
```

Fix all reported errors. Common ones:
- Missing `'use client'` on components using hooks
- Untyped GSAP refs (use `gsap.core.Timeline`)
- `ref` type mismatch on `as` prop in TextReveal — fix by using `any` for the ref or separate component per tag

- [ ] **Step 2: Fix ESLint warnings**

```bash
npm run lint
```

Fix all warnings. Key rules to watch:
- `next/image` — never use `<img>` tags; always `<Image>`
- `react-hooks/exhaustive-deps` — add missing deps to useEffect arrays
- `@typescript-eslint/no-explicit-any` — type explicitly

- [ ] **Step 3: Production build check**

```bash
npm run build
```

Expected: build succeeds with no errors. Review the route sizes output — each page should be < 200kB JS.

- [ ] **Step 4: Final review**

Open `localhost:3000` with Chrome DevTools → Lighthouse. Run on Home page.
- Performance should be ≥ 85 (will improve with real images)
- No console errors
- All pages reachable from menu

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete static site - all pages + animations"
```

---

## Completion Checklist

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` succeeds
- [ ] All 5 pages render correctly (HP, The Villa, Venue, Programming, Residencies)
- [ ] Research placeholder page renders
- [ ] Menu opens/closes with GSAP animation
- [ ] Hero parallax works on scroll
- [ ] TextReveal animates on scroll for all section headings
- [ ] Cards stagger in on scroll
- [ ] Navbar transparent over hero, cream after scroll
- [ ] Footer present on all pages
- [ ] CLAUDE.md committed at root

---

## Next Steps

- **Plan 2** — `2026-04-07-villa-hegra-plan2-sanity-cms.md`: Sanity schemas, Studio setup, GROQ queries, ISR revalidation, replace hardcoded data
- **Plan 3** — `2026-04-07-villa-hegra-plan3-i18n.md`: next-intl setup, EN/FR routing, translation files, language switcher
- **GitHub push** — after client validates localhost build
- **Vercel deploy** — after GitHub push: preview → production

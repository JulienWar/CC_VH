# Villa Hegra — Developer Guide

This guide is for the design team and contributors working on the Villa Hegra website.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styles | Tailwind CSS v4 — CSS-only config via `@theme {}` in `globals.css` |
| Animations | GSAP 3 + ScrollTrigger + `@gsap/react` (`useGSAP` hook) |
| Fonts | PP Neue Montreal Arabic — `public/fonts/` |
| CMS | Sanity v3 (Plan 2 — not yet wired) |
| i18n | next-intl EN + FR (Plan 3 — not yet wired) |
| Deployment | Vercel |

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npx tsc --noEmit # type-check only
```

---

## File structure

```
app/
  layout.tsx              # Root HTML shell + font injection
  globals.css             # Tailwind v4 @theme tokens + base styles
  (site)/
    layout.tsx            # Client layout: Navbar + MenuOverlay + Footer + GSAPProvider
    page.tsx              # Home page
    the-villa/page.tsx
    venue/page.tsx
    programming/page.tsx
    residencies/page.tsx
    research/page.tsx

components/
  animations/
    GSAPProvider.tsx      # Registers ScrollTrigger once at layout level
    TextReveal.tsx        # Word mask slide-up (ScrollTrigger, once)
    ParallaxImage.tsx     # Scroll-driven yPercent parallax
    StaggerReveal.tsx     # Children opacity + y + scale stagger
  layout/
    Navbar.tsx            # Fixed header; transparent → cream on scroll
    MenuOverlay.tsx       # GSAP slide-in panel + nav items stagger
    Footer.tsx            # Dark footer with social icons
  sections/               # Full-width page sections (one responsibility each)
  ui/                     # Small reusable atoms: CTAButton, FilterBar, EventCard…

lib/
  gsap/animations.ts      # GSAP helper factories (staggerReveal, parallax)

public/
  fonts/                  # PPNeueMontrealArabic-Book.woff2 (375) + Medium.woff2 (500)
  images/placeholder.jpg  # Dev placeholder; replace with real assets
```

---

## Design tokens

All tokens are in `app/globals.css` inside `@theme {}`. Tailwind classes are generated automatically — no `tailwind.config.ts`.

| Token | Value | Tailwind class |
|---|---|---|
| `--color-light-cream` | `#f5efe0` | `bg-light-cream`, `text-light-cream` |
| `--color-dark-cream` | `#bfb098` | `bg-dark-cream` |
| `--color-black-grey` | `#2c2923` | `bg-black-grey`, `text-black-grey` |
| `--color-orange` | `#ce6223` | `text-orange` |
| `--color-orange-action` | `#f3900d` | `text-orange-action` |
| `--color-gold` | `#b78d09` | `text-gold` |

Typography uses `clamp()` for fluid sizing: `text-[clamp(36px,4vw,64px)]`.

Font weights: **375** = Book (body), **500** = Medium (headings).

---

## Animation patterns

### TextReveal — scrolling text mask

```tsx
import TextReveal from '@/components/animations/TextReveal'

<TextReveal as="h2" className="text-[clamp(40px,5vw,80px)]">
  Your heading text here
</TextReveal>
```

Splits text into words, wraps each in `overflow-hidden`, slides up from `y: 110%` on scroll entry.

### ParallaxImage — scroll parallax

```tsx
import ParallaxImage from '@/components/animations/ParallaxImage'

<div className="relative h-[500px] overflow-hidden">
  <ParallaxImage
    src="/images/photo.jpg"
    alt="Description"
    speed={0.3}
    className="absolute inset-0 h-full w-full"
  />
</div>
```

### StaggerReveal — children stagger in

```tsx
import StaggerReveal from '@/components/animations/StaggerReveal'

<StaggerReveal className="grid grid-cols-3 gap-4" stagger={0.06}>
  {items.map(item => <Card key={item.id} {...item} />)}
</StaggerReveal>
```

### Hero — page load sequence

The `Hero` component runs a GSAP load timeline automatically:
1. Background scales `1.08 → 1.0` (0.0s)
2. Subtitle fades in (0.4s)
3. Title words stagger slide up (0.55s)

### GSAP rule: always use `useGSAP`

```tsx
// CORRECT
import { useGSAP } from '@gsap/react'
useGSAP(() => { /* your code */ }, { scope: containerRef })

// WRONG — do not use raw useEffect for GSAP
useEffect(() => { gsap.to(...) }, [])
```

`ScrollTrigger` is already registered globally by `GSAPProvider`. You do not need to call `gsap.registerPlugin(ScrollTrigger)` in component code unless also registering in `useGSAP` (safe to do, idempotent).

---

## Figma

File key: `JOZsVjqPleL1ijTs2oCDjg`

| Page | Node ID |
|---|---|
| Home | (root frame) |
| Menu overlay | — |
| Residencies | — |
| The Villa | — |
| Venue | — |
| Programming | — |
| Components & Icons | — |

To inspect a node: open Figma → right-click element → Copy/Paste → Copy link → extract `node-id` from URL.

---

## Adding a new page

1. Create `app/(site)/your-page/page.tsx`
2. Use `Hero` as the first section (pass `title`, `imageSrc`, `imageAlt`)
3. Build sections with `TextReveal` for headings and `StaggerReveal` for grids
4. Add route to `mainNav` array in `components/layout/MenuOverlay.tsx`
5. Add route to `components/layout/Navbar.tsx` if it should appear in the top bar

---

## Git worktree workflow (for parallel feature work)

```bash
# Create a worktree for a new feature branch
git worktree add ../CC_VH-sanity feature/sanity-cms
cd ../CC_VH-sanity
npm install
npm run dev -- -p 3001   # run on a different port

# When done, merge and remove worktree
git worktree remove ../CC_VH-sanity
```

Each worktree shares the same `.git` directory but has an isolated working copy. Ideal for working on Sanity CMS (Plan 2) or i18n (Plan 3) without blocking the main branch.

---

## Environment variables

Create `.env.local` at the project root (never commit this file):

```bash
# Sanity (Plan 2)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Revalidation webhook secret (Plan 2)
SANITY_REVALIDATE_SECRET=
```

For Vercel: add these in Project → Settings → Environment Variables.

---

## Roadmap

| Plan | Status | Description |
|---|---|---|
| Plan 1 | Done | Static site — all pages + animations |
| Plan 2 | Pending | Sanity v3 CMS — schemas, Studio at `/studio`, GROQ queries, ISR webhook |
| Plan 3 | Pending | next-intl i18n — `/en/` and `/fr/` routing, language switcher |

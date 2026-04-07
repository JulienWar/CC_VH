# Villa Hegra Website — Design Spec

**Date:** 2026-04-07
**Status:** Approved
**Author:** Design team via Claude

---

## 1. Project Overview

Build a production-ready, animated, responsive website for **Villa Hegra** — a Franco-Saudi cultural institution in AlUla — strictly faithful to the Figma design system. The site must be deployable on Vercel, connected to a headless CMS (Sanity) for non-technical content editing, and achieve animation quality comparable to awwwards-level sites.

The site will be bilingual (English + French) and maintained via GitHub with a worktree-friendly setup for the design team.

---

## 2. Technical Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js App Router | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Animations | GSAP + ScrollTrigger | 3.x |
| CMS | Sanity | v3 |
| i18n | next-intl | 3.x |
| Font | next/font (local) | — |
| Images | next/image | — |
| Deployment | Vercel | — |
| Node | 24 LTS | — |

**Why this stack:**
- Next.js 15 ISR enables Sanity content to be served statically with on-demand revalidation — no cold start penalty on content changes.
- GSAP is the industry standard for awwwards-tier text/scroll animations; ScrollTrigger handles all scroll-driven effects declaratively.
- Sanity Studio is embeddable at `/studio`, enabling the client to edit content without leaving the domain.
- Tailwind v4 uses native CSS variables, making it trivial to map Figma design tokens 1:1.

---

## 3. Design System

### 3.1 Color Tokens (from Figma variables)

```css
--color-light-cream:   #f5efe0;   /* Primary background */
--color-dark-cream:    #bfb098;   /* Secondary surface */
--color-black-grey:    #2c2923;   /* Primary text */
--color-orange:        #ce6223;   /* Accent / CTA hover */
--color-brown:         #59220e;   /* Dark accent */
--color-gold:          #b78d09;   /* Tertiary accent */
--color-paper:         #8b6546;   /* Section backgrounds */
--color-marron-20:     #F4ECE4;   /* Subtle surface */
--color-blue-title:    #12124D;   /* Legacy (not primary) */
--color-orange-action: #F3900D;   /* Interactive orange */
```

### 3.2 Typography

**Font family:** `PP Neue Montreal Arabic`
Loaded via `next/font/local` with two weights:
- **Book (375)** — body text, captions
- **Medium (500)** — headings, CTAs, labels

**Type scale (8px base grid):**

| Token | Size | Weight | Line height | Usage |
|---|---|---|---|---|
| `title/h2` | 96px | Book | 1.2 | Hero titles (desktop) |
| `title/h5` | 32px | Book | 1.2 | Section titles (desktop) |
| `title/h5-bold` | 32px | Medium | 1.2 | Section titles bold |
| `title/h2-mobile` | 48px | Book | 1.2 | Hero titles (mobile) |
| `title/h5-mobile` | 24px | Book | 1.2 | Section titles (mobile) |
| `body/L-bold` | 32px | Medium | 1.3 | Large body bold |
| `body/M` | 24px | Book | 1.2 | Default body |
| `body/M-bold` | 24px | Medium | 1.3 | Default body bold |
| `body/S` | 18px | Book | 1.3 | Small body |
| `body/S-bold` | 18px | Medium | 1.3 | Small body bold |
| `body/XS` | 16px | Medium | 1.3 | Labels, tags |
| `body/XXS` | 14px | Medium | 1.3 | Micro labels |
| `CTA/L` | 32px | Medium | 1.0 | Large CTAs |
| `CTA/M` | 24px | Medium | 1.0 | Default CTAs |
| `CTA/S` | 18px | Medium | 1.0 | Small CTAs |

### 3.3 Spacing (8px grid)

```
0 → 0px   |  4 → 16px  |  6 → 24px  |  8 → 32px
12 → 48px |  16 → 64px |  24 → 96px |  40 → 160px
```

### 3.4 Layout

- Desktop: max-width `1512px`, gutter `48px`
- Mobile: width `390px`, gutter `20px`
- Breakpoints: `md: 768px`, `lg: 1280px`, `xl: 1512px`

---

## 4. Pages & Sections

### 4.1 Home (HP)

**Sections:**
1. **Hero** — full viewport, background image/video, centered title (upcoming event teaser), scroll caret chevron
2. **Navbar** — fixed, transparent over hero; solid cream background after scroll
3. **About intro** — split layout: text left (description + "Discover" CTA), image right
4. **What's On** — section title + description + horizontal scroll carousel of `EventCard` (5 visible desktop, 1.2 on mobile)
5. **Artists Residencies** — dark background section, large title left + description right, discipline filter chips, artist names list as large text links, "See all residencies" CTA
6. **Our Location** — title + description + Google Maps embed, "Learn more about Villa Hegra" CTA
7. **Footer**

### 4.2 Menu (Overlay)

- Triggered by burger icon (top right)
- Panel slides in from the right: cream background (`#f5efe0`), full viewport height
- **Logo** (VH mark) top left, **Close (×)** top right
- **Primary nav** (large type): The Villa / Venue / Programming / Residencies / Research and Exchanges
- **Secondary nav** (small type): Access & Contact / Press / Support us / Team / Terms & Conditions / Privacy Policy / Cookies
- **Bottom bar**: Language selector (EN ▲) left, Social icons (YouTube / LinkedIn / Instagram) right
- **Animation**: panel `translateX(100%)` → `0`, nav items stagger reveal (mask slide-up)

### 4.3 The Villa

**Sections:**
1. Hero — full viewport image, "The Villa" title
2. Split text/image — "Villa Hegra" title + founding description (left), image (right)
3. Split image/text — image (left), long paragraph about ¡Viva Villa! network (right)
4. Founding entities — title + description + 2 logos (RCU + Afalula)
5. Partners — "Partners" title + logo grid (3 rows, responsive)
6. Footer

### 4.4 Venue

**Sections:**
1. Hero — full viewport image, "Venue" title
2. Split text/image — "A new Cultural Landmark in AlUla" + opening description (left), image right
3. Photo gallery carousel — 5 interior shots, horizontal scroll with nav arrows
4. Permanent building section — "Towards a permanent building designed by Lacaton & Vassal" title + description, full-width image
5. Our Location — "Our Location" title + description + map + "Learn more about Villa Hegra" CTA
6. Footer

### 4.5 Programming

**Sections:**
1. Hero — full viewport image, "Programming" title
2. Header section — "Upcoming Events" title (left) + description (right)
3. **Time filter bar** — Today / This week / This month + divider + category chips (All / Cinéma / Exhibitions / Events / Workshops) + pagination arrows
4. **Event cards grid** — 5 cards horizontal scroll (desktop), single-card scroll (mobile); each card: image, category tag, title, date, location, "Book now" CTA
5. **Past Events** section — same filter bar (Year + categories) + 4-column grid
6. Footer

### 4.6 Residencies

**Sections:**
1. Hero — full viewport image, "Residencies" title
2. "Apply for residencies" — large title + list of open calls (each with: discipline tag, program name, description, date range, "More info →" link)
3. "Villa Hegra residencies" — dark background, title left + description right, filter bar (Residencies ▼ / Year ▼), 4-column artist card grid (2 rows)
4. Footer

---

## 5. Components

### 5.1 Layout Components

**`<Navbar>`**
- Fixed, `z-50`
- Transparent background when at top of page (over hero)
- Transitions to `bg-light-cream` after 80px scroll
- Left: language selector (EN), Right: hamburger menu button
- On scroll: logo appears (or is always present with opacity transition)

**`<MenuOverlay>`**
- Controlled by global state (`useMenuStore` via Zustand or React context)
- Animated with GSAP: panel slide-in + staggered nav items
- Accessible: focus trap, `aria-modal`, keyboard close (Escape)

**`<Footer>`**
- Logo (full wordmark + VH mark) left
- Navigation links center
- Social icons right
- Background: dark (`#2c2923`) with cream text

### 5.2 Animation Components

**`<TextReveal>`**
```tsx
// Usage: wraps any heading/paragraph
// Splits text by lines using GSAP SplitText
// Each line: clip-path mask + translateY reveal on scroll
<TextReveal as="h1" delay={0.1}>Artists Residencies</TextReveal>
```

**`<ParallaxImage>`**
```tsx
// Image with scroll-driven vertical offset
// Background moves at `speed` fraction of scroll delta
<ParallaxImage src="..." speed={0.4} />
```

**`<StaggerReveal>`**
```tsx
// Wraps a list of children, reveals with stagger
// Used for cards, nav items, logo grids
<StaggerReveal stagger={0.08} direction="up">
  {cards.map(card => <EventCard key={card.id} {...card} />)}
</StaggerReveal>
```

### 5.3 UI Components

**`<EventCard>`** — `size: "small" | "medium"`, image, category badge, title, date, location, CTA
**`<ArtistCard>`** — photo, discipline tag, artist name, dates, "More info →" link
**`<FilterBar>`** — time chips + category chips + pagination arrows; controlled component
**`<CTAButton>`** — `variant: "primary" | "ghost" | "arrow"`, animated underline on hover
**`<OpenCallItem>`** — discipline tag, program title, description, date range, link
**`<LogoGrid>`** — responsive grid of partner logos with `next/image`, grayscale hover
**`<HeroScrollCaret>`** — animated chevron, bounces, triggers smooth scroll to first section

---

## 6. Animation Choreography

### 6.1 Page Load Sequence (Home)

```
0ms    → Navbar fades in (opacity 0→1, 400ms)
200ms  → Hero image zoom-in start (scale 1.05→1.0 over 1200ms)
400ms  → Hero title: lines slide up from clip-path mask (stagger 120ms/line)
800ms  → Scroll caret appears (fade + bounce)
```

### 6.2 Scroll-triggered (all pages)

- **Section headings**: `TextReveal` — lines clip-path slide-up, trigger at `top 85%`
- **Body paragraphs**: lines fade + translateY(30px), stagger 40ms, trigger at `top 80%`
- **Cards**: `StaggerReveal` — scale(0.96)→1 + opacity 0→1, stagger 80ms
- **Split images**: `ParallaxImage` — vertical offset driven by scroll, speed 0.3–0.4
- **Partner logos**: fade-in stagger, trigger once

### 6.3 Menu Animation

```
Open:
  1. Panel: translateX(100%) → translateX(0), duration 0.6s, ease "power3.out"
  2. Nav items: clip-path lines, stagger 0.06s, start at 0.3s
  3. Bottom bar: fade-up, delay 0.5s

Close:
  1. Nav items: clip-path close, stagger 0.04s (reversed)
  2. Panel: translateX(0) → translateX(100%), duration 0.5s, ease "power3.in"
```

### 6.4 Page Transitions

GSAP-based: outgoing page fades + translates up, incoming page reveals from bottom clip-path.
Duration: 0.5s out + 0.5s in. Triggered via Next.js App Router `layout.tsx`.

---

## 7. CMS — Sanity v3

### 7.1 Studio

Embedded at `/studio` (protected by Sanity auth). Accessible to client + consultants without GitHub access.

### 7.2 Schemas

**`event`**
```ts
title: { en: string, fr: string }
slug: slug
date: { start: datetime, end: datetime }
category: 'cinema' | 'exhibition' | 'event' | 'workshop' | 'diverse'
image: image (with alt en/fr)
description: { en: portableText, fr: portableText }
location: string
bookingUrl: url
isPast: boolean  // or derived from date
isFeatured: boolean
```

**`residency`**
```ts
artistName: string
discipline: 'visual-arts' | 'design' | 'cinema' | 'performing-arts'
country: string
photo: image
dates: { start: date, end: date }
description: { en: portableText, fr: portableText }
isActive: boolean
```

**`openCall`**
```ts
title: { en: string, fr: string }
discipline: string
description: { en: portableText, fr: portableText }
dateRange: string
moreInfoUrl: url
isActive: boolean
```

**`venueSection`**
```ts
title: { en: string, fr: string }
body: { en: portableText, fr: portableText }
image: image
imagePosition: 'left' | 'right'
```

**`partner`**
```ts
name: string
logo: image
url: url
row: number  // display order row
```

**`settings`** (singleton)
```ts
heroContent: { title: { en, fr }, subtitle: { en, fr }, backgroundImage }
footerLinks: { label: { en, fr }, href: string }[]
socialLinks: { platform: 'youtube' | 'linkedin' | 'instagram', url: string }[]
```

### 7.3 Content Revalidation

Next.js ISR with Sanity webhooks: on content publish → `revalidatePath()` via a `/api/revalidate` route handler. Tag-based revalidation per content type.

---

## 8. i18n — English + French

**Routing:** `/en/...` and `/fr/...` via next-intl middleware.
**Default locale:** `en`
**Locale switcher:** in Navbar (EN / FR toggle) and MenuOverlay bottom bar.
**Translation files:** `messages/en.json` and `messages/fr.json` for UI strings.
**CMS content:** bilingual fields in every Sanity schema (no separate documents per locale).

---

## 9. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile (< 768px) | Single column, horizontal scroll carousels, stacked sections |
| Tablet (768–1279px) | 2-column grids, adjusted typography scale |
| Desktop (≥ 1280px) | Full design as per Figma (1512px max-width) |

**Hero:** always full viewport height (100dvh).
**Cards:** desktop 4–5 columns → tablet 2 columns → mobile horizontal scroll (1.2 cards visible).
**Navigation:** burger menu on all breakpoints (as per Figma).

---

## 10. File Structure

```
villa-hegra/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx             # Root layout with Navbar, Footer, MenuOverlay
│   │   ├── page.tsx               # Home
│   │   ├── the-villa/
│   │   │   └── page.tsx
│   │   ├── venue/
│   │   │   └── page.tsx
│   │   ├── programming/
│   │   │   └── page.tsx
│   │   └── residencies/
│   │       └── page.tsx
│   ├── studio/[[...tool]]/
│   │   └── page.tsx               # Sanity Studio embedded
│   └── api/
│       └── revalidate/
│           └── route.ts           # Webhook-triggered ISR revalidation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MenuOverlay.tsx
│   │   └── Footer.tsx
│   ├── animations/
│   │   ├── TextReveal.tsx
│   │   ├── ParallaxImage.tsx
│   │   └── StaggerReveal.tsx
│   ├── ui/
│   │   ├── EventCard.tsx
│   │   ├── ArtistCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── CTAButton.tsx
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
│   ├── sanity/
│   │   ├── client.ts              # Sanity client (read + preview)
│   │   ├── queries.ts             # GROQ queries per content type
│   │   └── image.ts               # urlFor helper
│   └── gsap/
│       └── animations.ts          # Reusable GSAP timeline factories
├── sanity/
│   ├── schemaTypes/
│   │   ├── event.ts
│   │   ├── residency.ts
│   │   ├── openCall.ts
│   │   ├── venueSection.ts
│   │   ├── partner.ts
│   │   └── settings.ts
│   └── sanity.config.ts
├── messages/
│   ├── en.json
│   └── fr.json
├── styles/
│   └── globals.css                # Tailwind v4 + CSS design tokens
├── public/
│   └── fonts/
│       ├── PPNeueMontreal-Book.woff2
│       └── PPNeueMontreal-Medium.woff2
├── i18n/
│   └── routing.ts                 # next-intl locale config
├── middleware.ts                  # next-intl routing middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── sanity.cli.ts
├── vercel.json                    # (or vercel.ts) revalidation webhook secret
└── CLAUDE.md                      # Team collaboration guide
```

---

## 11. CLAUDE.md — Team Collaboration Guide

A `CLAUDE.md` at the root will document:

- Stack overview and rationale
- Design system: color tokens, type scale, spacing
- How to work with Figma links (node IDs per page)
- GSAP animation patterns in use (TextReveal, ParallaxImage, StaggerReveal)
- Sanity: how to add/modify schemas, preview setup
- i18n: how to add translation keys
- Git workflow: worktree usage for parallel feature work
- Vercel: environment variables needed, preview deployment workflow
- CMS credentials: where to find them (Vercel env vars, not committed)

---

## 12. Git & Deployment Workflow

### Localhost-first Workflow

Development happens locally (`npm run dev`) and is validated by the client/team before any push to GitHub:

1. Implement feature locally → validate in browser at `localhost:3000`
2. Client/designer reviews locally (or via shared tunnel if remote)
3. Once validated → commit → push to GitHub → Vercel preview deploy (auto)
4. Final sign-off on Vercel preview → merge to `main` → production

### Git

- **Main branch:** `main` → production (Vercel)
- **Feature branches:** `feat/section-name` created via git worktrees
- **Worktree usage:** `git worktree add ../villa-hegra-feat-X feat/X` — allows parallel work without stashing
- Each PR targets `main`, reviewed before merge
- No force-push to `main`

### Vercel

- **Production:** auto-deploys on `main` push
- **Preview:** auto-deploys on every PR (shareable link for client review)
- **Environment variables:** managed via `vercel env` CLI or Vercel dashboard
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN` (server-only)
  - `SANITY_REVALIDATE_SECRET`

---

## 13. Open Questions / Decisions Made

| Question | Decision |
|---|---|
| CMS | Sanity v3 |
| Languages | EN + FR (next-intl) |
| Animation library | GSAP + ScrollTrigger |
| Arabic (RTL) | Out of scope for v1 |
| Research and Exchanges page | No Figma provided — placeholder page + nav link in v1, full design in v2 |
| Search | Out of scope for v1 |
| Auth/protected content | Out of scope for v1 |
| Venue page nature | Describes the location and purpose of the space |
| Font licensing | PP Neue Montreal Arabic must be licensed by client before production |

---

## 14. Success Criteria

- [ ] Pixel-perfect implementation of all 6 Figma pages (desktop + mobile)
- [ ] All text elements use TextReveal mask animation on scroll
- [ ] Hero images use parallax effect
- [ ] Menu overlay opens/closes with GSAP animations
- [ ] Content editable via Sanity Studio (events, residencies, open calls, partners)
- [ ] EN ↔ FR language switch works across all pages
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, SEO
- [ ] Deployed on Vercel with preview deployments per PR
- [ ] CLAUDE.md documents the full setup for collaborators

'use client'

import Link from 'next/link'
import EventCard from '@/components/ui/EventCard'
import TextReveal from '@/components/animations/TextReveal'

const DEFAULT_EVENTS = [
  { id: '1', image: '/images/event-1.jpg', imageAlt: 'AlUla Arts Festival 2026 – Vertigo', category: 'Events', title: 'AlUla Arts Festival 2026 – Vertigo', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '2', image: '/images/event-2.jpg', imageAlt: "Not Deserted: AlUla's Archives in Movement Exhibition", category: 'Exhibitions', title: "Not Deserted: AlUla\u2019s Archives in Movement Exhibition", date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '3', image: '/images/event-3.jpg', imageAlt: 'AlUla Arts Festival 2026 – Urban dance Showcase', category: 'Events', title: 'AlUla Arts Festival 2026 – Urban dance Showcase', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '4', image: '/images/event-4.jpg', imageAlt: 'Les Mains by Auguste Rodin', category: 'Exhibitions', title: '\u201cLes Mains\u201d by Auguste Rodin', date: 'November 2025', location: 'Villa Hegra', href: '#' },
  { id: '5', image: '/images/event-5.jpg', imageAlt: 'Film Appreciation Programme', category: 'Cinema', title: 'Film Appreciation Programme', date: 'October 2025', location: 'Villa Hegra', href: '#' },
]

interface WhatIsOnProps {
  heading?: string
  description?: string
  ctaLabel?: string
  ctaLink?: string
  events?: typeof DEFAULT_EVENTS
}

export default function WhatIsOn({
  heading = "What\u2019s On",
  description = 'Discover our artistic\nand cultural programming',
  ctaLabel = 'See all events',
  ctaLink = '/programming',
  events = DEFAULT_EVENTS,
}: WhatIsOnProps) {
  return (
    <section className="bg-[#f5efe0]">
      <div className="px-5 lg:px-12 max-w-[1440px] mx-auto py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-24 min-h-[200px]">
          <div className="flex flex-col justify-between gap-8 lg:w-[696px] shrink-0">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923]"
              stagger={0.05}
            >
              {heading}
            </TextReveal>
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 text-[24px] text-[#2c2923] py-[6px] hover:opacity-70 transition-opacity w-fit"
              style={{ fontWeight: 500 }}
            >
              {ctaLabel}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </div>
          <div className="flex flex-col justify-between items-start lg:items-end flex-1 pt-0 lg:pt-4 gap-8">
            <p
              className="text-[#2c2923] text-[clamp(18px,2.1vw,32px)] leading-[1.2] lg:text-right"
              style={{ fontWeight: 375 }}
            >
              {description.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br className="hidden lg:block" />}
                  {line}
                </span>
              ))}
            </p>
            <div className="flex items-center gap-4">
              <button className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity" aria-label="Previous">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity" aria-label="Next">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="cards-row flex gap-1">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  )
}

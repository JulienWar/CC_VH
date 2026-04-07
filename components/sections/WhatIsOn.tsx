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
    image: '/images/placeholder.jpg',
    imageAlt: 'AlUla Arts Festival 2026 – Vertigo',
    category: 'Events',
    title: 'AlUla Arts Festival 2026 – Vertigo',
    date: 'January – February 2026',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '2',
    image: '/images/placeholder.jpg',
    imageAlt: 'Not Deserted: Archives in Movement Exhibition',
    category: 'Exhibitions',
    title: 'Not Deserted: AlUla's Archives in Movement Exhibition',
    date: 'January – February 2026',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '3',
    image: '/images/placeholder.jpg',
    imageAlt: 'AlUla Arts Festival 2026 – Urban dance Showcase',
    category: 'Events',
    title: 'AlUla Arts Festival 2026 – Urban dance Showcase',
    date: 'January – February 2026',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '4',
    image: '/images/placeholder.jpg',
    imageAlt: 'Les Mains by Auguste Rodin',
    category: 'Exhibitions',
    title: '"Les Mains" by Auguste Rodin',
    date: 'November 2025',
    location: 'Villa Hegra',
    href: '#',
  },
  {
    id: '5',
    image: '/images/placeholder.jpg',
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

  const filtered =
    activeCategory === 'all'
      ? SAMPLE_EVENTS
      : SAMPLE_EVENTS.filter(
          (e) => e.category.toLowerCase() === activeCategory
        )

  return (
    <section className="py-16 lg:py-24">
      <div className="px-5 lg:px-12 max-w-[1512px] mx-auto mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <TextReveal
          as="h2"
          className="text-[clamp(40px,5vw,80px)] leading-none"
          stagger={0.05}
        >
          What&apos;s On
        </TextReveal>
        <div className="flex flex-col lg:items-end gap-4">
          <p className="text-base opacity-70 max-w-xs">
            Discover our artistic and cultural programming
          </p>
          <CTAButton label="See all events" href="/programming" variant="arrow" />
        </div>
      </div>

      <div className="px-5 lg:px-12 max-w-[1512px] mx-auto mb-6">
        <FilterBar
          categoryFilters={categoryFilters}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          showArrows
        />
      </div>

      <div className="overflow-x-auto">
        <StaggerReveal
          className="flex gap-1 px-5 lg:px-12"
          stagger={0.06}
        >
          {filtered.map((event) => (
            <div key={event.id} className="shrink-0 w-[354px]">
              <EventCard {...event} />
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}

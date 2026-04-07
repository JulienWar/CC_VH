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
      'Photography will soon celebrate its 300th anniversary. On this occasion, a major nationwide programme will honour French photographic creation and heritage.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Open call for Film Residency 2026',
    description:
      'Villa Hegra invites filmmakers from Saudi Arabia and France to apply for its film residency programme, offering studio time, mentorship and exhibition opportunities.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Design Residency — Phase 2',
    description:
      'Design residency open to Saudi and French designers working across graphic design, industrial design and spatial design disciplines.',
    dateRange: 'September 2026 – September 2027',
    moreInfoUrl: '#',
  },
]

const ARTISTS = [
  { photo: '/images/placeholder.jpg', photoAlt: 'Théo Mercier', discipline: 'Visual Arts Residency', name: 'Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Paul Emilieu Marchesseau', discipline: 'Design Residency', name: 'Paul Emilieu Marchesseau', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Badr Ali', discipline: 'Design Residency', name: 'Badr Ali', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Rachid Ouramdane', discipline: 'Performing Arts Residency', name: 'Rachid Ouramdane', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Sara Brahim and Ugo Schiavi', discipline: 'Visual Arts Residency', name: 'Sara Brahim and Ugo Schiavi', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Abdulrahman Alsoliman', discipline: 'Visual Arts Residency', name: 'Abdulrahman Alsoliman and Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Saad Tahaitah', discipline: 'Film Residency', name: 'Saad Tahaitah', dates: 'October 2025', href: '#' },
  { photo: '/images/placeholder.jpg', photoAlt: 'Bashaer Hawsawi', discipline: 'Design Residency', name: 'Bashaer Hawsawi', dates: 'October 2025', href: '#' },
]

const disciplineFilters = [
  { label: 'All Residencies', value: 'all' },
  { label: 'Visual Arts', value: 'visual arts' },
  { label: 'Design', value: 'design' },
  { label: 'Cinema', value: 'film' },
  { label: 'Performing Arts', value: 'performing arts' },
]

export default function ResidenciesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? ARTISTS
      : ARTISTS.filter((a) =>
          a.discipline.toLowerCase().includes(activeFilter)
        )

  return (
    <main>
      <Hero
        title="Residencies"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Residencies at Villa Hegra"
      />

      {/* Apply section */}
      <section className="px-5 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1512px] mx-auto">
          <TextReveal
            as="h2"
            className="text-[clamp(40px,5vw,80px)] leading-none mb-12"
          >
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
      <section className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-12 py-16 lg:py-24">
        <div className="max-w-[1512px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-24 mb-10">
            <TextReveal
              as="h2"
              className="text-[clamp(36px,4vw,64px)] leading-tight lg:w-1/2"
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

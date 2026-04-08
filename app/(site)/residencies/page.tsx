'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'
import ArtistCard from '@/components/ui/ArtistCard'
import OpenCallItem from '@/components/ui/OpenCallItem'

const OPEN_CALLS = [
  {
    discipline: 'Photography',
    title: 'Photography Award – Académie des Beaux-Arts',
    description:
      'Photography will soon celebrate its 300th anniversary. On this occasion, a major nationwide programme will honour French photographic creation and heritage from September 2026 to September 2027.',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Open call for Film Residency 2026',
    description:
      'Villa Hegra invites filmmakers from Saudi Arabia and France to apply for its film residency programme, offering studio time, mentorship and exhibition opportunities from September 2026 to September 2027.',
    moreInfoUrl: '#',
  },
  {
    discipline: 'Film Residency',
    title: 'Design Residency — Phase 2',
    description:
      'Design residency open to Saudi and French designers working across graphic design, industrial design and spatial design disciplines from September 2026 to September 2027.',
    moreInfoUrl: '#',
  },
]

const ARTISTS = [
  { photo: '/images/artist-1.jpg', photoAlt: 'Théo Mercier', discipline: 'Visual Arts Residency', name: 'Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-2.jpg', photoAlt: 'Paul Emilieu Marchesseau', discipline: 'Design Residency', name: 'Paul Emilieu Marchesseau', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-3.jpg', photoAlt: 'Badr Ali', discipline: 'Design Residency', name: 'Badr Ali', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-4.jpg', photoAlt: 'Rachid Ouramdane', discipline: 'Performing arts Residency', name: 'Rachid Ouramdane', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-5.jpg', photoAlt: 'Sara Brahim and Ugo Schiavi', discipline: 'Visual Arts Residency', name: 'Sara Brahim and Ugo Schiavi', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-6.jpg', photoAlt: 'Abdulrahman Alsoliman and Théo Mercier', discipline: 'Visual Arts Residency', name: 'Abdulrahman Alsoliman and Théo Mercier', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-7.jpg', photoAlt: 'Saad Tahaitah', discipline: 'Film Residency', name: 'Saad Tahaitah', dates: 'October 2025', href: '#' },
  { photo: '/images/artist-8.jpg', photoAlt: 'Bashaer Hawsawi', discipline: 'Design Residency', name: 'Bashaer Hawsawi', dates: 'October 2025', href: '#' },
]

const DISCIPLINE_FILTERS = [
  { label: 'All Residencies', value: 'all' },
  { label: 'Visual Arts', value: 'visual arts' },
  { label: 'Design', value: 'design' },
  { label: 'Cinema', value: 'film' },
  { label: 'Performing Arts', value: 'performing arts' },
]

const YEAR_FILTERS = [
  { label: 'All Years', value: 'all' },
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
]

export default function ResidenciesPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeYear, setActiveYear] = useState('all')

  const filtered = ARTISTS.filter((a) => {
    const matchDiscipline = activeFilter === 'all' || a.discipline.toLowerCase().includes(activeFilter)
    const matchYear = activeYear === 'all' || a.dates.includes(activeYear)
    return matchDiscipline && matchYear
  })

  return (
    <main>
      <Hero
        title="Residencies"
        imageSrc="/images/residency-hero.jpg"
        imageAlt="Residencies at Villa Hegra"
      />

      {/* Apply for residencies */}
      <section className="bg-[#f5efe0] px-5 lg:px-12 pt-12 lg:pt-16 pb-0">
        <div className="max-w-[1440px] mx-auto">
          <TextReveal
            as="h2"
            className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923] mb-12"
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

      {/* Villa Hegra residencies */}
      <section className="bg-[#8b6546] text-[#f5efe0] px-5 lg:px-12 pt-12 lg:pt-16 pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 mb-10">
            <div className="lg:w-1/2">
              <TextReveal
                as="h2"
                className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#f5efe0]"
              >
                Villa Hegra residencies
              </TextReveal>
            </div>
            <div className="lg:w-1/2 lg:pt-4">
              <p className="text-[#f5efe0] text-[18px] lg:text-[32px] leading-[1.2]" style={{ fontWeight: 375 }}>
                Villa Hegra hosts Saudi and French artists from various disciplines (design, visual arts, performing arts, cinema) as part of its residency program.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-12 mb-10">
            <div className="relative">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="appearance-none bg-transparent text-[#f5efe0] text-[32px] border-b-2 border-[#f5efe0] pb-1 pr-10 cursor-pointer focus:outline-none"
                style={{ fontWeight: 500 }}
              >
                {DISCIPLINE_FILTERS.map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#8b6546] text-[#f5efe0]">
                    {f.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" width="32" height="32" viewBox="0 0 24 24" fill="#f5efe0">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <div className="relative">
              <select
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="appearance-none bg-transparent text-[#f5efe0] text-[32px] border-b-2 border-[#f5efe0] pb-1 pr-10 cursor-pointer focus:outline-none"
                style={{ fontWeight: 500 }}
              >
                {YEAR_FILTERS.map((f) => (
                  <option key={f.value} value={f.value} className="bg-[#8b6546] text-[#f5efe0]">
                    {f.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" width="32" height="32" viewBox="0 0 24 24" fill="#f5efe0">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </div>

          {/* Artist grid */}
          <StaggerReveal
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1"
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

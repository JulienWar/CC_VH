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
  isPast?: boolean
}

interface EventsGridProps {
  events: Event[]
  showTimeFilter?: boolean
  dropdownLabel?: string
  cardSize?: 'small' | 'medium'
}

const timeFilters = [
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
]

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Cinema', value: 'cinema' },
  { label: 'Exhibitions', value: 'exhibitions' },
  { label: 'Events', value: 'events' },
  { label: 'Workshops', value: 'workshops' },
]

export default function EventsGrid({
  events,
  showTimeFilter = true,
  dropdownLabel,
  cardSize = 'medium',
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
      <div className="px-5 lg:px-12 mb-4 max-w-[1440px] mx-auto">
        <FilterBar
          timeFilters={showTimeFilter ? timeFilters : []}
          categoryFilters={categoryFilters}
          activeTime={activeTime}
          activeCategory={activeCategory}
          onTimeChange={setActiveTime}
          onCategoryChange={setActiveCategory}
          showArrows
          dropdownLabel={dropdownLabel}
        />
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <StaggerReveal
          className="cards-row flex gap-1"
          stagger={0.06}
        >
          {filtered.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </StaggerReveal>
      </div>
    </div>
  )
}

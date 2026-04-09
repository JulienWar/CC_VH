import HeroHP from '@/components/sections/HeroHP'
import AboutIntro from '@/components/sections/AboutIntro'
import WhatIsOn from '@/components/sections/WhatIsOn'
import ArtistsResidenciesSection from '@/components/sections/ArtistsResidenciesSection'
import LocationSection from '@/components/sections/LocationSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { getPage, getUpcomingEvents, getPastEvents } from '@/sanity/queries'

// Default section order for static fallback
const DEFAULT_SECTIONS = [
  { _type: 'heroHP', _key: 'hero' },
  { _type: 'aboutIntro', _key: 'about' },
  { _type: 'whatIsOn', _key: 'whatson' },
  { _type: 'artistsResidencies', _key: 'residencies' },
  { _type: 'locationSection', _key: 'location' },
]

export default async function Home() {
  let sections = DEFAULT_SECTIONS
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: { upcoming: any[]; past: any[] } = { upcoming: [], past: [] }

  try {
    const [page, upcoming, past] = await Promise.all([
      getPage('home'),
      getUpcomingEvents(),
      getPastEvents(),
    ])
    if (page?.sections?.length) sections = page.sections
    if (upcoming?.length) events.upcoming = upcoming
    if (past?.length) events.past = past
  } catch {
    // Sanity unreachable — use static fallback
  }

  return (
    <main>
      <SectionRenderer sections={sections} events={events} />
    </main>
  )
}

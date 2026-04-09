import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import EventsGrid from '@/components/sections/EventsGrid'
import { getUpcomingEvents, getPastEvents } from '@/sanity/queries'

// ── Static fallback data (used if Sanity is empty or unreachable) ──
const FALLBACK_UPCOMING = [
  { id: '1', image: '/images/event-1.jpg', imageAlt: 'AlUla Arts Festival 2026 – Vertigo', category: 'Events', title: 'AlUla Arts Festival 2026 – Vertigo', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '2', image: '/images/event-2.jpg', imageAlt: 'Archives in Movement Exhibition', category: 'Exhibitions', title: 'Not Deserted: AlUla\u2019s Archives in Movement Exhibition', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '3', image: '/images/event-3.jpg', imageAlt: 'Urban dance Showcase', category: 'Events', title: 'AlUla Arts Festival 2026 – Urban dance Showcase', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '4', image: '/images/event-4.jpg', imageAlt: 'Les Mains by Auguste Rodin', category: 'Exhibitions', title: '\u201cLes Mains\u201d by Auguste Rodin', date: 'November 2025', location: 'Villa Hegra', href: '#' },
  { id: '5', image: '/images/event-5.jpg', imageAlt: 'Film Appreciation Programme', category: 'Cinema', title: 'Film Appreciation Programme', date: 'October 2025', location: 'Villa Hegra', href: '#' },
]

const FALLBACK_PAST = [
  { id: '6', image: '/images/past-event-1.jpg', imageAlt: 'Art Paris 2025', category: 'Exhibitions', title: 'Art Paris 2025 – Villa Hegra Exhibition', date: 'April 2025', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '7', image: '/images/past-event-2.jpg', imageAlt: 'Crossings by the Junior Ballet', category: 'Events', title: 'Crossings by the Junior Ballet of the Op\u00e9ra national de Paris', date: 'December 2024', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '8', image: '/images/past-event-3.jpg', imageAlt: 'Night with the Opéra national de Paris', category: 'Events', title: 'Night with the Op\u00e9ra national de Paris', date: 'January 2024', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '9', image: '/images/past-event-4.jpg', imageAlt: 'Cine-concerts', category: 'Cinema', title: 'Cine-concerts', date: 'November 2023', location: 'Villa Hegra', href: '#', isPast: true },
]

export default async function ProgrammingPage() {
  let upcomingEvents = FALLBACK_UPCOMING
  let pastEvents = FALLBACK_PAST

  try {
    const [sanityUpcoming, sanityPast] = await Promise.all([
      getUpcomingEvents(),
      getPastEvents(),
    ])
    if (sanityUpcoming?.length) upcomingEvents = sanityUpcoming
    if (sanityPast?.length) pastEvents = sanityPast
  } catch {
    // Sanity unreachable — use static fallback
  }

  return (
    <main>
      <Hero
        title="Programming"
        imageSrc="/images/event-3.jpg"
        imageAlt="Cultural event in AlUla"
      />

      <section className="px-5 lg:px-12 py-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-24 mb-12">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923]"
              stagger={0.05}
            >
              Upcoming Events
            </TextReveal>
          </div>
          <p className="lg:w-1/2 lg:pt-4 text-[#2c2923] text-[18px] lg:text-[32px] leading-[1.2] mt-4 lg:mt-0" style={{ fontWeight: 375 }}>
            Villa Hegra&apos;s cultural programming includes a wide range of
            initiatives such as Creative Workshops, Cine-Concerts,
            Performances, Masterclasses, Research Projects, and Academic
            Exchange Programs.
          </p>
        </div>
      </section>

      <EventsGrid events={upcomingEvents} showTimeFilter />

      <section className="px-5 lg:px-12 pt-24 pb-8 max-w-[1440px] mx-auto">
        <TextReveal
          as="h2"
          className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923]"
          stagger={0.05}
        >
          Past Events
        </TextReveal>
      </section>

      <div className="pb-24">
        <EventsGrid events={pastEvents} showTimeFilter={false} dropdownLabel="Year" />
      </div>
    </main>
  )
}

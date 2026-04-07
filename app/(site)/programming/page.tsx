import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import EventsGrid from '@/components/sections/EventsGrid'

const UPCOMING_EVENTS = [
  { id: '1', image: '/images/placeholder.jpg', imageAlt: 'AlUla Arts Festival 2026 – Vertigo', category: 'Events', title: 'AlUla Arts Festival 2026 – Vertigo', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '2', image: '/images/placeholder.jpg', imageAlt: 'Archives in Movement Exhibition', category: 'Exhibitions', title: 'Not Deserted: AlUla\u2019s Archives in Movement Exhibition', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '3', image: '/images/placeholder.jpg', imageAlt: 'Urban dance Showcase', category: 'Events', title: 'AlUla Arts Festival 2026 – Urban dance Showcase', date: 'January – February 2026', location: 'Villa Hegra', href: '#' },
  { id: '4', image: '/images/placeholder.jpg', imageAlt: 'Les Mains by Auguste Rodin', category: 'Exhibitions', title: '\u201cLes Mains\u201d by Auguste Rodin', date: 'November 2025', location: 'Villa Hegra', href: '#' },
  { id: '5', image: '/images/placeholder.jpg', imageAlt: 'Film Appreciation Programme', category: 'Cinema', title: 'Film Appreciation Programme', date: 'October 2025', location: 'Villa Hegra', href: '#' },
]

const PAST_EVENTS = [
  { id: '6', image: '/images/placeholder.jpg', imageAlt: 'Art Paris 2025', category: 'Exhibitions', title: 'Art Paris 2025 – Villa Hegra Exhibition', date: 'April 2025', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '7', image: '/images/placeholder.jpg', imageAlt: 'Crossings by the Junior Ballet', category: 'Events', title: 'Crossings by the Junior Ballet of the Op\u00e9ra national de Paris', date: 'December 2024', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '8', image: '/images/placeholder.jpg', imageAlt: 'Night with the Opéra national de Paris', category: 'Events', title: 'Night with the Op\u00e9ra national de Paris', date: 'January 2024', location: 'Villa Hegra', href: '#', isPast: true },
  { id: '9', image: '/images/placeholder.jpg', imageAlt: 'Cine-concerts', category: 'Cinema', title: 'Cine-concerts', date: 'November 2023', location: 'Villa Hegra', href: '#', isPast: true },
]

export default function ProgrammingPage() {
  return (
    <main>
      <Hero
        title="Programming"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Cultural event in AlUla"
      />

      <section className="px-5 lg:px-12 py-16 max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-24 mb-12">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(40px,5vw,80px)] leading-none"
            >
              Upcoming Events
            </TextReveal>
          </div>
          <p className="lg:w-1/2 lg:pt-8 text-base opacity-70 max-w-md mt-4 lg:mt-0">
            Villa Hegra&apos;s cultural programming includes a wide range of
            initiatives such as Creative Workshops, Cine-Concerts,
            Performances, Masterclasses, Research Projects, and Academic
            Exchange Programs.
          </p>
        </div>
      </section>

      <EventsGrid events={UPCOMING_EVENTS} showTimeFilter />

      <section className="px-5 lg:px-12 pt-24 pb-8 max-w-[1512px] mx-auto">
        <TextReveal
          as="h2"
          className="text-[clamp(40px,5vw,80px)] leading-none"
        >
          Past Events
        </TextReveal>
      </section>

      <EventsGrid events={PAST_EVENTS} showTimeFilter={false} />
    </main>
  )
}

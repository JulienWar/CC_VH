import Hero from '@/components/sections/Hero'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { getPage } from '@/sanity/queries'

// Default section order — all text is embedded so site works without CMS
const DEFAULT_SECTIONS = [
  {
    _type: 'textSection',
    _key: 'landmark',
    heading: 'A new Cultural Landmark in AlUla',
    subtitle: 'Villa Hegra opened its doors in central AlUla in October 2025.',
    text: "The earlier off-site and preopening phases served as an introduction to the communities of AlUla and, with this opening, the Villa now begins its on-site journey. This venue, resulting from the renovation of two existing buildings, serves as the hub of its artistic and cultural programming, offering a space for encounter, exchange, and creative expression for artists and audiences. The Villa houses five modular, fully equipped studios, an outdoor workspace, and seven apartments for resident artists.\n\nIt also includes an exhibition space, a 50-seat auditorium, which is the first indoor cinema in AlUla, as well as the city\u2019s first performing arts studio and workshop spaces designed especially for children and teenagers. Located in the Al-Sukhayrat neighbourhood, in the heart of a residential area, Villa Hegra\u2019s presence reflects its commitment to grow with and within the daily life of AlUla\u2019s families.",
    backgroundColor: 'brown',
  },
  { _type: 'venueGallery', _key: 'gallery' },
  {
    _type: 'textImageSection',
    _key: 'permanent',
    heading: 'Towards a permanent building designed by Lacaton & Vassal',
    text: "Looking ahead, in its Phase 2, Villa Hegra will be housed in a new building designed by Pritzker Prize laureates Anne Lacaton and Jean-Philippe Vassal. Conceived as a gesture of harmony between AlUla\u2019s urban fabric and its natural heritage, the project embodies the philosophy of the architects: \u201cNever demolish, never cut down trees, never cut down in anything living. Always add, complete, transform. From what is already there. To do more and better with less\u201d",
    image: '/images/villa-photo-2.jpg',
    imageAlt: 'Future permanent building designed by Lacaton & Vassal',
    imagePosition: 'left',
    backgroundColor: 'brown',
  },
  { _type: 'locationSection', _key: 'location' },
]

export default async function VenuePage() {
  let heroImage = '/images/venue-photo.jpg'
  let heroImageAlt = 'Villa Hegra venue'
  let sections = DEFAULT_SECTIONS

  try {
    const page = await getPage('venue')
    if (page?.heroImage) heroImage = page.heroImage
    if (page?.heroImageAlt) heroImageAlt = page.heroImageAlt
    if (page?.sections?.length) sections = page.sections
  } catch {
    // Sanity unreachable — use static fallback
  }

  return (
    <main>
      <Hero
        title="Venue"
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
      />
      <SectionRenderer sections={sections} />
    </main>
  )
}

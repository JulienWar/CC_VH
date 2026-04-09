import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import VenueGallery from '@/components/sections/VenueGallery'
import LocationSection from '@/components/sections/LocationSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { getPage } from '@/sanity/queries'

const DEFAULT_SECTIONS = [
  { _type: 'textSection', _key: 'landmark', heading: 'A new Cultural Landmark in AlUla' },
  { _type: 'venueGallery', _key: 'gallery' },
  { _type: 'textImageSection', _key: 'permanent', heading: 'Towards a permanent building designed by Lacaton & Vassal', imagePosition: 'left', backgroundColor: 'brown' },
  { _type: 'locationSection', _key: 'location' },
]

export default async function VenuePage() {
  let sections = DEFAULT_SECTIONS
  let heroImage = '/images/venue-photo.jpg'
  let heroImageAlt = 'Villa Hegra venue'

  try {
    const page = await getPage('venue')
    if (page?.sections?.length) sections = page.sections
    if (page?.heroImage) heroImage = page.heroImage
    if (page?.heroImageAlt) heroImageAlt = page.heroImageAlt
  } catch {
    // Sanity unreachable
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

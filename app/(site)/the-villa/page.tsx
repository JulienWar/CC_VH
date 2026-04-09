import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import FoundingEntities from '@/components/sections/FoundingEntities'
import PartnersSection from '@/components/sections/PartnersSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { getPage } from '@/sanity/queries'

// Default section order for static fallback
const DEFAULT_SECTIONS = [
  { _type: 'textImageSection', _key: 'intro', heading: 'Villa Hegra', imagePosition: 'right', backgroundColor: 'cream' },
  { _type: 'textImageSection', _key: 'viva', imagePosition: 'left', backgroundColor: 'cream' },
  { _type: 'foundingEntities', _key: 'founding' },
  { _type: 'partnersSection', _key: 'partners' },
]

export default async function TheVillaPage() {
  let sections = DEFAULT_SECTIONS
  let heroImage = '/images/villa-hero.jpg'
  let heroImageAlt = 'Villa Hegra exterior'

  try {
    const page = await getPage('the-villa')
    if (page?.sections?.length) sections = page.sections
    if (page?.heroImage) heroImage = page.heroImage
    if (page?.heroImageAlt) heroImageAlt = page.heroImageAlt
  } catch {
    // Sanity unreachable
  }

  return (
    <main>
      <Hero
        title="The Villa"
        imageSrc={heroImage}
        imageAlt={heroImageAlt}
      />
      <SectionRenderer sections={sections} />
    </main>
  )
}

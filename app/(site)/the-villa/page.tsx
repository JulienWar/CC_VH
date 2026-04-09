import Hero from '@/components/sections/Hero'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { getPage } from '@/sanity/queries'

// Default section order — all text is embedded so site works without CMS
const DEFAULT_SECTIONS = [
  {
    _type: 'textImageSection',
    _key: 'intro',
    heading: 'Villa Hegra',
    text: "Born from the friendship between Saudi Arabia and France, Villa Hegra is a bilateral institution dedicated to cross-cultural cooperation. It supports contemporary creation in the fields of visual arts, design, cinema and performing arts, providing a space open to creativity, education and exchange.",
    image: '/images/villa-photo-1.jpg',
    imageAlt: 'Villa Hegra interior',
    imagePosition: 'right',
    backgroundColor: 'cream',
  },
  {
    _type: 'textImageSection',
    _key: 'viva',
    text: "Villa Hegra is part of ¡Viva Villa!, the international network of cultural villas, along with Villa Medici in Rome, Villa Kujoyama in Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United States, and Villa Swagatam in India.\n\nThese institutions nurture creation and cross-cultural dialogue, offering time and space for artists to develop their work, and building bridges between cultures through exchange, research, and community engagement.\n\nVilla Hegra fully embraces its role as a cultural meeting point between Saudi Arabia, France, and the world. Its programming fosters dialogue, innovation, and collaboration, inviting both local and international audiences to actively engage in the creative process.",
    image: '/images/villa-photo-2.jpg',
    imageAlt: 'Cultural exchange at Villa Hegra',
    imagePosition: 'left',
    backgroundColor: 'cream',
  },
  { _type: 'foundingEntities', _key: 'founding' },
  { _type: 'partnersSection', _key: 'partners' },
]

export default async function TheVillaPage() {
  let heroImage = '/images/villa-hero.jpg'
  let heroImageAlt = 'Villa Hegra exterior'
  let sections = DEFAULT_SECTIONS

  try {
    const page = await getPage('the-villa')
    if (page?.heroImage) heroImage = page.heroImage
    if (page?.heroImageAlt) heroImageAlt = page.heroImageAlt
    if (page?.sections?.length) sections = page.sections
  } catch {
    // Sanity unreachable — use static fallback
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

import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import FoundingEntities from '@/components/sections/FoundingEntities'
import PartnersSection from '@/components/sections/PartnersSection'
import { getPage } from '@/sanity/queries'

export default async function TheVillaPage() {
  let heroImage = '/images/villa-hero.jpg'
  let heroImageAlt = 'Villa Hegra exterior'
  let introHeading = 'Villa Hegra'
  let introText = "Born from the friendship between Saudi Arabia and France, Villa Hegra is a bilateral institution dedicated to cross-cultural cooperation. It supports contemporary creation in the fields of visual arts, design, cinema and performing arts, providing a space open to creativity, education and exchange."
  let introImage = '/images/villa-photo-1.jpg'
  let introImageAlt = 'Villa Hegra interior'
  let networkText1 = "Villa Hegra is part of ¡Viva Villa!, the international network of cultural villas, along with Villa Medici in Rome, Villa Kujoyama in Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United States, and Villa Swagatam in India."
  let networkText2 = "These institutions nurture creation and cross-cultural dialogue, offering time and space for artists to develop their work, and building bridges between cultures through exchange, research, and community engagement."
  let networkText3 = "Villa Hegra fully embraces its role as a cultural meeting point between Saudi Arabia, France, and the world. Its programming fosters dialogue, innovation, and collaboration, inviting both local and international audiences to actively engage in the creative process."
  let networkImage = '/images/villa-photo-2.jpg'
  let networkImageAlt = 'Cultural exchange at Villa Hegra'
  let foundingHeading = 'Founding entities'
  let foundingDescription = "Villa Hegra\u2019s founding entities are the Royal Commission for AlUla (RCU) and the French Agency for AlUla Development (Afalula)."

  try {
    const page = await getPage('the-villa')
    if (page?.heroImage) heroImage = page.heroImage
    if (page?.heroImageAlt) heroImageAlt = page.heroImageAlt
    if (page?.sections) {
      for (const s of page.sections) {
        if (s._key === 'intro' || (s._type === 'textImageSection' && s.heading === 'Villa Hegra')) {
          if (s.heading) introHeading = s.heading
          if (s.image) introImage = s.image
          if (s.imageAlt) introImageAlt = s.imageAlt
        }
        if (s._key === 'viva' || (s._type === 'textImageSection' && s.heading?.includes('Viva'))) {
          if (s.image) networkImage = s.image
          if (s.imageAlt) networkImageAlt = s.imageAlt
        }
        if (s._type === 'foundingEntities') {
          if (s.heading) foundingHeading = s.heading
          if (s.description) foundingDescription = s.description
        }
      }
    }
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

      {/* Section 1: Villa Hegra intro — text left, photo right */}
      <section className="bg-[#f5efe0]">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-[768px]">
          <div className="flex flex-col justify-between px-5 lg:px-12 py-12 lg:py-16 gap-8 lg:w-1/2 shrink-0">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,5vw,96px)] leading-none text-[#2c2923]"
              stagger={0.05}
            >
              {introHeading}
            </TextReveal>
            <p className="text-[#2c2923] text-[18px] lg:text-[24px] leading-[1.4] max-w-lg" style={{ fontWeight: 375 }}>
              {introText}
            </p>
          </div>
          <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
            <Image
              src={introImage}
              alt={introImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Viva Villa network — photo left, text right */}
      <section className="bg-[#f5efe0]">
        <div className="max-w-[1440px] mx-auto flex flex-col-reverse lg:flex-row min-h-[756px]">
          <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
            <Image
              src={networkImage}
              alt={networkImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 lg:px-12 py-12 lg:py-16 lg:w-1/2 shrink-0">
            <p className="text-[#2c2923] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
              {networkText1}
              <br /><br />
              {networkText2}
              <br /><br />
              {networkText3}
            </p>
          </div>
        </div>
      </section>

      <FoundingEntities heading={foundingHeading} description={foundingDescription} />
      <PartnersSection />
    </main>
  )
}

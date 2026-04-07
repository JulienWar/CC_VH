import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'
import FoundingEntities from '@/components/sections/FoundingEntities'
import PartnersSection from '@/components/sections/PartnersSection'

export default function TheVillaPage() {
  return (
    <main>
      <Hero
        title="The Villa"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Villa Hegra exterior"
      />

      {/* Section 1: Villa Hegra intro */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[768px]">
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6 order-2 lg:order-1">
          <TextReveal
            as="h2"
            className="text-[clamp(36px,4vw,64px)] leading-tight"
          >
            Villa Hegra
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Born from the friendship between Saudi Arabia and France, Villa
            Hegra is a bilateral institution dedicated to cross-cultural
            cooperation. It supports contemporary creation in the fields of
            visual arts, design, cinema and performing arts, providing a space
            open to creativity, education and exchange.
          </p>
        </div>
        <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
          <ParallaxImage
            src="/images/placeholder.jpg"
            alt="Villa Hegra interior"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      {/* Section 2: Viva Villa network */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[756px]">
        <div className="relative h-64 lg:h-auto overflow-hidden order-2 lg:order-1">
          <ParallaxImage
            src="/images/placeholder.jpg"
            alt="Cultural exchange event"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 order-1 lg:order-2">
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Villa Hegra is part of ¡Viva Villa!, the international network of
            cultural villas, along with Villa Medici in Rome, Villa Kujoyama in
            Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United
            States, and Villa Swagatam in India. These institutions nurture
            creation and cross-cultural dialogue, offering time and space for
            artists to develop their work, and building bridges between cultures
            through exchange, research, and community engagement.
          </p>
        </div>
      </section>

      <FoundingEntities />
      <PartnersSection />
    </main>
  )
}

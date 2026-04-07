import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import ParallaxImage from '@/components/animations/ParallaxImage'
import VenueGallery from '@/components/sections/VenueGallery'
import LocationSection from '@/components/sections/LocationSection'

export default function VenuePage() {
  return (
    <main>
      <Hero
        title="Venue"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Villa Hegra venue"
      />

      {/* Landmark intro */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6 order-2 lg:order-1">
          <TextReveal
            as="h2"
            className="text-[clamp(32px,4vw,56px)] leading-tight"
          >
            A new Cultural Landmark in AlUla
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            Villa Hegra opened its doors in central AlUla in October 2025. The
            villa resulting from the renovation of two existing buildings, serves
            as the hub of its artistic and cultural programming. The Villa houses
            two studios, fully equipped studios, an outside workspace, and seven
            apartments for resident artists.
          </p>
          <p className="text-base opacity-70 leading-relaxed max-w-md">
            It also includes an exhibition annex, a 50-seat auditorium which is
            the first indoor cinema in AlUla, as well as the city&apos;s first
            performing arts studio and workshop spaces designed especially for
            children and teenagers.
          </p>
        </div>
        <div className="relative h-64 lg:h-auto overflow-hidden order-1 lg:order-2">
          <ParallaxImage
            src="/images/placeholder.jpg"
            alt="Villa Hegra cultural landmark"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </section>

      <VenueGallery />

      {/* Permanent building */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] bg-[#bfb098]">
        <div className="relative h-64 lg:h-auto overflow-hidden order-2 lg:order-1">
          <ParallaxImage
            src="/images/placeholder.jpg"
            alt="Future permanent building"
            speed={0.3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-end px-5 lg:px-12 py-16 gap-6 order-1 lg:order-2">
          <TextReveal
            as="h2"
            className="text-[clamp(24px,3vw,44px)] leading-tight"
          >
            Towards a permanent building designed by Lacaton & Vassal
          </TextReveal>
          <p className="text-base opacity-80 leading-relaxed max-w-md">
            Looking ahead, in Phase 2, Villa Hegra will be housed in a new
            building designed by Pritzker Prize laureates Anne Lacaton and
            Jean-Philippe Vassal. The project embodies the philosophy of the
            architects: &quot;Never demolish, never lose, never make it worse.
            Always add, always transform, from what is already there.&quot;
          </p>
        </div>
      </section>

      <LocationSection />
    </main>
  )
}

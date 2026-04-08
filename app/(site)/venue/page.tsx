import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'
import VenueGallery from '@/components/sections/VenueGallery'
import LocationSection from '@/components/sections/LocationSection'

export default function VenuePage() {
  return (
    <main>
      <Hero
        title="Venue"
        imageSrc="/images/venue-photo.jpg"
        imageAlt="Villa Hegra venue"
      />

      {/* Landmark intro */}
      <section className="bg-[#8b6546] px-5 lg:px-12 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-24">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,5vw,96px)] leading-none text-[#f5efe0]"
              stagger={0.05}
            >
              A new Cultural Landmark in AlUla
            </TextReveal>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-6">
            <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 500 }}>
              Villa Hegra opened its doors in central AlUla in October 2025.
            </p>
            <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
              The earlier off-site and preopening phases served as an introduction to the communities of AlUla and, with this opening, the Villa now begins its on-site journey. This venue, resulting from the renovation of two existing buildings, serves as the hub of its artistic and cultural programming, offering a space for encounter, exchange, and creative expression for artists and audiences. The Villa houses five modular, fully equipped studios, an outdoor workspace, and seven apartments for resident artists.
            </p>
            <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
              It also includes an exhibition space, a 50-seat auditorium, which is the first indoor cinema in AlUla, as well as the city&apos;s first performing arts studio and workshop spaces designed especially for children and teenagers. Located in the Al-Sukhayrat neighbourhood, in the heart of a residential area, Villa Hegra&apos;s presence reflects its commitment to grow with and within the daily life of AlUla&apos;s families.
            </p>
          </div>
        </div>
      </section>

      <VenueGallery />

      {/* Permanent building */}
      <section className="bg-[#8b6546]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <Image
              src="/images/villa-photo-2.jpg"
              alt="Future permanent building designed by Lacaton & Vassal"
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-5 lg:px-12 py-16 gap-6">
            <TextReveal
              as="h2"
              className="text-[clamp(32px,3.5vw,64px)] leading-[1.2] text-[#f5efe0]"
              stagger={0.05}
            >
              Towards a permanent building designed by Lacaton &amp; Vassal
            </TextReveal>
            <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
              Looking ahead, in its Phase 2, Villa Hegra will be housed in a new building designed by Pritzker Prize laureates Anne Lacaton and Jean-Philippe Vassal. Conceived as a gesture of harmony between AlUla&apos;s urban fabric and its natural heritage, the project embodies the philosophy of the architects: &quot;Never demolish, never cut down trees, never cut down in anything living. Always add, complete, transform. From what is already there. To do more and better with less&quot;
            </p>
          </div>
        </div>
      </section>

      <LocationSection />
    </main>
  )
}

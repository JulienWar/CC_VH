import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'

export default function AboutIntro() {
  return (
    <section className="bg-[#8b6546]">
      <div className="max-w-[1440px] mx-auto min-h-[698px] flex flex-col lg:flex-row">
        {/* Text column */}
        <div className="flex flex-col justify-end px-5 lg:px-12 py-12 lg:py-16 lg:w-1/2 shrink-0 gap-8">
          <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
            Villa Hegra is an institution dedicated to cross-cultural cooperation,
            born from the friendship between Saudi Arabia and France. Villa Hegra
            is located in AlUla, a vast region in northwest Saudi Arabia that holds
            the country&apos;s first UNESCO World Heritage designation. Its site,
            inaugurated in October 2025, hosts artist residencies and studios, an
            exhibition hall, workshop spaces, as well as the region&apos;s first
            indoor cinema and performing arts studio. Supporting contemporary
            creation in visual arts, cinema, and performing arts, Villa Hegra stands
            as a hub for creativity, education, and dialogue between the AlUla
            community and international audience.
          </p>
          <CTAButton label="Discover" href="/the-villa" size="S" color="light" />
        </div>

        {/* Photo column */}
        <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
          <Image
            src="/images/venue-photo.jpg"
            alt="Villa Hegra venue"
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

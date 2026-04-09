import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'

interface AboutIntroProps {
  text?: string
  ctaLabel?: string
  ctaLink?: string
  image?: string
  imageAlt?: string
}

export default function AboutIntro({
  text = "Villa Hegra is an institution dedicated to cross-cultural cooperation, born from the friendship between Saudi Arabia and France. Villa Hegra is located in AlUla, a vast region in northwest Saudi Arabia that holds the country\u2019s first UNESCO World Heritage designation. Its site, inaugurated in October 2025, hosts artist residencies and studios, an exhibition hall, workshop spaces, as well as the region\u2019s first indoor cinema and performing arts studio. Supporting contemporary creation in visual arts, cinema, and performing arts, Villa Hegra stands as a hub for creativity, education, and dialogue between the AlUla community and international audience.",
  ctaLabel = 'Discover',
  ctaLink = '/the-villa',
  image = '/images/venue-photo.jpg',
  imageAlt = 'Villa Hegra venue',
}: AboutIntroProps) {
  return (
    <section className="bg-[#8b6546]">
      <div className="max-w-[1440px] mx-auto min-h-[698px] flex flex-col lg:flex-row">
        <div className="flex flex-col justify-end px-5 lg:px-12 py-12 lg:py-16 lg:w-1/2 shrink-0 gap-8">
          <p className="text-[#f5efe0] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
            {text}
          </p>
          <CTAButton label={ctaLabel} href={ctaLink} size="S" color="light" />
        </div>
        <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

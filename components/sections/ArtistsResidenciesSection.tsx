import Image from 'next/image'
import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

const DEFAULT_ARTISTS = [
  'Théo Mercier,',
  'Paul Emilieu Marchesseau,',
  'Badr Ali, Saad Tahaitah,',
]

interface ArtistsResidenciesSectionProps {
  heading?: string
  description?: string
  artistNames?: string[]
  ctaLabel?: string
  ctaLink?: string
  image?: string
  imageAlt?: string
}

export default function ArtistsResidenciesSection({
  heading = 'Artists Residencies',
  description = 'Villa Hegra hosts Saudi and French artists from various disciplines (design, visual arts, performing arts, cinema) as part of its residency program.',
  artistNames = DEFAULT_ARTISTS,
  ctaLabel = 'See all residencies',
  ctaLink = '/residencies',
  image = '/images/residency-photo.jpg',
  imageAlt = 'Artists Residencies at Villa Hegra',
}: ArtistsResidenciesSectionProps) {
  return (
    <section className="bg-[#8b6546]">
      <div className="px-5 lg:px-12 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
            <div className="flex flex-col gap-6">
              <TextReveal
                as="h2"
                className="text-[#f5efe0] text-[clamp(48px,6vw,96px)] leading-none"
                stagger={0.05}
              >
                {heading}
              </TextReveal>
              <button
                className="flex items-center gap-0 text-[#f5efe0] border-b-2 border-[#f5efe0] pb-1 w-fit hover:opacity-70 transition-opacity"
                style={{ fontWeight: 500 }}
              >
                <span className="text-[32px] leading-none">2025</span>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                </svg>
              </button>
            </div>
            <div className="lg:w-[696px] lg:pt-4">
              <p className="text-[#f5efe0] text-[18px] lg:text-[32px] leading-[1.2]" style={{ fontWeight: 375 }}>
                {description}
              </p>
            </div>
          </div>
          <div className="mb-10">
            {artistNames.map((name) => (
              <p
                key={name}
                className="text-[#59220e] text-[clamp(28px,4vw,56px)] leading-tight hover:opacity-80 transition-opacity cursor-default"
                style={{ fontWeight: 375 }}
              >
                {name}
              </p>
            ))}
          </div>
          <CTAButton label={ctaLabel} href={ctaLink} size="S" color="light" />
        </div>
      </div>
      <div className="relative w-full h-[600px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

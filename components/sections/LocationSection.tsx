import Image from 'next/image'
import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

interface LocationSectionProps {
  heading?: string
  text?: string
  ctaLabel?: string
  ctaLink?: string
  mapImage?: string
}

export default function LocationSection({
  heading = 'Our Location',
  text = "Villa Hegra\u2019s site is located in central AlUla. All visitors are welcomed during working hours to attend our cultural programming.",
  ctaLabel = 'Learn more about Villa Hegra',
  ctaLink = '/the-villa',
  mapImage = '/images/map.jpg',
}: LocationSectionProps) {
  return (
    <section className="bg-[#f5efe0]">
      <div className="px-5 lg:px-12 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,6vw,96px)] leading-none text-[#2c2923]"
              stagger={0.05}
            >
              {heading}
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-4 flex flex-col gap-6 justify-end">
            <p className="text-[#2c2923] text-[18px] lg:text-[24px] leading-[1.4]" style={{ fontWeight: 375 }}>
              {text}
            </p>
            <CTAButton label={ctaLabel} href={ctaLink} size="S" color="dark" />
          </div>
        </div>
      </div>
      <div className="relative w-full h-[500px] lg:h-[700px]">
        <Image
          src={mapImage}
          alt="AlUla map — Villa Hegra location"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  )
}

import TextReveal from '@/components/animations/TextReveal'

// Row 1: 8 logos
const ROW_1 = [
  { src: '/images/partner-1.png', alt: 'Atelier des artistes en exil' },
  { src: '/images/partner-10.png', alt: 'Centre Pompidou' },
  { src: '/images/partner-11.png', alt: 'Musée de l\'Homme' },
  { src: '/images/partner-12.png', alt: 'Opéra national de Paris' },
  { src: '/images/partner-13.png', alt: 'Mucem' },
  { src: '/images/partner-14.png', alt: 'Misk' },
  { src: '/images/partner-15.png', alt: 'LUMA Foundation' },
  { src: '/images/partner-16.png', alt: 'La Rotonde' },
]

// Row 2: 8 logos
const ROW_2 = [
  { src: '/images/partner-17.png', alt: 'Maison de la Culture du Monde' },
  { src: '/images/partner-2.png', alt: 'Cité internationale des arts' },
  { src: '/images/partner-18.png', alt: 'KADK' },
  { src: '/images/partner-19.png', alt: 'Art Explora' },
  { src: '/images/partner-20.png', alt: 'Partner logo' },
  { src: '/images/partner-21.png', alt: 'Partner logo' },
  { src: '/images/partner-22.png', alt: 'Partner logo' },
  { src: '/images/partner-23.png', alt: 'Partner logo' },
]

// Row 3: 7 logos — centered
const ROW_3 = [
  { src: '/images/partner-25.png', alt: 'Partner logo' },
  { src: '/images/partner-26.png', alt: 'Partner logo' },
  { src: '/images/partner-27.png', alt: 'Partner logo' },
  { src: '/images/partner-28.png', alt: 'Snap AR' },
  { src: '/images/partner-29.png', alt: 'Partner logo' },
  { src: '/images/partner-30.png', alt: 'Partner logo' },
  { src: '/images/partner-31.png', alt: 'Partner logo' },
]

export default function PartnersSection() {
  return (
    <section className="bg-[#f5efe0] px-5 lg:px-12 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto">
        <TextReveal
          as="h2"
          className="text-[clamp(48px,5vw,96px)] leading-[1.2] text-[#2c2923] mb-12"
          stagger={0.05}
        >
          Partners
        </TextReveal>

        <div className="flex flex-col gap-[32px] py-12">
          {/* Row 1 */}
          <div className="flex gap-[16px] items-center flex-wrap lg:flex-nowrap">
            {ROW_1.map((partner, i) => (
              <div key={i} className="flex-1 min-w-[120px] h-[90px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-h-[70px] max-w-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex gap-[16px] items-center flex-wrap lg:flex-nowrap">
            {ROW_2.map((partner, i) => (
              <div key={i} className="flex-1 min-w-[120px] h-[90px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-h-[70px] max-w-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          {/* Row 3 — centered */}
          <div className="flex gap-[16px] items-center justify-center flex-wrap">
            {ROW_3.map((partner, i) => (
              <div key={i} className="w-[120px] lg:w-[163px] h-[90px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-h-[70px] max-w-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

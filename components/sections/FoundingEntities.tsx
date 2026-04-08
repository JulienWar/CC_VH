import Image from 'next/image'
import TextReveal from '@/components/animations/TextReveal'

export default function FoundingEntities() {
  return (
    <section className="bg-[#8b6546] px-5 lg:px-12 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header: title left + description right */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 h-auto lg:h-[324px] p-0 lg:py-0 mb-12">
          <div className="lg:w-[696px] shrink-0">
            <TextReveal
              as="h2"
              className="text-[#f5efe0] text-[clamp(48px,5vw,96px)] leading-[1.2]"
              stagger={0.05}
            >
              Founding entities
            </TextReveal>
          </div>
          <div className="lg:w-[696px] lg:pt-4">
            <p className="text-[#f5efe0] text-[18px] lg:text-[32px] leading-[1.2]" style={{ fontWeight: 375 }}>
              Villa Hegra&apos;s founding entities are the Royal Commission for
              AlUla (RCU) and the French Agency for AlUla Development (Afalula).
            </p>
          </div>
        </div>

        {/* Logo boxes — 456×320px each, centered */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px]">
          <div className="relative w-full sm:w-[456px] h-[240px] sm:h-[320px] overflow-hidden flex items-center justify-center">
            <Image
              src="/images/founding-rcu.png"
              alt="Royal Commission for AlUla (RCU)"
              width={326}
              height={67}
              className="object-contain"
            />
          </div>
          <div className="relative w-full sm:w-[456px] h-[240px] sm:h-[320px] overflow-hidden flex items-center justify-center">
            <Image
              src="/images/founding-afalula.png"
              alt="French Agency for AlUla Development (Afalula)"
              width={204}
              height={214}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

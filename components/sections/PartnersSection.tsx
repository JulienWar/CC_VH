import TextReveal from '@/components/animations/TextReveal'
import StaggerReveal from '@/components/animations/StaggerReveal'

// Placeholder partners — replace with real logo images + Sanity data in Plan 2
const PARTNERS = Array.from({ length: 12 }, (_, i) => ({
  alt: `Partner ${i + 1}`,
}))

export default function PartnersSection() {
  return (
    <section className="px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        <TextReveal
          as="h2"
          className="text-[clamp(36px,4vw,64px)] leading-tight mb-12"
        >
          Partners
        </TextReveal>
        <StaggerReveal
          className="flex flex-wrap gap-4"
          stagger={0.04}
        >
          {PARTNERS.map((p) => (
            <div
              key={p.alt}
              className="w-[163px] h-[90px] bg-[#f5efe0] border border-[#2c2923]/10 flex items-center justify-center"
            >
              <span className="text-xs opacity-30">{p.alt}</span>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}

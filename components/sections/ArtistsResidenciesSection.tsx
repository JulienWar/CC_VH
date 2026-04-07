import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

const SAMPLE_ARTISTS = [
  'Théo Mercier,',
  'Paul Emilieu Marchesseau,',
  'Badr Ali, Saad Tahaitah,',
]

export default function ArtistsResidenciesSection() {
  return (
    <section className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-24 mb-12">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(40px,5vw,80px)] leading-none"
            >
              Artists Residencies
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-8 space-y-4">
            <span className="text-xs uppercase tracking-widest opacity-60 block">2025</span>
            <p className="text-base opacity-70 leading-relaxed max-w-sm">
              Villa Hegra hosts Saudi and French artists from various disciplines
              (design, visual arts, performing arts, cinema) as part of its
              residency program.
            </p>
          </div>
        </div>

        <div className="mb-10 space-y-1">
          {SAMPLE_ARTISTS.map((name) => (
            <p
              key={name}
              className="text-[clamp(24px,4vw,56px)] leading-tight opacity-80 hover:opacity-100 transition-opacity cursor-default"
              style={{ fontWeight: 375 }}
            >
              {name}
            </p>
          ))}
        </div>

        <CTAButton
          label="See all residencies"
          href="/residencies"
          variant="ghost"
          className="text-[#f5efe0] border-[#f5efe0]"
        />
      </div>
    </section>
  )
}

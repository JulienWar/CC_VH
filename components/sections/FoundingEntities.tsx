import TextReveal from '@/components/animations/TextReveal'

export default function FoundingEntities() {
  return (
    <section className="bg-[#bfb098] px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(36px,4vw,64px)] leading-tight"
            >
              Founding entities
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-4">
            <p className="text-base leading-relaxed max-w-md">
              Villa Hegra&apos;s founding entities are the Royal Commission for
              AlUla (RCU) and the French Agency for AlUla Development (Afalula).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-12 flex-wrap">
          <div className="w-[163px] h-[90px] bg-white/40 flex items-center justify-center">
            <span className="text-xs opacity-50">RCU Logo</span>
          </div>
          <div className="w-[163px] h-[90px] bg-white/40 flex items-center justify-center">
            <span className="text-xs opacity-50">Afalula Logo</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import TextReveal from '@/components/animations/TextReveal'
import CTAButton from '@/components/ui/CTAButton'

export default function LocationSection() {
  return (
    <section className="px-5 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="lg:w-1/2 space-y-6">
          <TextReveal
            as="h2"
            className="text-[clamp(40px,5vw,80px)] leading-none"
          >
            Our Location
          </TextReveal>
          <p className="text-base opacity-70 leading-relaxed max-w-sm">
            Villa Hegra&apos;s site is located in central AlUla. All visitors
            are welcomed during working hours to attend our cultural
            programming.
          </p>
          <CTAButton
            label="Learn more about Villa Hegra"
            href="/the-villa"
            variant="arrow"
          />
        </div>

        {/* Map placeholder */}
        <div className="lg:w-1/2 h-64 lg:h-96 bg-[#bfb098] flex items-center justify-center rounded">
          <span className="text-sm opacity-50">Map — AlUla, Saudi Arabia</span>
        </div>
      </div>
    </section>
  )
}

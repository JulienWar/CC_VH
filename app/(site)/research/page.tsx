import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'

export default function ResearchPage() {
  return (
    <main>
      <Hero
        title="Research and Exchanges"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Research and exchanges"
      />
      <section className="px-5 lg:px-12 py-24">
        <div className="max-w-[1512px] mx-auto">
          <TextReveal
            as="h2"
            className="text-[clamp(36px,4vw,64px)] leading-tight mb-8"
          >
            Coming soon
          </TextReveal>
          <p className="text-base opacity-70 max-w-lg leading-relaxed">
            Villa Hegra&apos;s research and exchanges programme is currently
            being developed. Check back soon for updates.
          </p>
        </div>
      </section>
    </main>
  )
}

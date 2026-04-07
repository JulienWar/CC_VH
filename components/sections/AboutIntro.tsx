import ParallaxImage from '@/components/animations/ParallaxImage'
import CTAButton from '@/components/ui/CTAButton'

export default function AboutIntro() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[698px]">
      {/* Text */}
      <div className="flex flex-col justify-end px-5 lg:px-12 py-16 order-2 lg:order-1 gap-6">
        <p className="text-sm leading-relaxed opacity-80 max-w-sm">
          Villa Hegra is an institution dedicated to cross-cultural cooperation,
          born from the friendship between Saudi Arabia and France. Villa Hegra
          is located in AlUla, a vast region in northwest Saudi Arabia that holds
          the country&apos;s first UNESCO World Heritage designation. Its site,
          inaugurated in October 2025, hosts artist residencies and studios, an
          exhibition hall, workshop spaces, as well as the region&apos;s first
          indoor cinema and performing arts studio.
        </p>
        <CTAButton label="Discover" href="/the-villa" variant="primary" />
      </div>

      {/* Image */}
      <div className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden">
        <ParallaxImage
          src="/images/placeholder.jpg"
          alt="Villa Hegra building"
          speed={0.3}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  )
}

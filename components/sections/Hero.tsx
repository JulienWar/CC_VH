import Image from 'next/image'
import HeroScrollCaret from '@/components/ui/HeroScrollCaret'

interface HeroProps {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
}

export default function Hero({ title, subtitle, imageSrc, imageAlt }: HeroProps) {
  const words = title.split(' ')

  return (
    <section className="relative w-full h-dvh overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" id="hero-bg-wrap">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          id="hero-bg"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#f5efe0] px-5">
        {subtitle && (
          <p
            id="hero-subtitle"
            className="text-xs font-medium tracking-widest uppercase mb-4 opacity-80"
          >
            {subtitle}
          </p>
        )}
        <h1
          id="hero-title"
          className="text-[clamp(48px,8vw,96px)] leading-[1.05]"
          style={{ fontWeight: 375 }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <HeroScrollCaret />
    </section>
  )
}

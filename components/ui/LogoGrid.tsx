import Image from 'next/image'

interface LogoItem {
  src: string
  alt: string
  href?: string
}

interface LogoGridProps {
  logos: LogoItem[]
  className?: string
}

export default function LogoGrid({ logos, className = '' }: LogoGridProps) {
  return (
    <div className={`flex flex-wrap gap-x-4 gap-y-6 items-center ${className}`}>
      {logos.map((logo) => {
        const img = (
          <div className="relative w-[163px] h-[90px]">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="163px"
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )

        if (logo.href) {
          return (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {img}
            </a>
          )
        }

        return <div key={logo.alt}>{img}</div>
      })}
    </div>
  )
}

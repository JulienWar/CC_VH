import Image from 'next/image'
import Link from 'next/link'

interface ArtistCardProps {
  photo: string
  photoAlt: string
  discipline: string
  name: string
  dates: string
  href: string
}

function Diamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="#2c2923" aria-hidden="true" className="shrink-0">
      <path d="M5 0L10 5L5 10L0 5Z"/>
    </svg>
  )
}

export default function ArtistCard({
  photo,
  photoAlt,
  discipline,
  name,
  dates,
  href,
}: ArtistCardProps) {
  return (
    <article className="flex flex-col group">
      {/* Square photo */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          sizes="(max-width: 640px) 100vw, 351px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info panel */}
      <div className="bg-[#f5efe0] p-6 flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-4">
          {/* Discipline */}
          <div className="flex items-center gap-2">
            <Diamond />
            <span className="text-[16px] text-[#2c2923] leading-[1.3]" style={{ fontWeight: 500 }}>
              {discipline}
            </span>
          </div>
          {/* Name */}
          <h3 className="text-[32px] leading-[1.2] text-[#2c2923]" style={{ fontWeight: 500 }}>
            {name}
          </h3>
        </div>
        {/* Date + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[18px] text-[#2c2923]" style={{ fontWeight: 500 }}>
            {dates}
          </span>
          <Link
            href={href}
            className="flex items-center gap-1 text-[18px] text-[#2c2923] pb-[2px] border-b-2 border-transparent hover:border-[#2c2923] transition-all duration-200 w-fit"
            style={{ fontWeight: 500 }}
          >
            More info
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

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

export default function ArtistCard({
  photo,
  photoAlt,
  discipline,
  name,
  dates,
  href,
}: ArtistCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden mb-3">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          sizes="(max-width: 768px) 100vw, 351px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#8b6546]">
          ✦ {discipline}
        </p>
        <h3 className="text-lg font-medium leading-tight">{name}</h3>
        <p className="text-sm opacity-60">{dates}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm hover:gap-2 transition-all duration-200"
        >
          More info →
        </Link>
      </div>
    </article>
  )
}

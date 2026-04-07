import Image from 'next/image'
import Link from 'next/link'

interface EventCardProps {
  image: string
  imageAlt: string
  category: string
  title: string
  date: string
  location: string
  href: string
  size?: 'small' | 'medium'
  isPast?: boolean
}

export default function EventCard({
  image,
  imageAlt,
  category,
  title,
  date,
  location,
  href,
  size = 'small',
  isPast = false,
}: EventCardProps) {
  const cardH = size === 'medium' ? 'h-[761px]' : 'h-[652px]'

  return (
    <article className={`relative ${cardH} flex flex-col overflow-hidden group`}>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 354px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative mt-auto p-4 text-[#f5efe0]">
        <div className="flex items-center gap-3 text-xs opacity-70 mb-2">
          <span>{date}</span>
          <span>·</span>
          <span>{location}</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest opacity-60 block mb-1">
          {category}
        </span>
        <h3 className="text-base font-medium leading-tight mb-4">{title}</h3>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs border border-[#f5efe0] px-3 py-1.5 hover:bg-[#f5efe0] hover:text-[#2c2923] transition-colors"
        >
          {isPast ? 'Discover' : 'Book now'}{' '}
          <span className="text-[10px]">↗</span>
        </Link>
      </div>
    </article>
  )
}

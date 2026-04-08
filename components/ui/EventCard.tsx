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
  isPast?: boolean
}

// Material: open_in_new
function OpenInNewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
    </svg>
  )
}

// Material: calendar_today
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/>
    </svg>
  )
}

// Material: place / location_on
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

// Orange diamond (category)
function Diamond() {
  return (
    <svg width="12" height="12" viewBox="0 0 10 10" fill="#ce6223" aria-hidden="true" className="shrink-0">
      <path d="M5 0L10 5L5 10L0 5Z"/>
    </svg>
  )
}

// Arrow forward icon (for Discover CTA)
function ArrowForwardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  )
}

// Plus / Add icon (top-right of title)
function AddIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  )
}

export default function EventCard({
  image,
  imageAlt,
  category,
  title,
  date,
  location,
  href,
  isPast = false,
}: EventCardProps) {
  const bgColor = isPast ? 'bg-[#bfb098]' : 'bg-[#2c2923]'
  const textColor = isPast ? 'text-[#2c2923]' : 'text-[#f5efe0]'

  return (
    <article className="flex flex-col w-[354px] shrink-0 group">
      {/* Photo */}
      <div className={`relative w-[354px] ${isPast ? 'h-[240px]' : 'h-[354px]'} overflow-hidden`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="354px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info panel */}
      <div className={`${bgColor} ${textColor} p-6 flex flex-col gap-4 flex-1`}>
        {/* Meta: date + location */}
        <div className="flex items-center gap-4 flex-nowrap">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <CalendarIcon />
            <span className="text-[16px]" style={{ fontWeight: 375 }}>{date}</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <PinIcon />
            <span className="text-[16px]" style={{ fontWeight: 375 }}>{location}</span>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2">
          <Diamond />
          <span className="text-[14px]" style={{ fontWeight: 500 }}>
            {category}
          </span>
        </div>

        {/* Title + add icon */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-[24px] leading-[1.3] flex-1"
            style={{ fontWeight: 500 }}
          >
            {title}
          </h3>
          <button className="hover:opacity-70 transition-opacity mt-0.5" aria-label="Expand">
            <AddIcon />
          </button>
        </div>

        {/* CTA — right-aligned */}
        <div className="flex justify-end mt-auto">
          <Link
            href={href}
            className={`flex w-fit items-center gap-[4px] text-[18px] pb-[3px] border-b-2 border-transparent hover:border-current transition-all duration-200`}
            style={{ fontWeight: 500 }}
          >
            {isPast ? 'Discover' : 'Book now'}
            {isPast ? <ArrowForwardIcon /> : <OpenInNewIcon />}
          </Link>
        </div>
      </div>
    </article>
  )
}

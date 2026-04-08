import Link from 'next/link'

interface OpenCallItemProps {
  discipline: string
  title: string
  description: string
  moreInfoUrl?: string
}

function Diamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="#2c2923" aria-hidden="true" className="shrink-0">
      <path d="M5 0L10 5L5 10L0 5Z"/>
    </svg>
  )
}

export default function OpenCallItem({
  discipline,
  title,
  description,
  moreInfoUrl = '#',
}: OpenCallItemProps) {
  return (
    <div className="flex flex-col gap-2 py-4 border-b border-[#8b6546]">
      {/* Discipline + Title row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Diamond />
          <span className="text-[16px] text-[#2c2923]" style={{ fontWeight: 500 }}>
            {discipline}
          </span>
        </div>
        <p className="text-[32px] leading-[1.2] text-[#2c2923]" style={{ fontWeight: 500 }}>
          {title}
        </p>
      </div>
      {/* Description + More info */}
      <div className="flex items-start justify-between gap-40">
        <p className="flex-1 text-[18px] leading-[1.3] text-[#2c2923]" style={{ fontWeight: 375 }}>
          {description}
        </p>
        <Link
          href={moreInfoUrl}
          className="shrink-0 flex w-fit items-center gap-2 text-[24px] text-[#2c2923] pb-[2px] border-b-2 border-transparent hover:border-[#2c2923] transition-all duration-200"
          style={{ fontWeight: 500 }}
        >
          More info
          <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

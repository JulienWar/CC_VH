interface OpenCallItemProps {
  discipline: string
  title: string
  description: string
  dateRange: string
  moreInfoUrl?: string
}

export default function OpenCallItem({
  discipline,
  title,
  description,
  dateRange,
  moreInfoUrl = '#',
}: OpenCallItemProps) {
  return (
    <div className="flex items-start justify-between gap-8 py-6 border-b border-[#2c2923]/20">
      <div className="flex-1 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-[#8b6546]">
          ✦ {discipline}
        </p>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm opacity-60 leading-relaxed max-w-xl">{description}</p>
        <p className="text-xs opacity-40">{dateRange}</p>
      </div>
      <a
        href={moreInfoUrl}
        className="shrink-0 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-200 mt-1"
      >
        More info →
      </a>
    </div>
  )
}

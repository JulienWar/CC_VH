'use client'

interface FilterOption {
  label: string
  value: string
}

interface FilterBarProps {
  timeFilters?: FilterOption[]
  categoryFilters?: FilterOption[]
  activeTime?: string
  activeCategory?: string
  onTimeChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  showArrows?: boolean
  dropdownLabel?: string
}

export default function FilterBar({
  timeFilters = [],
  categoryFilters = [],
  activeTime,
  activeCategory,
  onTimeChange,
  onCategoryChange,
  showArrows = false,
  dropdownLabel,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {/* Dropdown-style filter (e.g. "Year") */}
      {dropdownLabel && (
        <>
          <button className="flex items-center gap-1 text-[32px] leading-none text-[#2c2923] border-b-2 border-[#2c2923] pb-0.5" style={{ fontWeight: 500 }}>
            {dropdownLabel}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
          {categoryFilters.length > 0 && (
            <div className="h-8 w-px bg-[#2c2923] opacity-20 mx-1" />
          )}
        </>
      )}

      {/* Time text filters (Today, This week, This month) */}
      {timeFilters.length > 0 && (
        <div className="flex items-center gap-6 mr-2">
          {timeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => onTimeChange?.(f.value)}
              className={`text-[32px] leading-none pb-1 border-b-2 transition-colors ${
                activeTime === f.value
                  ? 'border-[#2c2923]'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              style={{ fontWeight: 500 }}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {timeFilters.length > 0 && categoryFilters.length > 0 && (
        <div className="h-8 w-px bg-[#2c2923] opacity-20 mx-1" />
      )}

      {categoryFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onCategoryChange?.(f.value)}
          className={`text-[18px] leading-none px-5 py-3.5 transition-colors ${
            activeCategory === f.value
              ? 'bg-[#8b6546] text-[#f5efe0]'
              : 'bg-[#f5efe0] text-[#2c2923] border border-[#bfb098] hover:opacity-80'
          }`}
          style={{ fontWeight: 500 }}
        >
          {f.label}
        </button>
      ))}

      {showArrows && (
        <div className="ml-auto flex gap-4">
          <button className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity" aria-label="Previous">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <button className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity" aria-label="Next">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

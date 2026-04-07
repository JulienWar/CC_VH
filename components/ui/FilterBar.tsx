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
}

export default function FilterBar({
  timeFilters = [],
  categoryFilters = [],
  activeTime,
  activeCategory,
  onTimeChange,
  onCategoryChange,
  showArrows = false,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {timeFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onTimeChange?.(f.value)}
          className={`text-sm pb-1 border-b transition-colors ${
            activeTime === f.value
              ? 'border-[#2c2923] font-medium'
              : 'border-transparent opacity-50 hover:opacity-80'
          }`}
        >
          {f.label}
        </button>
      ))}

      {timeFilters.length > 0 && categoryFilters.length > 0 && (
        <div className="h-8 w-px bg-[#2c2923] opacity-20 mx-1" />
      )}

      {categoryFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onCategoryChange?.(f.value)}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${
            activeCategory === f.value
              ? 'bg-[#2c2923] text-[#f5efe0] border-[#2c2923]'
              : 'border-[#2c2923] opacity-50 hover:opacity-80'
          }`}
        >
          {f.label}
        </button>
      ))}

      {showArrows && (
        <div className="ml-auto flex gap-2">
          <button className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors text-sm">
            ←
          </button>
          <button className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors text-sm">
            →
          </button>
        </div>
      )}
    </div>
  )
}

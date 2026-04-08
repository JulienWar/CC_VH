import Link from 'next/link'

// Arrow forward icon — matches Figma "arrow_forward" Material icon
function ArrowForward({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" />
    </svg>
  )
}

type CTASize = 'L' | 'M' | 'S'

interface CTAButtonProps {
  label: string
  href?: string
  onClick?: () => void
  size?: CTASize
  color?: 'dark' | 'light'
  className?: string
  // legacy variants kept for backward compat
  variant?: 'primary' | 'ghost' | 'arrow'
}

const sizeMap: Record<CTASize, { text: string; icon: number }> = {
  L: { text: 'text-[32px]', icon: 32 },
  M: { text: 'text-[24px]', icon: 24 },
  S: { text: 'text-[18px]', icon: 18 },
}

export default function CTAButton({
  label,
  href,
  onClick,
  size = 'S',
  color = 'dark',
  variant,
  className = '',
}: CTAButtonProps) {
  // Map legacy variants to new color
  const resolvedColor =
    variant === 'ghost' || color === 'light' ? 'light' : 'dark'

  const { text: textSize, icon: iconSize } = sizeMap[size]
  const colorClass = resolvedColor === 'light' ? 'text-[#f5efe0]' : 'text-[#2c2923]'
  const hoverBorder = resolvedColor === 'light'
    ? 'hover:border-[#f5efe0]'
    : 'hover:border-[#2c2923]'

  const cls = `flex items-center gap-[8px] pb-[4px] border-b-2 border-transparent transition-all duration-200 w-fit ${textSize} ${colorClass} ${hoverBorder} ${className}`

  const content = (
    <>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <ArrowForward size={iconSize} />
    </>
  )

  if (href) {
    return <Link href={href} className={cls}>{content}</Link>
  }

  return (
    <button onClick={onClick} className={cls}>{content}</button>
  )
}

import Link from 'next/link'

type CTAVariant = 'primary' | 'ghost' | 'arrow'

interface CTAButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: CTAVariant
  className?: string
}

export default function CTAButton({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const base =
    'inline-flex items-center gap-2 text-sm font-medium transition-all duration-200'

  const variants: Record<CTAVariant, string> = {
    primary:
      'border border-current px-5 py-2 hover:bg-[#2c2923] hover:text-[#f5efe0] hover:border-[#2c2923]',
    ghost: 'underline underline-offset-4 hover:opacity-60',
    arrow: 'group hover:gap-4',
  }

  const content = (
    <>
      {label}
      {variant === 'arrow' && (
        <span className="transition-transform group-hover:translate-x-1">→</span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  )
}

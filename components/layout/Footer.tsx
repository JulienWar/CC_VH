import Link from 'next/link'

const footerLinks = [
  { label: 'Access & Contact', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Support us', href: '#' },
  { label: 'Team', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookies', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#2c2923] text-[#f5efe0] px-5 lg:px-[60px] py-8">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Logo — two SVGs stacked in 192×89 container */}
        <Link
          href="/"
          className="relative shrink-0 block"
          style={{ width: '192px', height: '89px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-group.svg"
            alt="Villa Hegra"
            width="152"
            height="30"
            className="block absolute"
            style={{ top: '17px', left: '20px' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-group1.svg"
            alt=""
            width="152"
            height="18"
            className="block absolute"
            style={{ top: '51px', left: '20px' }}
          />
        </Link>

        {/* Nav links — 16px Medium, dot separators */}
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 opacity-80" aria-label="Footer navigation">
          {footerLinks.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="w-1 h-1 rounded-full bg-[#f5efe0] opacity-60 shrink-0" />
              )}
              <Link
                href={link.href}
                className="text-[16px] text-[#f5efe0] hover:opacity-100 opacity-80 transition-opacity"
                style={{ fontWeight: 375 }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Social icons — 40×40 each */}
        <div className="flex gap-4 items-center opacity-80">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
             className="w-10 h-10 flex items-center justify-center hover:opacity-100 opacity-80 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15V9l5.2 3L10 15z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
             className="w-10 h-10 flex items-center justify-center hover:opacity-100 opacity-80 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
             className="w-10 h-10 flex items-center justify-center hover:opacity-100 opacity-80 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

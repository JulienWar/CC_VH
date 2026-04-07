import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const ppNeueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/PPNeueMontrealArabic-Book.woff2',
      weight: '375',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPNeueMontrealArabic-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pp-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Villa Hegra',
  description:
    'Villa Hegra is an institution dedicated to cross-cultural cooperation, born from the friendship between Saudi Arabia and France.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ppNeueMontreal.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}

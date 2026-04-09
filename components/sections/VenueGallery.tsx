'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const GALLERY_ITEMS = [
  { src: '/images/venue-card-1.jpg', alt: 'Artists studios', label: 'Artists studios' },
  { src: '/images/venue-card-2.jpg', alt: 'Auditorium hosting AlUla\'s first indoor cinema', label: 'Auditorium hosting AlUla\'s first indoor cinema' },
  { src: '/images/venue-card-3.jpg', alt: 'Workshop spaces for children and teenagers', label: 'Workshop spaces for children and teenagers' },
  { src: '/images/venue-card-4.jpg', alt: 'AlUla\'s first performing arts studio', label: 'AlUla\'s first performing arts studio' },
  { src: '/images/venue-card-5.jpg', alt: 'Artist\'s accommodation', label: 'Artist\'s accommodation' },
  { src: '/images/venue-card-6.jpg', alt: 'Villa Hegra exhibition space', label: 'Villa Hegra exhibition space' },
]

interface VenueGalleryProps {
  items?: { image: string; alt?: string; label?: string }[]
}

export default function VenueGallery({ items }: VenueGalleryProps) {
  const galleryItems = items && items.length > 0
    ? items.map(item => ({ src: item.image, alt: item.alt || '', label: item.label || '' }))
    : GALLERY_ITEMS
  const scrollRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = dir === 'left' ? -470 : 470
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-[80px]">
      {/* Navigation arrows — above cards */}
      <div className="flex justify-end gap-2 px-5 lg:px-12 mb-4 max-w-[1440px] mx-auto">
        <button
          onClick={() => scroll('left')}
          className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Previous"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="text-[#2c2923] opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Next"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="cards-row flex gap-2 pb-4 snap-x snap-mandatory">
          {galleryItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.label}
                className="shrink-0 w-[280px] lg:w-[456px] aspect-[456/304] relative overflow-hidden snap-start cursor-pointer"
                onClick={() => toggleCard(index)}
              >
                {/* Photo */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 280px, 456px"
                  className="object-cover"
                />

                {/* Orange + button — visible when closed */}
                <div className={`absolute bottom-0 right-0 bg-[#ce6223] p-[16px] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5efe0" aria-hidden="true">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                </div>

                {/* Orange label bar — slides up when open */}
                <div className={`absolute bottom-0 left-0 right-0 bg-[#ce6223] px-[24px] pt-[16px] pb-[24px] flex flex-col items-end gap-[10px] transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                  {/* Minus icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#f5efe0" aria-hidden="true" className="shrink-0">
                    <path d="M19 13H5V11H19V13Z" />
                  </svg>
                  {/* Label */}
                  <p className="w-full text-[16px] leading-[1.3] text-[#f5efe0]" style={{ fontWeight: 500 }}>
                    {item.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

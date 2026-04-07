'use client'

import { useState } from 'react'
import Image from 'next/image'

const GALLERY_IMAGES = [
  { src: '/images/placeholder.jpg', alt: 'Venue interior 1' },
  { src: '/images/placeholder.jpg', alt: 'Venue interior 2' },
  { src: '/images/placeholder.jpg', alt: 'Venue interior 3' },
  { src: '/images/placeholder.jpg', alt: 'Venue interior 4' },
  { src: '/images/placeholder.jpg', alt: 'Venue interior 5' },
]

export default function VenueGallery() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-8">
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-5 lg:px-12 pb-4 snap-x snap-mandatory">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.alt}
              className="shrink-0 w-[280px] lg:w-[360px] aspect-[4/3] relative overflow-hidden snap-start cursor-pointer"
              onClick={() => setActive(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="360px"
                className={`object-cover transition-all duration-300 ${
                  active === i ? 'brightness-100' : 'brightness-75'
                }`}
              />
              <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#ce6223] flex items-center justify-center">
                <span className="text-white text-xs font-medium">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 px-5 lg:px-12 mt-4">
        <button
          onClick={() => setActive((p) => Math.max(0, p - 1))}
          className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors text-sm"
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() =>
            setActive((p) => Math.min(GALLERY_IMAGES.length - 1, p + 1))
          }
          className="w-8 h-8 border border-[#2c2923] flex items-center justify-center hover:bg-[#2c2923] hover:text-[#f5efe0] transition-colors text-sm"
          aria-label="Next"
        >
          →
        </button>
      </div>
    </section>
  )
}

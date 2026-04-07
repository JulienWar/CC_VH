'use client'

import { useRef, ElementType } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TextRevealProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
}

function buildWordSpans(text: string): string {
  return text
    .split(' ')
    .map(
      (word) =>
        `<span class="inline-block overflow-hidden mr-[0.2em]"><span data-word class="inline-block">${word}</span></span>`
    )
    .join('')
}

export default function TextReveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger = 0.06,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      if (!ref.current) return

      const words = ref.current.querySelectorAll('[data-word]')
      gsap.set(words, { y: '110%' })

      gsap.to(words, {
        y: '0%',
        duration: 0.85,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      dangerouslySetInnerHTML={{ __html: buildWordSpans(children) }}
    />
  )
}

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Stagger reveal for card grids */
export function staggerReveal(
  container: Element,
  options: { stagger?: number; y?: number } = {}
) {
  const items = Array.from(container.children)
  gsap.set(items, { opacity: 0, y: options.y ?? 30, scale: 0.97 })
  return gsap.to(items, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    ease: 'power2.out',
    stagger: options.stagger ?? 0.08,
    scrollTrigger: {
      trigger: container,
      start: 'top 85%',
      once: true,
    },
  })
}

/** Parallax: move element at speed fraction of scroll */
export function parallax(element: Element, speed = 0.35) {
  return gsap.to(element, {
    yPercent: speed * -100,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement ?? element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

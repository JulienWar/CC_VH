import { client } from './client'

// ── Events ──────────────────────────────────────────
export async function getUpcomingEvents() {
  return client.fetch(
    `*[_type == "event" && isPast != true] | order(order asc) {
      "id": _id,
      title,
      "image": image.asset->url,
      imageAlt,
      category,
      date,
      location,
      "href": "/programming/" + slug.current
    }`
  )
}

export async function getPastEvents() {
  return client.fetch(
    `*[_type == "event" && isPast == true] | order(order asc) {
      "id": _id,
      title,
      "image": image.asset->url,
      imageAlt,
      category,
      date,
      location,
      "href": "/programming/" + slug.current,
      "isPast": true
    }`
  )
}

// ── Pages ───────────────────────────────────────────
export async function getPage(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      title,
      "heroImage": heroImage.asset->url,
      heroImageAlt,
      sections[] {
        _type,
        _key,
        heading,
        body,
        "image": image.asset->url,
        imageAlt,
        imagePosition,
        eventType,
        showTimeFilter,
        "images": images[] {
          "url": asset->url,
          alt,
          caption
        }
      }
    }`,
    { slug }
  )
}

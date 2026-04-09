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
        subtitle,
        body,
        text,
        description,
        "image": image.asset->url,
        imageAlt,
        imagePosition,
        backgroundColor,
        eventType,
        showTimeFilter,
        // heroHP fields
        "backgroundImage": backgroundImage.asset->url,
        cardTitle,
        cardText,
        cardLink,
        cardLinkLabel,
        // aboutIntro fields
        ctaLabel,
        ctaLink,
        // artistsResidencies fields
        artistNames,
        // locationSection fields
        "mapImage": mapImage.asset->url,
        // foundingEntities fields
        "logo1": logo1.asset->url,
        logo1Alt,
        "logo2": logo2.asset->url,
        logo2Alt,
        // gallery fields
        "images": images[] {
          "url": asset->url,
          alt,
          caption
        },
        "items": items[] {
          "image": image.asset->url,
          alt,
          label
        },
        // partners
        "logos": logos[] {
          "url": asset->url,
          alt
        }
      }
    }`,
    { slug }
  )
}

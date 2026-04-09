import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const UPCOMING_EVENTS = [
  { title: 'AlUla Arts Festival 2026 – Vertigo', imageAlt: 'AlUla Arts Festival 2026 – Vertigo', category: 'Events', date: 'January – February 2026', location: 'Villa Hegra', isPast: false, order: 1 },
  { title: 'Not Deserted: AlUla\u2019s Archives in Movement Exhibition', imageAlt: 'Archives in Movement Exhibition', category: 'Exhibitions', date: 'January – February 2026', location: 'Villa Hegra', isPast: false, order: 2 },
  { title: 'AlUla Arts Festival 2026 – Urban dance Showcase', imageAlt: 'Urban dance Showcase', category: 'Events', date: 'January – February 2026', location: 'Villa Hegra', isPast: false, order: 3 },
  { title: '\u201cLes Mains\u201d by Auguste Rodin', imageAlt: 'Les Mains by Auguste Rodin', category: 'Exhibitions', date: 'November 2025', location: 'Villa Hegra', isPast: false, order: 4 },
  { title: 'Film Appreciation Programme', imageAlt: 'Film Appreciation Programme', category: 'Cinema', date: 'October 2025', location: 'Villa Hegra', isPast: false, order: 5 },
]

const PAST_EVENTS = [
  { title: 'Art Paris 2025 – Villa Hegra Exhibition', imageAlt: 'Art Paris 2025', category: 'Exhibitions', date: 'April 2025', location: 'Villa Hegra', isPast: true, order: 1 },
  { title: 'Crossings by the Junior Ballet of the Op\u00e9ra national de Paris', imageAlt: 'Crossings by the Junior Ballet', category: 'Events', date: 'December 2024', location: 'Villa Hegra', isPast: true, order: 2 },
  { title: 'Night with the Op\u00e9ra national de Paris', imageAlt: 'Night with the Op\u00e9ra national de Paris', category: 'Events', date: 'January 2024', location: 'Villa Hegra', isPast: true, order: 3 },
  { title: 'Cine-concerts', imageAlt: 'Cine-concerts', category: 'Cinema', date: 'November 2023', location: 'Villa Hegra', isPast: true, order: 4 },
]

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function importEvents() {
  const allEvents = [...UPCOMING_EVENTS, ...PAST_EVENTS]

  for (const event of allEvents) {
    const slug = slugify(event.title)
    const doc = {
      _type: 'event',
      title: event.title,
      slug: { _type: 'slug', current: slug },
      imageAlt: event.imageAlt,
      category: event.category,
      date: event.date,
      location: event.location,
      isPast: event.isPast,
      order: event.order,
    }

    try {
      const result = await client.create(doc)
      console.log(`✓ Created: ${event.title} (${result._id})`)
    } catch (err) {
      console.error(`✗ Failed: ${event.title}`, err.message)
    }
  }
}

console.log('Importing events into Sanity...\n')
await importEvents()
console.log('\nDone! Events are now visible in the Studio.')
console.log('Note: Images need to be uploaded manually in the Studio (Sanity requires image upload via its API).')

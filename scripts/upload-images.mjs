import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { basename } from 'path'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Map event titles to their image files
const EVENT_IMAGES = [
  { titleMatch: 'Vertigo', file: 'public/images/event-1.jpg' },
  { titleMatch: 'Archives in Movement', file: 'public/images/event-2.jpg' },
  { titleMatch: 'Urban dance', file: 'public/images/event-3.jpg' },
  { titleMatch: 'Les Mains', file: 'public/images/event-4.jpg' },
  { titleMatch: 'Film Appreciation', file: 'public/images/event-5.jpg' },
  { titleMatch: 'Art Paris', file: 'public/images/past-event-1.jpg' },
  { titleMatch: 'Junior Ballet', file: 'public/images/past-event-2.jpg' },
  { titleMatch: 'Night with', file: 'public/images/past-event-3.jpg' },
  { titleMatch: 'Cine-concerts', file: 'public/images/past-event-4.jpg' },
]

async function uploadAndAttachImages() {
  // Get all events
  const events = await client.fetch('*[_type == "event"]{ _id, title }')
  console.log(`Found ${events.length} events\n`)

  for (const mapping of EVENT_IMAGES) {
    const event = events.find((e) => e.title.includes(mapping.titleMatch))
    if (!event) {
      console.log(`⚠ No event matching "${mapping.titleMatch}"`)
      continue
    }

    try {
      const imageBuffer = readFileSync(mapping.file)
      const filename = basename(mapping.file)

      // Upload image asset
      const asset = await client.assets.upload('image', imageBuffer, {
        filename,
        contentType: 'image/jpeg',
      })

      // Attach to event
      await client.patch(event._id).set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
      }).commit()

      console.log(`✓ ${event.title} ← ${filename}`)
    } catch (err) {
      console.error(`✗ ${event.title}: ${err.message}`)
    }
  }
}

console.log('Uploading images to Sanity...\n')
await uploadAndAttachImages()
console.log('\nDone! All event images are now in the Studio.')

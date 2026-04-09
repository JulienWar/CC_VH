import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function publishAll() {
  // Get all drafts
  const drafts = await client.fetch('*[_id in path("drafts.**")]{ _id, _type, title }')
  console.log(`Found ${drafts.length} drafts to publish\n`)

  for (const draft of drafts) {
    const publishedId = draft._id.replace('drafts.', '')
    try {
      // Get the full draft document
      const doc = await client.getDocument(draft._id)
      const { _id, _rev, _updatedAt, _createdAt, ...fields } = doc

      // Create or replace the published version
      await client.createOrReplace({ ...fields, _id: publishedId })
      // Delete the draft
      await client.delete(draft._id)
      console.log(`✓ Published: ${draft.title || publishedId} (${draft._type})`)
    } catch (err) {
      console.error(`✗ Failed: ${draft.title || draft._id}`, err.message)
    }
  }
}

console.log('Publishing all drafts...\n')
await publishAll()
console.log('\nDone! All content is now published and live.')

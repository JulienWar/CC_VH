import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const homepage = {
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  sections: [
    {
      _type: 'textSection',
      _key: 'hero',
      heading: 'Hero',
      body: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [{ _type: 'span', _key: 's1', marks: [], text: "Don't Miss — AlUla Arts Festival 2026 – Vertigo performance at Wadi Al Fann" }],
          markDefs: [],
        },
      ],
    },
    {
      _type: 'textImageSection',
      _key: 'about',
      heading: 'About Villa Hegra',
      imagePosition: 'right',
      body: [
        {
          _type: 'block',
          _key: 'b1',
          style: 'normal',
          children: [{ _type: 'span', _key: 's1', marks: [], text: "Villa Hegra is an institution dedicated to cross-cultural cooperation, born from the friendship between Saudi Arabia and France. Villa Hegra is located in AlUla, a vast region in northwest Saudi Arabia that holds the country's first UNESCO World Heritage designation." }],
          markDefs: [],
        },
      ],
    },
    {
      _type: 'eventsSection',
      _key: 'whatson',
      heading: "What's On",
      eventType: 'upcoming',
      showTimeFilter: false,
    },
    {
      _type: 'textSection',
      _key: 'residencies',
      heading: 'Artists Residencies',
    },
    {
      _type: 'textSection',
      _key: 'location',
      heading: 'Location',
    },
  ],
}

try {
  const result = await client.create(homepage)
  console.log(`✓ Created page: Home (${result._id})`)
} catch (err) {
  console.error('✗ Failed:', err.message)
}

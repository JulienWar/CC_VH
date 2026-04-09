import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const PAGES = [
  {
    title: 'Programming',
    slug: 'programming',
    sections: [
      {
        _type: 'textSection',
        _key: 'intro',
        heading: 'Upcoming Events',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: "Villa Hegra's cultural programming includes a wide range of initiatives such as Creative Workshops, Cine-Concerts, Performances, Masterclasses, Research Projects, and Academic Exchange Programs.",
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _type: 'eventsSection',
        _key: 'upcoming',
        heading: 'Upcoming Events',
        eventType: 'upcoming',
        showTimeFilter: true,
      },
      {
        _type: 'eventsSection',
        _key: 'past',
        heading: 'Past Events',
        eventType: 'past',
        showTimeFilter: false,
      },
    ],
  },
  {
    title: 'The Villa',
    slug: 'the-villa',
    sections: [
      {
        _type: 'textImageSection',
        _key: 'intro',
        heading: 'Villa Hegra',
        imagePosition: 'right',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: 'Born from the friendship between Saudi Arabia and France, Villa Hegra is a bilateral institution dedicated to cross-cultural cooperation. It supports contemporary creation in the fields of visual arts, design, cinema and performing arts, providing a space open to creativity, education and exchange.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _type: 'textImageSection',
        _key: 'viva-villa',
        heading: 'Part of ¡Viva Villa! network',
        imagePosition: 'left',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: "Villa Hegra is part of ¡Viva Villa!, the international network of cultural villas, along with Villa Medici in Rome, Villa Kujoyama in Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United States, and Villa Swagatam in India.",
                marks: [],
              },
            ],
            markDefs: [],
          },
          {
            _type: 'block',
            _key: 'b2',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's2',
                text: "These institutions nurture creation and cross-cultural dialogue, offering time and space for artists to develop their work, and building bridges between cultures through exchange, research, and community engagement.",
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _type: 'textSection',
        _key: 'founding',
        heading: 'Founding Entities',
      },
      {
        _type: 'textSection',
        _key: 'partners',
        heading: 'Partners',
      },
    ],
  },
  {
    title: 'Venue',
    slug: 'venue',
    sections: [
      {
        _type: 'textSection',
        _key: 'landmark',
        heading: 'A new Cultural Landmark in AlUla',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: 'Villa Hegra opened its doors in central AlUla in October 2025. The earlier off-site and preopening phases served as an introduction to the communities of AlUla and, with this opening, the Villa now begins its on-site journey.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _type: 'imageGallerySection',
        _key: 'gallery',
        heading: 'Venue Gallery',
      },
      {
        _type: 'textImageSection',
        _key: 'permanent',
        heading: 'Towards a permanent building designed by Lacaton & Vassal',
        imagePosition: 'left',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: 'Looking ahead, in its Phase 2, Villa Hegra will be housed in a new building designed by Pritzker Prize laureates Anne Lacaton and Jean-Philippe Vassal.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      {
        _type: 'textSection',
        _key: 'location',
        heading: 'Location',
      },
    ],
  },
  {
    title: 'Residencies',
    slug: 'residencies',
    sections: [
      {
        _type: 'textSection',
        _key: 'apply',
        heading: 'Apply for residencies',
      },
      {
        _type: 'textSection',
        _key: 'residents',
        heading: 'Villa Hegra residencies',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: 'Villa Hegra hosts Saudi and French artists from various disciplines (design, visual arts, performing arts, cinema) as part of its residency program.',
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Research and Exchanges',
    slug: 'research',
    sections: [
      {
        _type: 'textSection',
        _key: 'intro',
        heading: 'Research and Exchange Programs',
        body: [
          {
            _type: 'block',
            _key: 'b1',
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: 's1',
                text: "As part of its mission, Villa Hegra encourages research programs and academic initiatives. These initiatives foster cross-disciplinary reflections and strengthen ties between artistic and scientific domains, making Villa Hegra a hub of knowledge and innovation.",
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
    ],
  },
]

async function importPages() {
  for (const page of PAGES) {
    const doc = {
      _type: 'page',
      title: page.title,
      slug: { _type: 'slug', current: page.slug },
      sections: page.sections,
    }

    try {
      const result = await client.create(doc)
      console.log(`✓ Created page: ${page.title} (${result._id})`)
    } catch (err) {
      console.error(`✗ Failed: ${page.title}`, err.message)
    }
  }
}

console.log('Importing pages into Sanity...\n')
await importPages()
console.log('\nDone! Pages are now visible in the Studio.')
console.log('You can now drag & drop sections to reorder them.')

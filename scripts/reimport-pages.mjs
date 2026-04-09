import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const client = createClient({
  projectId: 'qunudiz2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Helper: upload image and return asset reference
async function uploadImage(filePath) {
  try {
    const buffer = readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, {
      filename: filePath.split('/').pop(),
      contentType: filePath.endsWith('.png') ? 'image/png' : 'image/jpeg',
    })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.log(`  ⚠ Could not upload ${filePath}: ${err.message}`)
    return undefined
  }
}

async function run() {
  // Delete existing pages
  const existing = await client.fetch('*[_type == "page"]{ _id }')
  for (const doc of existing) {
    await client.delete(doc._id)
    console.log(`Deleted old page: ${doc._id}`)
  }

  // Upload images we'll need
  console.log('\nUploading images...')
  const venuePhoto = await uploadImage('public/images/venue-photo.jpg')
  const residencyPhoto = await uploadImage('public/images/residency-photo.jpg')
  const mapImage = await uploadImage('public/images/map.jpg')
  const heroEvent1 = await uploadImage('public/images/event-1.jpg')
  const villaHero = await uploadImage('public/images/villa-hero.jpg')
  const villaPhoto1 = await uploadImage('public/images/villa-photo-1.jpg')
  const villaPhoto2 = await uploadImage('public/images/villa-photo-2.jpg')
  const venueHero = await uploadImage('public/images/venue-photo.jpg')
  const foundingRcu = await uploadImage('public/images/founding-rcu.png')
  const foundingAfalula = await uploadImage('public/images/founding-afalula.png')
  const eventHero = await uploadImage('public/images/event-3.jpg')
  const residencyHero = await uploadImage('public/images/residency-hero.jpg')
  const researchHero = await uploadImage('public/images/research-hero.jpg')

  console.log('\nCreating pages...\n')

  // ── HOME PAGE ──
  await client.create({
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    sections: [
      {
        _type: 'heroHP',
        _key: 'hero',
        backgroundImage: heroEvent1,
        cardTitle: "Don't Miss",
        cardText: 'AlUla Arts Festival 2026 – Vertigo performance at Wadi Al Fann',
        cardLink: '#',
        cardLinkLabel: 'Book now',
      },
      {
        _type: 'aboutIntro',
        _key: 'about',
        text: "Villa Hegra is an institution dedicated to cross-cultural cooperation, born from the friendship between Saudi Arabia and France. Villa Hegra is located in AlUla, a vast region in northwest Saudi Arabia that holds the country's first UNESCO World Heritage designation. Its site, inaugurated in October 2025, hosts artist residencies and studios, an exhibition hall, workshop spaces, as well as the region's first indoor cinema and performing arts studio. Supporting contemporary creation in visual arts, cinema, and performing arts, Villa Hegra stands as a hub for creativity, education, and dialogue between the AlUla community and international audience.",
        ctaLabel: 'Discover',
        ctaLink: '/the-villa',
        image: venuePhoto,
        imageAlt: 'Villa Hegra venue',
      },
      {
        _type: 'whatIsOn',
        _key: 'whatson',
        heading: "What's On",
        description: "Discover our artistic\nand cultural programming",
        ctaLabel: 'See all events',
        ctaLink: '/programming',
      },
      {
        _type: 'artistsResidencies',
        _key: 'residencies',
        heading: 'Artists Residencies',
        description: 'Villa Hegra hosts Saudi and French artists from various disciplines (design, visual arts, performing arts, cinema) as part of its residency program.',
        artistNames: "Théo Mercier,\nPaul Emilieu Marchesseau,\nBadr Ali, Saad Tahaitah,",
        ctaLabel: 'See all residencies',
        ctaLink: '/residencies',
        image: residencyPhoto,
        imageAlt: 'Artists Residencies at Villa Hegra',
      },
      {
        _type: 'locationSection',
        _key: 'location',
        heading: 'Our Location',
        text: "Villa Hegra's site is located in central AlUla. All visitors are welcomed during working hours to attend our cultural programming.",
        ctaLabel: 'Learn more about Villa Hegra',
        ctaLink: '/the-villa',
        mapImage: mapImage,
      },
    ],
  })
  console.log('✓ Home')

  // ── THE VILLA PAGE ──
  await client.create({
    _type: 'page',
    title: 'The Villa',
    slug: { _type: 'slug', current: 'the-villa' },
    heroImage: villaHero,
    heroImageAlt: 'Villa Hegra exterior',
    sections: [
      {
        _type: 'textImageSection',
        _key: 'intro',
        heading: 'Villa Hegra',
        text: "Born from the friendship between Saudi Arabia and France, Villa Hegra is a bilateral institution dedicated to cross-cultural cooperation. It supports contemporary creation in the fields of visual arts, design, cinema and performing arts, providing a space open to creativity, education and exchange.",
        imagePosition: 'right',
        backgroundColor: 'cream',
        image: villaPhoto1,
        imageAlt: 'Villa Hegra interior',
      },
      {
        _type: 'textImageSection',
        _key: 'viva',
        text: "Villa Hegra is part of ¡Viva Villa!, the international network of cultural villas, along with Villa Medici in Rome, Villa Kujoyama in Kyoto, Casa de Velázquez in Madrid, Villa Albertine in the United States, and Villa Swagatam in India.\n\nThese institutions nurture creation and cross-cultural dialogue, offering time and space for artists to develop their work, and building bridges between cultures through exchange, research, and community engagement.\n\nVilla Hegra fully embraces its role as a cultural meeting point between Saudi Arabia, France, and the world. Its programming fosters dialogue, innovation, and collaboration, inviting both local and international audiences to actively engage in the creative process.",
        imagePosition: 'left',
        backgroundColor: 'cream',
        image: villaPhoto2,
        imageAlt: 'Cultural exchange at Villa Hegra',
      },
      {
        _type: 'foundingEntities',
        _key: 'founding',
        heading: 'Founding entities',
        description: "Villa Hegra's founding entities are the Royal Commission for AlUla (RCU) and the French Agency for AlUla Development (Afalula).",
        logo1: foundingRcu,
        logo1Alt: 'Royal Commission for AlUla (RCU)',
        logo2: foundingAfalula,
        logo2Alt: 'French Agency for AlUla Development (Afalula)',
      },
      {
        _type: 'partnersSection',
        _key: 'partners',
        heading: 'Partners',
      },
    ],
  })
  console.log('✓ The Villa')

  // ── VENUE PAGE ──
  await client.create({
    _type: 'page',
    title: 'Venue',
    slug: { _type: 'slug', current: 'venue' },
    heroImage: venueHero,
    heroImageAlt: 'Villa Hegra venue',
    sections: [
      {
        _type: 'textSection',
        _key: 'landmark',
        heading: 'A new Cultural Landmark in AlUla',
        subtitle: 'Villa Hegra opened its doors in central AlUla in October 2025.',
        text: "The earlier off-site and preopening phases served as an introduction to the communities of AlUla and, with this opening, the Villa now begins its on-site journey. This venue, resulting from the renovation of two existing buildings, serves as the hub of its artistic and cultural programming, offering a space for encounter, exchange, and creative expression for artists and audiences. The Villa houses five modular, fully equipped studios, an outdoor workspace, and seven apartments for resident artists.\n\nIt also includes an exhibition space, a 50-seat auditorium, which is the first indoor cinema in AlUla, as well as the city\u2019s first performing arts studio and workshop spaces designed especially for children and teenagers. Located in the Al-Sukhayrat neighbourhood, in the heart of a residential area, Villa Hegra\u2019s presence reflects its commitment to grow with and within the daily life of AlUla\u2019s families.",
        backgroundColor: 'brown',
      },
      {
        _type: 'venueGallery',
        _key: 'gallery',
      },
      {
        _type: 'textImageSection',
        _key: 'permanent',
        heading: 'Towards a permanent building designed by Lacaton & Vassal',
        text: "Looking ahead, in its Phase 2, Villa Hegra will be housed in a new building designed by Pritzker Prize laureates Anne Lacaton and Jean-Philippe Vassal. Conceived as a gesture of harmony between AlUla\u2019s urban fabric and its natural heritage, the project embodies the philosophy of the architects: \u201cNever demolish, never cut down trees, never cut down in anything living. Always add, complete, transform. From what is already there. To do more and better with less\u201d",
        imagePosition: 'left',
        backgroundColor: 'brown',
        image: villaPhoto2,
        imageAlt: 'Future permanent building designed by Lacaton & Vassal',
      },
      {
        _type: 'locationSection',
        _key: 'location',
        heading: 'Our Location',
        text: "Villa Hegra's site is located in central AlUla. All visitors are welcomed during working hours to attend our cultural programming.",
        ctaLabel: 'Learn more about Villa Hegra',
        ctaLink: '/the-villa',
        mapImage: mapImage,
      },
    ],
  })
  console.log('✓ Venue')

  // ── PROGRAMMING PAGE ──
  await client.create({
    _type: 'page',
    title: 'Programming',
    slug: { _type: 'slug', current: 'programming' },
    heroImage: eventHero,
    heroImageAlt: 'Cultural event in AlUla',
    sections: [
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
  })
  console.log('✓ Programming')

  // ── RESIDENCIES PAGE ──
  await client.create({
    _type: 'page',
    title: 'Residencies',
    slug: { _type: 'slug', current: 'residencies' },
    heroImage: residencyHero,
    heroImageAlt: 'Residencies at Villa Hegra',
    sections: [
      {
        _type: 'textSection',
        _key: 'apply',
        heading: 'Apply for residencies',
      },
      {
        _type: 'artistsResidencies',
        _key: 'residents',
        heading: 'Villa Hegra residencies',
        description: 'Villa Hegra hosts Saudi and French artists from various disciplines (design, visual arts, performing arts, cinema) as part of its residency program.',
      },
    ],
  })
  console.log('✓ Residencies')

  // ── RESEARCH PAGE ──
  await client.create({
    _type: 'page',
    title: 'Research and Exchanges',
    slug: { _type: 'slug', current: 'research' },
    heroImage: researchHero,
    heroImageAlt: 'Research and exchanges at Villa Hegra',
    sections: [
      {
        _type: 'textSection',
        _key: 'intro',
        heading: 'Research and Exchange Programs',
      },
    ],
  })
  console.log('✓ Research and Exchanges')

  console.log('\n✅ All pages re-imported with full content and images!')
}

run().catch(console.error)

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
        imagePosition: 'right',
        backgroundColor: 'cream',
        image: villaPhoto1,
        imageAlt: 'Villa Hegra interior',
      },
      {
        _type: 'textImageSection',
        _key: 'viva',
        heading: 'Part of ¡Viva Villa! network',
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
      },
      {
        _type: 'venueGallery',
        _key: 'gallery',
      },
      {
        _type: 'textImageSection',
        _key: 'permanent',
        heading: 'Towards a permanent building designed by Lacaton & Vassal',
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

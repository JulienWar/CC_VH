'use client'

import HeroHP from './HeroHP'
import AboutIntro from './AboutIntro'
import WhatIsOn from './WhatIsOn'
import ArtistsResidenciesSection from './ArtistsResidenciesSection'
import LocationSection from './LocationSection'
import FoundingEntities from './FoundingEntities'
import PartnersSection from './PartnersSection'
import VenueGallery from './VenueGallery'
import EventsGrid from './EventsGrid'
import TextReveal from '@/components/animations/TextReveal'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderSection(section: any, events?: { upcoming: any[]; past: any[] }) {
  const key = section._key || section._type

  switch (section._type) {
    case 'heroHP':
      return (
        <HeroHP
          key={key}
          backgroundImage={section.backgroundImage || undefined}
          cardTitle={section.cardTitle || undefined}
          cardText={section.cardText || undefined}
          cardLink={section.cardLink || undefined}
          cardLinkLabel={section.cardLinkLabel || undefined}
        />
      )

    case 'aboutIntro':
      return (
        <AboutIntro
          key={key}
          text={section.text || undefined}
          ctaLabel={section.ctaLabel || undefined}
          ctaLink={section.ctaLink || undefined}
          image={section.image || undefined}
          imageAlt={section.imageAlt || undefined}
        />
      )

    case 'whatIsOn':
      return (
        <WhatIsOn
          key={key}
          heading={section.heading || undefined}
          description={section.description || undefined}
          ctaLabel={section.ctaLabel || undefined}
          ctaLink={section.ctaLink || undefined}
          events={events?.upcoming}
        />
      )

    case 'artistsResidencies':
      return (
        <ArtistsResidenciesSection
          key={key}
          heading={section.heading || undefined}
          description={section.description || undefined}
          artistNames={section.artistNames ? section.artistNames.split('\n') : undefined}
          ctaLabel={section.ctaLabel || undefined}
          ctaLink={section.ctaLink || undefined}
          image={section.image || undefined}
          imageAlt={section.imageAlt || undefined}
        />
      )

    case 'locationSection':
      return (
        <LocationSection
          key={key}
          heading={section.heading || undefined}
          text={section.text || undefined}
          ctaLabel={section.ctaLabel || undefined}
          ctaLink={section.ctaLink || undefined}
          mapImage={section.mapImage || undefined}
        />
      )

    case 'foundingEntities':
      return (
        <FoundingEntities
          key={key}
          heading={section.heading || undefined}
          description={section.description || undefined}
          logo1={section.logo1 || undefined}
          logo1Alt={section.logo1Alt || undefined}
          logo2={section.logo2 || undefined}
          logo2Alt={section.logo2Alt || undefined}
        />
      )

    case 'partnersSection':
      return <PartnersSection key={key} />

    case 'venueGallery':
      return <VenueGallery key={key} />

    case 'eventsSection':
      return (
        <div key={key}>
          {section.heading && (
            <section className="px-5 lg:px-12 pt-24 pb-8 max-w-[1440px] mx-auto">
              <TextReveal
                as="h2"
                className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923]"
                stagger={0.05}
              >
                {section.heading}
              </TextReveal>
            </section>
          )}
          <EventsGrid
            events={section.eventType === 'past' ? (events?.past || []) : (events?.upcoming || [])}
            showTimeFilter={section.showTimeFilter ?? true}
            dropdownLabel={section.eventType === 'past' ? 'Year' : undefined}
          />
        </div>
      )

    case 'textSection':
      return (
        <section key={key} className="px-5 lg:px-12 py-16 max-w-[1440px] mx-auto">
          {section.heading && (
            <TextReveal
              as="h2"
              className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#2c2923]"
              stagger={0.05}
            >
              {section.heading}
            </TextReveal>
          )}
        </section>
      )

    case 'textImageSection': {
      const bg = section.backgroundColor === 'brown' ? 'bg-[#8b6546]' : 'bg-[#f5efe0]'
      const textColor = section.backgroundColor === 'brown' ? 'text-[#f5efe0]' : 'text-[#2c2923]'
      const imageFirst = section.imagePosition === 'left'

      return (
        <section key={key} className={bg}>
          <div className={`max-w-[1440px] mx-auto flex ${imageFirst ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row'} min-h-[756px]`}>
            {imageFirst && section.image && (
              <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
                <Image src={section.image} alt={section.imageAlt || ''} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-between px-5 lg:px-12 py-12 lg:py-16 gap-8 lg:w-1/2 shrink-0">
              {section.heading && (
                <TextReveal as="h2" className={`text-[clamp(48px,5vw,96px)] leading-none ${textColor}`} stagger={0.05}>
                  {section.heading}
                </TextReveal>
              )}
            </div>
            {!imageFirst && section.image && (
              <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0">
                <Image src={section.image} alt={section.imageAlt || ''} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
              </div>
            )}
          </div>
        </section>
      )
    }

    default:
      return null
  }
}

interface SectionRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events?: { upcoming: any[]; past: any[] }
}

export default function SectionRenderer({ sections, events }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => renderSection(section, events))}
    </>
  )
}

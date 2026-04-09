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
      return (
        <PartnersSection
          key={key}
          heading={section.heading || undefined}
          logos={section.logos || undefined}
        />
      )

    case 'venueGallery':
      return (
        <VenueGallery
          key={key}
          items={section.items || undefined}
        />
      )

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

    case 'textSection': {
      const tsBrown = section.backgroundColor === 'brown'
      const tsBg = tsBrown ? '#8b6546' : '#f5efe0'
      const tsTextCls = tsBrown ? 'text-[#f5efe0]' : 'text-[#2c2923]'
      const tsParas = section.text ? section.text.split('\n\n').filter(Boolean) : []
      const hasRightCol = section.subtitle || tsParas.length > 0

      return (
        <section key={key} style={{ backgroundColor: tsBg }}>
          <div className="px-5 lg:px-12 py-12 lg:py-16 max-w-[1440px] mx-auto">
            {hasRightCol ? (
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
                <div className="lg:w-1/2">
                  {section.heading && (
                    <TextReveal as="h2" className={`text-[clamp(48px,5vw,96px)] leading-none ${tsTextCls}`} stagger={0.05}>
                      {section.heading}
                    </TextReveal>
                  )}
                </div>
                <div className="lg:w-1/2 flex flex-col gap-6">
                  {section.subtitle && (
                    <p className={`text-[18px] lg:text-[24px] leading-[1.4] ${tsTextCls}`} style={{ fontWeight: 500 }}>
                      {section.subtitle}
                    </p>
                  )}
                  {tsParas.map((para: string, i: number) => (
                    <p key={i} className={`text-[18px] lg:text-[24px] leading-[1.4] ${tsTextCls}`} style={{ fontWeight: 375 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              section.heading && (
                <TextReveal as="h2" className={`text-[clamp(48px,6vw,96px)] leading-[1.2] ${tsTextCls}`} stagger={0.05}>
                  {section.heading}
                </TextReveal>
              )
            )}
          </div>
        </section>
      )
    }

    case 'textImageSection': {
      const tiBrown = section.backgroundColor === 'brown'
      const tiBgColor = tiBrown ? '#8b6546' : '#f5efe0'
      const tiTextCls = tiBrown ? 'text-[#f5efe0]' : 'text-[#2c2923]'
      const imageFirst = section.imagePosition === 'left'
      const tiParas = section.text ? section.text.split('\n\n').filter(Boolean) : []
      const hasText = tiParas.length > 0
      const headingSize = tiBrown ? 'text-[clamp(32px,3.5vw,64px)]' : 'text-[clamp(48px,5vw,96px)]'

      const imageBlock = section.image ? (
        <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-0 overflow-hidden">
          <Image src={section.image} alt={section.imageAlt || ''} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
        </div>
      ) : null

      const textBlock = (
        <div className={`flex flex-col ${section.heading && hasText ? 'justify-between' : 'justify-center'} px-5 lg:px-12 py-12 lg:py-16 gap-8 lg:w-1/2 shrink-0`}>
          {section.heading && (
            <TextReveal as="h2" className={`${headingSize} leading-[1.2] ${tiTextCls}`} stagger={0.05}>
              {section.heading}
            </TextReveal>
          )}
          {hasText && (
            <div className="flex flex-col gap-6">
              {tiParas.map((para: string, i: number) => (
                <p key={i} className={`text-[18px] lg:text-[24px] leading-[1.4] ${tiTextCls}`} style={{ fontWeight: 375 }}>
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>
      )

      return (
        <section key={key} style={{ backgroundColor: tiBgColor }}>
          <div className={`max-w-[1440px] mx-auto flex ${imageFirst ? 'flex-col-reverse lg:flex-row' : 'flex-col lg:flex-row'} min-h-[600px]`}>
            {imageFirst ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
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

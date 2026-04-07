import Hero from '@/components/sections/Hero'
import AboutIntro from '@/components/sections/AboutIntro'
import WhatIsOn from '@/components/sections/WhatIsOn'
import ArtistsResidenciesSection from '@/components/sections/ArtistsResidenciesSection'
import LocationSection from '@/components/sections/LocationSection'

export default function Home() {
  return (
    <main>
      <Hero
        title="Don't Miss"
        subtitle="AlUla Arts Festival 2026"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Villa Hegra hero"
      />
      <AboutIntro />
      <WhatIsOn />
      <ArtistsResidenciesSection />
      <LocationSection />
    </main>
  )
}

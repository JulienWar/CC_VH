import HeroHP from '@/components/sections/HeroHP'
import AboutIntro from '@/components/sections/AboutIntro'
import WhatIsOn from '@/components/sections/WhatIsOn'
import ArtistsResidenciesSection from '@/components/sections/ArtistsResidenciesSection'
import LocationSection from '@/components/sections/LocationSection'

export default function Home() {
  return (
    <main>
      <HeroHP />
      <AboutIntro />
      <WhatIsOn />
      <ArtistsResidenciesSection />
      <LocationSection />
    </main>
  )
}

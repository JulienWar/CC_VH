import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import TextReveal from '@/components/animations/TextReveal'

const RESEARCH_ITEMS = [
  {
    id: '1',
    date: 'October 2025',
    location: 'Villa Hegra',
    type: 'Student Exchange Program',
    title: 'Architecture',
    description: `With the support of the AlUla Design Space and AFALULA, the Phase 2 of the Villa Hegra Architecture Student Exchange Program (VHASEP) took place in November 2025 in AlUla, bringing together seven students from ENSA Paris Malaquais, Prince Sultan University, and the RCU Scholarship Program. Over three weeks, participants explored long-term futures for the Villa Hegra neighborhood, envisioning its transformation by 2050 into a vibrant, resilient, and inclusive district that celebrates AlUla's living heritage. Grounding their projects in real sites around Villa Hegra, students worked on scenarios addressing sustainable growth and communication challenges relevant to the region's development. Organized into two Saudi-French teams, the students imagined how climate, culture, and technology could shape life, movement, gathering spaces, and the built environment in AlUla by mid-century.`,
    photo: '/images/research-1.jpg',
    applyUrl: '#',
  },
  {
    id: '2',
    date: 'October 2025',
    location: 'Villa Hegra',
    type: 'Student Exchange Program',
    title: 'Architecture',
    description: `In autumn 2024, Villa Hegra initiated the first edition of its university exchange in architecture, in partnership with Prince Sultan University in Riyadh, the Paris-Malaquais School of Architecture – PSL, and ENSA Paris Val-de-Seine. The collaborative work of the thirty French and Saudi students involved, exploring AlUla's urban development, was presented in an exhibition at Paris-Malaquais in February 2025 marking the first Paris-based event for Villa Hegra. The jury, composed of Anne Lacaton and Jean-Philippe Vassal, one representative from the AlUla Design Space (RCU) and the Head of AFALULA's Architecture Department, selected one project, awarding the winning team an architectural residency at Villa Hegra in 2026.`,
    photo: '/images/research-2.jpg',
  },
  {
    id: '3',
    date: 'October 2025',
    location: 'Villa Hegra',
    type: 'Student Exchange Program',
    title: 'Social Sciences',
    description: `As part of the preliminary phase of its research stream, Villa Hegra, in partnership with CNRS (French National Centre for Scientific Research), IISMM (French Institute for the Study of Islam and Societies of the Muslim World) and CEFREPA (French Research Centre for the Arabian Peninsula), launched in 2024 a call for pilot projects in the humanities and social sciences: "AlUla: Transformations and Social Dynamics of a Development Project". This call aimed to support field investigations into the social, economic, and cultural transformations induced by the rapid development of the oasis of AlUla and its surrounding areas. Following the selection process, four projects were chosen for the 2024–2025 cycle, and the selected research teams carried out fieldwork in the region.`,
    photo: '/images/research-3.jpg',
  },
]

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function Diamond() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="#2c2923" aria-hidden="true" className="shrink-0">
      <path d="M5 0L10 5L5 10L0 5Z"/>
    </svg>
  )
}

export default function ResearchPage() {
  return (
    <main>
      <Hero
        title="Research and Exchanges"
        imageSrc="/images/research-hero.jpg"
        imageAlt="Research and exchanges at Villa Hegra"
      />

      {/* Intro section */}
      <section className="bg-[#8b6546] px-5 lg:px-12 py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/2">
            <TextReveal
              as="h2"
              className="text-[clamp(48px,6vw,96px)] leading-[1.2] text-[#f5efe0]"
            >
              Research and Exchange Programs
            </TextReveal>
          </div>
          <div className="lg:w-1/2 lg:pt-4">
            <p className="text-[#f5efe0] text-[18px] lg:text-[32px] leading-[1.2]" style={{ fontWeight: 375 }}>
              As part of its mission, Villa Hegra encourages research programs and academic initiatives. These initiatives foster cross-disciplinary reflections and strengthen ties between artistic and scientific domains, making Villa Hegra a hub of knowledge and innovation. At the same time, they inform and enrich the Villa&apos;s curatorial orientations.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#8b6546] px-5 lg:px-12 pb-2">
        <div className="max-w-[1440px] mx-auto flex items-center gap-12">
          <div className="relative">
            <span className="text-[#f5efe0] text-[32px] border-b-2 border-[#f5efe0] pb-1 flex items-center gap-2 cursor-pointer" style={{ fontWeight: 500 }}>
              Types
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </span>
          </div>
          <div className="relative">
            <span className="text-[#f5efe0] text-[32px] border-b-2 border-[#f5efe0] pb-1 flex items-center gap-2 cursor-pointer" style={{ fontWeight: 500 }}>
              Year
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
            </span>
          </div>
        </div>
      </section>

      {/* Research items */}
      <section className="bg-[#8b6546] px-5 lg:px-12 pt-6 pb-16 lg:pb-24">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          {RESEARCH_ITEMS.map((item) => (
            <div key={item.id} className="bg-[#f5efe0] flex flex-col lg:flex-row">
              {/* Content */}
              <div className="flex-1 p-8 flex flex-col gap-6 justify-between">
                <div className="flex flex-col gap-6">
                  {/* Date + location */}
                  <div className="flex items-center gap-6 text-[18px] text-[#2c2923]" style={{ fontWeight: 500 }}>
                    <div className="flex items-center gap-2">
                      <CalendarIcon />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PinIcon />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <Diamond />
                    <span className="text-[16px] text-[#2c2923]" style={{ fontWeight: 500 }}>
                      {item.type}
                    </span>
                  </div>
                  {/* Title + description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[32px] leading-[1.2] text-[#2c2923]" style={{ fontWeight: 500 }}>
                      {item.title}
                    </h3>
                    <p className="text-[18px] leading-[1.3] text-[#2c2923]" style={{ fontWeight: 375 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Apply button */}
                {item.applyUrl && (
                  <div className="flex justify-end">
                    <a
                      href={item.applyUrl}
                      className="inline-flex items-center gap-2 bg-[#2c2923] text-[#f5efe0] text-[18px] px-4 py-2 hover:opacity-90 transition-opacity"
                      style={{ fontWeight: 500 }}
                    >
                      Apply Now
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              {/* Photo */}
              <div className="relative w-full lg:w-[696px] h-[300px] lg:h-auto shrink-0">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 696px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

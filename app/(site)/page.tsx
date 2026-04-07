import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <main>
      <Hero
        title="Don't Miss"
        subtitle="AlUla Arts Festival 2026"
        imageSrc="/images/placeholder.jpg"
        imageAlt="Villa Hegra"
      />
      <div className="min-h-screen bg-[#f5efe0] px-5 lg:px-12 py-24 flex items-center">
        <p className="text-lg max-w-xl opacity-70">Content sections coming soon…</p>
      </div>
    </main>
  )
}

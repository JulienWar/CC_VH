export const metadata = {
  title: 'Villa Hegra — Studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="sanity" style={{ height: '100vh' }}>
      {children}
    </div>
  )
}

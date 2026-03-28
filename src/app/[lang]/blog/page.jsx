export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default function BlogPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Coming Soon...</h1>
    </div>
  )
}

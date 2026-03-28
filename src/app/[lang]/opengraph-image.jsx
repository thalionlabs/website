import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { lang } = await params
  const isFrench = lang === 'fr'

  const logoData = await readFile(join(process.cwd(), 'public/whitelogo.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  const tagline = isFrench
    ? 'Développement Web Sur Mesure · Montréal'
    : 'Custom Web Development · Montreal'

  const sub = isFrench
    ? 'Applications web, automatisations et SaaS pour entreprises en croissance'
    : 'Web apps, automations & SaaS for growing businesses'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0f',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '250px',
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.28) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '300px',
            width: '600px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <img
          src={logoSrc}
          width={220}
          height={72}
          style={{ objectFit: 'contain', marginBottom: '32px' }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            fontWeight: '700',
            color: '#e2e8f0',
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            display: 'flex',
          }}
        >
          {tagline}
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: '18px',
            color: '#94a3b8',
            display: 'flex',
          }}
        >
          {sub}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '14px',
            color: '#4b5563',
            letterSpacing: '0.05em',
            display: 'flex',
          }}
        >
          thalionlabs.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

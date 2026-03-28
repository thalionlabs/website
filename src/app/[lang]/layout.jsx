import '../globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { LanguageProvider } from '../../i18n/LanguageContext'

const BASE_URL = 'https://thalionlabs.com'

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isFrench = lang === 'fr';

  const title = isFrench
    ? "Thalion Labs — Développement Web Sur Mesure à Montréal"
    : "Thalion Labs — Custom Web Development in Montreal";
  const description = isFrench
    ? "Studio de développement basé à Montréal. Applications web sur mesure, automatisations et SaaS pour entreprises en croissance. Prix fixe, accès direct."
    : "Montreal-based dev studio building custom web apps, automations, and SaaS for growing businesses. Fixed scope, direct access, no agencies.";

  return {
    title,
    description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'fr': `${BASE_URL}/fr`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}`,
      siteName: 'Thalion Labs',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      alternateLocale: isFrench ? 'en_CA' : 'fr_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: {
      icon: '/whitelogo.png',
      shortcut: '/whitelogo.png',
      apple: '/whitelogo.png'
    },
  };
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params
  const isFrench = lang === 'fr'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'Thalion Labs',
    url: BASE_URL,
    logo: `${BASE_URL}/whitelogo.png`,
    image: `${BASE_URL}/og-image.png`,
    description: isFrench
      ? 'Studio de développement web basé à Montréal. Applications web sur mesure, automatisations et SaaS pour entreprises en croissance.'
      : 'Montreal-based web development studio. Custom web apps, automations, and SaaS for growing businesses.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Montreal',
      addressRegion: 'QC',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.5017,
      longitude: -73.5673,
    },
    areaServed: [
      { '@type': 'City', name: 'Montreal' },
      { '@type': 'AdministrativeArea', name: 'Quebec' },
      { '@type': 'Country', name: 'Canada' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-438-826-8117',
      email: 'contact@thalionlabs.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
    priceRange: '$$',
    sameAs: ['https://www.instagram.com/thalionlabs/'],
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Thalion Labs',
    url: BASE_URL,
    inLanguage: [lang],
    potentialAction: {
      '@type': 'ContactAction',
      target: `${BASE_URL}/${lang}#contact`,
    },
  }

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body>
        <LanguageProvider initialLang={lang}>
          {/* Skip to main content */}
          <a href="#main-content" className="skipLink" style={{ position: 'absolute', top: '-100px' }}>
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

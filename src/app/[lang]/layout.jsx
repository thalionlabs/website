import '../globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { LanguageProvider } from '../../i18n/LanguageContext'

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const isFrench = lang === 'fr';

  return {
    title: isFrench 
      ? "Thalion Labs - Solutions Techniques Numériques" 
      : "Thalion Labs - Tailored Tech Solutions",
    description: isFrench 
      ? "Nous créons des applications web sur mesure qui font avancer votre entreprise." 
      : "We build tailored web applications that move your business forward.",
    alternates: {
      canonical: `https://thalionlabs.com/${lang}`,
      languages: {
        'en': 'https://thalionlabs.com/en',
        'fr': 'https://thalionlabs.com/fr',
      },
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

  return (
    <html lang={lang}>
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

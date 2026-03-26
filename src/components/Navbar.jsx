import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={e => handleNav(e, '#hero')}>
          <span className={styles.logoIcon}>T</span>
          <span className={styles.logoText}>Thalion Labs</span>
        </a>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={styles.link}
              onClick={e => handleNav(e, link.href)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.ctaBtn}
            onClick={e => handleNav(e, '#contact')}>
            {t.nav.cta}
          </a>
          <button className={styles.langToggle} onClick={toggle} aria-label="Toggle language">
            <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
            <span className={styles.langSep}>|</span>
            <span className={lang === 'fr' ? styles.langActive : ''}>FR</span>
          </button>
        </nav>

        <div className={styles.mobileRight}>
          <button className={styles.langToggleMobile} onClick={toggle} aria-label="Toggle language">
            <span className={lang === 'en' ? styles.langActive : ''}>EN</span>
            <span className={styles.langSep}>|</span>
            <span className={lang === 'fr' ? styles.langActive : ''}>FR</span>
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}

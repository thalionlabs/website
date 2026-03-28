'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '../i18n/LanguageContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t.nav.services, href: `/${lang}#services` },
    { label: t.nav.whyUs, href: `/${lang}#why-us` },
    { label: t.nav.process, href: `/${lang}#process` },
    { label: t.nav.contact, href: `/${lang}#contact` },
    { label: 'Blog', href: `/${lang}/blog` }, // Added blog link
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href={`/${lang}#hero`} className={styles.logo} onClick={() => setMenuOpen(false)}>
          <img src="/whitelogo.png" alt="Thalion Labs" style={{ height: '32px', width: 'auto', display: 'block' }} />
          <span className={styles.logoText}>Thalion Labs</span>
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={styles.link}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href={`/${lang}#contact`} className={styles.ctaBtn}
            onClick={() => setMenuOpen(false)}>
            {t.nav.cta}
          </Link>
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

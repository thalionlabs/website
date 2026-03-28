"use client";
import Link from 'next/link'
import { useLang } from '../i18n/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { lang, t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href={`/${lang}#hero`} className={styles.logo}>
            <img src="/whitelogo.png" alt="Thalion Labs Logo" style={{ height: '32px', width: 'auto', display: 'block' }} />
            <span className={styles.logoText}>Thalion Labs</span>
          </Link>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <div className={styles.right}>
          <nav className={styles.links}>
            {[
              [t.nav.services, `/${lang}#services`],
              [t.nav.whyUs, `/${lang}#why-us`],
              [t.nav.process, `/${lang}#process`],
              [t.nav.contact, `/${lang}#contact`],
            ].map(([label, href]) => (
              <Link key={href} href={href} className={styles.link}>
                {label}
              </Link>
            ))}
          </nav>
          <a
            href="https://www.instagram.com/thalionlabs/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
            aria-label="Thalion Labs on Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            @thalionlabs
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Thalion Labs. {t.footer.rights}</span>
        <span className={styles.dot}>·</span>
        <span>{t.footer.location}</span>
        <span className={styles.dot}>·</span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  )
}

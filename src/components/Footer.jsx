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
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Thalion Labs. {t.footer.rights}</span>
        <span className={styles.dot}>·</span>
        <span>{t.footer.built}</span>
      </div>
    </footer>
  )
}

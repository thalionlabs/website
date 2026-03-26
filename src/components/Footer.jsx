import { useLang } from '../i18n/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a href="#hero" className={styles.logo} onClick={e => handleNav(e, '#hero')}>
            <span className={styles.logoIcon}>T</span>
            <span className={styles.logoText}>Thalion Labs</span>
          </a>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <nav className={styles.links}>
          {[
            [t.nav.services, '#services'],
            [t.nav.whyUs, '#why-us'],
            [t.nav.process, '#process'],
            [t.nav.contact, '#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} className={styles.link} onClick={e => handleNav(e, href)}>
              {label}
            </a>
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

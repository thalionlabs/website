"use client";
import { useLang } from '../i18n/LanguageContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()

  const handleCTA = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {t.hero.badge}
        </div>

        <h1 id="hero-heading" className={styles.heading}>
          {t.hero.heading1}{' '}
          <span className={styles.gradient}>{t.hero.heading2}</span>
          {t.hero.heading3 && <> {t.hero.heading3}</>}
        </h1>

        <p className={styles.sub}>{t.hero.sub}</p>

        <div className={styles.actions}>
          <a href="#contact" className={styles.primaryBtn} onClick={e => handleCTA(e, '#contact')}>
            {t.hero.primary}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#services" className={styles.secondaryBtn} onClick={e => handleCTA(e, '#services')}>
            {t.hero.secondary}
          </a>
        </div>

        <div className={styles.stats}>
          {[
            { num: t.hero.stat1Num, label: t.hero.stat1Label },
            { num: t.hero.stat2Num, label: t.hero.stat2Label },
            { num: t.hero.stat3Num, label: t.hero.stat3Label },
          ].map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles.scrollHint}
        onClick={e => handleCTA(e, '#services')}
        aria-label="Scroll to services"
      >
        <div className={styles.scrollLine} aria-hidden="true" />
        <span aria-hidden="true">{t.hero.scroll}</span>
      </button>
    </section>
  )
}

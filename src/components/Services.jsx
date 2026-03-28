"use client";
import { useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import useReveal from '../hooks/useReveal'
import styles from './Services.module.css'

const icons = [
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="4" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 24h10M14 20v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="7" cy="14" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="21" cy="21" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M10 14h4M18 8.5l-4 4M18 19.5l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M14 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 8c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v12c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V8z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 14h10M9 10h6M9 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
]

export default function Services() {
  const { t } = useLang()
  const ref = useRef(null)
  const revealed = useReveal(ref)

  return (
    <section id="services" className={styles.section} ref={ref} aria-labelledby="services-heading">
      <div className={styles.inner}>
        <div className={`${styles.header} ${revealed ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>{t.services.eyebrow}</span>
          <h2 id="services-heading" className={styles.heading}>
            {t.services.heading.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className={styles.sub}>{t.services.sub}</p>
        </div>

        <div className={styles.grid}>
          {t.services.items.map((s, i) => (
            <div
              key={s.title}
              className={`${styles.card} ${revealed ? styles.cardVisible : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.iconWrap}>{icons[i]}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

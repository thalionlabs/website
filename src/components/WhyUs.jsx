import { useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import useReveal from '../hooks/useReveal'
import styles from './WhyUs.module.css'

const icons = ['◈', '◎', '◇']

export default function WhyUs() {
  const { t } = useLang()
  const ref = useRef(null)
  const revealed = useReveal(ref)

  return (
    <section id="why-us" className={styles.section} ref={ref} aria-labelledby="why-us-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={`${styles.left} ${revealed ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>{t.whyUs.eyebrow}</span>
          <h2 id="why-us-heading" className={styles.heading}>{t.whyUs.heading}</h2>
          <p className={styles.body}>{t.whyUs.body}</p>
          <a
            href="#contact"
            className={styles.cta}
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            {t.whyUs.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <ul className={styles.right} role="list">
          {t.whyUs.pillars.map((p, i) => (
            <li
              key={p.title}
              className={`${styles.pillar} ${revealed ? styles.pillarVisible : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={styles.pillarIcon} aria-hidden="true">{icons[i]}</div>
              <div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

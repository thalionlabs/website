"use client";
import { useRef, useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'
import styles from './Process.module.css'

export default function Process() {
  const { t } = useLang()
  const wrapperRef = useRef(null)
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState('next')
  const stepRef = useRef(0)
  const steps = t.process.steps

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    let rafId = null

    const update = () => {
      const scrollY = window.scrollY
      const top = wrapper.offsetTop
      const height = wrapper.offsetHeight
      const windowH = window.innerHeight
      const scrollable = height - windowH
      if (scrollable <= 0) return

      const p = Math.max(0, Math.min(0.9999, (scrollY - top) / scrollable))
      const newStep = Math.min(steps.length - 1, Math.floor(p * steps.length))

      if (newStep !== stepRef.current) {
        setDir(newStep > stepRef.current ? 'next' : 'prev')
        stepRef.current = newStep
        setStep(newStep)
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [steps.length])

  const handleCTA = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="process" aria-labelledby="process-heading">
      {/* ── Sticky scrolling zone ── */}
      <div className={styles.stickyWrapper} ref={wrapperRef}>
        <div className={styles.sticky} role="region" aria-live="polite" aria-label={t.process.eyebrow}>
          <div className={styles.stickyInner}>

            {/* Left: indicator column */}
            <div className={styles.indicators} aria-hidden="true">
              <div className={styles.bigNum}>{steps[step].num}</div>
              <nav className={styles.dots} aria-label="Step progress">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className={`${styles.dot} ${i === step ? styles.dotActive : i < step ? styles.dotDone : ''}`}
                    title={s.title}
                  />
                ))}
              </nav>
            </div>

            {/* Right: step content */}
            <div className={styles.contentArea}>
              <div className={styles.sectionLabel}>
                <span className={styles.eyebrow}>{t.process.eyebrow}</span>
                <h2 id="process-heading" className={styles.heading}>{t.process.heading}</h2>
              </div>

              <div
                key={`${step}-${dir}`}
                className={`${styles.stepCard} ${dir === 'next' ? styles.fromRight : styles.fromLeft}`}
              >
                <span className={styles.stepTag}>{steps[step].num}</span>
                <h3 className={styles.stepTitle}>{steps[step].title}</h3>
                <p className={styles.stepDesc}>{steps[step].desc}</p>
              </div>

              {/* Scroll hint on mobile (no sticky scroll) */}
              <p className={styles.scrollHintText} aria-hidden="true">
                {step < steps.length - 1 ? '↓ Keep scrolling' : ''}
              </p>
            </div>

          </div>

          {/* Bottom progress bar */}
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── CTA below sticky zone ── */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <p className={styles.ctaEye}>{t.process.ctaText}</p>
          <h3 className={styles.ctaHeading}>{t.process.ctaHeading}</h3>
          <a href="#contact" className={styles.ctaBtn} onClick={handleCTA}>
            {t.process.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  )
}

"use client";
import { useState, useRef } from 'react'
import { useLang } from '../i18n/LanguageContext'
import useReveal from '../hooks/useReveal'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useLang()
  const ref = useRef(null)
  const revealed = useReveal(ref)

  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const data = new FormData()
    data.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('business', form.business || '—')
    data.append('message', form.message)
    data.append('subject', `New inquiry from ${form.name} — Thalion Labs`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      setStatus(json.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section} ref={ref} aria-labelledby="contact-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>

        <div className={`${styles.left} ${revealed ? styles.visible : ''}`}>
          <span className={styles.eyebrow}>{t.contact.eyebrow}</span>
          <h2 id="contact-heading" className={styles.heading}>
            {t.contact.heading1}<br/>{t.contact.heading2}
          </h2>
          <p className={styles.body}>{t.contact.body}</p>

          <address className={styles.contacts}>
            <a href={`mailto:${t.contact.email}`} className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="1" y="4" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M1 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span>{t.contact.email}</span>
            </a>

            <a href={`tel:+14388268117`} className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 2h3.5l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L12 10l4 1.5V15a1 1 0 01-1 1C6.4 16 2 11.6 2 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>{t.contact.phone}</span>
            </a>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span>{t.contact.responseTime}</span>
            </div>
          </address>
        </div>

        <div className={`${styles.formWrap} ${revealed ? styles.formVisible : ''}`}>
          {status === 'sent' ? (
            <div className={styles.success} role="status" aria-live="polite">
              <div className={styles.successIcon} aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#22c55e" strokeWidth="2.5"/>
                  <path d="M14 24l7 7 13-13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.successTitle}>{t.contact.successTitle}</h3>
              <p className={styles.successText}>{t.contact.successText}</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>{t.contact.labelName}</label>
                  <input
                    id="name"
                    className={styles.input}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder={t.contact.placeholderName}
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>{t.contact.labelEmail}</label>
                  <input
                    id="email"
                    className={styles.input}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t.contact.placeholderEmail}
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="business" className={styles.label}>{t.contact.labelBusiness}</label>
                <input
                  id="business"
                  className={styles.input}
                  type="text"
                  name="business"
                  autoComplete="organization"
                  placeholder={t.contact.placeholderBusiness}
                  value={form.business}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>{t.contact.labelMessage}</label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  name="message"
                  placeholder={t.contact.placeholderMessage}
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  rows={5}
                />
              </div>
              {status === 'error' && (
                <p className={styles.errorMsg} role="alert">
                  {t.contact.errorMsg}
                </p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'sending'}
                aria-disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    {t.contact.submit}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8l11-5-5 11-2-4-4-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

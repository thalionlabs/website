'use client'

import { createContext, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const segments = pathname.split('/')
  const lang = (segments[1] === 'en' || segments[1] === 'fr') ? segments[1] : 'en'
  const t = translations[lang]
  
  const toggle = () => {
    const newLang = lang === 'en' ? 'fr' : 'en'
    // Replace the current locale in the path with the new one
    // e.g. /en/about -> /fr/about
    const segments = pathname.split('/')
    if (segments[1] === 'en' || segments[1] === 'fr') {
      segments[1] = newLang
    }
    router.push(segments.join('/') || '/')
  }
  
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import styles from './App.module.css'

export default function App() {
  return (
    <>
      {/* Skip to main content – keyboard / screen reader shortcut */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

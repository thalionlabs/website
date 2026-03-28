import Hero from '../../components/Hero'
import Services from '../../components/Services'
import WhyUs from '../../components/WhyUs'
import Process from '../../components/Process'
import Contact from '../../components/Contact'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default function Page({ params }) {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Contact />
    </>
  )
}

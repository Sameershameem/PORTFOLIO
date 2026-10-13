import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import SEO from '../components/ui/SEO.jsx'

export default function Home() {
  return (
    <div className="page-shell">
      <SEO title="Home" />
      <Navbar />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

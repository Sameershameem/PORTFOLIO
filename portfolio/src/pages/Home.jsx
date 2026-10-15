import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import ApproachSection from '../components/sections/ApproachSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import SelectedWorkSection from '../components/sections/SelectedWorkSection.jsx'
import SEO from '../components/ui/SEO.jsx'
import '../styles/portfolio-experience.css'

export default function Home() {
  return (
    <div className="page-shell experience-shell">
      <SEO
        title="Sameer Shameem — Marketing, Content & Digital Experiences"
        description="Sameer Shameem is a marketing specialist, content creator, performance marketer, copywriter, and emerging vibe coder. He blends strategy, storytelling, and AI-assisted development to turn ideas into digital experiences."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Sameer Shameem',
          mainEntity: {
            '@type': 'Person',
            name: 'Sameer Shameem',
            jobTitle: 'Marketing Specialist, Content Creator, Performance Marketer, Copywriter, and Vibe Coder',
            description: 'I blend strategy, storytelling, performance marketing, and AI-assisted development to turn ideas into digital experiences.',
            knowsAbout: [
              'Marketing strategy',
              'Content creation',
              'Performance marketing',
              'Copywriting',
              'AI-assisted web development',
            ],
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <SelectedWorkSection />
        <ApproachSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer isInnerPage />
    </div>
  )
}

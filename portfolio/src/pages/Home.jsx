import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import ChessExperience from '../components/sections/ChessExperience.jsx'
import ApproachSection from '../components/sections/ApproachSection.jsx'
import ContactSection from '../components/sections/ContactSection.jsx'
import SelectedWorkSection from '../components/sections/SelectedWorkSection.jsx'
import { useRef } from 'react'
import SEO from '../components/ui/SEO.jsx'
import { useReveal } from '../lib/reveal.js'
import Marquee from '../components/ui/Marquee.jsx'
import ImpactSection from '../components/sections/ImpactSection.jsx'
import { contactEmail, contactPhone, contactSocials } from '../data/contactDetails.js'
import { certifications, profile } from '../data/profile.js'
import { siteUrl } from '../data/site.js'
import { pageMeta } from '../data/seo.js'

export default function Home() {
  const mainRef = useRef(null)
  useReveal(mainRef)

  return (
    <div className="page-shell experience-shell">
      <SEO
        {...pageMeta['/']}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ProfilePage',
              '@id': `${siteUrl}/#profile`,
              url: `${siteUrl}/`,
              name: 'Sameer Shameem — Performance Marketing & Digital Marketing Executive',
              mainEntity: { '@id': `${siteUrl}/#person` },
            },
            {
              '@type': 'Person',
              '@id': `${siteUrl}/#person`,
              name: 'Sameer Shameem',
              url: `${siteUrl}/`,
              image: `${siteUrl}/og-image.png`,
              email: `mailto:${contactEmail}`,
              telephone: contactPhone.href.replace('tel:', ''),
              jobTitle: profile.title,
              description: profile.summary,
              address: { '@type': 'PostalAddress', addressLocality: 'Aligarh', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
              worksFor: { '@type': 'Organization', name: 'BrandsWay Agency' },
              alumniOf: { '@type': 'CollegeOrUniversity', name: 'Aligarh Muslim University' },
              hasCredential: certifications.map((name) => ({ '@type': 'EducationalOccupationalCredential', name })),
              sameAs: contactSocials.map((social) => social.href),
              knowsAbout: [
                'Performance marketing',
                'Digital marketing',
                'Meta Ads',
                'Google Search Ads',
                'Social media marketing',
                'Content strategy',
                'Short-form video and Reels',
                'UGC',
                'Copywriting',
                'ROAS optimisation',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: `${siteUrl}/`,
              name: 'Sameer Shameem',
              publisher: { '@id': `${siteUrl}/#person` },
            },
          ],
        }}
      />
      <Navbar />
      <main ref={mainRef}>
        <ChessExperience />
        <Marquee
          className="marquee--statement"
          items={['Strategy', 'Storytelling', 'Performance', 'Content', 'Copy', 'Code']}
          label="Strategy, storytelling, performance, content, copy and code"
        />
        <ImpactSection />
        <SelectedWorkSection />
        <ApproachSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

import { useRef } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useReveal } from '../../lib/reveal.js'

export default function PageLayout({ children }) {
  const mainRef = useRef(null)
  useReveal(mainRef, { auto: true })

  return (
    <div className="page-shell experience-shell experience-shell--inner">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-ink focus:text-white focus:rounded-full focus:text-xs focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" ref={mainRef} className="w-full flex-1 pt-4 md:pt-8 pb-8 md:pb-12 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  )
}

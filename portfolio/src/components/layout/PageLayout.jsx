import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PageLayout({ children, isInnerPage = true }) {
  return (
    <div className="page-shell min-h-screen flex flex-col justify-between">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-ink focus:text-white focus:rounded-full focus:text-xs focus:font-bold focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="w-full flex-1 py-8 md:py-12 flex flex-col">
        {children}
      </main>
      <Footer isInnerPage={isInnerPage} />
    </div>
  )
}

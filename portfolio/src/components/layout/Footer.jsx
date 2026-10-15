import SocialIcons from '../ui/SocialIcons.jsx'
import { contactEmail } from '../../data/contactDetails.js'

export default function Footer({ isInnerPage = false }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <SocialIcons />
      <p>© {new Date().getFullYear()} Sameer Shameem</p>
      {isInnerPage ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="text-xs font-bold hover:text-brand-yellow transition-colors underline bg-transparent border-0 p-0 cursor-pointer text-brand-ink"
        >
          Back to top ↑
        </button>
      ) : (
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      )}
    </footer>
  )
}

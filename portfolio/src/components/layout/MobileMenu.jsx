import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import navLinks from '../../data/navLinks.js'
import { contactEmail, contactSocials } from '../../data/contactDetails.js'

export default function MobileMenu({ isOpen, onClose }) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-900 text-white p-6 sm:p-10 overflow-hidden"
    >
      {/* Signature Yellow Circle Motif in Background */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-brand-yellow/80 pointer-events-none blur-sm"
        aria-hidden="true"
      />

      {/* Header with Wordmark and Close Button */}
      <div className="relative z-10 flex items-center justify-between">
        <NavLink
          to="/"
          onClick={onClose}
          className="text-2xl font-extrabold tracking-tight"
        >
          SAMEER<span className="text-brand-yellow">.</span>
        </NavLink>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-yellow hover:text-brand-ink text-white transition-colors cursor-pointer text-xl"
        >
          ✕
        </button>
      </div>

      {/* Navigation Links Stacked */}
      <nav className="relative z-10 flex flex-col gap-6 my-auto">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.href}
            onClick={onClose}
            className={({ isActive }) =>
              `text-4xl sm:text-5xl font-extrabold tracking-tight transition-colors duration-200 flex items-center justify-between ${
                isActive
                  ? 'text-brand-yellow'
                  : 'text-neutral-200 hover:text-brand-yellow'
              }`
            }
          >
            <span>{link.label}</span>
            <span className="text-sm font-mono opacity-50">↗</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Info & Socials */}
      <div className="relative z-10 pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
        <div className="flex items-center gap-4">
          {contactSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand-yellow transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${contactEmail}`}
          className="text-brand-yellow hover:underline"
        >
          {contactEmail}
        </a>
      </div>
    </div>
  )
}

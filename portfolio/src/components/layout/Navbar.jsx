import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import navLinks from '../../data/navLinks.js'
import MobileMenu from './MobileMenu.jsx'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="SAMEER home">
          SAMEER<span className="text-brand-yellow">.</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="main-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link relative ${
                  isActive
                    ? 'font-bold text-brand-ink after:content-[""] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-brand-yellow after:rounded-full'
                    : ''
                }`
              }
              key={link.label}
              to={link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import navLinks from '../../data/navLinks.js'
import heroSkills from '../../data/heroSkills.js'
import { contactEmail, contactPhone, contactSocials } from '../../data/contactDetails.js'
import { KING_PATH, KING_VIEWBOX } from '../../data/chess.js'
import { scrollToTarget } from '../../lib/smoothScroll.js'
import { initReveals } from '../../lib/reveal.js'
import Marquee from '../ui/Marquee.jsx'

gsap.registerPlugin(ScrollTrigger)

const WORDMARK = 'SAMEER SHAMEEM'
const TICKER = [...heroSkills.map((skill) => skill.label), 'Your move']

function KingIcon({ className }) {
  return (
    <svg className={className} viewBox={KING_VIEWBOX} aria-hidden="true">
      <path d={KING_PATH} />
    </svg>
  )
}

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    const cleanupReveals = initReveals(footer)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return cleanupReveals

    const context = gsap.context(() => {
      // A row of chess squares sets itself as the footer arrives.
      gsap.from('.footer-square', {
        scaleY: 0,
        transformOrigin: '50% 100%',
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '.footer-board', start: 'top 95%', once: true },
      })

      // The giant name rises letter by letter as you reach the very end of the page.
      gsap.from('.footer-wordmark-char', {
        yPercent: 108,
        ease: 'power3.out',
        stagger: 0.04,
        scrollTrigger: { trigger: '.footer-wordmark', start: 'top bottom', end: 'bottom bottom', scrub: 1 },
      })
    }, footer)

    return () => {
      context.revert()
      cleanupReveals()
    }
  }, [])

  return (
    <footer className="footer" ref={footerRef}>
      <Marquee items={TICKER} className="marquee--footer" speed={32} />

      <div className="footer-inner">
        <div className="footer-lead">
          <p className="footer-label" data-reveal="up">Your move</p>
          <h2 className="footer-heading" data-reveal="lines">
            Every great campaign starts with a single move.
          </h2>
          <a className="footer-email" href={`mailto:${contactEmail}`} data-reveal="up" data-magnetic>
            {contactEmail} <span aria-hidden="true">↗</span>
          </a>
          <a className="footer-phone" href={contactPhone.href} data-reveal="up">
            {contactPhone.display}
          </a>
        </div>

        <div className="footer-board" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span className={`footer-square${index === 4 ? ' is-accent' : ''}`} key={index} />
          ))}
        </div>

        <div className="footer-columns" data-reveal="stagger">
          <nav className="footer-column" aria-label="Footer">
            <p className="footer-label">Navigate</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="footer-link" to={link.href}>
                    <span>{link.label.charAt(0) + link.label.slice(1).toLowerCase()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-column">
            <p className="footer-label">Elsewhere</p>
            <ul>
              {contactSocials.map((social) => (
                <li key={social.label}>
                  <a className="footer-link" href={social.href} target="_blank" rel="noreferrer">
                    <span>{social.label}</span> <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <p className="footer-label">On the board</p>
            <ul>
              {heroSkills.map((skill) => (
                <li className="footer-skill" key={skill.piece}>
                  {skill.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        {WORDMARK.split('').map((char, index) => (
          <span className="footer-wordmark-char" key={index}>
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </div>

      <div className="footer-base">
        <p>© {new Date().getFullYear()} Sameer Shameem</p>
        <p className="footer-base-note">Designed &amp; built by Sameer Shameem</p>
        <button className="footer-top" type="button" onClick={() => scrollToTarget(0)} data-magnetic>
          <KingIcon className="footer-top-king" />
          Back to top
        </button>
      </div>
    </footer>
  )
}

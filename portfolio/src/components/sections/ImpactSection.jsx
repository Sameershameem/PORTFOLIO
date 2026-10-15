import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SiGoogleads, SiInstagram, SiMeta } from 'react-icons/si'
import { FiFeather, FiMic, FiTrendingUp } from 'react-icons/fi'
import CountUp from '../ui/CountUp.jsx'
import { campaignImpact, proofCards } from '../../data/impact.js'
import { highlights } from '../../data/profile.js'

gsap.registerPlugin(ScrollTrigger)

const ICONS = {
  meta: SiMeta,
  google: SiGoogleads,
  growth: FiTrendingUp,
  voice: FiMic,
  adcopy: FiFeather,
  instagram: SiInstagram,
}

function ProofCard({ card, index }) {
  const Icon = ICONS[card.icon]
  return (
    <article className="proof-card">
      <div className="proof-card-top">
        <span className="proof-tag">{card.tag}</span>
        <span className="proof-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="proof-card-title">
        <span className="proof-icon" aria-hidden="true">{Icon && <Icon />}</span>
        <h3>{card.title}</h3>
      </div>
      <p className="proof-card-text">{card.description}</p>
      <dl className="proof-stats">
        {card.stats.map((stat) => (
          <div className="proof-stat" key={stat.label}>
            <dt>{stat.label}</dt>
            <dd><CountUp value={stat.value} /></dd>
          </div>
        ))}
      </dl>
      <span className="proof-group">{card.group}</span>
    </article>
  )
}

export default function ImpactSection() {
  const railRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  // Desktop: the card track slides sideways while the page scrolls down (sticky stage).
  useLayoutEffect(() => {
    const rail = railRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
      const setHeight = () => {
        rail.style.height = `${sticky.offsetHeight + distance()}px`
      }
      setHeight()
      ScrollTrigger.addEventListener('refreshInit', setHeight)

      gsap.to(track.children, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rail,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => barRef.current?.style.setProperty('transform', `scaleX(${self.progress})`),
        },
      })

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', setHeight)
        rail.style.height = ''
      }
    })

    return () => media.revert()
  }, [])

  return (
    <>
      <section className="experience-section impact-section" id="impact" aria-labelledby="impact-heading">
        <div className="experience-section-head">
          <div>
            <p className="experience-kicker" data-reveal="up">Campaign impact</p>
            <h2 className="experience-heading" id="impact-heading" data-reveal="lines">
              Numbers that moved the needle.
            </h2>
          </div>
        </div>

        <div className="impact-hero" data-reveal="up">
          <CountUp className="impact-big" value={campaignImpact.headline.value} />
          <p className="impact-big-label">{campaignImpact.headline.label}</p>
        </div>

        <dl className="impact-grid" data-reveal="stagger">
          {campaignImpact.stats.map((stat) => (
            <div className="impact-stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd><CountUp value={stat.value} /></dd>
            </div>
          ))}
        </dl>

        <ul className="impact-tags" data-reveal="stagger">
          {campaignImpact.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <dl className="impact-highlights" data-reveal="stagger">
          {highlights.map((item) => (
            <div className="impact-highlight" key={item.label}>
              <dd><CountUp value={item.value} /></dd>
              <dt>{item.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="proof-rail" ref={railRef} aria-labelledby="proof-heading">
        <div className="proof-sticky" ref={stickyRef}>
          <div className="proof-head">
            <div>
              <p className="experience-kicker">Proof, channel by channel</p>
              <h2 className="proof-heading" id="proof-heading">Where the results come from.</h2>
            </div>
            <p className="proof-hint" aria-hidden="true">Scroll to browse <span>→</span></p>
          </div>
          <div className="proof-track" ref={trackRef}>
            {proofCards.map((card, index) => (
              <ProofCard card={card} index={index} key={card.title} />
            ))}
          </div>
          <div className="proof-progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </section>
    </>
  )
}

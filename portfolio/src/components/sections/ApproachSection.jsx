import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  ['01', 'Understand', 'Research the audience, the goals, and the problem worth solving.'],
  ['02', 'Strategize', 'Set a clear direction, a useful message, and a creative concept.'],
  ['03', 'Create', 'Make the content, campaign, copy, or digital experience.'],
  ['04', 'Optimize', 'Read the results, learn from the data, and improve what comes next.'],
  ['05', 'Build', 'Use modern tools and AI-assisted workflows to bring new ideas to life.'],
]

gsap.registerPlugin(ScrollTrigger)

export default function ApproachSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return undefined
    const media = gsap.matchMedia()

    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.approach-step',
          { y: 28, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              once: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => {
      media.revert()
      context.revert()
    }
  }, [])

  return (
    <section
      className="experience-section approach-section"
      id="approach"
      aria-labelledby="approach-heading"
      ref={sectionRef}
    >
      <div className="experience-section-head">
        <div>
          <p className="experience-kicker">How I work</p>
          <h2 className="experience-heading" id="approach-heading">From first thought to next iteration.</h2>
        </div>
        <span className="approach-caption">A flexible process, built around the work.</span>
      </div>
      <ol className="approach-list">
        {steps.map(([number, title, description]) => (
          <li className="approach-step" key={number}>
            <span className="approach-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="approach-plus" aria-hidden="true">↗</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

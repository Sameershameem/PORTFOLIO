import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STATUE_HEIGHT, STATUE_SRC, STATUE_WIDTH } from '../../data/statue.js'
import { getLenis, scrollToTarget } from '../../lib/smoothScroll.js'

gsap.registerPlugin(ScrollTrigger)

// The statue + chess pieces render in ChessExperience's shared canvas; this owns the hero copy.
export default function Hero({ stageRef, pinRef }) {
  useEffect(() => {
    if (!stageRef.current) return undefined

    // Keep ScrollTrigger in step with Lenis' inertial scroll.
    const offScroll = getLenis()?.on('scroll', ScrollTrigger.update)

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const progress = { value: 0 }
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        })

        // Timeline length 1 = the whole pinned hero scroll.
        timeline
          .to(progress, {
            value: 1,
            duration: 1,
            ease: 'none',
            onUpdate: () => pinRef.current?.style.setProperty('--hero-scroll-progress', progress.value),
          }, 0)
          .to('.hero-name', { yPercent: -8, scale: 1.12, duration: 1, ease: 'none' }, 0)
          // CTAs stay hidden (and unfocusable) until halfway through the hero animation.
          .fromTo(
            '.hero-actions',
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' },
            0.5,
          )

        return () => timeline.scrollTrigger?.kill()
      })

      return () => media.revert()
    }, pinRef)

    return () => {
      offScroll?.()
      context.revert()
    }
  }, [stageRef, pinRef])

  const exploreWork = () => scrollToTarget('#selected-work')

  return (
    <section className="hero-stage" ref={stageRef} aria-label="Introduction">
      <div className="hero-pin" ref={pinRef}>
        <img
          className="hero-statue-poster"
          src={STATUE_SRC}
          alt="Silver statue of Sameer Shameem standing on a pedestal"
          width={STATUE_WIDTH}
          height={STATUE_HEIGHT}
          fetchPriority="high"
          decoding="async"
        />

        <h1 className="hero-name">
          <span>SAMEER</span>
          <span className="hero-name-surname">SHAMEEM</span>
        </h1>

        <div className="hero-actions">
          <button className="experience-button experience-button-dark" onClick={exploreWork}>
            Explore My Work <span aria-hidden="true">↘</span>
          </button>
          <Link className="experience-text-link" to="/contact">
            Let&apos;s Collaborate <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

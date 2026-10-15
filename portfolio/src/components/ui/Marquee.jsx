import { Fragment, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { KING_PATH, KING_VIEWBOX } from '../../data/chess.js'

gsap.registerPlugin(ScrollTrigger)

/*
 * Endless marquee divided by small kings. It drifts on its own, surges with scroll speed
 * and flips direction when you scroll back up. Every other item is drawn in outline.
 */
export default function Marquee({ items, className = '', speed = 30, label }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      const loop = gsap.to(trackRef.current, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 })
      loop.totalTime(speed * 500) // start deep in the loop so it can also run in reverse
      let direction = 1
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction !== direction) direction = self.direction
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 450, 6)
          gsap.to(loop, {
            timeScale: boost * direction,
            duration: 0.25,
            overwrite: true,
            onComplete: () => gsap.to(loop, { timeScale: direction, duration: 1.4, ease: 'power2.out' }),
          })
        },
      })
    }, rootRef)
    return () => context.revert()
  }, [speed])

  return (
    <div className={`marquee ${className}`} ref={rootRef} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <div className="marquee-track" ref={trackRef}>
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden="true">
            {items.map((item) => (
              <Fragment key={item}>
                <span className="marquee-item">{item}</span>
                <svg className="marquee-king" viewBox={KING_VIEWBOX}>
                  <path d={KING_PATH} />
                </svg>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

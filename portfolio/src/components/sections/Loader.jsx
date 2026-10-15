import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { lockScroll } from '../../lib/smoothScroll.js'
import { KING_PATH, KING_VIEWBOX } from '../../data/chess.js'

/*
 * Minimal intro: a clean screen with a single king at its centre. index.html paints a flat
 * king silhouette on the very first frame; once WebGL is ready the real 3D king (rendered by
 * the hero scene, above this overlay) appears on top of it and starts to turn. On exit the
 * screen dissolves into the hero and the king glides back behind the rising statue — the
 * same piece that later bursts out on scroll.
 */

const MIN_SECONDS = 1.8 // minimum time on screen
const MIN_KING_SECONDS = 1.6 // let the 3D king turn a little before handing over
const MAX_SECONDS = 9 // never trap anyone if WebGL or the texture fails

export default function Loader({ ready, has3D = true, loaderRef, onReveal, onDone }) {
  const rootRef = useRef(null)
  const silhouetteRef = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)
  const progressRef = useRef({ value: 0 })
  const startedAtRef = useRef(0)
  const exitRef = useRef(null) // the exit runs exactly once
  const [timedOut, setTimedOut] = useState(false)
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const render = () => {
    const value = progressRef.current.value
    const text = String(Math.round(value * 100)).padStart(3, '0')
    // Only touch the DOM when the number changes (each text write invalidates page layout).
    if (countRef.current && countRef.current.textContent !== text) countRef.current.textContent = text
    barRef.current?.style.setProperty('transform', `scaleX(${value})`)
  }

  // Take over from the static first-paint loader and lock scrolling.
  useLayoutEffect(() => {
    startedAtRef.current = performance.now()
    document.getElementById('site-loader')?.remove()
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    lockScroll(true)

    const header = document.querySelector('.experience-shell > .site-header')
    const timeout = window.setTimeout(() => setTimedOut(true), MAX_SECONDS * 1000)
    const context = gsap.context(() => {
      if (header) gsap.set(header, { autoAlpha: 0, y: -14 })
      gsap.to(progressRef.current, { value: 0.86, duration: 3.2, ease: 'power2.out', onUpdate: render })
    }, rootRef)

    return () => {
      window.clearTimeout(timeout)
      exitRef.current?.revert()
      context.revert()
      lockScroll(false)
    }
    // Runs once: the loader lives for a single intro.
  }, [])

  // WebGL is ready: the 3D king takes the silhouette's place, then we hand over to the hero.
  useEffect(() => {
    if ((!ready && !timedOut) || exitRef.current) return
    const now = performance.now()
    const elapsed = (now - startedAtRef.current) / 1000
    if (ready && has3D) loaderRef.current.kingShownAt = now
    const header = [document.querySelector('.experience-shell > .site-header')].filter(Boolean)
    const wait = ready ? Math.max(MIN_SECONDS - elapsed, has3D ? MIN_KING_SECONDS : 0) : 0

    exitRef.current = gsap.context(() => {
      const finish = () => {
        lockScroll(false)
        onDone()
      }

      // Flat silhouette dissolves under the real, turning king.
      if (ready && has3D) gsap.to(silhouetteRef.current, { autoAlpha: 0, duration: 0.7, ease: 'power1.out', delay: 0.05 })
      gsap.killTweensOf(progressRef.current)

      gsap.timeline({ delay: reducedMotion ? 0.2 : wait })
        .to(progressRef.current, { value: 1, duration: 0.7, ease: 'power2.inOut', onUpdate: render })
        .to('.kl-meta', { autoAlpha: 0, y: 10, duration: 0.5, ease: 'power2.in' }, '+=0.1')
        // The screen dissolves into the hero; the statue rises and the king retreats behind it.
        .call(() => onReveal?.())
        .to(silhouetteRef.current, { autoAlpha: 0, duration: 0.4 }, '<')
        .to(rootRef.current, { autoAlpha: 0, duration: reducedMotion ? 0.3 : 1.1, ease: 'power2.inOut' }, '<')
        .to(header, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '<0.4')
        .call(finish)
    }, rootRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, timedOut])

  return (
    <div className="site-loader" ref={rootRef} role="status" aria-label="Loading portfolio">
      <span className="kl-shadow" aria-hidden="true" />
      <svg className="kl-king" ref={silhouetteRef} viewBox={KING_VIEWBOX} aria-hidden="true">
        <path d={KING_PATH} />
      </svg>
      <div className="kl-meta" aria-hidden="true">
        <span className="kl-bar"><span ref={barRef} /></span>
        <span className="kl-label">
          Sameer Shameem <span className="kl-count" ref={countRef}>000</span>
        </span>
      </div>
    </div>
  )
}

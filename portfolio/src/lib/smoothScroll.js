import Lenis from 'lenis'

/*
 * One requestAnimationFrame loop for the whole site: Lenis applies the (inertial) scroll
 * first, then subscribers run — so the WebGL scene always reads the scroll position of
 * the frame it is drawing and docked chess pieces never lag behind their sections.
 */
let lenis = null
let locked = false
let rafId = 0
const subscribers = new Set()

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function loop(time) {
  lenis?.raf(time)
  subscribers.forEach((fn) => fn(time))
  rafId = requestAnimationFrame(loop)
}

function ensureLoop() {
  if (!rafId) rafId = requestAnimationFrame(loop)
}

export function startSmoothScroll() {
  if (!lenis && !prefersReducedMotion()) {
    lenis = new Lenis({
      lerp: 0.085, // heavier, more "weighted" glide than the default 0.1
      wheelMultiplier: 0.9,
      syncTouch: true, // JS-driven touch scroll keeps WebGL locked to the page on phones
      syncTouchLerp: 0.085,
      touchInertiaMultiplier: 28,
    })
    if (locked) lenis.stop()
  }
  ensureLoop()
  return lenis
}

export function stopSmoothScroll() {
  lenis?.destroy()
  lenis = null
}

export const getLenis = () => lenis

/** Run `fn(time)` every frame, after the scroll has been applied. Returns an unsubscribe. */
export function onFrame(fn) {
  subscribers.add(fn)
  ensureLoop()
  return () => subscribers.delete(fn)
}

export function lockScroll(value) {
  locked = value
  document.documentElement.classList.toggle('is-scroll-locked', value)
  if (lenis) (value ? lenis.stop() : lenis.start())
}

export function scrollToTarget(target, { immediate = false, offset = 0 } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, offset, duration: 1.6 })
    return
  }
  const behavior = immediate || prefersReducedMotion() ? 'instant' : 'smooth'
  if (typeof target === 'number') window.scrollTo({ top: target + offset, behavior })
  else document.querySelector(target)?.scrollIntoView({ behavior })
}

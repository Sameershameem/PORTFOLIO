import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Keep every scroll trigger in sync with the real page height: fonts swapping in, the intro
// loader releasing the page or content growing all move sections after triggers were measured.
if (typeof window !== 'undefined' && !window.__revealRefreshBound) {
  window.__revealRefreshBound = true
  let timer = 0
  let lastHeight = 0
  const refresh = () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 150)
  }
  document.fonts?.ready.then(refresh)
  new ResizeObserver(() => {
    const height = document.documentElement.scrollHeight
    if (Math.abs(height - lastHeight) > 2) {
      lastHeight = height
      refresh()
    }
  }).observe(document.body)
}

/*
 * Site-wide scroll reveals. Mark elements in JSX and they animate in as they enter:
 *   data-reveal="lines"   heading/paragraph rises line by line from behind a mask
 *   data-reveal="up"      fades up (siblings entering together are staggered)
 *   data-reveal="stagger" each direct child fades up in turn
 *   data-reveal="wipe"    media/blocks uncover from the bottom edge
 *   data-magnetic         element leans toward the cursor (fine pointers only)
 * Everything stays visible if JS is off or the visitor prefers reduced motion.
 */
const EASE = 'expo.out'
const START = 'top 88%'

export function initReveals(root) {
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const cleanups = []
  const context = gsap.context(() => {
    root.querySelectorAll('[data-reveal="lines"]').forEach((element) => {
      SplitText.create(element, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'reveal-line',
        autoSplit: true, // re-split once fonts load / on resize
        onSplit: (self) => gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.15,
          ease: EASE,
          stagger: 0.08,
          scrollTrigger: { trigger: element, start: START, once: true },
        }),
      })
    })

    const pending = []
    const fadeUp = (all) => {
      // Content already on screen at load stays put — hiding it would delay the page's
      // largest paint (LCP). Only what's further down fades up as it scrolls in.
      const targets = all.filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.92)
      if (!targets.length) return
      pending.push(...targets)
      gsap.set(targets, { autoAlpha: 0, y: 36 })
      ScrollTrigger.batch(targets, {
        start: START,
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: true,
        }),
      })
    }
    fadeUp([...root.querySelectorAll('[data-reveal="up"]')])
    fadeUp([...root.querySelectorAll('[data-reveal="stagger"] > *')])

    // Safety net: a jump that lands while triggers are being re-measured can skip a "once"
    // trigger. After any refresh or when scrolling stops, reveal whatever is already on screen.
    const sweep = () => {
      const due = pending.filter((element) => {
        if (element.dataset.revealed) return false
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight * 0.92 && rect.bottom > 0 && window.getComputedStyle(element).visibility === 'hidden'
      })
      if (!due.length) return
      due.forEach((element) => { element.dataset.revealed = 'true' })
      gsap.to(due, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true })
    }
    ScrollTrigger.addEventListener('refresh', sweep)
    ScrollTrigger.addEventListener('scrollEnd', sweep)
    cleanups.push(() => {
      ScrollTrigger.removeEventListener('refresh', sweep)
      ScrollTrigger.removeEventListener('scrollEnd', sweep)
    })

    root.querySelectorAll('[data-reveal="wipe"]').forEach((element) => {
      gsap.fromTo(element,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: element, start: START, once: true },
        })
    })
  }, root)

  // Magnetic hover for buttons and links that opt in.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    root.querySelectorAll('[data-magnetic]').forEach((element) => {
      const toX = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' })
      const toY = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' })
      const move = (event) => {
        const rect = element.getBoundingClientRect()
        toX((event.clientX - rect.left - rect.width / 2) * 0.28)
        toY((event.clientY - rect.top - rect.height / 2) * 0.35)
      }
      const leave = () => {
        toX(0)
        toY(0)
      }
      element.addEventListener('pointermove', move)
      element.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        element.removeEventListener('pointermove', move)
        element.removeEventListener('pointerleave', leave)
        gsap.set(element, { clearProps: 'transform' })
      })
    })
  }

  return () => {
    cleanups.forEach((fn) => fn())
    context.revert()
  }
}

/*
 * Inner pages opt in automatically: walk down from the page container, descending into
 * blocks that hold grids (so each card staggers on its own) and tag every other block "up".
 */
export function autoTagReveals(root) {
  // Read phase first (computed styles), then write all attributes — no layout thrashing.
  const toTag = []
  const walk = (parent, depth) => {
    for (const child of parent.children) {
      if (child.hasAttribute('data-reveal') || child.hasAttribute('data-no-reveal')) continue
      if (['SCRIPT', 'STYLE', 'TEMPLATE'].includes(child.tagName)) continue
      const style = window.getComputedStyle(child)
      if (style.position === 'fixed' || style.display === 'none') continue
      const holdsGroups = child.matches('.grid') || child.querySelector('.grid, [data-reveal]')
      if (holdsGroups && depth < 5) walk(child, depth + 1)
      else toTag.push(child)
    }
  }
  walk(root, 0)
  toTag.forEach((element) => element.setAttribute('data-reveal', 'up'))
}

/** Run reveals for everything inside `ref` before first paint (no flash of visible content). */
export function useReveal(ref, { auto = false } = {}) {
  useLayoutEffect(() => {
    if (auto && ref.current) autoTagReveals(ref.current)
    return initReveals(ref.current)
  }, [ref, auto])
}

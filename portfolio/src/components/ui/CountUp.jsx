import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTS = /^([^\d]*)([\d.]+)(.*)$/

/** Counts the numeric part of a value like "-42%", "1.1CR" or "18.2K+" up when it scrolls in. */
export default function CountUp({ value, className = '' }) {
  const numberRef = useRef(null)

  useEffect(() => {
    const element = numberRef.current
    const match = value.match(PARTS)
    if (!element || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const [, prefix, number, suffix] = match
    const decimals = (number.split('.')[1] || '').length
    const proxy = { value: 0 }
    const render = () => {
      element.textContent = `${prefix}${proxy.value.toFixed(decimals)}${suffix}`
    }
    render()
    const tween = gsap.to(proxy, {
      value: parseFloat(number),
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: render,
      scrollTrigger: { trigger: element, start: 'top 92%', once: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      element.textContent = value
    }
  }, [value])

  return (
    <span className={`count-up ${className}`}>
      <span aria-hidden="true" ref={numberRef}>{value}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

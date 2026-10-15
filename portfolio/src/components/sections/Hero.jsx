import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero3DScene = lazy(() => import('./Hero3DScene.jsx'))

export default function Hero() {
  const stageRef = useRef(null)
  const heroPinRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)

  useEffect(() => {
    if (!stageRef.current) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const sceneProgress = { value: 0 }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(sceneProgress, {
            value: 1,
            ease: 'none',
            onUpdate: () => {
              if (sceneRef.current) {
                sceneRef.current.userData.scrollProgress = sceneProgress.value
              }
              heroPinRef.current?.style.setProperty(
                '--hero-scroll-progress',
                sceneProgress.value,
              )
              if (!cameraRef.current) return
              const isMobile = window.innerWidth <= 900
              const cameraZ = isMobile ? 14.8 : 11.5
              const cameraY = isMobile ? 1.55 : 1.1
              cameraRef.current.position.z = cameraZ - sceneProgress.value * (isMobile ? 0.8 : 1.7)
              cameraRef.current.position.y = cameraY - sceneProgress.value * 0.22
              cameraRef.current.rotation.x = -0.12 + sceneProgress.value * 0.035
            },
          }, 0)
          .to('.hero-name', { yPercent: -8, scale: 1.12, ease: 'none' }, 0)
          .to('.hero-intro', { y: -38, opacity: 0.2, ease: 'none' }, 0)

        gsap.fromTo(
          '.hero-enter',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'all',
          },
        )

        return () => timeline.scrollTrigger?.kill()
      })

      return () => media.revert()
    }, heroPinRef)

    return () => context.revert()
  }, [])

  const exploreWork = () => {
    document.querySelector('#selected-work')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <section className="hero-stage" ref={stageRef} aria-label="Introduction">
      <div className="hero-pin" ref={heroPinRef}>
        <Suspense fallback={<div className="hero-scene-placeholder" aria-hidden="true" />}>
          <Hero3DScene
            sceneRef={sceneRef}
            cameraRef={cameraRef}
            eventSource={heroPinRef}
          />
        </Suspense>

        <h1 className="hero-name">
          <span>SAMEER</span>
          <span className="hero-name-surname">SHAMEEM</span>
        </h1>

        <div className="hero-topline hero-enter">
          <span className="hero-index">01 / 05</span>
          <span>Independent by nature. Curious by design.</span>
        </div>

        <div className="hero-intro hero-enter">
          <p className="hero-eyebrow">Marketing Mind. Creative Soul. Builder&apos;s Instinct.</p>
          <p>
            I blend strategy, storytelling, performance marketing, and AI-powered
            development to turn ideas into experiences that move people.
          </p>
        </div>

        <div className="hero-actions hero-enter">
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

        <p className="hero-side-note" aria-hidden="true">
          I turn ideas into attention. Attention into action. Ideas into digital experiences.
        </p>
      </div>
    </section>
  )
}

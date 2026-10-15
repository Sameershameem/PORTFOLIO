import { createRef, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Hero from './Hero.jsx'
import AboutSection from './AboutSection.jsx'
import Loader from './Loader.jsx'
import heroSkills from '../../data/heroSkills.js'

const ChessScene = lazy(() => import('./Hero3DScene.jsx'))

/*
 * Hero + About share one sticky WebGL layer: the chess pieces burst out from behind the
 * statue in the hero, wait in a side rail, then each docks into its own skill panel.
 */
export default function ChessExperience() {
  const wrapperRef = useRef(null)
  const heroStageRef = useRef(null)
  const heroPinRef = useRef(null)
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])
  const labelRefs = useMemo(() => heroSkills.map(() => createRef()), [])
  const dockRefs = useMemo(() => heroSkills.map(() => createRef()), [])
  // The intro loader only runs on a fresh page load (index.html paints its first frame).
  const [loading, setLoading] = useState(() => Boolean(document.getElementById('site-loader')))
  const [revealed, setRevealed] = useState(!loading)
  // Timestamp the statue starts rising (read by the WebGL scene every frame).
  const introRef = useRef(null)
  // Shared with the scene: when the loader's 3D king should appear.
  const loaderRef = useRef({ kingShownAt: null })
  const handleReveal = useCallback(() => {
    if (introRef.current === null) introRef.current = performance.now()
    setRevealed(true)
  }, [])
  const handleLoaderDone = useCallback(() => setLoading(false), [])

  // No loader (in-app navigation back to Home): the statue rises straight away.
  useEffect(() => {
    if (revealed && introRef.current === null) introRef.current = performance.now()
  }, [revealed])

  return (
    <div
      className="chess-experience"
      ref={wrapperRef}
      data-scene-ready={sceneReady || undefined}
      data-intro={revealed || undefined}
      data-loading={loading || undefined}
    >
      {loading && <Loader ready={sceneReady} loaderRef={loaderRef} onReveal={handleReveal} onDone={handleLoaderDone} />}

      <div className="chess-stage" aria-hidden="true">
        <Suspense fallback={null}>
          <ChessScene
            wrapperRef={wrapperRef}
            heroStageRef={heroStageRef}
            heroPinRef={heroPinRef}
            dockRefs={dockRefs}
            labelRefs={labelRefs}
            skills={heroSkills}
            introRef={introRef}
            loaderRef={loaderRef}
            onReady={handleSceneReady}
          />
        </Suspense>
        <ul className="hero-skill-tags">
          {heroSkills.map((skill, index) => (
            <li className="hero-skill-tag" key={skill.piece} ref={labelRefs[index]}>
              <span className="hero-skill-index">{String(index + 1).padStart(2, '0')}</span>
              {skill.label}
            </li>
          ))}
        </ul>
      </div>

      <Hero stageRef={heroStageRef} pinRef={heroPinRef} />
      <AboutSection skills={heroSkills} dockRefs={dockRefs} />
    </div>
  )
}

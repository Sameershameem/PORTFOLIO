import { useState } from 'react'

const tickerItems = [
  'VIBE CODER',
  'DIRECT-RESPONSE COPYWRITER',
  'GROWTH STRATEGIST',
  'VIRAL CONTENT CREATOR',
  'PERFORMANCE MARKETER',
  'REACT 19 & TAILWIND',
  '$850K+ AD SPEND',
  '4.2X BLENDED ROAS',
  'MAGNETIC HOOKS',
  'HARDWARE-ACCELERATED MOTION',
  'EDITORIAL SIMPLICITY',
]

export default function KineticTicker() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div
      className="kinetic-ticker-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Scrolling trade ticker"
    >
      <div className={`kinetic-ticker-track ${isPaused ? 'is-paused' : ''}`}>
        {/* Double array for seamless infinite scroll */}
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div className="ticker-item" key={`${item}-${index}`}>
            <span className="ticker-star">✦</span>
            <span className="ticker-text">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

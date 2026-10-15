import { useEffect, useState } from 'react'
import { careerStart } from '../../data/impact.js'

const pad = (value) => String(value).padStart(2, '0')

// Calendar-accurate years / months / days since `start`, plus today's running clock.
function experienceSince(start, now) {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  if (days < 0) {
    months -= 1
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() // days in previous month
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years, months, days, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() }
}

const startLabel = careerStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** Live, ticking total experience — what a visitor sees is accurate to the second. */
export default function ExperienceCounter({ className = '' }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const t = experienceSince(careerStart, now)
  const summary = `${t.years} years, ${t.months} months and ${t.days} days of experience`

  return (
    <div className={`xp-counter ${className}`}>
      <p className="xp-label">
        <span className="xp-dot" aria-hidden="true" />
        Live experience · since {startLabel}
      </p>
      <p className="sr-only">{summary}</p>
      <div className="xp-units" aria-hidden="true">
        {[[t.years, 'Years'], [t.months, 'Months'], [t.days, 'Days']].map(([value, label]) => (
          <div className="xp-unit" key={label}>
            <span className="xp-num">{pad(value)}</span>
            <span className="xp-unit-label">{label}</span>
          </div>
        ))}
        <div className="xp-unit xp-clock">
          <span className="xp-num">
            {pad(t.hours)}<i>:</i>{pad(t.minutes)}<i>:</i>{pad(t.seconds)}
          </span>
          <span className="xp-unit-label">Hrs · Min · Sec</span>
        </div>
      </div>
    </div>
  )
}

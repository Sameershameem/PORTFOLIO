import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import PageLayout from '../components/layout/PageLayout.jsx'
import Toast from '../components/ui/Toast.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import SEO from '../components/ui/SEO.jsx'
import { pageMeta } from '../data/seo.js'
import { contactEmail, contactLocation, contactPhone, contactSocials } from '../data/contactDetails.js'
import { KING_PATH, KING_VIEWBOX } from '../data/chess.js'

const PROJECT_TYPES = ['Performance marketing', 'Meta & Google Ads', 'Content & UGC', 'Copywriting', 'Website']
const EMPTY_FORM = { name: '', email: '', types: [], message: '', _gotcha: '' }
const linkedIn = contactSocials.find((social) => social.label === 'LinkedIn')

/** Live local time in Aligarh (IST), ticking every second. */
function useLocalTime() {
  const format = () =>
    new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please add your name.'
  if (!form.email.trim()) errors.email = 'Please add your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'That email doesn’t look right.'
  if (form.message.trim().length < 10) errors.message = 'A sentence or two (10+ characters) helps me reply properly.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | drafted | error
  const [toast, setToast] = useState('')
  const kingRef = useRef(null)
  const time = useLocalTime()

  // The hero king floats on its own and leans toward the cursor.
  useEffect(() => {
    const king = kingRef.current
    if (!king || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const float = gsap.to(king, { yPercent: -6, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    const rotate = gsap.quickTo(king, 'rotation', { duration: 1.2, ease: 'power3.out' })
    const shift = gsap.quickTo(king, 'x', { duration: 1.2, ease: 'power3.out' })
    const move = (event) => {
      const offset = event.clientX / window.innerWidth - 0.5
      rotate(offset * 14)
      shift(offset * 40)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      float.kill()
      window.removeEventListener('pointermove', move)
    }
  }, [])

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail)
      showToast('Email copied — talk soon.')
    } catch {
      showToast('Couldn’t copy — select the address instead.')
    }
  }

  const update = (field) => (event) => {
    const { value } = event.target
    setForm((previous) => ({ ...previous, [field]: value }))
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  const toggleType = (type) => {
    setForm((previous) => ({
      ...previous,
      types: previous.types.includes(type)
        ? previous.types.filter((item) => item !== type)
        : [...previous.types, type],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form._gotcha) return setStatus('sent') // honeypot: quietly drop bots
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return undefined

    const subject = `New project enquiry${form.types.length ? ` — ${form.types.join(', ')}` : ''}`
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    // No form service configured yet: hand the message to the visitor's email app.
    if (!endpoint || endpoint.includes('your_form_id')) {
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('drafted')
      return undefined
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject, projectTypes: form.types, message: form.message }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
    return undefined
  }

  const done = status === 'sent' || status === 'drafted'

  return (
    <PageLayout>
      <SEO {...pageMeta['/contact']} />

      <div className="cx">
        {/* ── Hero ── */}
        <section className="cx-hero" aria-labelledby="contact-heading">
          <div className="cx-hero-copy">
            <p className="cx-status" data-reveal="up">
              <span className="cx-status-dot" aria-hidden="true" />
              Open to new projects
            </p>
            <h1 className="cx-heading" id="contact-heading" data-reveal="lines">
              Let&apos;s make the next move.
            </h1>
            <p className="cx-intro" data-reveal="up">
              Campaigns, content or a launch that needs to land — tell me where you want to go
              and I&apos;ll help plan the moves to get there.
            </p>
            <p className="cx-clock" data-reveal="up">
              {contactLocation} · <span>{time}</span> IST
            </p>
          </div>
          <svg className="cx-king" ref={kingRef} viewBox={KING_VIEWBOX} aria-hidden="true">
            <path d={KING_PATH} />
          </svg>
        </section>

        {/* ── Direct lines ── */}
        <ul className="cx-rows" data-reveal="stagger" aria-label="Contact details">
          <li>
            <a className="cx-row" href={`mailto:${contactEmail}`}>
              <span className="cx-row-label">Email</span>
              <span className="cx-row-value">{contactEmail}</span>
              <span className="cx-row-arrow" aria-hidden="true">↗</span>
            </a>
            <button className="cx-copy" type="button" onClick={copyEmail}>Copy</button>
          </li>
          <li>
            <a className="cx-row" href={contactPhone.href}>
              <span className="cx-row-label">Phone</span>
              <span className="cx-row-value">{contactPhone.display}</span>
              <span className="cx-row-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          {linkedIn && (
            <li>
              <a className="cx-row" href={linkedIn.href} target="_blank" rel="noreferrer">
                <span className="cx-row-label">LinkedIn</span>
                <span className="cx-row-value">in/sameer-shameem</span>
                <span className="cx-row-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          )}
          <li>
            <div className="cx-row cx-row--static">
              <span className="cx-row-label">Based in</span>
              <span className="cx-row-value">{contactLocation}</span>
              <span className="cx-row-arrow" aria-hidden="true">●</span>
            </div>
          </li>
        </ul>

        {/* ── Form ── */}
        <section className="cx-form-wrap" aria-labelledby="form-heading">
          <div className="cx-form-side">
            <p className="experience-kicker" data-reveal="up">Send a message</p>
            <h2 className="cx-form-heading" id="form-heading" data-reveal="lines">
              Tell me about your next campaign.
            </h2>
            <ol className="cx-steps" data-reveal="stagger">
              <li><span>01</span>Share the goal and where you are today.</li>
              <li><span>02</span>I reply personally by email.</li>
              <li><span>03</span>We map the first moves together.</li>
            </ol>
          </div>

          <div className="cx-form-card" data-reveal="up">
            {done ? (
              <div className="cx-done" role="status">
                <svg className="cx-check" viewBox="0 0 52 52" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" />
                  <path d="M15 27l7 7 15-16" />
                </svg>
                <h3>{status === 'sent' ? 'Message sent.' : 'Your email is ready.'}</h3>
                <p>
                  {status === 'sent'
                    ? 'Thanks for reaching out — I’ll get back to you by email.'
                    : 'Your email app opened with the message filled in — just press send.'}
                </p>
                <button className="cx-reset" type="button" onClick={() => setStatus('idle')}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="cx-form" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={update('_gotcha')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="cx-honeypot"
                  aria-hidden="true"
                />

                <fieldset className="cx-types">
                  <legend>What do you need?</legend>
                  <div>
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="cx-chip"
                        aria-pressed={form.types.includes(type)}
                        onClick={() => toggleType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {[
                  ['name', 'Your name', 'text', 'name'],
                  ['email', 'Email address', 'email', 'email'],
                ].map(([field, label, type, autoComplete]) => (
                  <div className={`cx-field${errors[field] ? ' has-error' : ''}`} key={field}>
                    <input
                      id={`cx-${field}`}
                      type={type}
                      value={form[field]}
                      onChange={update(field)}
                      placeholder=" "
                      autoComplete={autoComplete}
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `cx-${field}-error` : undefined}
                    />
                    <label htmlFor={`cx-${field}`}>{label}</label>
                    <span className="cx-line" aria-hidden="true" />
                    {errors[field] && <p className="cx-error" id={`cx-${field}-error`}>{errors[field]}</p>}
                  </div>
                ))}

                <div className={`cx-field cx-field--area${errors.message ? ' has-error' : ''}`}>
                  <textarea
                    id="cx-message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder=" "
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'cx-message-error' : undefined}
                  />
                  <label htmlFor="cx-message">Project details</label>
                  <span className="cx-line" aria-hidden="true" />
                  <span className="cx-count" aria-hidden="true">{form.message.length}</span>
                  {errors.message && <p className="cx-error" id="cx-message-error">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="cx-error cx-error--form" role="alert">
                    Something went wrong sending that. Please email {contactEmail} directly.
                  </p>
                )}

                <button className="cx-submit" type="submit" disabled={status === 'sending'} data-magnetic>
                  <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
                  <span className="cx-submit-arrow" aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <Marquee
        className="marquee--statement cx-marquee"
        items={['Your move', 'Let’s talk', 'Strategy', 'Content', 'Performance']}
        label="Your move — let’s talk"
      />

      <Toast visible={Boolean(toast)} message={toast} />
    </PageLayout>
  )
}

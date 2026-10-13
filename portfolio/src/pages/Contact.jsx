import { useState } from 'react'
import PageLayout from '../components/layout/PageLayout.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Toast from '../components/ui/Toast.jsx'
import SEO from '../components/ui/SEO.jsx'
import socials from '../data/socials.js'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // Honeypot field for spam prevention
  })

  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const emailAddress = 'brandswaying@gmail.com'
  const phoneNumber = '8630941563'

  // Copy email to clipboard with Toast notification
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setToastMessage('Email copied to clipboard!')
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3000)
    } catch {
      setToastMessage('Copied: brandswaying@gmail.com')
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3000)
    }
  }

  // Validate form fields
  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message.'
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.'
    }
    return errs
  }

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Spam honeypot trap
    if (formData._gotcha) {
      setStatus('success')
      return
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT

    try {
      if (formEndpoint && !formEndpoint.includes('your_form_id')) {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Portfolio Inquiry',
            message: formData.message,
          }),
        })

        if (!response.ok) throw new Error('Submission failed')
      } else {
        // Simulated local fallback delay when no remote endpoint is configured
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        _gotcha: '',
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageLayout>
      <SEO
        title="Contact Sameer"
        description="Get in touch with Sameer Shameem for performance marketing, creative strategy, or media buying advisory."
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SectionTitle
          kicker="Direct Communication"
          title="contact."
          intro="Have an ad account in need of optimization, a product ready for launch, or an inquiry regarding brand strategy? Let’s connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 my-8 sm:my-12">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                Send an Email
              </p>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-extrabold text-brand-ink hover:text-brand-yellow transition-colors text-left"
                title="Click to copy email"
              >
                <span>{emailAddress}</span>
                <span className="text-xs font-mono font-bold px-2 py-1 bg-neutral-200 group-hover:bg-brand-yellow group-hover:text-brand-ink rounded-full transition-colors">
                  Copy 📋
                </span>
              </button>
              <p className="text-xs text-brand-muted mt-1.5">
                Replies typically within 24 business hours.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                Phone & Direct Call
              </p>
              <a
                href={`tel:${phoneNumber}`}
                className="text-lg sm:text-xl font-bold text-brand-ink hover:text-brand-yellow transition-colors block"
              >
                +91 {phoneNumber}
              </a>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">
                Base Location
              </p>
              <p className="text-base sm:text-lg font-bold text-brand-ink">
                New Delhi, India
              </p>
              <p className="text-xs text-brand-muted mt-1">
                Collaborating with founders across US, UK, and APAC time zones.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-4">
                Connect on Social Channels
              </p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url || s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs font-bold uppercase tracking-wider text-brand-ink hover:border-brand-yellow hover:bg-neutral-50 transition-colors"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-neutral-200/80 shadow-2xs">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-6">
              Send a Message<span className="text-brand-yellow">.</span>
            </h2>

            {status === 'success' && (
              <div
                role="alert"
                className="p-6 mb-8 bg-green-50 border border-green-200 text-green-900 rounded-none animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">✓</span>
                  <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                </div>
                <p className="text-sm text-green-800">
                  Thank you for reaching out. Sameer will review your inquiry and get
                  back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs font-bold uppercase underline cursor-pointer hover:text-green-950"
                >
                  Send another message
                </button>
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                className="p-6 mb-8 bg-red-50 border border-red-200 text-red-900 rounded-none"
              >
                <h3 className="font-bold text-base mb-1">Something went wrong</h3>
                <p className="text-sm text-red-800">
                  We could not deliver your message right now. Please reach out directly
                  via email to{' '}
                  <a href={`mailto:${emailAddress}`} className="underline font-bold">
                    {emailAddress}
                  </a>{' '}
                  or call{' '}
                  <a href={`tel:${phoneNumber}`} className="underline font-bold">
                    {phoneNumber}
                  </a>
                  .
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Spam Honeypot - hidden from real humans */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Your Name <span className="text-brand-yellow font-black">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-3.5 bg-neutral-50 border ${
                    errors.name ? 'border-red-500' : 'border-neutral-300'
                  } focus:bg-white text-brand-ink text-sm transition-colors rounded-none outline-none`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-600 font-medium mt-1.5" aria-live="polite">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Email Address <span className="text-brand-yellow font-black">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className={`w-full px-4 py-3.5 bg-neutral-50 border ${
                    errors.email ? 'border-red-500' : 'border-neutral-300'
                  } focus:bg-white text-brand-ink text-sm transition-colors rounded-none outline-none`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-600 font-medium mt-1.5" aria-live="polite">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject field (optional) */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Subject / Project Scope <span className="text-brand-muted text-[10px] font-normal">(Optional)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Meta Ads Audit or Q3 Product Launch"
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-300 focus:bg-white text-brand-ink text-sm transition-colors rounded-none outline-none"
                />
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-ink mb-2"
                >
                  Project Details / Message <span className="text-brand-yellow font-black">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your current challenges, target goals, timelines, or ad spend requirements..."
                  className={`w-full px-4 py-3.5 bg-neutral-50 border ${
                    errors.message ? 'border-red-500' : 'border-neutral-300'
                  } focus:bg-white text-brand-ink text-sm transition-colors rounded-none outline-none resize-y`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-600 font-medium mt-1.5" aria-live="polite">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 bg-brand-ink text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-brand-yellow hover:text-brand-ink transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {status === 'submitting' ? 'Sending message...' : 'Send Message ↗'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <Toast message={toastMessage} visible={toastVisible} />
      </div>
    </PageLayout>
  )
}

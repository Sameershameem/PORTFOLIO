import { contactEmail, contactPhone, contactSocials } from '../../data/contactDetails.js'

export default function ContactSection() {
  return (
    <section
      className="experience-section contact-experience"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <p className="experience-kicker" data-reveal="up">Start a conversation</p>
      <h2 className="experience-heading" data-reveal="lines" id="contact-heading">
        Have an idea?
        <br />
        Let&apos;s make it happen.
      </h2>
      <div className="contact-bottom" data-reveal="up">
        <p>
          Whether it&apos;s a campaign, a creative collaboration, or a digital
          product, let&apos;s build something worth remembering.
        </p>
        <div className="contact-actions">
          <a data-magnetic className="experience-button experience-button-dark" href={`mailto:${contactEmail}`}>
            Let&apos;s collaborate <span aria-hidden="true">↗</span>
          </a>
          <a data-magnetic className="experience-button experience-button-outline" href={`mailto:${contactEmail}`}>
            Email me
          </a>
        </div>
      </div>
      <div className="contact-details" data-reveal="up">
        <div className="contact-reach">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={contactPhone.href}>{contactPhone.display}</a>
        </div>
        <div className="contact-socials" aria-label="Social media">
          {contactSocials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

import { contactEmail, contactSocials } from '../../data/contactDetails.js'

export default function ContactSection() {
  return (
    <section
      className="experience-section contact-experience"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <p className="experience-kicker">Start a conversation</p>
      <h2 className="experience-heading" id="contact-heading">
        Have an idea?
        <br />
        Let&apos;s make it happen.
      </h2>
      <div className="contact-bottom">
        <p>
          Whether it&apos;s a campaign, a creative collaboration, or a digital
          product, let&apos;s build something worth remembering.
        </p>
        <div className="contact-actions">
          <a className="experience-button experience-button-dark" href={`mailto:${contactEmail}`}>
            Let&apos;s collaborate <span aria-hidden="true">↗</span>
          </a>
          <a className="experience-button experience-button-outline" href={`mailto:${contactEmail}`}>
            Email me
          </a>
        </div>
      </div>
      <div className="contact-details">
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        <div className="contact-socials" aria-label="Social media placeholders">
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

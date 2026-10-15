import { Link } from 'react-router-dom'

const services = [
  {
    number: '01',
    title: 'Marketing Strategy',
    description:
      'Audience research, positioning, campaign planning, and a clear direction for digital growth.',
    mark: 'M',
  },
  {
    number: '02',
    title: 'Content Creation',
    description:
      'Creative concepts, social content, short-form video, and visual storytelling built around an idea.',
    mark: 'C',
  },
  {
    number: '03',
    title: 'Performance Marketing',
    description:
      'Paid advertising, audience targeting, campaign optimization, and conversion-focused execution.',
    mark: 'P',
  },
  {
    number: '04',
    title: 'Copywriting',
    description:
      'Hooks, headlines, ad copy, and brand messaging that make the next step feel clear.',
    mark: 'W',
  },
  {
    number: '05',
    title: 'Vibe Coding',
    description:
      'AI-assisted development and modern web tools to turn an idea into a working digital experience.',
    mark: 'V',
  },
]

export default function ServicesSection() {
  return (
    <section
      className="experience-section capabilities-section"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="experience-section-head">
        <div>
          <p className="experience-kicker">The toolkit</p>
          <h2 className="experience-heading" id="services-heading">
            One idea.
            <br />
            Many ways to move it.
          </h2>
        </div>
        <Link className="experience-text-link" to="/services">
          Explore capabilities <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="capability-grid">
        {services.map((service) => (
          <article className="capability-card" key={service.number}>
            <div className="capability-meta">
              <span>{service.number}</span>
              <span className="capability-mark" aria-hidden="true">{service.mark}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="capability-rule" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

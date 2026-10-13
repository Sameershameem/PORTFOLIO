const services = [
  {
    number: '01',
    title: 'Performance marketing',
    description:
      'Plan and optimize paid campaigns with a focus on the right audience, clear messaging, and meaningful results.',
  },
  {
    number: '02',
    title: 'Content creation',
    description:
      'Create purposeful content that gives brands a consistent voice and helps them connect with their audience.',
  },
]

export default function ServicesSection() {
  return (
    <section className="portfolio-section" aria-labelledby="services-heading">
      <p className="section-kicker">What I do</p>
      <h2 className="section-heading" id="services-heading">
        Thoughtful strategy.<br />Content with purpose.
      </h2>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number} id={service.number === '01' ? 'product' : 'store'}>
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import projects from '../../data/projects.js'

function ProjectMedia({ project, index }) {
  const media = project.media?.[0]
  if (!media) {
    return (
      <>
        <span className="work-art-index" aria-hidden="true">0{index + 1}</span>
        <span className="work-art-shape" aria-hidden="true" />
        <span className="work-art-label" aria-hidden="true">
          {project.metrics?.[0]?.value ?? 'Case study'}
          {project.metrics?.[0] && <small>{project.metrics[0].label}</small>}
        </span>
      </>
    )
  }

  if (media.type === 'video') {
    return (
      <video
        className="work-art-media"
        src={media.src}
        poster={media.poster}
        controls
        playsInline
        aria-label={media.alt || `${project.title} video`}
      />
    )
  }

  return (
    <img
      className="work-art-media"
      src={media.src}
      alt={media.alt || `${project.title} project`}
      loading="lazy"
      decoding="async"
    />
  )
}

export default function SelectedWorkSection() {
  return (
    <section
      className="experience-section selected-work-section"
      id="selected-work"
      aria-labelledby="work-heading"
    >
      <div className="experience-section-head">
        <div>
          <p className="experience-kicker" data-reveal="up">Selected work</p>
          <h2 className="experience-heading" data-reveal="lines" id="work-heading">Work that moved the numbers.</h2>
        </div>
        <Link className="experience-text-link" data-reveal="up" data-magnetic to="/work">
          All case studies <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="work-intro" data-reveal="up">
        Short-form growth, UGC and performance campaigns for brands in hospitality,
        fashion, skincare, education and lifestyle.
      </p>

      <div className="work-grid">
        {projects.slice(0, 3).map((project, index) => (
          <article className={`work-card work-card-${index + 1}`} key={project.slug}>
            <div className="work-art" data-reveal="wipe">
              <ProjectMedia project={project} index={index} />
            </div>
            <div className="work-card-meta" data-reveal="up">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h3 data-reveal="up">{project.title}</h3>
            <p data-reveal="up">{project.summary}</p>
            <Link className="work-card-link" data-reveal="up" to={`/work/${project.slug}`}>
              Read the case study <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

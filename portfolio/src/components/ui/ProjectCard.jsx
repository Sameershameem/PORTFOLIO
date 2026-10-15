import { Link } from 'react-router-dom'

// Work-page card in the same visual language as the home "Selected work" cards.
export default function ProjectCard({ project, index = 0 }) {
  const media = project.media?.find((item) => item.type !== 'video')
  const variant = (index % 3) + 1

  return (
    <Link to={`/work/${project.slug}`} className={`project-tile project-tile-${variant}`}>
      <div className="work-art project-art">
        {media ? (
          <img
            className="work-art-media"
            src={media.src}
            alt={media.alt || `${project.title} project`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <>
            <span className="work-art-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="work-art-shape" aria-hidden="true" />
            <span className="work-art-label" aria-hidden="true">
              {project.metrics?.[0]?.value ?? 'Case study'}
              {project.metrics?.[0] && <small>{project.metrics[0].label}</small>}
            </span>
          </>
        )}
      </div>
      <div className="project-tile-meta">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <h2 className="project-tile-title">
        {project.title} <span aria-hidden="true">↗</span>
      </h2>
      <p className="project-tile-summary">{project.summary}</p>
    </Link>
  )
}

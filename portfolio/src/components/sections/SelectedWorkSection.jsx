import { Link } from 'react-router-dom'
import projects from '../../data/projects.js'

function ProjectMedia({ project, index }) {
  const media = project.media?.[0]
  if (!media) {
    return (
      <>
        <span className="work-art-index" aria-hidden="true">0{index + 1}</span>
        <span className="work-art-shape" aria-hidden="true" />
        <span className="work-art-label" aria-hidden="true">CASE STUDY<br />IN THE MAKING</span>
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
          <p className="experience-kicker">Selected work</p>
          <h2 className="experience-heading" id="work-heading">Ideas, in progress.</h2>
        </div>
        <Link className="experience-text-link" to="/work">
          All case studies <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="work-intro">
        A space for the thinking, making, and learning behind each project.
        Details will be added as verified case studies are ready to share.
      </p>

      <div className="work-grid">
        {projects.slice(0, 3).map((project, index) => (
          <article className={`work-card work-card-${index + 1}`} key={project.slug}>
            <div className="work-art">
              <ProjectMedia project={project} index={index} />
            </div>
            <div className="work-card-meta">
              <span>{project.category}</span>
              <span>Details to come</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <Link className="work-card-link" to={`/work/${project.slug}`}>
              View project space <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import NotFound from './NotFound.jsx'
import Button from '../components/ui/Button.jsx'
import Tag from '../components/ui/Tag.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import projects from '../data/projects.js'

export default function ProjectDetail() {
  const { slug } = useParams()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[currentIndex]

  // If slug is not found, return 404 page per PRD Section 6.3
  if (!project) {
    return <NotFound />
  }

  // Next project cycler (loops back to 0 if at the end)
  const nextIndex = (currentIndex + 1) % projects.length
  const nextProject = projects[nextIndex]

  return (
    <PageLayout>
      <SEO
        title={`${project.title} — Case Study`}
        description={project.summary}
      />
      <article className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-ink transition-colors"
          >
            ← Back to all work
          </Link>
        </div>

        {/* Hero Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-brand-muted mb-4">
            <span className="bg-brand-yellow/30 text-neutral-900 px-2.5 py-1 rounded-xs">
              {project.category}
            </span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.92] text-brand-ink mb-6">
            {project.title}
            <span className="text-brand-yellow">.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-brand-muted leading-relaxed font-normal max-w-3xl">
            {project.summary}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.liveUrl && (
              <Button href={project.liveUrl} variant="primary">
                View Live Site ↗
              </Button>
            )}
            <Button to="/contact" variant="secondary">
              Discuss Similar Project
            </Button>
          </div>
        </header>

        {/* Hero Visual Banner with Signature Yellow Circle */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-200 mb-16 shadow-sm">
          {/* Yellow circle behind */}
          <div
            className="absolute w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full bg-brand-yellow opacity-90 transition-transform duration-700"
            style={{ transform: 'translate(10%, -10%)' }}
            aria-hidden="true"
          />

          {/* Editorial Content Frame */}
          <div className="relative z-10 text-center p-8 text-white max-w-lg">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-yellow mb-2 block">
              Case Study Snapshot
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              {project.title}
            </h2>
            <p className="text-sm text-neutral-300 font-medium">
              Role: {project.role} · {project.year}
            </p>
          </div>
        </div>

        {project.media?.length > 0 && (
          <div className="grid gap-6 mb-16">
            {project.media.map((media) => (
              media.type === 'video' ? (
                <video
                  key={media.src}
                  className="w-full border border-neutral-200"
                  src={media.src}
                  poster={media.poster}
                  controls
                  playsInline
                  aria-label={media.alt || `${project.title} video`}
                />
              ) : (
                <img
                  key={media.src}
                  className="w-full border border-neutral-200"
                  src={media.src}
                  alt={media.alt || `${project.title} project`}
                />
              )
            ))}
          </div>
        )}

        {/* Quantitative Highlights Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-white border border-neutral-200 mb-16">
            {project.metrics.map((m) => (
              <div key={m.label} className="border-b sm:border-b-0 sm:border-r last:border-0 border-neutral-200 pb-4 sm:pb-0 sm:pr-4">
                <p className="text-xs uppercase tracking-wider font-bold text-brand-muted mb-1">
                  {m.label}
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-ink">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Narrative Sections */}
        <div className="space-y-12 sm:space-y-16 max-w-3xl">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              01. Project Overview
            </h2>
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* Problem */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              02. The Challenge & Bottlenecks
            </h2>
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Process */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              03. Strategic Architecture
            </h2>
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              {project.process}
            </p>
          </section>

          {/* Solution */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              04. The Solution & Execution
            </h2>
            <p className="text-base sm:text-lg text-neutral-800 leading-relaxed">
              {project.solution}
            </p>
          </section>

          {/* Results */}
          <section className="space-y-4 p-6 sm:p-8 bg-neutral-900 text-white rounded-none">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-yellow flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              05. Verifiable Business Impact
            </h2>
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
              {project.results}
            </p>
          </section>

          {/* Toolkit Used */}
          <section className="pt-8 border-t border-neutral-200">
            <h3 className="text-sm font-bold text-brand-ink uppercase tracking-wider mb-4">
              Technologies, Platforms & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          </section>

          {project.links?.length > 0 && (
            <section className="pt-8 border-t border-neutral-200">
              <h3 className="text-sm font-bold text-brand-ink uppercase tracking-wider mb-4">
                Project Links
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold underline underline-offset-4"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Cyclical Next Project Navigation */}
        <div className="my-16 sm:my-24 pt-12 border-t-2 border-brand-ink">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">
            Up Next
          </p>
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 bg-white border border-neutral-200 hover:border-brand-yellow hover:bg-neutral-50 transition-all duration-200"
          >
            <div>
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider block mb-1">
                {nextProject.category} · {nextProject.year}
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink group-hover:text-brand-yellow transition-colors">
                {nextProject.title}
              </h3>
            </div>
            <span className="text-3xl text-brand-ink group-hover:translate-x-2 transition-transform self-end sm:self-center">
              →
            </span>
          </Link>
        </div>

        {/* Page CTA */}
        <CTA
          kicker="Interested in similar results?"
          title="Let’s review your metrics."
          description="Send over your current ad accounts, creative assets, or growth objectives for a confidential growth review."
          buttonText="Get in touch"
          buttonTo="/contact"
        />
      </article>
    </PageLayout>
  )
}

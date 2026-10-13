import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative flex flex-col bg-white rounded-none border border-neutral-200/80 hover:border-brand-ink/40 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md"
    >
      {/* Visual Thumbnail Frame with Yellow Circle Accent */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 flex items-center justify-center">
        {/* Yellow circle peeking in corner/behind */}
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-yellow/90 transition-transform duration-500 ease-out group-hover:scale-125"
          aria-hidden="true"
        />

        {/* Abstract Greyscale Visual Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 opacity-95 group-hover:scale-105 transition-transform duration-500 ease-out flex flex-col justify-end p-6">
          {/* Subtle Graphic Texture */}
          <div className="text-white/20 font-mono text-8xl font-black select-none pointer-events-none absolute right-4 bottom-2 leading-none">
            {project.year}
          </div>

          {/* Metric Callout Pill */}
          {project.metrics && project.metrics[0] && (
            <div className="relative z-10 inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span>{project.metrics[0].label}:</span>
              <span className="text-brand-yellow font-black">
                {project.metrics[0].value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Meta Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-brand-muted uppercase font-bold tracking-wider mb-3">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-brand-ink tracking-tight transition-colors duration-200 flex items-center justify-between gap-2">
            <span className="relative inline-block pb-1">
              {project.title}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="text-brand-ink transform translate-x-[-4px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-lg">
              ↗
            </span>
          </h2>

          <p className="mt-3 text-sm text-brand-muted line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tools row */}
        {project.tools && (
          <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-sm"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[11px] font-medium text-neutral-400 self-center">
                +{project.tools.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

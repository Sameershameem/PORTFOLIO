import experience, { education } from '../../data/experience.js'

export default function Timeline() {
  return (
    <div className="my-16 sm:my-20">
      <div className="mb-10">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted mb-2">
          Career Trajectory
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink">
          Experience & Milestones<span className="text-brand-yellow">.</span>
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-300 space-y-10 sm:space-y-12">
        {experience.map((item) => (
          <div key={item.company} className="relative group">
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand-yellow border-2 border-white shadow-xs group-hover:scale-125 transition-transform" />

            <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 bg-brand-yellow/30 px-2 py-0.5 rounded-xs">
                {item.period}
              </span>
              <span className="text-sm font-bold text-brand-muted">
                · {item.company}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-brand-ink mb-2">
              {item.role}
            </h3>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Education section */}
      {education && education.length > 0 && (
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <h3 className="text-xl font-bold text-brand-ink mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            Education & Academic Foundation
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.institution} className="p-5 bg-white border border-neutral-200/80">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="font-bold text-brand-ink text-base">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-brand-muted font-bold">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-brand-muted font-medium">
                  {edu.institution}
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

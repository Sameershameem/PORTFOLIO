import skills from '../../data/skills.js'
import Tag from '../ui/Tag.jsx'

export default function SkillsGrid() {
  return (
    <div className="my-16 sm:my-20">
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted mb-2">
          Core Competencies
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink">
          Skills & Toolkit<span className="text-brand-yellow">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {skills.map((group) => (
          <div
            key={group.category}
            className="p-6 sm:p-7 bg-white border border-neutral-200/80 flex flex-col"
          >
            <h3 className="text-lg font-bold text-brand-ink mb-5 pb-3 border-b border-neutral-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

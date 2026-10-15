import { processSteps } from '../../data/services.js'

export default function ProcessSteps() {
  return (
    <div className="my-16 sm:my-24">
      <div className="mb-10 sm:mb-12">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted mb-2">
          How I Work
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-ink">
          The Process<span className="text-brand-yellow">.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {processSteps.map((step) => (
          <div
            key={step.number}
            className="relative p-6 sm:p-7 bg-white border border-neutral-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-yellow px-2.5 py-1 bg-neutral-900 rounded-sm">
                  {step.number}
                </span>
                <span className="text-xs text-brand-muted font-mono font-medium">
                  Step {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-ink mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="w-8 h-[2px] bg-brand-yellow mt-6" />
          </div>
        ))}
      </div>
    </div>
  )
}

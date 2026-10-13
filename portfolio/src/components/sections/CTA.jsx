import Button from '../ui/Button.jsx'

export default function CTA({
  kicker = 'Have a project in mind?',
  title = 'Let’s make it happen.',
  description = 'Available for select growth marketing partnerships, performance scaling audits, and high-cadence creative strategy.',
  buttonText = 'Start a conversation',
  buttonTo = '/contact',
}) {
  return (
    <section className="relative overflow-hidden bg-brand-yellow text-brand-ink p-8 sm:p-12 md:p-16 my-16 sm:my-24">
      {/* Subtle background circle element */}
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-800 mb-3">
            {kicker}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[0.95]">
            {title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-800/90 max-w-xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="shrink-0">
          <Button to={buttonTo} variant="primary" className="!bg-brand-ink !text-white hover:!bg-white hover:!text-brand-ink">
            {buttonText} ↗
          </Button>
        </div>
      </div>
    </section>
  )
}

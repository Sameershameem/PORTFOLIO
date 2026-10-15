export default function SectionTitle({
  kicker,
  title,
  intro,
  align = 'left',
  className = '',
}) {
  const isCentered = align === 'center'

  return (
    <div className={`mb-10 md:mb-16 ${isCentered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {kicker && (
        <p data-reveal="up" className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted mb-3 sm:mb-4">
          {kicker}
        </p>
      )}

      {title && (
        <h1 data-reveal="lines" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.92] text-brand-ink">
          {title.endsWith('.') ? (
            <>
              {title.slice(0, -1)}
              <span className="text-brand-yellow">.</span>
            </>
          ) : (
            <>
              {title}
              <span className="text-brand-yellow">.</span>
            </>
          )}
        </h1>
      )}

      {intro && (
        <p data-reveal="up" className="mt-5 text-base sm:text-lg md:text-xl text-brand-muted leading-relaxed font-normal">
          {intro}
        </p>
      )}
    </div>
  )
}

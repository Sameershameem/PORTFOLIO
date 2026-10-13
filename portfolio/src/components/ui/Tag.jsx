export default function Tag({ children, active = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-150 ${
        active
          ? 'bg-brand-ink text-white shadow-xs'
          : 'bg-white/80 text-brand-ink border border-neutral-300 hover:border-brand-yellow'
      } ${className}`}
    >
      {children}
    </span>
  )
}

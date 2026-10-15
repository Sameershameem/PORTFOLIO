import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer select-none px-6 py-3 md:px-8 md:py-3.5 focus-visible:outline-2 focus-visible:outline-brand-yellow'

  const variants = {
    primary:
      'bg-brand-ink text-white hover:bg-brand-yellow hover:text-brand-ink shadow-sm',
    secondary:
      'bg-transparent text-brand-ink border border-brand-ink hover:bg-brand-ink hover:text-white',
    yellow:
      'bg-brand-yellow text-brand-ink hover:bg-brand-ink hover:text-white shadow-sm',
    ghost:
      'bg-transparent text-brand-ink hover:text-brand-olive underline underline-offset-4 p-0',
  }

  const combinedClasses = `${baseClasses} ${variants[variant] || variants.primary} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  } ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  )
}

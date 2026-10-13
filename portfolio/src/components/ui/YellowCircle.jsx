export default function YellowCircle({
  size = 'md',
  className = '',
  children,
}) {
  const sizeClasses = {
    sm: 'w-32 h-32 md:w-48 md:h-48',
    md: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
    lg: 'w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px]',
    full: 'w-full aspect-square',
  }

  return (
    <div
      className={`rounded-full bg-brand-yellow select-none flex items-center justify-center relative ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}

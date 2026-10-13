export default function FilterChips({
  categories = [],
  activeCategory = 'All',
  onSelect,
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2.5 my-8 sm:my-10"
      role="group"
      aria-label="Filter projects by category"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-brand-ink text-white shadow-sm'
                : 'bg-white/70 text-brand-muted hover:text-brand-ink hover:bg-white border border-neutral-300'
            }`}
            aria-pressed={isActive}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}

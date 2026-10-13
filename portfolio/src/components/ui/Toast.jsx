export default function Toast({ message, visible }) {
  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-brand-ink text-white text-xs font-bold uppercase tracking-wider shadow-2xl animate-fade-in"
    >
      <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
      {message}
    </div>
  )
}

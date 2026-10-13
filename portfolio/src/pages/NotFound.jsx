import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import SEO from '../components/ui/SEO.jsx'

export default function NotFound() {
  return (
    <PageLayout>
      <SEO title="404 — Page Not Found" description="The page you were looking for does not exist." />
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 overflow-hidden my-auto">
        {/* Yellow Circle Motif */}
        <div
          className="absolute -z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-brand-yellow opacity-90 blur-[1px]"
          style={{ transform: 'translate(-10%, -10%)' }}
          aria-hidden="true"
        />

        <span className="text-xs font-bold tracking-widest uppercase text-brand-muted mb-4">
          Error 404
        </span>

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight leading-none text-brand-ink select-none">
          404<span className="text-brand-yellow">.</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-brand-ink/80 max-w-md">
          this page left the building.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-ink text-white font-bold rounded-full text-sm uppercase tracking-wide hover:bg-brand-yellow hover:text-brand-ink transition-all duration-200 shadow-sm"
          >
            Back home
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}

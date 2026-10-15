import { useState, useMemo } from 'react'
import PageLayout from '../components/layout/PageLayout.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import FilterChips from '../components/ui/FilterChips.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import { pageMeta } from '../data/seo.js'
import projects from '../data/projects.js'

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Extract unique categories from projects data
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map((p) => p.category))]
    return cats
  }, [])

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects
    return projects.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <PageLayout>
      <SEO
        {...pageMeta['/work']}
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SectionTitle
          kicker="Work in progress"
          title="work."
          intro="A space for real projects, clear thinking, and verified outcomes. Case-study details will be added as they are ready to share."
        />

        {/* Filter Chips */}
        <FilterChips
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Responsive Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white p-8 border border-neutral-200">
            <p className="text-lg font-bold text-brand-ink">No projects found in this category.</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-xs font-bold uppercase underline text-brand-yellow hover:text-brand-ink"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Closing CTA */}
        <CTA
          kicker="Have an idea?"
          title="Let’s make it happen."
          description="Tell me about a campaign, a creative collaboration, or a digital product you want to bring to life."
          buttonText="Start a conversation"
          buttonTo="/contact"
        />
      </div>
    </PageLayout>
  )
}

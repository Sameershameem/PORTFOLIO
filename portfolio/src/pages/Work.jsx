import { useState, useMemo } from 'react'
import PageLayout from '../components/layout/PageLayout.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import FilterChips from '../components/ui/FilterChips.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
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
        title="Work & Case Studies"
        description="Explore paid acquisition funnels, creative strategies, and growth case studies by Sameer Shameem."
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SectionTitle
          kicker="Selected Case Studies"
          title="work."
          intro="A curated collection of paid acquisition funnels, creative strategies, and viral narrative campaigns that drove real business growth."
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
          kicker="Ready for measurable growth?"
          title="Let’s scale your brand."
          description="Looking to unlock higher ROAS, lower CPA, or build an authentic organic presence? Let's analyze your current funnel."
          buttonText="Request an audit"
          buttonTo="/contact"
        />
      </div>
    </PageLayout>
  )
}

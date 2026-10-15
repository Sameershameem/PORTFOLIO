import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import { pageMeta } from '../data/seo.js'
import posts from '../data/posts.js'

export default function Blog() {
  return (
    <PageLayout>
      <SEO
        {...pageMeta['/blog']}
      />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SectionTitle
          kicker="Thoughts & Playbooks"
          title="journal."
          intro="Notes on high-converting ad creative, contribution margin economics, algorithmic psychology, and scaling consumer brands."
        />

        {/* Clean Editorial Post List */}
        <div className="divide-y divide-neutral-200 my-10 sm:my-14">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 sm:py-12 group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-brand-muted mb-3">
                  <span className="bg-brand-yellow/30 text-neutral-900 px-2.5 py-0.5 rounded-xs">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-ink tracking-tight group-hover:text-brand-yellow transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
                  {post.excerpt}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-ink group-hover:text-brand-yellow transition-colors underline">
                  Read Article <span>↗</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <CTA
          kicker="Want strategic insights for your brand?"
          title="Let’s audit your growth engine."
          description="Looking for an independent teardown of your paid media acquisition or content strategy? Get in touch."
          buttonText="Request an audit"
          buttonTo="/contact"
        />
      </div>
    </PageLayout>
  )
}

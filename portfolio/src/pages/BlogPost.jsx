import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout.jsx'
import NotFound from './NotFound.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import posts from '../data/posts.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return <NotFound />
  }

  return (
    <PageLayout>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
      />
      <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-muted hover:text-brand-ink transition-colors"
          >
            ← Back to all articles
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-10 sm:mb-14 pb-8 border-b border-neutral-200">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-brand-muted mb-4">
            <span className="bg-brand-yellow/30 text-neutral-900 px-2.5 py-1 rounded-xs">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.02] text-brand-ink mb-6">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 font-medium leading-relaxed italic border-l-2 border-brand-yellow pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content */}
        <div className="space-y-6 text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Author Byline */}
        <div className="my-14 p-6 sm:p-8 bg-white border border-neutral-200 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-brand-yellow flex items-center justify-center font-black text-xl text-brand-ink shrink-0">
            SS
          </div>
          <div>
            <h2 className="font-extrabold text-brand-ink text-base">
              Sameer Shameem
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-0.5">
              Performance Marketer, Content Creator & Growth Strategist.
            </p>
          </div>
        </div>

        {/* Page CTA */}
        <CTA
          kicker="Enjoyed this read?"
          title="Let’s build your strategy."
          description="Ready to implement modern growth tactics tailored for your specific customer lifecycle?"
          buttonText="Contact Sameer"
          buttonTo="/contact"
        />
      </article>
    </PageLayout>
  )
}

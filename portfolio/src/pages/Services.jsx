import PageLayout from '../components/layout/PageLayout.jsx'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import ProcessSteps from '../components/sections/ProcessSteps.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import services from '../data/services.js'

export default function Services() {
  return (
    <PageLayout>
      <SEO
        title="Services & Process"
        description="Marketing strategy, content creation, performance marketing, copywriting, and vibe coding by Sameer Shameem."
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SectionTitle
          kicker="What I do"
          title="services."
          intro="A mix of strategic thinking and hands-on creative work, from campaign planning and content to copy and digital experiences."
        />

        {/* Services Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 my-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 sm:p-10 bg-white border border-neutral-200/80 hover:border-brand-yellow transition-all duration-200 flex flex-col justify-between group shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                  <span className="text-xs font-mono font-bold tracking-widest text-neutral-800 bg-brand-yellow px-2.5 py-1">
                    {service.id}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-4 tracking-tight group-hover:text-brand-yellow transition-colors">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* What's included checklist */}
                <div className="space-y-3 pt-6 border-t border-neutral-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-ink mb-4">
                    What’s Included:
                  </p>
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700">
                      <span className="text-brand-yellow font-bold text-base leading-none">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                <a
                  href="/contact"
                  className="text-xs font-bold uppercase tracking-wider text-brand-ink hover:text-brand-yellow transition-colors flex items-center gap-1.5"
                >
                  Inquire about this service <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <ProcessSteps />

        {/* Bottom CTA Block */}
        <CTA
          kicker="Have a project in mind?"
          title="Let’s talk it through."
          description="Share the idea, the audience, and what you want to make happen. We can work out the right next step together."
          buttonText="Start a conversation"
          buttonTo="/contact"
        />
      </div>
    </PageLayout>
  )
}

import PageLayout from '../components/layout/PageLayout.jsx'
import Button from '../components/ui/Button.jsx'
import SkillsGrid from '../components/sections/SkillsGrid.jsx'
import Timeline from '../components/sections/Timeline.jsx'
import CTA from '../components/sections/CTA.jsx'
import SEO from '../components/ui/SEO.jsx'
import portrait from '../assets/images/hero-portrait.png'
import { quickFacts } from '../data/skills.js'

export default function About() {
  return (
    <PageLayout>
      <SEO
        title="About Sameer"
        description="Meet Sameer Shameem: marketing specialist, content creator, performance marketer, copywriter, and emerging vibe coder."
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Two-Column Editorial Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
          {/* Left Column: Portrait on Signature Yellow Circle */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center">
              {/* Yellow Circle Motif */}
              <div
                className="w-full h-full rounded-full bg-brand-yellow select-none"
                aria-hidden="true"
              />
              {/* B&W Cut-out Portrait */}
              <img
                src={portrait}
                alt="Sameer Shameem portrait"
                className="absolute bottom-0 w-[92%] h-auto max-h-[110%] object-contain object-bottom filter grayscale contrast-110 drop-shadow-md pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Right Column: Bio & Intro */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-muted mb-3 sm:mb-4">
              Behind the Strategy
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.92] text-brand-ink mb-8">
              about<span className="text-brand-yellow">.</span>
            </h1>

            <div className="space-y-5 text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
              <p>
                I&apos;m <strong>Sameer Shameem</strong> — a marketing specialist,
                content creator, performance marketer, and copywriter with a growing
                passion for vibe coding. I enjoy connecting creative ideas with
                strategic thinking and using modern AI-powered tools to bring digital
                experiences to life.
              </p>
              <p>
                From developing a compelling campaign message to building an
                interactive web experience, I like being involved in the process of
                turning an idea into something real.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-neutral-200">
              <Button to="/contact" variant="primary">
                Let’s talk ↗
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Facts Strip */}
        <section className="p-6 sm:p-8 bg-white border border-neutral-200 mb-16 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="border-r last:border-0 border-neutral-200 pr-4">
                <p className="text-[11px] uppercase tracking-wider font-bold text-brand-muted mb-1">
                  {fact.label}
                </p>
                <p className="text-sm sm:text-base md:text-lg font-bold text-brand-ink">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Toolkit Section */}
        <SkillsGrid />

        {/* Timeline / Experience History */}
        <Timeline />

        {/* Closing CTA */}
        <CTA
          kicker="Interested in working together?"
          title="Have an idea? Let’s make it happen."
          description="Whether it’s a campaign, a creative collaboration, or a digital product, let’s build something worth remembering."
          buttonText="Start a conversation"
          buttonTo="/contact"
        />
      </div>
    </PageLayout>
  )
}

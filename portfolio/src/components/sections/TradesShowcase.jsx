import { useState, useEffect } from 'react'

const trades = [
  {
    id: 'vibe-coder',
    title: 'Vibe Coder',
    tagline: 'Code with rhythm. Interfaces with soul.',
    icon: '💻',
    accentColor: '#38BDF8',
    stats: [
      { label: 'Render Performance', value: '60 FPS' },
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Stack Mastery', value: 'React 19 + Vite' },
    ],
    description:
      'I don’t just write code; I craft fluid digital environments. Specializing in hardware-accelerated animations, responsive component design, and zero-jank user experiences that captivate visitors from the first millisecond.',
    codeSnippet: `// The Vibe Coder Architecture
const experience = {
  stack: ['React 19', 'Tailwind CSS', 'CSS Physics', 'Vite'],
  philosophy: 'Minimalist clarity meets rich dynamic motion.',
  renderSpeed: 'Instantaneous (Sub-50ms TTFB)',
  satisfaction: '100% WOW factor guaranteed',
};

export function launchExperience() {
  return experience.stack.map(tech => tech.supercharged());
}`,
    capabilities: [
      'Interactive 3D Parallax & Physics',
      'Custom SVG Kinetic Animations',
      'Mobile-First Responsive Perfection',
      'High-Speed Clean React Component Tree',
    ],
  },
  {
    id: 'copywriter',
    title: 'Copywriter',
    tagline: 'Direct-response words that arrest attention & convert.',
    icon: '✍️',
    accentColor: '#F59E0B',
    stats: [
      { label: 'Average CTR Lift', value: '+42%' },
      { label: 'Headline Testing', value: '15+ Angles' },
      { label: 'Email Open Rate', value: '46.8%' },
    ],
    description:
      'Pretty words don’t pay the bills; psychological clarity does. I craft magnetic hooks, high-converting advertorials, and retention email flows rooted in consumer desire and relentless direct-response persuasion.',
    hookComparison: {
      boring: '“We are a digital marketing agency providing quality creative services.”',
      boringCTR: '1.1% CTR (High Bounce Rate)',
      magnetic: '“We stopped guessing and turned $10k into $42k with 3 high-converting creative hooks.”',
      magneticCTR: '5.6% CTR (+409% Lift in Engagement)',
    },
    capabilities: [
      'Scroll-Stopping First 3-Second Hooks',
      'Long-Form Advertorial & Landing Page Copy',
      'Klaviyo Automated Retention & Welcome Flows',
      'Irresistible Value Proposition & Offer Crafting',
    ],
  },
  {
    id: 'growth-strategist',
    title: 'Growth Strategist',
    tagline: 'Engineering sustainable, scalable customer acquisition engines.',
    icon: '📈',
    accentColor: '#10B981',
    stats: [
      { label: 'Peak Scaling ROAS', value: '4.2x' },
      { label: 'CAC Reduction', value: '-38%' },
      { label: 'Pipeline Scaled', value: '$1.4M+' },
    ],
    description:
      'Growth is not accidental; it’s an engineered pipeline. I align unit economics, post-click conversion rates, and lifetime value expansion to build profitable scaling flywheels that withstand market shifts.',
    funnelStages: [
      { stage: 'Top of Funnel', metric: 'Low CAC Discovery', detail: 'Creative sandbox testing 15+ ad angles weekly.' },
      { stage: 'Mid Funnel', metric: 'High-Intent CRO', detail: 'Frictionless advertorials & quiz funnels.' },
      { stage: 'Bottom of Funnel', metric: '4.2x ROAS Conversion', detail: 'Dynamic bundle offers & urgency triggers.' },
      { stage: 'Post-Purchase', metric: '68% Day-60 LTV', detail: 'Automated Klaviyo SMS/Email retention flows.' },
    ],
    capabilities: [
      'Full-Funnel Economics & Contribution Margin Analysis',
      'Creative Diversification & Angle Iteration',
      'Post-Click Conversion Rate Optimization (CRO)',
      'Go-To-Market Scaling Playbooks for D2C & Tech',
    ],
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    tagline: 'Viral short-form concepts built for the modern attention economy.',
    icon: '🎬',
    accentColor: '#EC4899',
    stats: [
      { label: 'Organic Video Views', value: '10M+' },
      { label: 'Avg. Retention at 3s', value: '82%' },
      { label: 'Viral Drops', value: '100% Sold Out' },
    ],
    description:
      'Understanding platform algorithms means understanding human curiosity. I concept, script, storyboard, and direct short-form Reels and TikToks engineered to stop thumbs and spark intense organic sharing.',
    contentMetrics: {
      views: '2,840,192',
      shares: '48,210',
      saves: '94,150',
      viralHook: '“Why 99% of brands fail at UGC (and the 1 fix that changed everything)”',
    },
    capabilities: [
      'Fast-Paced Short-Form Video Scripting',
      'UGC Creator Seeding & Brief Management',
      'High-Cadence CapCut Pro / Premiere Editing',
      'Organic-to-Paid Creative Repurposing Systems',
    ],
  },
  {
    id: 'performance-marketer',
    title: 'Performance Marketer',
    tagline: 'Data-obsessed media buying across Meta, Google & TikTok.',
    icon: '🎯',
    accentColor: '#E8B93A',
    stats: [
      { label: 'Managed Ad Spend', value: '$850K+' },
      { label: 'Blended Multi-Touch ROAS', value: '4.2x' },
      { label: 'Tracking Reliability', value: '100% CAPI' },
    ],
    description:
      'Every dollar deployed must fight for measurable net profit. From granular audience exclusions to server-side CAPI tracking and Triple Whale attribution, I run paid media campaigns like high-frequency investments.',
    mediaChannels: [
      { channel: 'Meta Ads Manager', spend: '$520k+', roas: '4.4x', status: 'Active Scale' },
      { channel: 'Google Ads & PMax', spend: '$240k+', roas: '3.9x', status: 'High Intent' },
      { channel: 'TikTok Spark Ads', spend: '$90k+', roas: '4.1x', status: 'Viral Scale' },
    ],
    capabilities: [
      'Rapid-Iteration Creative Sandbox Architectures',
      'Server-Side Conversion API (CAPI) & Pixel Engineering',
      'Triple Whale & Northbeam Blended Attribution',
      'Aggressive Profit-Margin-Driven Scaling',
    ],
  },
]

export default function TradesShowcase() {
  const [activeTradeId, setActiveTradeId] = useState('vibe-coder')
  const [interactiveVibeGlow, setInteractiveVibeGlow] = useState(false)
  const [viewCount, setViewCount] = useState(2840192)

  const activeTrade = trades.find((t) => t.id === activeTradeId) || trades[0]

  // Subtle tick up for the viral content creator live view counter
  useEffect(() => {
    if (activeTradeId !== 'content-creator') return
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 8) + 1)
    }, 1200)
    return () => clearInterval(interval)
  }, [activeTradeId])

  return (
    <section className="trades-showcase-section" id="capabilities" aria-labelledby="trades-heading">
      <div className="trades-header">
        <div className="trades-badge-pill">
          <span className="trades-badge-spark">✦</span>
          <span>THE MULTIDISCIPLINARY ARSENAL</span>
        </div>
        <h2 className="trades-heading" id="trades-heading">
          Five Trades. <br className="hidden sm:inline" />
          <span className="text-highlight-yellow">One Obsession</span> With Craft.
        </h2>
        <p className="trades-subheading">
          I don’t fit into a single box. Explore the five distinct disciplines I leverage to design, code, write, and scale market-leading digital experiences.
        </p>
      </div>

      {/* Trade Selector Tab Bar */}
      <div className="trade-tabs-nav" role="tablist" aria-label="Select trade to inspect">
        {trades.map((trade) => {
          const isActive = trade.id === activeTradeId
          return (
            <button
              key={trade.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveTradeId(trade.id)}
              className={`trade-tab-btn ${isActive ? 'is-active' : ''}`}
            >
              <span className="trade-tab-icon">{trade.icon}</span>
              <span className="trade-tab-title">{trade.title}</span>
              {isActive && <span className="trade-tab-indicator" layoutid="tab-active" />}
            </button>
          )
        })}
      </div>

      {/* Interactive Simulation Laboratory */}
      <div className="trade-lab-card">
        <div className="trade-lab-glow" style={{ background: activeTrade.accentColor }} />

        {/* Top Info Bar */}
        <div className="trade-lab-header">
          <div className="trade-lab-title-group">
            <span className="trade-lab-icon-box">{activeTrade.icon}</span>
            <div>
              <h3 className="trade-lab-title">{activeTrade.title}</h3>
              <p className="trade-lab-tagline">{activeTrade.tagline}</p>
            </div>
          </div>
          <div className="trade-lab-stats-row">
            {activeTrade.stats.map((stat) => (
              <div className="trade-lab-stat-box" key={stat.label}>
                <span className="trade-lab-stat-val">{stat.value}</span>
                <span className="trade-lab-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Center Sandbox Display */}
        <div className="trade-lab-body">
          {/* 1. VIBE CODER SIMULATOR */}
          {activeTrade.id === 'vibe-coder' && (
            <div className={`vibe-coder-sandbox ${interactiveVibeGlow ? 'has-glow' : ''}`}>
              <div className="code-editor-chrome">
                <div className="code-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="code-filename">VibeEngine.jsx &bull; React 19</span>
                <button
                  type="button"
                  onClick={() => setInteractiveVibeGlow(!interactiveVibeGlow)}
                  className="code-action-btn"
                >
                  {interactiveVibeGlow ? '✨ Cyber Glow Active' : '⚡ Pulse Cyber Glow'}
                </button>
              </div>
              <pre className="code-editor-content">
                <code>{activeTrade.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* 2. COPYWRITER SIMULATOR */}
          {activeTrade.id === 'copywriter' && (
            <div className="copywriter-sandbox">
              <p className="sandbox-kicker">✦ LIVE HOOK CONVERSION LAB</p>
              <div className="hook-comparison-grid">
                <div className="hook-box hook-boring">
                  <div className="hook-header">
                    <span className="hook-tag">Standard Corporate Pitch</span>
                    <span className="hook-metric-bad">{activeTrade.hookComparison.boringCTR}</span>
                  </div>
                  <p className="hook-text">{activeTrade.hookComparison.boring}</p>
                  <p className="hook-verdict">Result: Ignored, high ad fatigue, zero emotional connection.</p>
                </div>

                <div className="hook-box hook-magnetic">
                  <div className="hook-header">
                    <span className="hook-tag-good">Sameer's Direct-Response Hook</span>
                    <span className="hook-metric-good">{activeTrade.hookComparison.magneticCTR}</span>
                  </div>
                  <p className="hook-text">{activeTrade.hookComparison.magnetic}</p>
                  <p className="hook-verdict-good">Result: Scroll-stopped, curiosity triggered, 4x more purchases.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. GROWTH STRATEGIST SIMULATOR */}
          {activeTrade.id === 'growth-strategist' && (
            <div className="growth-sandbox">
              <p className="sandbox-kicker">✦ THE 4-STAGE ACQUISITION ENGINE</p>
              <div className="growth-pipeline-grid">
                {activeTrade.funnelStages.map((stage, idx) => (
                  <div className="growth-stage-card" key={stage.stage}>
                    <div className="stage-num-badge">0{idx + 1}</div>
                    <h4 className="stage-title">{stage.stage}</h4>
                    <span className="stage-metric">{stage.metric}</span>
                    <p className="stage-desc">{stage.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CONTENT CREATOR SIMULATOR */}
          {activeTrade.id === 'content-creator' && (
            <div className="content-sandbox">
              <div className="reel-mockup">
                <div className="reel-screen">
                  <div className="reel-live-tag">
                    <span className="reel-pulse-dot" /> LIVE VIRAL LOOP
                  </div>
                  <div className="reel-soundwave-wrap">
                    <div className="soundwave-bar bar-a" />
                    <div className="soundwave-bar bar-b" />
                    <div className="soundwave-bar bar-c" />
                    <div className="soundwave-bar bar-d" />
                    <div className="soundwave-bar bar-e" />
                  </div>
                  <p className="reel-hook-quote">{activeTrade.contentMetrics.viralHook}</p>
                  <div className="reel-metrics-overlay">
                    <div className="reel-stat">
                      <span className="reel-stat-num">{viewCount.toLocaleString()}</span>
                      <span className="reel-stat-lbl">Views</span>
                    </div>
                    <div className="reel-stat">
                      <span className="reel-stat-num">{activeTrade.contentMetrics.shares}</span>
                      <span className="reel-stat-lbl">Shares</span>
                    </div>
                    <div className="reel-stat">
                      <span className="reel-stat-num">{activeTrade.contentMetrics.saves}</span>
                      <span className="reel-stat-lbl">Saves</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-detail-panel">
                <h4 className="content-panel-title">Engineered For The Algorithm</h4>
                <p className="content-panel-p">
                  Every short-form asset is built around rapid pacing, visual pattern-interrupts, and audio hooks that maintain over 80% viewer retention past the 3-second dropoff mark.
                </p>
                <div className="content-tags-row">
                  <span className="content-pill">CapCut Pro Master</span>
                  <span className="content-pill">UGC Creator Briefs</span>
                  <span className="content-pill">Hook Scripting</span>
                  <span className="content-pill">Trend Hijacking</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. PERFORMANCE MARKETER SIMULATOR */}
          {activeTrade.id === 'performance-marketer' && (
            <div className="performance-sandbox">
              <p className="sandbox-kicker">✦ MULTI-CHANNEL MEDIA DASHBOARD ($850K+ SCALED)</p>
              <div className="channels-table">
                {activeTrade.mediaChannels.map((item) => (
                  <div className="channel-row" key={item.channel}>
                    <div className="channel-name">
                      <span className="channel-dot" />
                      <strong>{item.channel}</strong>
                    </div>
                    <div className="channel-spend">
                      <span className="channel-lbl">Spend Managed</span>
                      <span className="channel-val">{item.spend}</span>
                    </div>
                    <div className="channel-roas">
                      <span className="channel-lbl">Blended Return</span>
                      <span className="channel-roas-badge">{item.roas} ROAS</span>
                    </div>
                    <div className="channel-status">
                      <span className="status-pill">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Capabilities Checklist */}
        <div className="trade-lab-footer">
          <span className="capabilities-label">Core Trade Capabilities:</span>
          <div className="capabilities-grid">
            {activeTrade.capabilities.map((cap) => (
              <div className="capability-item" key={cap}>
                <span className="capability-check">✔</span>
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of all 5 Trades Overview Cards */}
      <div className="trades-cards-grid">
        {trades.map((trade) => (
          <article
            key={trade.id}
            className={`trade-card ${trade.id === activeTradeId ? 'is-selected' : ''}`}
            onClick={() => setActiveTradeId(trade.id)}
          >
            <div className="trade-card-top">
              <span className="trade-card-icon">{trade.icon}</span>
              <span className="trade-card-explore-arrow">↗</span>
            </div>
            <h4 className="trade-card-title">{trade.title}</h4>
            <p className="trade-card-desc">{trade.description}</p>
            <div className="trade-card-footer">
              <span className="trade-card-tag">{trade.stats[0].label}: {trade.stats[0].value}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

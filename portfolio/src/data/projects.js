const projects = [
  {
    slug: 'lumina-skincare',
    title: 'Lumina D2C Scaling',
    category: 'Performance',
    year: 2025,
    role: 'Growth Strategist & Media Buyer',
    tools: ['Meta Ads Manager', 'Triple Whale', 'Canva', 'Shopify Plus'],
    summary: 'Scaled a clean-beauty D2C brand from $40k/mo to $180k/mo while increasing blended ROAS from 1.8x to 4.2x.',
    coverBg: '#E8B93A',
    metrics: [
      { label: 'Blended ROAS', value: '4.2x' },
      { label: 'Revenue Growth', value: '+350%' },
      { label: 'CAC Reduction', value: '-38%' },
    ],
    overview:
      'Lumina Skincare is a clean cosmetic brand that struggled with rising Meta CPAs and stagnant conversion rates following iOS privacy updates. Sameer built a full-funnel paid acquisition architecture focused on creative diversification, dynamic offer testing, and post-purchase retention.',
    problem:
      'The brand relied on a single static hero ad that saturated quickly. Ad fatigue drove customer acquisition costs up to $58 against an average order value of $64, leaving near-zero profit margins.',
    process:
      'Conducted deep customer persona audits, segmented audience hooks into "Problem-Aware" vs "Solution-Hungry", and engineered a rapid-iteration creative sandbox testing 15 weekly ad concepts across Reels and Stories.',
    solution:
      'Implemented an end-to-end UGC creator seeding framework coupled with high-converting advertorial landing pages and automated Klaviyo SMS/Email sequences that maximized Day-60 Customer Lifetime Value.',
    results:
      'Achieved a 4.2x blended ROAS during Q4 peak season, reduced CPA to $36, and scaled monthly revenue past $180,000 without sacrificing contribution margin.',
    liveUrl: 'https://lumina-demo.example.com',
    githubUrl: '',
    featured: true,
  },
  {
    slug: 'apex-apparel',
    title: 'Apex Narrative & Viral Engine',
    category: 'Content',
    year: 2024,
    role: 'Creative Director & Content Strategist',
    tools: ['CapCut Pro', 'Figma', 'TikTok Ads', 'Klaviyo'],
    summary: 'Engineered an organic-first short-form video strategy generating 2.8M views and an organic revenue lift of 64%.',
    coverBg: '#24231f',
    metrics: [
      { label: 'Organic Views', value: '2.8M+' },
      { label: 'Follower Growth', value: '+85K' },
      { label: 'Organic Revenue', value: '+64%' },
    ],
    overview:
      'Apex Apparel designs technical streetwear for urban creatives. They needed an authentic social footprint that avoided looking like transactional sponsored ads while driving loyal direct-to-site traffic.',
    problem:
      'Traditional catalog photoshoots were failing to convert on modern social algorithms. Engagement was below 1.1% and website visitors had low session durations.',
    process:
      'Built a structured weekly content matrix revolving around design process breakdowns, fabric stress tests, and styling challenges designed to trigger viral comments and saves.',
    solution:
      'Delivered 45 high-cadence short-form Reels and TikToks, collaborated with micro-creators in underground fashion circles, and linked top-performing content directly to exclusive drop pages.',
    results:
      'Generated over 2.8 million organic video impressions in 90 days, gained 85,000 engaged followers, and drove 3 back-to-back sold-out product drops.',
    liveUrl: 'https://apex-demo.example.com',
    githubUrl: '',
    featured: true,
  },
  {
    slug: 'zenith-fintech',
    title: 'Zenith B2B Acquisition Funnel',
    category: 'Strategy',
    year: 2024,
    role: 'Performance Marketing Consultant',
    tools: ['Google Ads', 'LinkedIn Campaign Manager', 'HubSpot', 'Mixpanel'],
    summary: 'Restructured B2B lead generation architecture to reduce cost-per-qualified-lead by 44% for a SaaS banking solution.',
    coverBg: '#E8B93A',
    metrics: [
      { label: 'CPL Reduction', value: '-44%' },
      { label: 'Demo Bookings', value: '+142%' },
      { label: 'Pipeline Value', value: '$1.4M' },
    ],
    overview:
      'Zenith provides automated treasury and payroll infrastructure for fast-growing mid-market companies. Their customer acquisition cost was unsustainable due to unfocused broad targeting on enterprise channels.',
    problem:
      'Enterprise sales cycles were dragging out over 8 months because incoming leads were low-intent and unqualified. Paid search spend was wasting budget on irrelevant consumer keywords.',
    process:
      'Conducted comprehensive negative keyword scrubbing, deployed exact-match competitor displacement campaigns, and implemented LinkedIn conversation ads targeting verified CFOs and Heads of Finance.',
    solution:
      'Redesigned the demo booking flow into a 2-step friction-free questionnaire with interactive ROI calculator, qualifying prospects before pushing to sales reps via HubSpot.',
    results:
      'Delivered a 44% drop in cost-per-lead and a 142% surge in monthly qualified demo bookings, producing $1.4M in closed-won pipeline over two quarters.',
    liveUrl: 'https://zenith-demo.example.com',
    githubUrl: '',
    featured: true,
  },
  {
    slug: 'nordic-brew',
    title: 'Nordic Brew Launch Campaign',
    category: 'Branding',
    year: 2025,
    role: 'Brand & Launch Lead',
    tools: ['Brand Identity', 'Shopify', 'Email Funnels', 'Meta Ads'],
    summary: 'Full launch strategy, visual identity refinement, and crowdfunding campaign raising $140K in 21 days.',
    coverBg: '#24231f',
    metrics: [
      { label: 'Funds Raised', value: '$140,000' },
      { label: 'Goal Reached', value: '280%' },
      { label: 'Email List', value: '14,500' },
    ],
    overview:
      'Nordic Brew introduced an ultra-compact cold brew precision immersion device. Sameer directed the pre-launch audience incubation, messaging guidelines, and launch-day blitz.',
    problem:
      'Entering a crowded specialty coffee market with zero brand equity required building trust, anticipation, and an eager VIP buyer waitlist prior to public availability.',
    process:
      'Ran a 60-day pre-launch VIP reservation funnel ($1 deposit to lock in 40% launch discount) to validate purchase intent and construct an ultra-high-intent lookalike seed list.',
    solution:
      'Created editorial minimalist product visuals, authored compelling storytelling copy highlighting Scandinavian design simplicity, and orchestrated a synchronized launch day PR and paid ad push.',
    results:
      'Surpassed the funding goal within 3 hours of launch, raised $140,000 across 21 days, and grew an owned customer list of 14,500 qualified coffee enthusiasts.',
    liveUrl: 'https://nordic-demo.example.com',
    githubUrl: '',
    featured: true,
  },
  {
    slug: 'solaris-wellness',
    title: 'Solaris Search & PMax Overhaul',
    category: 'Performance',
    year: 2023,
    role: 'Search Engine Marketing Lead',
    tools: ['Google Ads', 'Performance Max', 'Google Tag Manager', 'Looker Studio'],
    summary: 'Rebuilt Google Ads architecture from scratch, driving a 210% increase in high-intent purchase conversions.',
    coverBg: '#E8B93A',
    metrics: [
      { label: 'Conversion Rate', value: '4.8%' },
      { label: 'Ad Spend ROAS', value: '380%' },
      { label: 'CPA Improvement', value: '-32%' },
    ],
    overview:
      'Solaris Wellness offers premium adaptogenic supplements. Their Google Ads account suffered from poor feed optimization and cannibalization between standard shopping and broad search campaigns.',
    problem:
      'Automated smart campaigns were burning budget on brand name searches without capturing high-value category discovery queries.',
    process:
      'Restructured into tiered Performance Max asset groups segmented by customer intent, coupled with negative keyword brand exclusions and custom intent audience signals.',
    solution:
      'Optimized product feeds with enriched search keywords, designed high-CTR display asset banners, and deployed value-based smart bidding anchored to net profit margins.',
    results:
      'Increased non-brand revenue by 210%, expanded conversion rate to 4.8%, and sustained an average ROAS of 380% throughout the entire fiscal year.',
    liveUrl: 'https://solaris-demo.example.com',
    githubUrl: '',
    featured: false,
  },
  {
    slug: 'echo-audio',
    title: 'Echo Community & Creator Seeding',
    category: 'Content',
    year: 2025,
    role: 'Influencer & Social Lead',
    tools: ['Creator Management', 'TikTok Shop', 'Affiliate Tracking', 'Notion'],
    summary: 'Coordinated a 35-creator organic review campaign driving 5.8x blended return and sold-out inventory.',
    coverBg: '#24231f',
    metrics: [
      { label: 'Blended Return', value: '5.8x' },
      { label: 'Creators Activated', value: '35' },
      { label: 'Engagement Rate', value: '7.4%' },
    ],
    overview:
      'Echo Audio launched audiophile-grade wireless planar headphones. They needed authentic third-party endorsements and credible audio tech community reviews.',
    problem:
      'Celebrity endorsements felt unnatural and overpriced, while cold ad creative couldn’t convey the acoustic nuances of high-end hardware.',
    process:
      'Identified and vetted 35 niche music producers, audio engineers, and tech reviewers with authentic followings, sending personalized review kits with zero restrictive script requirements.',
    solution:
      'Amplified top-performing organic creator videos via Spark Ads and Whitelisting, transforming natural reviews into high-converting conversion ads.',
    results:
      'Achieved a 5.8x blended ROAS, generated 7.4% average engagement across community posts, and sold out the initial 2,500-unit production run within four weeks.',
    liveUrl: 'https://echo-demo.example.com',
    githubUrl: '',
    featured: false,
  },
]

export default projects

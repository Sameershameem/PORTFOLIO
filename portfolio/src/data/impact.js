// Sameer's own reported results. Values are strings so they display exactly as given;
// CountUp animates the numeric part and keeps any prefix/suffix (e.g. "-", "CR", "K+", "X").

// Live experience counter starts here (6 January 2024, local time).
export const careerStart = new Date(2024, 0, 6)

export const campaignImpact = {
  headline: { label: 'Total ad spend managed', value: '6.2CR' },
  stats: [
    { label: 'Average ROAS', value: '4.2X' },
    { label: 'Conversions', value: '18.2K+' },
    { label: 'Cost per lead', value: '-42%' },
    { label: 'Revenue driven', value: '63CR' },
    { label: 'Campaigns scaled', value: '120+' },
  ],
  tags: ['Meta & Google performance channels', 'Weekly budget pacing & bid strategy', 'Creative testing at scale'],
}

// icon: key into the icon map in ImpactSection.
export const proofCards = [
  {
    group: 'Performance',
    tag: 'Social',
    icon: 'meta',
    title: 'Meta Ads',
    description: 'Facebook and Instagram campaigns built for reach, targeting, and ROAS.',
    stats: [{ label: 'Highest reach', value: '3.3M' }, { label: 'Impressions', value: '4.5M' }],
  },
  {
    group: 'Performance',
    tag: 'Search & Display',
    icon: 'google',
    title: 'Google Ads',
    description: 'Search, display, and performance campaigns that capture high-intent demand.',
    stats: [{ label: 'Click-through rate', value: '4.8%' }, { label: 'Conversions', value: '12.4K+' }],
  },
  {
    group: 'Performance',
    tag: 'Optimization',
    icon: 'growth',
    title: 'Performance Marketing',
    description: 'Funnel testing, budget allocation, and conversion-focused growth loops.',
    stats: [{ label: 'Avg. ROAS', value: '5.2X' }, { label: 'Cost per lead', value: '-38%' }],
  },
  {
    group: 'Copywriting',
    tag: 'Brand',
    icon: 'voice',
    title: 'Brand Voice',
    description: 'Tone guides and messaging frameworks that make every touchpoint sound like you.',
    stats: [{ label: 'Voice guides', value: '15+' }, { label: 'Brand consistency', value: '96%' }],
  },
  {
    group: 'Copywriting',
    tag: 'Paid media',
    icon: 'adcopy',
    title: 'Ad Copy',
    description: 'Headlines and primary text crafted for clicks, leads, and lower cost per result.',
    stats: [{ label: 'Ad variations', value: '300+' }, { label: 'CTR lift', value: '+64%' }],
  },
  {
    group: 'Copywriting',
    tag: 'Social',
    icon: 'instagram',
    title: 'Social Captions',
    description: 'Hooks, CTAs, and carousel copy tuned for saves, shares, and comments.',
    stats: [{ label: 'Captions written', value: '800+' }, { label: 'Avg. save rate', value: '2.1X' }],
  },
]

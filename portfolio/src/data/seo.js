// Single source for page titles/descriptions. Used by the <SEO> component at runtime
// and by vite.config.js to pre-render per-route <head> tags for crawlers and link previews.
export const defaultTitle = 'Sameer Shameem — Marketing, Content & Digital Experiences'

export const defaultDescription =
  'Sameer Shameem is a marketing specialist, content creator, performance marketer, copywriter, and emerging vibe coder. He blends strategy, storytelling, and AI-assisted development to turn ideas into digital experiences.'

export const pageMeta = {
  '/': { title: defaultTitle, description: defaultDescription },
  '/work': {
    title: 'Work & Case Studies',
    description: 'Selected work and case studies by Sameer Shameem. Project details will be added when ready to share.',
  },
  '/services': {
    title: 'Services & Process',
    description: 'Marketing strategy, content creation, performance marketing, copywriting, and vibe coding by Sameer Shameem.',
  },
  '/about': {
    title: 'About Sameer',
    description: 'Meet Sameer Shameem: marketing specialist, content creator, performance marketer, copywriter, and emerging vibe coder.',
  },
  '/blog': {
    title: 'Journal & Playbooks',
    description: 'Notes on high-converting creative frameworks, contribution margin economics, and scaling consumer brands by Sameer Shameem.',
  },
  '/contact': {
    title: 'Contact Sameer',
    description: 'Get in touch with Sameer Shameem for performance marketing, creative strategy, or media buying advisory.',
  },
}

export function formatTitle(title) {
  if (!title) return defaultTitle
  return title.startsWith('Sameer Shameem') ? title : `${title} | Sameer Shameem`
}

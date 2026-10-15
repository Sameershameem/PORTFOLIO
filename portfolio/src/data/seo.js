// Single source for page titles/descriptions. Used by the <SEO> component at runtime
// and by vite.config.js to pre-render per-route <head> tags for crawlers and link previews.
export const defaultTitle = 'Sameer Shameem — Performance Marketing & Digital Marketing Executive'

export const defaultDescription =
  'Sameer Shameem is a performance marketing and digital marketing executive in Aligarh, India — Meta Ads, Google Search Ads, content strategy and short-form video that turn attention into results.'

export const pageMeta = {
  '/': { title: defaultTitle, description: defaultDescription },
  '/work': {
    title: 'Performance Marketing Case Studies',
    description: 'Case studies by Sameer Shameem: organic growth from 500 to 429K views, a 920% engagement lift and Meta & Google performance marketing for 103 clients.',
  },
  '/services': {
    title: 'Performance Marketing & Content Services',
    description: 'Performance marketing, Meta Ads, Google Search Ads, content strategy, copywriting and short-form video services by Sameer Shameem.',
  },
  '/about': {
    title: 'About Sameer Shameem',
    description: 'Sameer Shameem — digital and performance marketing executive in Aligarh, India. 103 clients, 500 → 429K organic views and a 920% engagement lift.',
  },
  '/contact': {
    title: 'Contact Sameer Shameem',
    description: 'Hire Sameer Shameem for performance marketing, Meta & Google Ads, content strategy or UGC. Email sameershameem86@gmail.com or call +91 86309 41563.',
  },
}

export function formatTitle(title) {
  if (!title) return defaultTitle
  return title.startsWith('Sameer Shameem') ? title : `${title} | Sameer Shameem`
}

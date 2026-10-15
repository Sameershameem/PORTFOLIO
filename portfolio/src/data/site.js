// Public origin of the deployed site (no trailing slash). Set VITE_SITE_URL in .env.
export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://sameer-portfolio.example.com').replace(/\/$/, '')

export const siteName = 'Sameer Shameem'

export const defaultOgImage = '/og-image.png'

import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description = 'Sameer Shameem — Performance Marketer, Content Creator, and Growth Strategist. Scaling brands through high-converting paid media and creative narrative.',
  canonical,
}) {
  const fullTitle = title
    ? `${title} | Sameer Shameem — mnmlst.`
    : 'Sameer Shameem — Performance Marketer & Content Creator'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

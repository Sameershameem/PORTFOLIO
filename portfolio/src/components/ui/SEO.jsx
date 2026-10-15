import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { defaultOgImage, siteName, siteUrl } from '../../data/site.js'
import { defaultDescription, formatTitle } from '../../data/seo.js'

export default function SEO({
  title,
  description = defaultDescription,
  canonical,
  image = defaultOgImage,
  type = 'website',
  noindex = false,
  structuredData,
}) {
  const { pathname } = useLocation()
  const fullTitle = formatTitle(title)
  const url = canonical ?? `${siteUrl}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteName} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}

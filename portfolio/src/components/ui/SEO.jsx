import { Helmet } from 'react-helmet-async'

export default function SEO({
  title,
  description = 'Sameer Shameem — marketing specialist, content creator, performance marketer, copywriter, and emerging vibe coder.',
  canonical,
  structuredData,
}) {
  const fullTitle = title
    ? title.startsWith('Sameer Shameem') ? title : `${title} | Sameer Shameem`
    : 'Sameer Shameem — Marketing, Content & Digital Experiences'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Sameer Shameem" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Sameer Shameem" />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  )
}

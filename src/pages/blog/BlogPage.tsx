import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { blogBreadcrumb } from '@/lib/jsonld'
import { hotel } from '@/data/hotel'

export function BlogPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const isRo = locale === 'ro'

  const articles = [
    {
      slug: 'ce-pot-vizita-in-alba-iulia-in-24-de-ore',
      title: t('blog.albaIulia24h.headline'),
      excerpt: t('blog.albaIulia24h.metaDescription'),
      date: '7 Iunie 2026',
      image: `${import.meta.env.VITE_R2_PUBLIC_URL || hotel.url.base}/astro.webp`,
    },
  ]

  return (
    <Layout>
      <Helmet>
        <title>{t('blog.metaTitle')}</title>
        <meta name="description" content={t('blog.metaDescription')} />
        <link rel="canonical" href={`${hotel.url.base}/blog`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              blogBreadcrumb(locale),
              {
                '@type': 'CollectionPage',
                mainEntity: {
                  '@type': 'ItemList',
                  itemListElement: articles.map((a, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    url: `${hotel.url.base}/blog/${a.slug}`,
                  })),
                },
              },
            ],
          })}
        </script>
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            {t('blog.eyebrow')}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            {t('blog.title')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto space-y-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="block group"
              >
                <article className="border border-border rounded-lg p-6 hover:border-accent/30 transition-colors">
                  <time className="text-xs text-text-muted">{article.date}</time>
                  <h2 className="font-display text-xl mt-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-text-muted mt-2 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="inline-block mt-3 text-xs font-semibold tracking-wider uppercase text-accent">
                    {isRo ? 'Citește mai mult' : 'Read more'} →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

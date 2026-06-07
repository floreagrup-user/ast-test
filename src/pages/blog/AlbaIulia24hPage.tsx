import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { buildArticle, blogArticleBreadcrumb } from '@/lib/jsonld'
import { hotel } from '@/data/hotel'
import { images } from '@/data/images'

const IMG_BASE = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev'

export function AlbaIulia24hPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const articleUrl = `${hotel.url.base}/blog/ce-pot-vizita-in-alba-iulia-in-24-de-ore`

  return (
    <Layout>
      <Helmet>
        <title>{t('blog.albaIulia24h.metaTitle')}</title>
        <meta name="description" content={t('blog.albaIulia24h.metaDescription')} />
        <link rel="canonical" href={articleUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              blogArticleBreadcrumb(locale),
              buildArticle({
                headline: t('blog.albaIulia24h.headline'),
                description: t('blog.albaIulia24h.metaDescription'),
                image: `${IMG_BASE}/hero-panoramic.webp`,
                datePublished: '2026-06-07',
                dateModified: '2026-06-07',
                url: articleUrl,
              }),
            ],
          })}
        </script>
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            {t('blog.albaIulia24h.eyebrow')}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            {t('blog.albaIulia24h.headline')}
          </h1>
        </div>
      </section>

      <article className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-lg text-text-muted leading-relaxed">
              {t('blog.albaIulia24h.intro')}
            </p>

            <h2>{t('blog.albaIulia24h.morning.title')}</h2>
            <p>{t('blog.albaIulia24h.morning.text1')}</p>
            <p>{t('blog.albaIulia24h.morning.text2')}</p>

            <h3>{t('blog.albaIulia24h.morning.objectivesTitle')}</h3>
            <ul>
              <li><strong>{t('blog.albaIulia24h.morning.objectives.0.name')}</strong> — {t('blog.albaIulia24h.morning.objectives.0.desc')}</li>
              <li><strong>{t('blog.albaIulia24h.morning.objectives.1.name')}</strong> — {t('blog.albaIulia24h.morning.objectives.1.desc')}</li>
              <li><strong>{t('blog.albaIulia24h.morning.objectives.2.name')}</strong> — {t('blog.albaIulia24h.morning.objectives.2.desc')}</li>
            </ul>

            <p><em>{t('blog.albaIulia24h.morning.guardChange')}</em></p>

            <h2>{t('blog.albaIulia24h.lunch.title')}</h2>
            <p>{t('blog.albaIulia24h.lunch.text')}</p>
            <ul>
              <li><strong>{t('blog.albaIulia24h.lunch.venues.0.name')}</strong> — {t('blog.albaIulia24h.lunch.venues.0.desc')}</li>
              <li><strong>{t('blog.albaIulia24h.lunch.venues.1.name')}</strong> — {t('blog.albaIulia24h.lunch.venues.1.desc')}</li>
            </ul>

            <h2>{t('blog.albaIulia24h.afternoon.title')}</h2>
            <p>{t('blog.albaIulia24h.afternoon.text')}</p>
            <ul>
              <li><strong>{t('blog.albaIulia24h.afternoon.venues.0.name')}</strong> — {t('blog.albaIulia24h.afternoon.venues.0.desc')}</li>
            </ul>

            <h2>{t('blog.albaIulia24h.evening.title')}</h2>
            <p>{t('blog.albaIulia24h.evening.text1')}</p>
            <p>{t('blog.albaIulia24h.evening.text2')}</p>

            <h2>{t('blog.albaIulia24h.conclusion.title')}</h2>
            <p>{t('blog.albaIulia24h.conclusion.text')}</p>

            <hr />

            <h3>{t('blog.albaIulia24h.references.title')}</h3>
            <ol>
              {(
                t('blog.albaIulia24h.references.items', { returnObjects: true }) as string[]
              ).map((ref, i) => (
                <li key={i}>{ref}</li>
              ))}
            </ol>
          </div>
        </div>
      </article>
    </Layout>
  )
}

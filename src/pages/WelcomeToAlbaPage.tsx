import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

export function WelcomeToAlbaPage() {
  const { t } = useTranslation()
  const attractions = t('welcomeToAlba.attractions.items', { returnObjects: true }) as string[]

  return (
    <Layout>
      <Helmet>
        <title>{t('welcomeToAlba.metaTitle')}</title>
        <meta name="description" content={t('welcomeToAlba.metaDescription')} />
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            {t('welcomeToAlba.heroEyebrow')}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            {t('welcomeToAlba.heroTitle')} <em className="not-italic italic text-accent-light">{t('welcomeToAlba.heroTitleItalic')}</em>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              {t('welcomeToAlba.intro')}
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl font-normal mb-4">{t('welcomeToAlba.fortress.title')}</h2>
                <p className="text-text-muted leading-relaxed">{t('welcomeToAlba.fortress.text')}</p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">{t('welcomeToAlba.attractions.title')}</h2>
                <ul className="space-y-3">
                  {attractions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">{t('welcomeToAlba.restaurants.title')}</h2>
                <p className="text-text-muted leading-relaxed">{t('welcomeToAlba.restaurants.text')}</p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">{t('welcomeToAlba.howToGet.title')}</h2>
                <p className="text-text-muted leading-relaxed">{t('welcomeToAlba.howToGet.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

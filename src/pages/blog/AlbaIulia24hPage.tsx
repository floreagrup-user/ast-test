import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, Sun, SunDim, Moon, MapPin, ExternalLink, Shield, Navigation } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { buildArticle, blogArticleBreadcrumb } from '@/lib/jsonld'
import { hotel } from '@/data/hotel'
import { useAnalytics } from '@/hooks/useAnalytics'

const IMG_BASE = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-80px' },
  transition: { staggerChildren: 0.15 },
}

function TimelineSection({ icon: Icon, title, time, children, accent }: {
  icon: typeof Sun
  title: string
  time?: string
  children: React.ReactNode
  accent: string
}) {
  return (
    <motion.div {...fadeIn} className="relative pl-10 md:pl-12 group">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border group-last:bg-gradient-to-b group-last:from-border group-last:to-transparent" />
      <div className={`absolute left-[-10px] md:left-[-8px] top-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center`} style={{ backgroundColor: accent }}>
        <Icon className="w-2.5 h-2.5 text-white" />
      </div>
      <div className="mb-1 flex items-center gap-2">
        {time && (
          <span className="text-xs font-mono tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}18`, color: accent }}>
            {time}
          </span>
        )}
      </div>
      <h2 className="font-display text-xl md:text-2xl font-normal mb-3">{title}</h2>
      <div className="space-y-3 text-text-muted leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}

function InfoCard({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div
      className="rounded-xl border p-4 md:p-5 my-4"
      style={{
        borderColor: accent ? `${accent}30` : 'var(--color-border)',
        backgroundColor: accent ? `${accent}08` : 'var(--color-bg-secondary)',
      }}
    >
      {children}
    </div>
  )
}

interface RefItem {
  text: string
  url: string
}

export function AlbaIulia24hPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const articleUrl = `${hotel.url.base}/blog/ce-pot-vizita-in-alba-iulia-in-24-de-ore`

  const references = t('blog.albaIulia24h.references.items', { returnObjects: true }) as RefItem[]
  const objectives = t('blog.albaIulia24h.morning.objectives', { returnObjects: true }) as { name: string; desc: string }[]
  const lunchVenues = t('blog.albaIulia24h.lunch.venues', { returnObjects: true }) as { name: string; desc: string }[]
  const afternoonVenues = t('blog.albaIulia24h.afternoon.venues', { returnObjects: true }) as { name: string; desc: string }[]
  const { trackOutboundLink } = useAnalytics()

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

      <section className="relative min-h-[50vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/95" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative container-xl z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-accent-light text-xs font-semibold tracking-wider uppercase mb-5">
              <Navigation className="w-3 h-3" />
              {t('blog.albaIulia24h.eyebrow')}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight max-w-3xl leading-[1.15]">
              {t('blog.albaIulia24h.headline')}
            </h1>
            <p className="mt-4 text-white/60 max-w-xl text-sm flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              7 Iunie 2026 · ~8 min citire
            </p>
          </motion.div>
        </div>
      </section>

      <article className="py-16 md:py-20">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <motion.p
              {...fadeIn}
              className="text-lg md:text-xl text-text-muted leading-relaxed mb-16 font-light"
            >
              {t('blog.albaIulia24h.intro')}
            </motion.p>

            <div className="space-y-16">
              <TimelineSection icon={Sun} title={t('blog.albaIulia24h.morning.title')} time="09:00 – 12:00" accent="#F5A623">
                <p>{t('blog.albaIulia24h.morning.text1')}</p>
                <p className="font-medium text-foreground">{t('blog.albaIulia24h.morning.text2')}</p>
                <div className="space-y-3 mt-2">
                  {objectives.map((obj, i) => (
                    <InfoCard key={i} accent="#F5A623">
                      <h3 className="font-semibold text-foreground text-sm mb-1">{obj.name}</h3>
                      <p className="text-sm">{obj.desc}</p>
                    </InfoCard>
                  ))}
                </div>
                <div className="flex items-start gap-3 mt-4 p-4 rounded-xl border border-accent/20 bg-accent/[0.06]">
                  <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-text-muted italic">
                    {t('blog.albaIulia24h.morning.guardChange')}
                  </p>
                </div>
              </TimelineSection>

              <TimelineSection icon={SunDim} title={t('blog.albaIulia24h.lunch.title')} time="12:00 – 14:00" accent="#4ABFA0">
                <p>{t('blog.albaIulia24h.lunch.text')}</p>
                <div className="grid gap-3 mt-2">
                  {lunchVenues.map((v, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{v.name}</h3>
                        <p className="text-sm text-text-muted mt-0.5">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TimelineSection>

              <TimelineSection icon={SunDim} title={t('blog.albaIulia24h.afternoon.title')} time="14:00 – 17:00" accent="#78C8E8">
                <p>{t('blog.albaIulia24h.afternoon.text')}</p>
                <div className="grid gap-3 mt-2">
                  {afternoonVenues.map((v, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-accent/20 transition-colors">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{v.name}</h3>
                        <p className="text-sm text-text-muted mt-0.5">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TimelineSection>

              <TimelineSection icon={Moon} title={t('blog.albaIulia24h.evening.title')} time="17:00 +" accent="#8B5CF6">
                <p>{t('blog.albaIulia24h.evening.text1')}</p>
                <p>{t('blog.albaIulia24h.evening.text2')}</p>
                <div className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-accent/[0.06] border border-accent/20">
                  <img
                    src={`${IMG_BASE}/hero-panoramic.webp`}
                    alt="Hotel Astoria"
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Hotel Astoria Alba Iulia</p>
                    <p className="text-xs text-text-muted mt-0.5">{hotel.address.street}, {hotel.address.city}</p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-light transition-colors mt-1"
                    >
                      {locale === 'ro' ? 'Vezi locația' : 'View location'} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </TimelineSection>
            </div>

            <motion.div {...fadeIn} className="mt-20 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-accent/[0.06] to-accent/[0.02] border border-accent/20">
              <h2 className="font-display text-xl md:text-2xl font-normal mb-3">
                {t('blog.albaIulia24h.conclusion.title')}
              </h2>
              <p className="text-text-muted leading-relaxed">
                {t('blog.albaIulia24h.conclusion.text')}
              </p>
              <a
                href={`/${locale === 'en' ? 'en/' : ''}camere`}
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-accent hover:text-accent-light transition-colors"
              >
                {locale === 'ro' ? 'Vezi camerele și rezervă' : 'See rooms and book'} →
              </a>
            </motion.div>

            <motion.div {...fadeIn} className="mt-12">
              <hr className="border-border mb-8" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                {t('blog.albaIulia24h.references.title')}
              </h3>
              <ol className="space-y-2">
                {references.map((ref, i) => (
                  <li key={i}>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackOutboundLink(ref.url)}
                      className="inline-flex items-start gap-2 text-sm group text-accent hover:text-accent-light transition-colors"
                    >
                      <span className="text-xs text-accent/70 mt-0.5 shrink-0 w-5 text-right font-mono">[{i + 1}]</span>
                      <span className="underline underline-offset-2 decoration-accent/40 hover:decoration-accent">
                        {ref.text}
                      </span>
                      <ExternalLink className="w-3 h-3 shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

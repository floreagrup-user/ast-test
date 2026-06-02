import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Waves, Sun, GlassWater } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const statIcons = [Waves, Sun, Droplets, GlassWater]

export function PoolBlock() {
  const { t } = useTranslation()

  const stats = [
    { icon: Waves, value: '336 mp', label: t('poolBlock.stats.pool') },
    { icon: Sun, value: '4', label: t('poolBlock.stats.slides') },
    { icon: Droplets, value: t('poolBlock.stats.heated'), label: t('poolBlock.stats.water') },
    { icon: GlassWater, value: 'Water', label: t('poolBlock.stats.bar') },
  ]

  return (
    <section className="py-20 md:py-28 bg-surface" aria-labelledby="pool-title">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-23.webp"
                alt={t('poolBlock.altImage')}
                className="w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              {t('poolBlock.eyebrow')}
            </span>
            <p className="text-sm italic text-text-muted mb-2">{t('poolBlock.tagline')}</p>
            <h2
              id="pool-title"
              className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-6"
            >
              {t('poolBlock.title1')}{' '}
              <em className="not-italic italic text-accent">{t('poolBlock.titleItalic')}</em>
            </h2>
            <p className="text-base text-text-muted leading-relaxed max-w-xl mb-8">
              {t('poolBlock.description')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = statIcons[i]
                return (
                  <div key={i} className="text-center p-3 bg-bg rounded-sm border border-border">
                    <Icon className="w-5 h-5 text-accent mx-auto mb-1.5" />
                    <div className="text-lg font-semibold text-primary">{stat.value}</div>
                    <div className="text-xs text-text-muted">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            <Link
              to="/pool-park"
              className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
            >
              {t('poolBlock.cta')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

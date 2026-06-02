import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

export function RestaurantBlock() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28" aria-labelledby="restaurant-title">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-3 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              {t('restaurantBlock.eyebrow')}
            </span>
            <h2
              id="restaurant-title"
              className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-6"
            >
              {t('restaurantBlock.title1')}{' '}
              <em className="not-italic italic text-accent">{t('restaurantBlock.titleItalic')}</em>
            </h2>
            <p className="text-base text-text-muted leading-relaxed max-w-xl mb-8">
              {t('restaurantBlock.description')}
            </p>
            <Link
              to="/restaurant"
              className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
            >
              {t('restaurantBlock.cta')}
            </Link>
          </motion.div>

          <motion.div
            className="lg:col-span-2 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[3/4] rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-3.webp"
                alt={t('restaurantBlock.altImage')}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function FinalCTA() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" aria-label="Call to action">
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative container-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6">
            {t('finalCta.title1')}{' '}
            <em className="not-italic italic text-accent-light">{t('finalCta.titleItalic')}</em>
            {t('finalCta.titleEnd')}
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto mb-8">
            {t('finalCta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-accent text-primary font-medium px-10 py-4 rounded-sm hover:bg-accent-light transition-all duration-300 text-lg"
          >
            {t('finalCta.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

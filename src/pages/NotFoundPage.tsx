import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Helmet>
        <title>{t('notFound.metaTitle')}</title>
        <meta name="description" content={t('notFound.metaDescription')} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="font-display text-[clamp(8rem,18vw,14rem)] leading-none text-accent/20 select-none">
              404
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-normal tracking-tight -mt-6 mb-4">
              {t('notFound.title')}
            </h1>
            <p className="text-text-muted leading-relaxed mb-10">
              {t('notFound.subtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-sm hover:bg-primary-light transition-all duration-300"
              >
                <Home className="w-4 h-4" />
                {t('notFound.home')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-border text-text font-medium px-6 py-3 rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                {t('notFound.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}

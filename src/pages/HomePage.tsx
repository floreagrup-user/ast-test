import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/home/Hero'
import { BookingWidget } from '@/components/home/BookingWidget'
import { Benefits } from '@/components/home/Benefits'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { RestaurantBlock } from '@/components/home/RestaurantBlock'
import { PoolBlock } from '@/components/home/PoolBlock'
import { Testimonials } from '@/components/home/Testimonials'
import { GalleryGrid } from '@/components/home/GalleryGrid'
import { FinalCTA } from '@/components/home/FinalCTA'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Helmet>
        <title>{t('homePage.metaTitle')}</title>
        <meta name="description" content={t('homePage.metaDescription')} />
        <meta property="og:title" content={t('homePage.metaTitle')} />
        <meta property="og:description" content={t('homePage.metaDescription')} />
        <meta property="og:image" content="https://astoriahotels.ro/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg" />
        <meta property="og:url" content="https://astoriahotels.ro/" />
      </Helmet>

      <Hero />
      <BookingWidget />
      <Benefits />
      <RoomsPreview />
      <RestaurantBlock />
      <PoolBlock />
      <Testimonials />
      <GalleryGrid />
      <FinalCTA />
    </Layout>
  )
}

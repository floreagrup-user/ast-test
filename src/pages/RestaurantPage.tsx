import { useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Phone, Star, Utensils, Coffee, PartyPopper, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { images } from '@/data/images'
import { restaurantTestimonials } from '@/data/testimonials'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { SectionTitle } from '@/components/shared/SectionTitle'

const MENU_PDF_URL = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/Meniu_Restaurant_Astoria_2026.pdf'

const experienceIcons = [Utensils, Coffee, PartyPopper]

const restaurantGalleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-2.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-6.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-2.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-3.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-4.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-6.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-8.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-14.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-12.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-19.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-24.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-17.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-26.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-25.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-20.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-31.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-29.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-33.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food.webp', alt: 'Restaurant Astoria' },
]

export function RestaurantPage() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const experiences = t('restaurant.experiences', { returnObjects: true }) as { title: string; description: string }[]

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const goNext = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % restaurantGalleryImages.length : null)), [])
  const goPrev = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + restaurantGalleryImages.length) % restaurantGalleryImages.length : null)), [])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, goNext, goPrev, closeLightbox])

  return (
    <Layout>
      <Helmet>
        <title>{t('restaurant.metaTitle')}</title>
        <meta name="description" content={t('restaurant.metaDescription')} />
        <meta property="og:title" content={t('restaurant.metaTitle')} />
        <meta property="og:description" content={t('restaurant.metaDescription')} />
        <meta property="og:image" content={`https://astoriahotels.ro${images.restaurant.main}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Restaurant Astoria",
            "description": t('restaurant.metaDescription'),
            "url": "https://astoriahotels.ro/restaurant",
            "telephone": "+40 731 190 948",
            "servesCuisine": "International",
            "openingHours": "Mo-Su 07:00-22:00",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "DN 1, km 387",
              "addressLocality": "Alba Iulia",
              "addressRegion": "Alba",
              "addressCountry": "RO"
            },
            "image": `https://astoriahotels.ro${images.restaurant.main}`,
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-5.webp"
            alt={t('restaurant.altHero')}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            {t('restaurant.heroEyebrow')}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            {t('restaurant.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-text-muted leading-relaxed">
              {t('restaurant.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {experiences.map((exp, i) => {
              const Icon = experienceIcons[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface rounded-sm border border-border p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-sm bg-primary/5 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-normal mb-3">{exp.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{exp.description}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-center mb-12">
              {t('restaurant.galleryTitle1')} <em className="not-italic italic text-accent">{t('restaurant.galleryTitleItalic')}</em>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {restaurantGalleryImages.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden rounded-sm cursor-pointer group aspect-square"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  aria-label={`${t('common.openImage')}: ${img.alt}`}
                >
                  <ImageWithFallback src={img.src} alt={img.alt} className="w-full h-full group-hover:scale-105 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                onClick={closeLightbox}
                role="dialog"
                aria-modal="true"
                aria-label={t('common.lightboxLabel')}
              >
                <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label={t('common.close')}>
                  <X className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); goPrev() }} className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label={t('common.prevImage')}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); goNext() }} className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label={t('common.nextImage')}>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <motion.img
                  key={lightboxIndex}
                  src={restaurantGalleryImages[lightboxIndex].src}
                  alt={restaurantGalleryImages[lightboxIndex].alt}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-primary text-white rounded-sm p-6 md:p-10 text-center mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">{t('restaurant.schedule')}</p>
                  <p className="font-semibold">{t('restaurant.scheduleValue')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">{t('restaurant.reservations')}</p>
                  <a href="tel:+40731190948" className="font-semibold hover:text-accent transition-colors">
                    0731 190 948
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <a
                href={MENU_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-sm hover:bg-accent-light transition-all duration-300"
              >
                {t('restaurant.menuCta')}
              </a>
            </div>
          </div>

          <SectionTitle
            eyebrow={t('restaurant.reviewsEyebrow')}
            title={t('restaurant.reviewsTitle')}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantTestimonials.map((t_item) => (
              <div key={t_item.id} className="bg-surface rounded-sm border border-border p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t_item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-sm text-text leading-relaxed italic mb-4">
                  "{t_item.text}"
                </blockquote>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold">{t_item.name}</p>
                  <p className="text-xs text-text-muted">{t_item.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface border-t border-border text-center">
        <div className="container-xl">
          <h2 className="font-display text-3xl font-normal mb-4">{t('restaurant.ctaTitle')}</h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            {t('restaurant.ctaSubtitle')}
          </p>
          <Link
            to="/contact?subiect=rezervare-restaurant"
            className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
          >
            {t('restaurant.ctaButton')}
          </Link>
        </div>
      </section>
    </Layout>
  )
}

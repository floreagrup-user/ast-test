import { useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Waves, Droplets, Sun, GlassWater, Umbrella, ShowerHead, Wifi, Volleyball, Trophy, Table2, Music, Sparkles, Timer, Trees, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { hotel } from '@/data/hotel'

const facilityIcons = [Waves, Droplets, Droplets, Sun, Umbrella, ShowerHead, Wifi, Volleyball, Trophy, Table2, GlassWater, GlassWater, Umbrella, Trees, Music]

const poolGalleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-2.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-3.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-4.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-5.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-6.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-7.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-8.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-9.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-10.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-11.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-12.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-13.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-14.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-15.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-16.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-17.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-18.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-19.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-20.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-22.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-23.webp', alt: 'Astoria Pool Park' },
]

export function PoolParkPage() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const facilities = (t('poolPark.facilities', { returnObjects: true }) as string[]).map((label, i) => ({
    icon: facilityIcons[i],
    label,
  }))

  const stats = t('poolPark.stats', { returnObjects: true }) as { value: string; unit: string; label: string }[]

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % poolGalleryImages.length : null))
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + poolGalleryImages.length) % poolGalleryImages.length : null))
  }, [])

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
        <title>{t('poolPark.metaTitle')}</title>
        <meta name="description" content={t('poolPark.metaDescription')} />
        <meta property="og:title" content={t('poolPark.metaTitle')} />
        <meta property="og:description" content={t('poolPark.metaDescription')} />
        <meta property="og:image" content="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp" />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[450px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp"
            className="w-full h-full object-cover"
          >
            <source src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/video/Astoria.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent-light bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t('poolBlock.eyebrow')}
            </span>
            <p className="text-lg md:text-xl italic text-white/80 mb-2 font-light">
              {t('poolPark.tagline')}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-normal text-white tracking-tight leading-tight">
              {t('poolPark.heroTitle1')} <em className="not-italic italic text-accent-light">{t('poolPark.heroTitleItalic')}</em>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact?subiect=pool-park"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
              >
                {t('poolParkPage.reserveNow')}
              </Link>
              <a
                href={hotel.contact.phone.tel}
                className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {hotel.contact.phone.national}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 bg-primary text-white -mt-1">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="font-display text-3xl md:text-4xl text-accent">{s.value}</span>
                  {s.unit && <span className="text-sm text-accent/80 font-semibold uppercase">{s.unit}</span>}
                </div>
                <p className="text-xs text-white/60 uppercase tracking-wider mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Coming Soon */}
      <section className="py-20 md:py-28">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                {t('poolParkPage.aboutEyebrow')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mb-6">
                {t('poolParkPage.aboutTitle1')} <br />
                <em className="not-italic italic text-accent">{t('poolParkPage.aboutTitleItalic')}</em>
              </h2>
              <p className="text-base text-text-muted leading-relaxed mb-6">
                {t('poolParkPage.aboutDesc1')}
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                {t('poolParkPage.aboutDesc2')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 p-8 md:p-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Timer className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-3xl font-normal text-primary mb-3">
                {t('poolParkPage.comingSoonTitle')} <em className="not-italic italic text-accent">{t('poolParkPage.comingSoonTitleItalic')}</em>
              </h3>
              <p className="text-text-muted mb-6 max-w-sm mx-auto">
                {t('poolParkPage.comingSoonText')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="https://www.facebook.com/AstoriaHotelAlbaIulia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  {t('poolParkPage.followFacebook')}
                </a>
                <a href="https://www.instagram.com/astoriahotelalba" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  {t('poolParkPage.followInstagram')}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Facilities */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                {t('poolParkPage.facilitiesEyebrow')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight">
                {t('poolParkPage.facilitiesTitle')} <em className="not-italic italic text-accent">{t('poolParkPage.facilitiesTitleItalic')}</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {facilities.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group bg-surface rounded-xl border border-border p-5 text-center hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <f.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted font-medium leading-tight">{f.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                {t('poolParkPage.galleryEyebrow')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight">
                <em className="not-italic italic text-accent">Pool Park</em>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {poolGalleryImages.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden rounded-xl cursor-pointer group aspect-[4/3]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  aria-label={`${t('common.openImage')}: ${img.alt}`}
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Lightbox */}
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
                <button onClick={(e) => { e.stopPropagation(); goNext() }} className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white" aria-label={t('common.nextImage')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <motion.img
                  key={lightboxIndex}
                  src={poolGalleryImages[lightboxIndex].src}
                  alt={poolGalleryImages[lightboxIndex].alt}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Events */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-white mb-4">
              {t('poolParkPage.eventsTitle')}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              {t('poolParkPage.eventsText')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/pool-park/meniu" className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25">
                {t('poolParkPage.menuCta')}
              </Link>
              <Link to="/contact?subiect=pool-park" className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20">
                {t('poolParkPage.eventCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

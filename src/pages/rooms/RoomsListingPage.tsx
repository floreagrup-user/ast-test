import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Wifi, Wind, Droplets, Coffee, Phone, Tv, ShowerHead, Minus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { rooms } from '@/data/rooms'
import { Layout } from '@/components/layout/Layout'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi gratuit': Wifi,
  'Free Wi-Fi': Wifi,
  'Aer condiționat': Wind,
  'Air conditioning': Wind,
  'Acces Pool Park': Droplets,
  'Pool Park access': Droplets,
  'Mic dejun inclus': Coffee,
  'Breakfast included': Coffee,
  'Mic dejun disponibil': Coffee,
  'Breakfast available': Coffee,
  'Minibar': Minus,
  'TV LCD': Tv,
  'LCD TV': Tv,
  'Baie proprie cu duș': ShowerHead,
  'En-suite bathroom with shower': ShowerHead,
  'Telefon': Phone,
  'Telephone': Phone,
  'Uscător de păr': Wind,
  'Hair dryer': Wind,
  'Halate de baie': Droplets,
  'Bathrobes': Droplets,
  'Produse de toaletă premium': Droplets,
  'Premium toiletries': Droplets,
  'Produse de toaletă': Droplets,
  'Toiletries': Droplets,
  'Seif': Minus,
  'Safe': Minus,
  'Balcon privat': Wind,
  'Private balcony': Wind,
  'Vedere la grădină': Droplets,
  'Garden view': Droplets,
}

const hotelGalleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-26.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-27.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-18.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-11.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-4.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-9.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-29.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-28.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-22.webp', alt: 'Hotel Astoria' },
]

export function RoomsListingPage() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const goNext = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % hotelGalleryImages.length : null)), [])
  const goPrev = useCallback(() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + hotelGalleryImages.length) % hotelGalleryImages.length : null)), [])

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

  const roomTranslations = [
    {
      name: t('rooms.apartment.name'),
      shortDescription: t('rooms.apartment.shortDescription'),
      amenities: t('rooms.apartment.amenities', { returnObjects: true }) as string[],
    },
    {
      name: t('rooms.standard.name'),
      shortDescription: t('rooms.standard.shortDescription'),
      amenities: t('rooms.standard.amenities', { returnObjects: true }) as string[],
    },
    {
      name: t('rooms.standardBalcony.name'),
      shortDescription: t('rooms.standardBalcony.shortDescription'),
      amenities: t('rooms.standardBalcony.amenities', { returnObjects: true }) as string[],
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen">
        <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp"
              alt={t('rooms.heroTitle')}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="relative container-xl z-10">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
              {t('rooms.heroEyebrow')}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
              {t('rooms.heroTitle')}
            </h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rooms.map((room, index) => {
                const roomT = roomTranslations[index]
                return (
                  <motion.div
                    key={room.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative bg-surface rounded-sm overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
                  >
                    {room.popular && (
                      <div className="absolute top-4 left-4 z-10 bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-sm">
                        {t('common.mostPopular')}
                      </div>
                    )}
                    <div className="aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={room.images[0]}
                        alt={roomT.name}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-600"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: room.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                      <h3 className="font-display text-2xl font-normal mb-2">{roomT.name}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                        {roomT.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {roomT.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity]
                          return (
                            <span key={amenity} className="flex items-center gap-1.5 text-xs text-text-muted">
                              {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
                              {amenity}
                            </span>
                          )
                        })}
                      </div>
                      <Link
                        to={`/camere/${room.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors"
                      >
                        {t('common.discover')}
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-surface" aria-labelledby="hotel-gallery-title">
          <div className="container-xl">
            <h2 id="hotel-gallery-title" className="font-display text-3xl md:text-4xl font-normal tracking-tight text-center mb-12">
              Hotel <em className="not-italic italic text-accent">Astoria</em>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {hotelGalleryImages.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden rounded-sm cursor-pointer group aspect-square"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
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
                  src={hotelGalleryImages[lightboxIndex].src}
                  alt={hotelGalleryImages[lightboxIndex].alt}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="py-16 bg-primary text-white text-center">
          <div className="container-xl">
            <h2 className="font-display text-3xl md:text-4xl font-normal mb-4">
              {t('rooms.ctaTitle')}
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              {t('rooms.ctaSubtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3.5 rounded-sm hover:bg-accent-light transition-all duration-300"
            >
              {t('rooms.ctaButton')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

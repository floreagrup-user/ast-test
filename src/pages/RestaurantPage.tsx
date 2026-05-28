import { useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Phone, Star, Utensils, Coffee, PartyPopper, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { images } from '@/data/images'
import { restaurantTestimonials } from '@/data/testimonials'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { SectionTitle } from '@/components/shared/SectionTitle'

const experiences = [
  {
    icon: Utensils,
    title: 'Cină à la carte',
    description: 'Meniu variat din bucătăria internațională, preparat cu ingrediente proaspete și servit cu pasiune.',
  },
  {
    icon: Coffee,
    title: 'Mic dejun bufet',
    description: 'Începe ziua cu un bufet bogat: produse proaspete, preparate calde, fructe și cafea de specialitate.',
  },
  {
    icon: PartyPopper,
    title: 'Evenimente private',
    description: 'Spații versatile pentru aniversări, cine de gală sau întâlniri de afaceri — cu meniu personalizat.',
  },
]

const restaurantGalleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-2.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-6.webp', alt: 'Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-2.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-3.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-4.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-6.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-8.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-14.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-12.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-19.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-24.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-17.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-26.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-25.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-20.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-31.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-29.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-33.webp', alt: 'Preparate Restaurant Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food.webp', alt: 'Preparate Restaurant Astoria' },
]

export function RestaurantPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % restaurantGalleryImages.length : null))
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + restaurantGalleryImages.length) % restaurantGalleryImages.length : null))
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
        <title>Restaurant Astoria — Bucătărie Internațională în Alba Iulia</title>
        <meta name="description" content="Restaurant cu bucătărie internațională, preparate din ingrediente proaspete și atmosferă caldă cu vedere la grădina interioară. Program: 07:00 – 22:00." />
        <meta property="og:title" content="Restaurant Astoria — Alba Iulia" />
        <meta property="og:description" content="Bucătărie internațională, preparate proaspete și atmosferă caldă în Alba Iulia." />
        <meta property="og:image" content={`https://astoriahotels.ro${images.restaurant.main}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Restaurant Astoria",
            "description": "Restaurant cu bucătărie internațională în cadrul Hotel Astoria, Alba Iulia.",
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

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-5.webp"
            alt="Interior Restaurant Astoria"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Gastronomie
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Restaurantul Astoria
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-text-muted leading-relaxed">
              Bucătărie internațională, preparate din ingrediente proaspete și o echipă care își
              dorește să te facă să te simți ca acasă. Fie că alegi o cină romantică, un prânz de
              business sau o masă de duminică în familie, restaurantul Astoria îți oferă cadrul
              potrivit — cu vedere directă către grădina interioară și iazul cu pești.
            </p>
          </div>

          {/* Experiences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface rounded-sm border border-border p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-sm bg-primary/5 flex items-center justify-center mx-auto mb-5">
                  <exp.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-normal mb-3">{exp.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-center mb-12">
              Restaurant <em className="not-italic italic text-accent">Astoria</em>
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
                  aria-label={`Deschide imaginea: ${img.alt}`}
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
                aria-label="Galerie foto lightbox"
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  aria-label="Închide lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  aria-label="Imaginea anterioară"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                  aria-label="Imaginea următoare"
                >
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

          {/* Info */}
          <div className="bg-primary text-white rounded-sm p-6 md:p-10 text-center mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">Program</p>
                  <p className="font-semibold">Luni – Duminică, 07:00 – 22:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">Rezervări</p>
                  <a href="tel:+40731190948" className="font-semibold hover:text-accent transition-colors">
                    0731 190 948
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/restaurant/meniu"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-sm hover:bg-accent-light transition-all duration-300"
              >
                Vezi meniul complet
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <SectionTitle
            eyebrow="Recenzii"
            title="Ce spun oaspeții despre *restaurant*"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantTestimonials.map((t) => (
              <div key={t.id} className="bg-surface rounded-sm border border-border p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-sm text-text leading-relaxed italic mb-4">
                  "{t.text}"
                </blockquote>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-border text-center">
        <div className="container-xl">
          <h2 className="font-display text-3xl font-normal mb-4">Rezervă o masă</h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Sună-ne sau completează formularul de contact pentru o rezervare la restaurant.
          </p>
          <Link
            to="/contact?subiect=rezervare-restaurant"
            className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
          >
            Rezervă o masă
          </Link>
        </div>
      </section>
    </Layout>
  )
}

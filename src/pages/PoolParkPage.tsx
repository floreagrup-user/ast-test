import { useState, useCallback, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Waves, Droplets, Sun, GlassWater, Umbrella, ShowerHead, Wifi, Volleyball, Trophy, Table2, Music, Sparkles, Timer, Trees, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const facilities = [
  { icon: Waves, label: 'Piscină încălzită 336 mp' },
  { icon: Droplets, label: 'Jacuzzi exterior' },
  { icon: Droplets, label: 'Paturi hidromasaj' },
  { icon: Sun, label: 'Tobogane acvatice' },
  { icon: Umbrella, label: 'Șezlonguri & baldachine' },
  { icon: ShowerHead, label: 'Vestiare & dușuri' },
  { icon: Wifi, label: 'Wi-Fi gratuit' },
  { icon: Volleyball, label: 'Badminton & volei' },
  { icon: Trophy, label: 'Minifotbal' },
  { icon: Table2, label: 'Tenis de masă & șah' },
  { icon: GlassWater, label: 'Water Bar' },
  { icon: GlassWater, label: 'Pizzerie' },
  { icon: Umbrella, label: 'Terasă VIP' },
  { icon: Trees, label: 'Zonă verde relaxare' },
  { icon: Music, label: 'Evenimente & petreceri' },
]

const stats = [
  { value: '336', unit: 'mp', label: 'suprafață piscină' },
  { value: '4', unit: '', label: 'tobogane' },
  { value: '28°C', unit: '', label: 'temperatură apă' },
  { value: '09:00–21:00', unit: '', label: 'program zilnic' },
]

const poolGalleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp', alt: 'Astoria Pool Park' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp', alt: 'Astoria Pool Park' },
]

export function PoolParkPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
        <title>Astoria Pool Park — Deschidem În Curând | Alba Iulia</title>
        <meta name="description" content="Astoria Pool Park — cel mai mare complex acvatic din județul Alba. Piscină încălzită de 336 mp, jacuzzi, tobogane, water bar. Deschidem în curând!" />
        <meta property="og:title" content="Astoria Pool Park — Alba Iulia" />
        <meta property="og:description" content="Piscină încălzită de 336 mp, jacuzzi, tobogane și water bar în Alba Iulia. Deschidem în curând!" />
        <meta property="og:image" content="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp" />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[70vh] min-h-[450px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-10.webp"
            alt="Astoria Pool Park"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
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
              Relaxare & Distracție
            </span>
            <p className="text-lg md:text-xl italic text-white/80 mb-2 font-light">
              Fun happens under the sun
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-normal text-white tracking-tight leading-tight">
              Astoria <em className="not-italic italic text-accent-light">Pool Park</em>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/contact?subiect=pool-park"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
              >
                Rezervă acum
              </Link>
              <a
                href="tel:+40731190948"
                className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                0731 190 948
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
                Despre
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mb-6">
                Cea mai mare piscină <br />
                <em className="not-italic italic text-accent">din județ</em>
              </h2>
              <p className="text-base text-text-muted leading-relaxed mb-6">
                Astoria Pool Park este punctul de atracție pentru cei mici și cei mari deopotrivă.
                Piscină de 336 mp cu apă încălzită, jacuzzi exterior, paturi de hidromasaj și tobogane
                cu apă — toate gândite pentru relaxare și distracție în siguranță. Arhitectura piscinei
                și sistemele moderne de filtrare cu sare oferă un spațiu curat și plăcut, indiferent
                de vârsta vizitatorilor.
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                Situat pe DN 1, km 387, în curtea Hotelului Astoria, complexul este accesibil atât
                oaspeților hotelului, cât și vizitatorilor externi. Dispune de parcare proprie,
                zonă de relaxare cu șezlonguri și o gamă largă de facilități pentru toate vârstele.
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
                Deschidem <em className="not-italic italic text-accent">În Curând</em>
              </h3>
              <p className="text-text-muted mb-6 max-w-sm mx-auto">
                Ne pregătim pentru un sezon estiv de neuitat! Vom anunța data oficială de deschidere
                în curând. Urmărește-ne pe social media pentru noutăți.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://www.facebook.com/AstoriaHotelAlbaIulia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Urmărește-ne pe Facebook
                </a>
                <a
                  href="https://www.instagram.com/astoriahotelalba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Urmărește-ne pe Instagram
                </a>
              </div>
            </motion.div>
          </div>

          {/* Facilities */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                Facilități
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight">
                Tot ce ai nevoie pentru o zi <em className="not-italic italic text-accent">perfectă</em>
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
                Galerie foto
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight">
                <em className="not-italic italic text-accent">Pool Park</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Evenimente la Pool Park
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
              Petreceri tematice, concursuri sportive, concerte — Pool Park devine scena celor mai
              tari evenimente de vară. Urmărește-ne pe social media pentru programul actualizat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pool-park/meniu"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/25"
              >
                Vezi meniul Water Bar
              </Link>
              <Link
                to="/contact?subiect=pool-park"
                className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Organizează un eveniment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

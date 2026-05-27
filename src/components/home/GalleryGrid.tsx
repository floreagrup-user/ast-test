import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const galleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie18.webp', alt: 'Hotel Astoria locație 18', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie24.webp', alt: 'Hotel Astoria locație 24' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie8.webp', alt: 'Hotel Astoria locație 8' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie16.webp', alt: 'Hotel Astoria locație 16' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie25.webp', alt: 'Hotel Astoria locație 25' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie11.webp', alt: 'Hotel Astoria locație 11' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie9.webp', alt: 'Hotel Astoria locație 9' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie4.webp', alt: 'Hotel Astoria locație 4' },
]

export function GalleryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))
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
    <section className="py-20 md:py-28 bg-surface" aria-labelledby="gallery-title">
      <div className="container-xl">
        <h2 id="gallery-title" className="sr-only">
          Galerie foto
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, index) => (
            <motion.button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${img.span || ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              aria-label={`Deschide imaginea: ${img.alt}`}
            >
              <div className={`${img.span ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-square'}`}>
                <ImageWithFallback
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-600"
                />
              </div>
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
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
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
  )
}

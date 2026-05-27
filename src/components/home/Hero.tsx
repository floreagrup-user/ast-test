import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const heroSlides = [
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie28.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie27.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie18.webp',
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    heroSlides.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-screen min-h-[600px] flex items-end pb-24 md:pb-32 overflow-hidden" aria-label="Hero">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="Vedere panoramică Hotel Astoria"
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-48 md:bottom-56 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? 'w-8 bg-accent' : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container-xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-accent-light mb-4">
            Alba Iulia · Hotel 3 Stele
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.05] max-w-4xl">
            Un refugiu de{' '}
            <em className="not-italic font-light italic text-accent-light">eleganță</em>{' '}
            și confort
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            20 de camere rafinate, restaurant internațional și Astoria Pool Park — tot ce ai nevoie
            pentru un sejur de neuitat în inima Transilvaniei.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-accent text-primary font-medium px-8 py-3.5 rounded-sm hover:bg-accent-light transition-all duration-300 text-base"
            >
              Rezervă acum
            </Link>
            <Link
              to="/camere"
              className="inline-flex items-center justify-center border-2 border-white text-white font-medium px-8 py-3.5 rounded-sm hover:bg-white hover:text-primary transition-all duration-300 text-base"
            >
              Descoperă camerele
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-4 bg-accent"
              animate={{ y: [0, 40] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

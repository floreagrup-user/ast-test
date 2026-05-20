import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'
import { images } from '@/data/images'

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = images.hero.wedding
    img.onload = () => setLoaded(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-end pb-24 md:pb-32 overflow-hidden" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images.hero.wedding}
          alt="Vedere panoramică Hotel Astoria cu lacul și grădina interioară"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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

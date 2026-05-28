import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { images } from '@/data/images'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

export function RestaurantBlock() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="restaurant-title">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Text */}
          <motion.div
            className="lg:col-span-3 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Gastronomie
            </span>
            <h2
              id="restaurant-title"
              className="font-display text-4xl md:text-5xl font-normal tracking-tight mb-6"
            >
              Savurează{' '}
              <em className="not-italic italic text-accent">fiecare moment</em>
            </h2>
            <p className="text-base text-text-muted leading-relaxed max-w-xl mb-8">
              Restaurantul nostru îți oferă preparate proaspete din bucătăria internațională,
              perfecte atât pentru o cină romantică, cât și pentru un prânz de afaceri. Atmosfera
              caldă, terasa cu vedere la grădina interioară și serviciile atente transformă fiecare
              masă într-o experiență.
            </p>
            <Link
              to="/restaurant"
              className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
            >
              Meniu & Program
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            className="lg:col-span-2 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[3/4] rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-3.webp"
                alt="Interior Restaurant Astoria cu vedere la grădina interioară"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

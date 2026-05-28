import { Link } from 'react-router-dom'
import { Star, Wifi, Wind, Droplets, Coffee, Phone, Tv, ShowerHead, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { rooms } from '@/data/rooms'
import { Layout } from '@/components/layout/Layout'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi gratuit': Wifi,
  'Aer condiționat': Wind,
  'Acces Pool Park': Droplets,
  'Mic dejun inclus': Coffee,
  'Mic dejun disponibil': Coffee,
  'Minibar': Minus,
  'TV LCD': Tv,
  'Baie proprie cu duș': ShowerHead,
  'Telefon': Phone,
  'Uscător de păr': Wind,
  'Halate de baie': Droplets,
  'Produse de toaletă premium': Droplets,
  'Produse de toaletă': Droplets,
  'Seif': Minus,
  'Balcon privat': Wind,
  'Vedere la grădină': Droplets,
}

export function RoomsListingPage() {
  return (
    <Layout>
      <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp"
            alt="Camere Hotel Astoria"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Cazare
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Camerele noastre
          </h1>
        </div>
      </section>

      {/* Listing */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-surface rounded-sm overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
              >
                {room.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-sm">
                    Cel mai popular
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-600"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: room.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display text-2xl font-normal mb-2">{room.name}</h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                    {room.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity) => {
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
                    Descoperă
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container-xl">
          <h2 className="font-display text-3xl md:text-4xl font-normal mb-4">
            Nu găsești camera potrivită?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Contactează-ne și te ajutăm să alegi cea mai bună opțiune pentru sejurul tău.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3.5 rounded-sm hover:bg-accent-light transition-all duration-300"
          >
            Contactează-ne
          </Link>
        </div>
      </section>
    </div>
    </Layout>
  )
}

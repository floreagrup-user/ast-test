import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Wifi, Wind, Droplets, Coffee } from 'lucide-react'
import { rooms } from '@/data/rooms'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { SectionTitle } from '@/components/shared/SectionTitle'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi gratuit': Wifi,
  'Aer condiționat': Wind,
  'Acces Pool Park': Droplets,
  'Mic dejun inclus': Coffee,
  'Mic dejun disponibil': Coffee,
}

export function RoomsPreview() {
  return (
    <section className="py-20 md:py-28 bg-surface" aria-labelledby="rooms-title">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Cazare"
          id="rooms-title"
          title="Alege camera ta *perfectă*"
          className="mb-14"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`group relative bg-bg rounded-sm overflow-hidden border border-border hover:shadow-xl transition-all duration-500 ${
                room.popular ? 'ring-2 ring-accent/30' : ''
              }`}
            >
              {room.popular && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-sm">
                  Cel mai popular
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>

              {/* Content */}
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

                {/* Amenities */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {room.amenities.slice(0, 4).map((amenity) => {
                    const Icon = amenityIcons[amenity]
                    return (
                      <span
                        key={amenity}
                        className="flex items-center gap-1.5 text-xs text-text-muted"
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
                        {amenity}
                      </span>
                    )
                  })}
                </div>

                <Link
                  to={`/camere/${room.slug}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors group/link"
                >
                  Descoperă
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

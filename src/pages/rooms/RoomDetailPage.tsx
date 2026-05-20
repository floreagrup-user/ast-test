import { useEffect, useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Star,
  Wifi,
  Wind,
  Droplets,
  Coffee,
  Phone,
  Tv,
  ShowerHead,
  Minus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'
import { getRoomBySlug, rooms } from '@/data/rooms'
import { Layout } from '@/components/layout/Layout'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { CTAButton } from '@/components/shared/CTAButton'

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

export function RoomDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const room = getRoomBySlug(slug || '')
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: 'trimSnaps' })
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: 'trimSnaps', dragFree: true })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!room) {
      navigate('/camere', { replace: true })
    }
  }, [room, navigate])

  useEffect(() => {
    if (!emblaApi || !thumbApi) return
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, thumbApi])

  if (!room) return null

  const otherRooms = rooms.filter((r) => r.slug !== room.slug)

  return (
    <Layout>
      <Helmet>
        <title>{`${room.name} — Hotel Astoria Alba Iulia`}</title>
        <meta name="description" content={room.shortDescription} />
        <meta property="og:title" content={`${room.name} — Hotel Astoria Alba Iulia`} />
        <meta property="og:description" content={room.shortDescription} />
        <meta property="og:image" content={`https://astoriahotels.ro${room.images[0]}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: room.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {room.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="mb-10">
                <div className="overflow-hidden rounded-sm mb-3" ref={emblaRef}>
                  <div className="flex">
                    {room.images.map((img, i) => (
                      <div key={i} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-[16/10]">
                          <ImageWithFallback src={img} alt={`${room.name} - imagine ${i + 1}`} className="w-full h-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {room.images.length > 1 && (
                  <div className="overflow-hidden rounded-sm" ref={thumbRef}>
                    <div className="flex gap-2">
                      {room.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => emblaApi?.scrollTo(i)}
                          className={`flex-[0_0_auto] w-20 h-14 rounded-sm overflow-hidden border-2 transition-colors ${
                            i === activeIndex ? 'border-accent' : 'border-transparent'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-display text-2xl font-normal mb-4">Despre această cameră</h2>
                <p className="text-text-muted leading-relaxed">{room.fullDescription}</p>
              </div>

              {/* Info bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">Check-in</p>
                  <p className="text-lg font-display">{room.checkIn}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">Check-out</p>
                  <p className="text-lg font-display">{room.checkOut}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Coffee className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">Mic dejun</p>
                  <p className="text-lg font-display">{room.breakfast ? 'Inclus' : 'Disponibil'}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Droplets className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">Pool Park</p>
                  <p className="text-lg font-display">{room.poolAccess ? 'Acces' : '—'}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-2xl font-normal mb-6">Facilități</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity]
                    return (
                      <div key={amenity} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-sm bg-primary/5 flex items-center justify-center shrink-0">
                          {Icon ? (
                            <Icon className="w-4 h-4 text-primary" />
                          ) : (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-text-muted">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface rounded-sm border border-border p-6 shadow-sm">
                <h3 className="font-display text-xl font-normal mb-4">Rezervă această cameră</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="room-checkin" className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                      Check-in
                    </label>
                    <input
                      id="room-checkin"
                      type="date"
                      className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="room-checkout" className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                      Check-out
                    </label>
                    <input
                      id="room-checkout"
                      type="date"
                      className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <Link
                  to={`/contact?camera=${room.slug}`}
                  className="block w-full bg-primary text-white text-center font-medium py-3 rounded-sm hover:bg-primary-light transition-all duration-300"
                >
                  Verifică disponibilitatea
                </Link>
                <p className="text-xs text-text-muted mt-3 text-center">
                  Sau sună la{' '}
                  <a href="tel:+40731190948" className="text-primary hover:underline">
                    0731 190 948
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other rooms */}
      {otherRooms.length > 0 && (
        <section className="py-16 bg-surface border-t border-border">
          <div className="container-xl">
            <h2 className="font-display text-2xl font-normal mb-8 text-center">Alte camere</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRooms.map((r) => (
                <Link key={r.slug} to={`/camere/${r.slug}`} className="group block">
                  <div className="aspect-[4/3] rounded-sm overflow-hidden mb-3">
                    <ImageWithFallback
                      src={r.images[0]}
                      alt={r.name}
                      className="w-full h-full group-hover:scale-105 transition-transform duration-600"
                    />
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <h3 className="font-display text-lg font-normal group-hover:text-accent transition-colors">
                    {r.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

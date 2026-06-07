import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Star, Wifi, Wind, Droplets, Coffee, Phone, Tv, ShowerHead, Minus, Clock, Check,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { rooms } from '@/data/rooms'
import { Layout } from '@/components/layout/Layout'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { hotel } from '@/data/hotel'

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi gratuit': Wifi, 'Free Wi-Fi': Wifi,
  'Aer condiționat': Wind, 'Air conditioning': Wind,
  'Acces Pool Park': Droplets, 'Pool Park access': Droplets,
  'Mic dejun inclus': Coffee, 'Breakfast included': Coffee,
  'Mic dejun disponibil': Coffee, 'Breakfast available': Coffee,
  'Minibar': Minus,
  'TV LCD': Tv, 'LCD TV': Tv,
  'Baie proprie cu duș': ShowerHead, 'En-suite bathroom with shower': ShowerHead,
  'Telefon': Phone, 'Telephone': Phone,
  'Uscător de păr': Wind, 'Hair dryer': Wind,
  'Halate de baie': Droplets, 'Bathrobes': Droplets,
  'Produse de toaletă premium': Droplets, 'Premium toiletries': Droplets,
  'Produse de toaletă': Droplets, 'Toiletries': Droplets,
  'Seif': Minus, 'Safe': Minus,
  'Balcon privat': Wind, 'Private balcony': Wind,
  'Vedere la grădină': Droplets, 'Garden view': Droplets,
}

const roomKeys = ['apartment', 'standard', 'standardBalcony'] as const

export function RoomDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const roomIndex = rooms.findIndex((r) => r.slug === slug)
  const room = rooms[roomIndex]
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', containScroll: 'trimSnaps' })
  const [thumbRef, thumbApi] = useEmblaCarousel({ containScroll: 'trimSnaps', dragFree: true })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!room) navigate('/camere', { replace: true })
  }, [room, navigate])

  useEffect(() => {
    if (!emblaApi || !thumbApi) return
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, thumbApi])

  if (!room) return null

  const roomKey = roomKeys[roomIndex] ?? 'apartment'
  const roomName = t(`rooms.${roomKey}.name`)
  const roomFullDesc = t(`rooms.${roomKey}.fullDescription`)
  const roomAmenities = t(`rooms.${roomKey}.amenities`, { returnObjects: true }) as string[]

  const otherRooms = rooms.filter((r) => r.slug !== room.slug)

  return (
    <Layout>
      <Helmet>
        <title>{`${roomName} — Hotel Astoria Alba Iulia`}</title>
        <meta name="description" content={t(`rooms.${roomKey}.shortDescription`)} />
        <meta property="og:title" content={`${roomName} — Hotel Astoria Alba Iulia`} />
        <meta property="og:description" content={t(`rooms.${roomKey}.shortDescription`)} />
        <meta property="og:image" content={room.images[0]} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={room.images[0]} alt={roomName} className="w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: room.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {roomName}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {/* Gallery */}
              <div className="mb-10">
                <div className="overflow-hidden rounded-sm mb-3" ref={emblaRef}>
                  <div className="flex">
                    {room.images.map((img, i) => (
                      <div key={i} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-[16/10]">
                          <ImageWithFallback src={img} alt={`${roomName} - ${t('roomDetail.imageAlt')} ${i + 1}`} className="w-full h-full" />
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
                          className={`flex-[0_0_auto] w-20 h-14 rounded-sm overflow-hidden border-2 transition-colors ${i === activeIndex ? 'border-accent' : 'border-transparent'}`}
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
                <h2 className="font-display text-2xl font-normal mb-4">{t('roomDetail.aboutRoom')}</h2>
                <p className="text-text-muted leading-relaxed">{roomFullDesc}</p>
              </div>

              {/* Info bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">{t('rooms.checkIn')}</p>
                  <p className="text-lg font-display">{room.checkIn}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">{t('rooms.checkOut')}</p>
                  <p className="text-lg font-display">{room.checkOut}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Coffee className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">{t('roomDetail.breakfast')}</p>
                  <p className="text-lg font-display">{room.breakfast ? t('roomDetail.included') : t('roomDetail.available')}</p>
                </div>
                <div className="bg-bg rounded-sm border border-border p-4 text-center">
                  <Droplets className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-sm font-semibold">Pool Park</p>
                  <p className="text-lg font-display">{room.poolAccess ? t('roomDetail.access') : '—'}</p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display text-2xl font-normal mb-6">{t('roomDetail.facilities')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {roomAmenities.map((amenity) => {
                    const Icon = amenityIcons[amenity]
                    return (
                      <div key={amenity} className="flex items-center gap-3 text-sm">
                        <div className="w-8 h-8 rounded-sm bg-primary/5 flex items-center justify-center shrink-0">
                          {Icon ? <Icon className="w-4 h-4 text-primary" /> : <Check className="w-4 h-4 text-primary" />}
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
                <h3 className="font-display text-xl font-normal mb-4">{t('roomDetail.bookRoom')}</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="room-checkin" className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                      {t('rooms.checkIn')}
                    </label>
                    <input id="room-checkin" type="date" className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
                  </div>
                  <div>
                    <label htmlFor="room-checkout" className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                      {t('rooms.checkOut')}
                    </label>
                    <input id="room-checkout" type="date" className="w-full px-3 py-2.5 border border-border rounded-sm text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none" />
                  </div>
                </div>
                <Link
                  to={`/contact?camera=${room.slug}`}
                  className="block w-full bg-primary text-white text-center font-medium py-3 rounded-sm hover:bg-primary-light transition-all duration-300"
                >
                  {t('roomDetail.checkAvailability')}
                </Link>
                <p className="text-xs text-text-muted mt-3 text-center">
                  {t('roomDetail.orCall')}{' '}
                  <a href={hotel.contact.phone.tel} className="text-primary hover:underline">{hotel.contact.phone.national}</a>
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
            <h2 className="font-display text-2xl font-normal mb-8 text-center">{t('roomDetail.otherRooms')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherRooms.map((r) => {
                const otherKey = roomKeys[rooms.findIndex((x) => x.slug === r.slug)] ?? 'standard'
                return (
                  <Link key={r.slug} to={`/camere/${r.slug}`} className="group block">
                    <div className="aspect-[4/3] rounded-sm overflow-hidden mb-3">
                      <ImageWithFallback src={r.images[0]} alt={t(`rooms.${otherKey}.name`)} className="w-full h-full group-hover:scale-105 transition-transform duration-600" />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <h3 className="font-display text-lg font-normal group-hover:text-accent transition-colors">
                      {t(`rooms.${otherKey}.name`)}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

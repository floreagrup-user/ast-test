import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Waves, Droplets, Sun, GlassWater, Umbrella, ShowerHead, Wifi, Volleyball, Trophy, Table2, Music } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { images } from '@/data/images'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { SectionTitle } from '@/components/shared/SectionTitle'

const facilities = [
  { icon: Waves, label: 'Piscină încălzită' },
  { icon: Droplets, label: 'Jacuzzi' },
  { icon: Droplets, label: 'Paturi hidromasaj' },
  { icon: Sun, label: 'Tobogane' },
  { icon: Umbrella, label: 'Baldachine' },
  { icon: ShowerHead, label: 'Vestiare' },
  { icon: ShowerHead, label: 'Dușuri' },
  { icon: Wifi, label: 'Wi-Fi' },
  { icon: Volleyball, label: 'Teren badminton' },
  { icon: Volleyball, label: 'Volei pe plajă' },
  { icon: Trophy, label: 'Minifotbal' },
  { icon: Table2, label: 'Șah gigant' },
  { icon: Table2, label: 'Tenis de masă' },
  { icon: GlassWater, label: 'Water Bar' },
  { icon: GlassWater, label: 'Pizzerie' },
  { icon: Umbrella, label: 'Terasă VIP' },
  { icon: Umbrella, label: 'Zonă relaxare' },
  { icon: Music, label: 'Evenimente' },
]

const pricing = [
  { days: 'Luni – Vineri', price: '50 LEI' },
  { days: 'Sâmbătă – Duminică', price: '70 LEI' },
  { days: 'Luni – Joi după 16:00', price: '35 LEI' },
]

export function PoolParkPage() {
  return (
    <Layout>
      <Helmet>
        <title>Astoria Pool Park — Piscină Încălzită în Alba Iulia</title>
        <meta name="description" content="Astoria Pool Park: piscină de 336 mp cu apă încălzită, jacuzzi exterior, tobogane, water bar și pizzerie. Distracție pentru toată familia în Alba Iulia." />
        <meta property="og:title" content="Astoria Pool Park — Alba Iulia" />
        <meta property="og:description" content="Piscină încălzită, jacuzzi, tobogane și water bar în Alba Iulia." />
        <meta property="og:image" content={`https://astoriahotels.ro${images.pool.day}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.pool.day}
            alt="Astoria Pool Park piscina"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-2">
            Relaxare
          </span>
          <p className="text-sm italic text-white/70 mb-2">Fun happens under the sun</p>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Astoria <em className="not-italic italic text-accent-light">Pool Park</em>
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-text-muted leading-relaxed">
              Astoria Pool Park este punctul de atracție pentru cei mici și cei mari deopotrivă.
              Piscină de 336 mp cu apă încălzită, jacuzzi exterior, paturi de hidromasaj și tobogane
              cu apă — toate gândite pentru relaxare și distracție în siguranță. Arhitectura piscinei
              și sistemele moderne de filtrare oferă un spațiu curat și plăcut, indiferent de vârsta
              vizitatorilor.
            </p>
          </div>

          {/* Pricing */}
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-2xl font-normal text-center mb-8">Tarife intrare</h2>
            <div className="bg-accent/10 rounded-sm border border-accent/20 overflow-hidden">
              {pricing.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between p-5 ${
                    i < pricing.length - 1 ? 'border-b border-accent/20' : ''
                  }`}
                >
                  <span className="text-sm font-medium">{item.days}</span>
                  <span className="text-xl font-display font-semibold text-primary">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <SectionTitle
            eyebrow="Facilități"
            title="Tot ce ai nevoie pentru o zi *perfectă*"
            className="mb-10"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {facilities.map((f) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-surface rounded-sm border border-border p-4 text-center hover:shadow-md transition-shadow"
              >
                <f.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs text-text-muted">{f.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <ImageWithFallback src={images.pool.night1} alt="Pool Park noaptea" className="w-full h-full" />
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <ImageWithFallback src={images.pool.night} alt="Pool Park atmosferă nocturnă" className="w-full h-full" />
            </div>
          </div>

          {/* Events */}
          <div className="bg-primary text-white rounded-sm p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-normal mb-4">
              Evenimente la Pool Park
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-6">
              Petreceri tematice, concursuri sportive, concerte — Pool Park devine scena celor mai
              tari evenimente de vară. Urmărește-ne pe social media pentru programul actualizat.
            </p>
            <Link
              to="/pool-park/meniu"
              className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-sm hover:bg-accent-light transition-all duration-300"
            >
              Vezi meniul Water Bar
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

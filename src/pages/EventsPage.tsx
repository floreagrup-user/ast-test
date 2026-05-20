import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Presentation, PartyPopper } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { images } from '@/data/images'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'

const eventSections = [
  {
    icon: Heart,
    title: 'Nunți',
    subtitle: 'Spune «DA» într-un cadru de poveste',
    description:
      'Cu lacul, grădina interioară și saloane care găzduiesc până la 150 de invitați, Astoria devine decorul perfect pentru cea mai importantă zi din viața ta. Echipa noastră se ocupă de fiecare detaliu — de la decor și meniu, la cazarea invitaților — astfel încât tu să te concentrezi doar pe a-ți spune povestea.',
    image: images.hero.wedding,
    imageAlt: 'Nuntă la Hotel Astoria cu lacul în fundal',
  },
  {
    icon: Presentation,
    title: 'Conferințe & Team Building',
    subtitle: 'Profesionalism într-un cadru natural',
    description:
      'Sala de conferințe modernă, complet utilată cu echipamente AV, găzduiește întâlniri de afaceri, training-uri și team-buildinguri într-un cadru profesionist. Pauzele de cafea pe terasa cu vedere la grădină, prânzul în restaurant și activitățile outdoor în Pool Park transformă orice eveniment corporate într-o experiență memorabilă.',
    image: images.restaurant.interior,
    imageAlt: 'Sală conferințe Hotel Astoria',
  },
  {
    icon: PartyPopper,
    title: 'Petreceri private & Aniversări',
    subtitle: 'Fiecare ocazie devine specială',
    description:
      'Botez, majorat, aniversare de căsătorie sau pur și simplu o petrecere de neuitat cu prietenii — Astoria oferă spații versatile, meniuri personalizate și un decor în care fiecare ocazie devine specială.',
    image: images.restaurant.food,
    imageAlt: 'Masă festivă la Restaurant Astoria',
  },
]

export function EventsPage() {
  return (
    <Layout>
      <Helmet>
        <title>Evenimente la Astoria — Nunți, Conferințe & Petreceri în Alba Iulia</title>
        <meta name="description" content="Organizează nunți, conferințe, team-buildinguri și petreceri private la Hotel Astoria Alba Iulia. Spații versatile, meniuri personalizate și echipă dedicată." />
        <meta property="og:title" content="Evenimente la Astoria — Alba Iulia" />
        <meta property="og:description" content="Nunți, conferințe și petreceri private într-un cadru de poveste." />
        <meta property="og:image" content={`https://astoriahotels.ro${images.hero.wedding}`} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.hero.wedding}
            alt="Eveniment la Hotel Astoria"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Evenimente
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Evenimente la <em className="not-italic italic text-accent-light">Astoria</em>
          </h1>
        </div>
      </section>

      {/* Event sections */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          {eventSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 last:mb-0 ${
                index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              {/* Text */}
              <div>
                <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-5">
                  <section.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm italic text-text-muted mb-2">{section.subtitle}</p>
                <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mb-5">
                  {section.title}
                </h2>
                <p className="text-text-muted leading-relaxed mb-8">{section.description}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-primary text-white font-medium px-8 py-3 rounded-sm hover:bg-primary-light transition-all duration-300"
                >
                  Solicită ofertă personalizată
                </Link>
              </div>

              {/* Image */}
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <ImageWithFallback src={section.image} alt={section.imageAlt} className="w-full h-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container-xl">
          <h2 className="font-display text-3xl md:text-4xl font-normal mb-4">
            Hai să organizăm împreună
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Contactează-ne pentru o ofertă personalizată. Echipa noastră te va ghida pas cu pas.
          </p>
          <Link
            to="/contact?subiect=eveniment"
            className="inline-flex items-center bg-accent text-primary font-medium px-10 py-4 rounded-sm hover:bg-accent-light transition-all duration-300 text-lg"
          >
            Solicită ofertă
          </Link>
        </div>
      </section>
    </Layout>
  )
}

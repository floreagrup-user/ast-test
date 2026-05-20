import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Phone, Star, Utensils, Coffee, PartyPopper } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { images } from '@/data/images'
import { restaurantTestimonials } from '@/data/testimonials'
import { ImageWithFallback } from '@/components/shared/ImageWithFallback'
import { SectionTitle } from '@/components/shared/SectionTitle'

const experiences = [
  {
    icon: Utensils,
    title: 'Cină à la carte',
    description: 'Meniu variat din bucătăria internațională, preparat cu ingrediente proaspete și servit cu pasiune.',
  },
  {
    icon: Coffee,
    title: 'Mic dejun bufet',
    description: 'Începe ziua cu un bufet bogat: produse proaspete, preparate calde, fructe și cafea de specialitate.',
  },
  {
    icon: PartyPopper,
    title: 'Evenimente private',
    description: 'Spații versatile pentru aniversări, cine de gală sau întâlniri de afaceri — cu meniu personalizat.',
  },
]

export function RestaurantPage() {
  return (
    <Layout>
      <Helmet>
        <title>Restaurant Astoria — Bucătărie Internațională în Alba Iulia</title>
        <meta name="description" content="Restaurant cu bucătărie internațională, preparate din ingrediente proaspete și atmosferă caldă cu vedere la grădina interioară. Program: 07:00 – 22:00." />
        <meta property="og:title" content="Restaurant Astoria — Alba Iulia" />
        <meta property="og:description" content="Bucătărie internațională, preparate proaspete și atmosferă caldă în Alba Iulia." />
        <meta property="og:image" content={`https://astoriahotels.ro${images.restaurant.main}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Restaurant Astoria",
            "description": "Restaurant cu bucătărie internațională în cadrul Hotel Astoria, Alba Iulia.",
            "url": "https://astoriahotels.ro/restaurant",
            "telephone": "+40 731 190 948",
            "servesCuisine": "International",
            "openingHours": "Mo-Su 07:00-22:00",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "DN 1, km 387",
              "addressLocality": "Alba Iulia",
              "addressRegion": "Alba",
              "addressCountry": "RO"
            },
            "image": `https://astoriahotels.ro${images.restaurant.main}`,
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={images.restaurant.main}
            alt="Interior Restaurant Astoria"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Gastronomie
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Restaurantul Astoria
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-text-muted leading-relaxed">
              Bucătărie internațională, preparate din ingrediente proaspete și o echipă care își
              dorește să te facă să te simți ca acasă. Fie că alegi o cină romantică, un prânz de
              business sau o masă de duminică în familie, restaurantul Astoria îți oferă cadrul
              potrivit — cu vedere directă către grădina interioară și iazul cu pești.
            </p>
          </div>

          {/* Experiences */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface rounded-sm border border-border p-6 md:p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-sm bg-primary/5 flex items-center justify-center mx-auto mb-5">
                  <exp.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-normal mb-3">{exp.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <ImageWithFallback src={images.restaurant.food} alt="Preparate restaurant Astoria" className="w-full h-full" />
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <ImageWithFallback src={images.restaurant.service} alt="Servire masă la Restaurant Astoria" className="w-full h-full" />
            </div>
          </div>

          {/* Info */}
          <div className="bg-primary text-white rounded-sm p-6 md:p-10 text-center mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">Program</p>
                  <p className="font-semibold">Luni – Duminică, 07:00 – 22:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-white/60">Rezervări</p>
                  <a href="tel:+40731190948" className="font-semibold hover:text-accent transition-colors">
                    0731 190 948
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/restaurant/meniu"
                className="inline-flex items-center bg-accent text-primary font-medium px-8 py-3 rounded-sm hover:bg-accent-light transition-all duration-300"
              >
                Vezi meniul complet
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <SectionTitle
            eyebrow="Recenzii"
            title="Ce spun oaspeții despre *restaurant*"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurantTestimonials.map((t) => (
              <div key={t.id} className="bg-surface rounded-sm border border-border p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-sm text-text leading-relaxed italic mb-4">
                  "{t.text}"
                </blockquote>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface border-t border-border text-center">
        <div className="container-xl">
          <h2 className="font-display text-3xl font-normal mb-4">Rezervă o masă</h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Sună-ne sau completează formularul de contact pentru o rezervare la restaurant.
          </p>
          <Link
            to="/contact?subiect=rezervare-restaurant"
            className="inline-flex items-center bg-primary text-white font-medium px-8 py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300"
          >
            Rezervă o masă
          </Link>
        </div>
      </section>
    </Layout>
  )
}

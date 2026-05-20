import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

export function RestaurantMenuPage() {
  return (
    <Layout>
      <Helmet>
        <title>Meniu Restaurant — Hotel Astoria Alba Iulia</title>
        <meta name="description" content="Meniul Restaurantului Astoria: preparate din bucătăria internațională, mic dejun bufet, cină à la carte." />
      </Helmet>

      <section className="relative h-[30vh] min-h-[200px] flex items-end pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Gastronomie
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Meniul Restaurantului
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl max-w-3xl">
          <div className="bg-surface rounded-sm border border-border p-8 md:p-12 text-center">
            <p className="text-text-muted mb-6">
              Meniul nostru se actualizează sezonier pentru a-ți oferi cele mai proaspete ingrediente.
              Contactează-ne pentru meniul complet sau vizitează restaurantul.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+40731190948"
                className="inline-flex items-center bg-primary text-white font-medium px-8 py-3 rounded-sm hover:bg-primary-light transition-all"
              >
                Sună pentru meniu
              </a>
              <Link
                to="/restaurant"
                className="inline-flex items-center border border-border text-primary font-medium px-8 py-3 rounded-sm hover:bg-primary/5 transition-all"
              >
                Înapoi la Restaurant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { hotel } from '@/data/hotel'

export function PoolParkMenuPage() {
  return (
    <Layout>
      <Helmet>
        <title>Meniu Water Bar — Astoria Pool Park</title>
        <meta name="description" content="Meniul Water Bar de la Astoria Pool Park: cocktailuri, băuturi răcoritoare, pizza și gustări." />
      </Helmet>

      <section className="relative h-[30vh] min-h-[200px] flex items-end pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Pool Park
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Meniu Water Bar
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl max-w-3xl">
          <div className="bg-surface rounded-sm border border-border p-8 md:p-12 text-center">
            <p className="text-text-muted mb-6">
              Water Bar-ul nostru îți oferă cocktailuri, băuturi răcoritoare, pizza proaspătă și
              gustări pentru o zi perfectă la piscină. Meniul se actualizează sezonier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pool-park"
                className="inline-flex items-center bg-primary text-white font-medium px-8 py-3 rounded-sm hover:bg-primary-light transition-all"
              >
                Înapoi la Pool Park
              </Link>
              <a
                href={hotel.contact.phone.tel}
                className="inline-flex items-center border border-border text-primary font-medium px-8 py-3 rounded-sm hover:bg-primary/5 transition-all"
              >
                Sună pentru detalii
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

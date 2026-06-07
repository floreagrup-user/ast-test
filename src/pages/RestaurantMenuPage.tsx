import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { hotel } from '@/data/hotel'

const MENU_PDF_URL = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/Meniu_Restaurant_Astoria_2026.pdf'

export function RestaurantMenuPage() {
  return (
    <Layout>
      <Helmet>
        <title>Meniu Restaurant — Hotel Astoria Alba Iulia</title>
        <meta name="description" content="Meniul Restaurantului Astoria: preparate din bucătăria internațională, mic dejun bufet, cină à la carte. Descarcă PDF-ul cu meniul complet." />
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
              Descarcă PDF-ul cu meniul complet sau contactează-ne pentru detalii.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={MENU_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary text-white font-medium px-8 py-3 rounded-sm hover:bg-primary-light transition-all"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                PDF Meniu
              </a>
              <a
                href={hotel.contact.phone.tel}
                className="inline-flex items-center border border-border text-primary font-medium px-8 py-3 rounded-sm hover:bg-primary/5 transition-all"
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

import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'

export function TermsPage() {
  return (
    <Layout>
      <Helmet>
        <title>Termeni și Condiții — Hotel Astoria</title>
      </Helmet>

      <section className="py-20 md:py-28">
        <div className="container-xl max-w-3xl">
          <h1 className="font-display text-4xl font-normal tracking-tight mb-8">
            Termeni și Condiții
          </h1>
          <div className="prose prose-sm max-w-none text-text-muted">
            <p className="mb-4">
              Prin utilizarea site-ului astoriahotels.ro și a serviciilor oferite de Hotel Astoria,
              accepți următorii termeni și condiții.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              1. Rezervări
            </h2>
            <p className="mb-4">
              Rezervările se confirmă în urma verificării disponibilității și a plății avansului
              solicitat. Check-in-ul se face după ora 14:00, iar check-out-ul până la ora 12:00.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              2. Anulări
            </h2>
            <p className="mb-4">
              Politica de anulare variază în funcție de tipul rezervării. Vei fi informat la momentul
              rezervării privind condițiile specifice.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              3. Utilizarea site-ului
            </h2>
            <p className="mb-4">
              Conținutul site-ului este protejat de drepturi de autor. Imaginile și textele nu pot fi
              reproduse fără acordul scris al Hotel Astoria.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              4. Pool Park
            </h2>
            <p className="mb-4">
              Accesul la Pool Park se face conform tarifelor afișate și regulamentului intern.
              Copiii sub 14 ani trebuie supravegheați de un adult.
            </p>
            <p className="mt-8 text-sm">
              Ultima actualizare: Ianuarie 2026
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

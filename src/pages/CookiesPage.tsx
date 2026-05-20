import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'

export function CookiesPage() {
  return (
    <Layout>
      <Helmet>
        <title>Politica Cookies — Hotel Astoria</title>
      </Helmet>

      <section className="py-20 md:py-28">
        <div className="container-xl max-w-3xl">
          <h1 className="font-display text-4xl font-normal tracking-tight mb-8">
            Politica Cookies
          </h1>
          <div className="prose prose-sm max-w-none text-text-muted">
            <p className="mb-4">
              Site-ul astoriahotels.ro utilizează cookies pentru a îmbunătăți experiența de navigare
              și a oferi funcționalități specifice.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              Ce sunt cookies?
            </h2>
            <p className="mb-4">
              Cookies sunt fișiere text de mici dimensiuni stocate pe dispozitivul tău atunci când
              vizitezi un site web. Ele permit site-ului să recunoască dispozitivul și să rețină
              preferințele tale.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              Tipuri de cookies utilizate
            </h2>
            <ul className="space-y-2 mb-4">
              <li>
                <strong>Funcționale (întotdeauna active):</strong> necesare pentru funcționarea
                corectă a site-ului, inclusiv preferințele de cookies.
              </li>
              <li>
                <strong>Preferințe:</strong> rețin setările tale de afișare și navigare.
              </li>
              <li>
                <strong>Statistice (cu consimțiment):</strong> ne ajută să înțelegem cum este
                utilizat site-ul prin Google Analytics.
              </li>
              <li>
                <strong>Marketing (cu consimțiment):</strong> utilizate pentru a livra conținut
                relevant pe alte platforme.
              </li>
            </ul>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              Gestionarea cookies
            </h2>
            <p className="mb-4">
              Poți gestiona preferințele tale de cookies în orice moment din setările browserului
              sau prin banner-ul de consimțiment de pe site. Dezactivarea cookies funcționale poate
              afecta experiența de navigare.
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

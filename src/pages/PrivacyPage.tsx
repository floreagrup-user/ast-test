import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { hotel } from '@/data/hotel'

export function PrivacyPage() {
  return (
    <Layout>
      <Helmet>
        <title>Politica de Confidențialitate — Hotel Astoria</title>
      </Helmet>

      <section className="py-20 md:py-28">
        <div className="container-xl max-w-3xl">
          <h1 className="font-display text-4xl font-normal tracking-tight mb-8">
            Politica de Confidențialitate
          </h1>
          <div className="prose prose-sm max-w-none text-text-muted">
            <p className="mb-4">
              Hotel Astoria, cu sediul în {hotel.address.full}, respectă dreptul la
              protecția datelor personale și se conformează Regulamentului (UE) 2016/679 (GDPR).
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              1. Date colectate
            </h2>
            <p className="mb-4">
              Colectăm date personale necesare pentru procesarea rezervărilor: nume, prenume, email,
              telefon, preferințe de cazare. Aceste date sunt necesare pentru executarea contractului
              de servicii hoteliere.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              2. Scopul procesării
            </h2>
            <p className="mb-4">
              Datele sunt utilizate pentru: procesarea rezervărilor, comunicarea cu oaspeții,
              îmbunătățirea serviciilor, respectarea obligațiilor legale.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              3. Durata stocării
            </h2>
            <p className="mb-4">
              Datele sunt păstrate pe durata necesară îndeplinirii scopurilor pentru care au fost
              colectate, conform obligațiilor legale.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              4. Drepturile tale
            </h2>
            <p className="mb-4">
              Ai dreptul de acces, rectificare, ștergere, restricționare a procesării, portabilitate
              și opoziție. Pentru exercitarea acestor drepturi, contactează-ne la
              {hotel.contact.email.address}.
            </p>
            <h2 className="font-display text-xl font-normal text-text mt-8 mb-3">
              5. Cookies
            </h2>
            <p className="mb-4">
              Site-ul utilizează cookies funcționale și, cu consimțimentul tău, cookies statistice.
              Poți gestiona preferințele în orice moment din setările browserului.
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

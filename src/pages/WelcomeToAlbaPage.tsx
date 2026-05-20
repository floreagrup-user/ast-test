import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'

export function WelcomeToAlbaPage() {
  return (
    <Layout>
      <Helmet>
        <title>Welcome to Alba — Ghid Alba Iulia | Hotel Astoria</title>
        <meta name="description" content="Descoperă Alba Iulia: Cetatea Alba Carolina, muzee, restaurante locale și atracții turistice. Ghidul tău pentru un sejur perfect." />
      </Helmet>

      <section className="relative h-[40vh] min-h-[280px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Descoperă
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Welcome to <em className="not-italic italic text-accent-light">Alba Iulia</em>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              Alba Iulia este un oraș cu o istorie bogată, situat în inima Transilvaniei. De la
              impresionanta Cetate Alba Carolina până la muzeele și restaurantele locale, orașul
              oferă o experiență autentică pentru fiecare vizitator.
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl font-normal mb-4">Cetatea Alba Carolina</h2>
                <p className="text-text-muted leading-relaxed">
                  Una dintre cele mai impresionante fortificații de tip Vauban din Europa, Cetatea
                  Alba Carolina este un simbol al istoriei românești. Aici s-a realizat Marea Unire
                  din 1918. Poți explora cele șase porți, Catedrala Încoronării, Muzeul Unirii și
                  numeroase restaurante și cafenele din interiorul cetății.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">Atracții principale</h2>
                <ul className="space-y-3">
                  {[
                    'Catedrala Ortodoxă a Încoronării — simbol al Marii Uniri',
                    'Muzeul Național al Unirii — colecții de istorie și arheologie',
                    'Sala Unirii — locul Marii Adunări Naționale din 1918',
                    'Grădina Publică — un parc frumos pentru plimbări',
                    'Dealul Furcilor — punct panoramic cu vedere asupra orașului',
                    'Cazinoul — clădire istorică cu arhitectură deosebită',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">Restaurante recomandate</h2>
                <p className="text-text-muted leading-relaxed">
                  În afara restaurantului nostru, Alba Iulia oferă o varietate de opțiuni
                  gastronomice — de la restaurante tradiționale românești până la bucătărie
                  internațională. Întreabă la recepție pentru recomandări actualizate.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-normal mb-4">Cum ajungi</h2>
                <p className="text-text-muted leading-relaxed">
                  Alba Iulia este situată pe DN1, la aproximativ 90 km de Cluj-Napoca și 280 km de
                  București. Hotelul Astoria se află la km 387 pe DN1, cu acces ușor și parcare
                  gratuită.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

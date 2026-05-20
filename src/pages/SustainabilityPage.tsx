import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Zap, Droplets, Recycle, Users } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { SectionTitle } from '@/components/shared/SectionTitle'

const sections = [
  {
    icon: Zap,
    title: 'Energie',
    actions: [
      'LED-uri pe întreaga locație — iluminat eficient în camere, restaurant și zona Pool Park',
      'Sisteme de climatizare cu consum optimizat, programate pentru eficiență maximă',
      'Panouri solare pentru încălzirea apei de la piscină (în curs de implementare)',
    ],
  },
  {
    icon: Droplets,
    title: 'Apă',
    actions: [
      'Sistem de filtrare eficient pentru piscină, cu recirculare și tratare minimă',
      'Robinete cu debit redus în camere și spațiile comune',
      'Monitorizare constantă a consumului pentru detectarea rapidă a pierderilor',
    ],
  },
  {
    icon: Recycle,
    title: 'Deșeuri',
    actions: [
      'Colectare selectivă în toate zonele hotelului — hârtie, plastic, sticlă, menajer',
      'Reducerea plasticului de unică folosință: sticle de apă reutilizabile în camere',
      'Parteneriat cu firme locale de reciclare pentru deșeurile din restaurant',
    ],
  },
  {
    icon: Users,
    title: 'Comunitate locală',
    actions: [
      'Furnizori locali pentru restaurant — produse proaspete de la fermieri din zonă',
      'Angajăm din comunitatea locală și investim în formarea profesională a echipei',
      'Sprijinim evenimente culturale și sportive din Alba Iulia',
    ],
  },
]

export function SustainabilityPage() {
  return (
    <Layout>
      <Helmet>
        <title>Sustenabilitate — Hotel Astoria Alba Iulia</title>
        <meta name="description" content="Hotel Astoria este angajat în practici sustenabile: eficiență energetică, gestionarea apei, reciclare și sprijin pentru comunitatea locală din Alba Iulia." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative container-xl z-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3">
            Responsabilitate
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Sustenabilitate la{' '}
            <em className="not-italic italic text-accent-light">Astoria</em>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-text-muted leading-relaxed">
              Credem că ospitalitatea adevărată merge mână în mână cu responsabilitatea față de
              mediu și comunitate. La Astoria, fiecare decizie — de la sursele de energie la
              ingredientele din bucătărie — este ghidată de dorința de a lăsa un impact pozitiv.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface rounded-sm border border-border p-6 md:p-8"
              >
                <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-5">
                  <section.icon className="w-6 h-6 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-normal mb-5">{section.title}</h2>
                <ul className="space-y-3">
                  {section.actions.map((action) => (
                    <li key={action} className="flex items-start gap-3 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

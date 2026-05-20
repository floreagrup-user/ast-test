import { Trees, UtensilsCrossed, Waves, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { SectionTitle } from '@/components/shared/SectionTitle'

const benefits = [
  {
    icon: Trees,
    title: 'Natură & Liniște',
    description: 'Cadru natural cu lac propriu, ideal pentru relaxare și evadare din agitația urbană.',
    number: '01',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant Gourmet',
    description: 'Preparate din bucătăria internațională, servite cu grijă și pasiune culinară.',
    number: '02',
  },
  {
    icon: Waves,
    title: 'Astoria Pool Park',
    description: 'Piscină încălzită, jacuzzi exterior și paturi de hidromasaj pentru întreaga familie.',
    number: '03',
  },
  {
    icon: Sparkles,
    title: 'Evenimente Speciale',
    description: 'Nunți, conferințe și team-buildinguri — organizate cu atenție la fiecare detaliu.',
    number: '04',
  },
]

export function Benefits() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="benefits-title">
      <div className="container-xl">
        <SectionTitle
          eyebrow="De ce Astoria"
          id="benefits-title"
          title="Experiența noastră, *povestea ta*"
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-surface rounded-sm border border-border p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 group"
            >
              <span className="deco-number">{benefit.number}</span>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-normal mb-3">{benefit.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Trees, UtensilsCrossed, Waves, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionTitle } from '@/components/shared/SectionTitle'

const benefitIcons = [Trees, UtensilsCrossed, Waves, Sparkles]
const benefitNumbers = ['01', '02', '03', '04']

export function Benefits() {
  const { t } = useTranslation()
  const items = t('benefits.items', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <section className="py-20 md:py-28" aria-labelledby="benefits-title">
      <div className="container-xl">
        <SectionTitle
          eyebrow={t('benefits.eyebrow')}
          id="benefits-title"
          title={t('benefits.title')}
          className="mb-14"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((benefit, index) => {
            const Icon = benefitIcons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-surface rounded-sm border border-border p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 group"
              >
                <span className="deco-number">{benefitNumbers[index]}</span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-normal mb-3">{benefit.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

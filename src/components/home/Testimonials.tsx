import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslation } from 'react-i18next'
import { testimonials } from '@/data/testimonials'
import { SectionTitle } from '@/components/shared/SectionTitle'

export function Testimonials() {
  const { t } = useTranslation()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    breakpoints: { '(min-width: 768px)': { slidesToScroll: 1 }, '(min-width: 1024px)': { slidesToScroll: 1 } },
  })

  const scrollPrev = useRef(() => emblaApi?.scrollPrev())
  const scrollNext = useRef(() => emblaApi?.scrollNext())

  return (
    <section className="py-20 md:py-28" aria-labelledby="testimonials-title">
      <div className="container-xl">
        <SectionTitle
          eyebrow={t('testimonials.eyebrow')}
          id="testimonials-title"
          title={t('testimonials.title')}
          className="mb-14"
        />

        <div className="relative">
          <div className="overflow-hidden rounded-sm" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t_item) => (
                <div
                  key={t_item.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <motion.div
                    className="bg-surface rounded-sm border border-border p-6 md:p-8 h-full flex flex-col"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t_item.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    <blockquote className="text-sm text-text leading-relaxed flex-1 italic">
                      "{t_item.text}"
                    </blockquote>

                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-sm font-semibold">{t_item.name}</p>
                      <p className="text-xs text-text-muted">{t_item.source}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => scrollPrev.current?.()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label={t('testimonials.prevLabel')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollNext.current?.()}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label={t('testimonials.nextLabel')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

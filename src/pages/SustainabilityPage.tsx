import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

function AnimateOnScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-800 ${className}`}>
      {children}
    </div>
  )
}

const galleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate10.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate9.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate8.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate5.webp', alt: 'Hotel Astoria' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate3.webp', alt: 'Hotel Astoria' },
]

const featureImages = [
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate6.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate5.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate11.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate1.webp',
]

export function SustainabilityPage() {
  const { t } = useTranslation()

  const stats = t('sustainability.stats', { returnObjects: true }) as { value: string; unit: string; label: string }[]
  const features = t('sustainability.features', { returnObjects: true }) as { icon: string; title: string; paragraphs: string[]; alt: string; reverse: boolean; dark: boolean }[]
  const localItems = t('sustainability.localItems', { returnObjects: true }) as string[]
  const ecoItems = t('sustainability.ecoItems', { returnObjects: true }) as string[]

  return (
    <Layout>
      <Helmet>
        <title>{t('sustainability.metaTitle')}</title>
        <meta name="description" content={t('sustainability.metaDescription')} />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-[#5a8a76]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate2.webp')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary-light/60 to-[#5a8a76]/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(201, 169, 98, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(125, 155, 140, 0.2) 0%, transparent 50%)' }} />
        <div className="relative z-10 text-center px-4 max-w-[900px]">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block text-sm font-light tracking-[0.3em] uppercase text-accent-light mb-6">
            Hotel Astoria Alba Iulia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-display text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-6">
            {t('sustainability.heroTitle')}
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="w-20 h-0.5 bg-accent mx-auto mb-6 relative">
            <span className="absolute left-[-30px] top-1/2 -translate-y-1/2 text-2xl">🌿</span>
            <span className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-2xl">🌿</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="font-display text-xl md:text-2xl italic text-[#a8c4b5] max-w-[700px] mx-auto leading-relaxed">
            {t('sustainability.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-surface py-16 md:py-24">
        <AnimateOnScroll className="max-w-[900px] mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary mb-6">{t('sustainability.introTitle')}</h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-[800px] mx-auto">{t('sustainability.introText')}</p>
        </AnimateOnScroll>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-[1400px] mx-auto px-4">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-400">
              <div className="font-display text-3xl md:text-5xl font-semibold text-accent leading-none mb-2">
                {stat.value} <span className="text-xl md:text-2xl font-normal">{stat.unit}</span>
              </div>
              <p className="text-xs md:text-sm text-[#a8c4b5] leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Sections */}
      {features.map((feature, idx) => (
        <section key={idx} className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className={`relative overflow-hidden min-h-[300px] lg:min-h-[500px] order-1 ${feature.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <img src={featureImages[idx]} alt={feature.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 hover:scale-105" />
          </div>
          <div className={`flex flex-col justify-center px-6 md:px-16 py-12 order-2 ${feature.reverse ? 'lg:order-1' : 'lg:order-2'} ${feature.dark ? 'bg-primary text-[#a8c4b5]' : 'bg-surface text-text-muted'}`}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-4xl md:text-5xl block mb-6">{feature.icon}</span>
              <h3 className={`font-display text-2xl md:text-3xl font-normal mb-5 ${feature.dark ? 'text-accent' : 'text-primary'}`}>{feature.title}</h3>
              {feature.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed mb-4 last:mb-0">{p}</p>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Gallery */}
      <section className="bg-[#ebe7df] py-16 md:py-24">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary">{t('sustainability.galleryTitle')}</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-[1400px] mx-auto px-4">
          {galleryImages.map((img, index) => (
            <div key={img.src} className={`relative overflow-hidden rounded-lg group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" style={{ minHeight: index === 0 ? '560px' : '260px' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Local Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <AnimateOnScroll className="bg-bg px-6 md:px-16 py-12 md:py-16 flex flex-col justify-center">
          <h3 className="font-display text-2xl md:text-3xl font-normal text-primary mb-6">{t('sustainability.localTitle')}</h3>
          <p className="text-base text-text-muted leading-relaxed mb-6">{t('sustainability.localText')}</p>
          <ul className="space-y-3">
            {localItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="text-accent font-semibold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
        <AnimateOnScroll className="bg-primary px-6 md:px-16 py-12 md:py-16 flex flex-col justify-center">
          <h3 className="font-display text-2xl md:text-3xl font-normal text-accent mb-6">{t('sustainability.ecoTitle')}</h3>
          <p className="text-base text-[#a8c4b5] leading-relaxed mb-4">{t('sustainability.ecoText1')}</p>
          <p className="text-base text-[#a8c4b5] leading-relaxed mb-6">{t('sustainability.ecoText2')}</p>
          <ul className="space-y-3">
            {ecoItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#a8c4b5]">
                <span className="text-accent font-semibold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </section>

      {/* Education Section */}
      <section className="bg-[#ebe7df] py-16 md:py-24">
        <AnimateOnScroll className="max-w-[900px] mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary mb-6">{t('sustainability.eduTitle')}</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">{t('sustainability.eduText')}</p>
          <div className="bg-surface p-8 md:p-12 rounded-xl shadow-xl border-l-4 border-accent text-left" style={{ boxShadow: '0 20px 60px rgba(26, 58, 47, 0.1)' }}>
            <p className="text-lg md:text-xl italic text-text leading-relaxed">{t('sustainability.eduQuote')}</p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* School Visit Form */}
      <section id="scoala-verde" className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
        <div className="relative z-10 max-w-[700px] mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-6xl block mb-6">🌱</span>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-4">{t('sustainability.schoolTitle')}</h2>
            <p className="text-lg text-[#a8c4b5]">{t('sustainability.schoolSubtitle')}</p>
          </div>
          <form className="bg-surface p-6 md:p-12 rounded-xl" style={{ boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)' }} action="https://formsubmit.co/iuliagus@floreagrup.ro" method="POST">
            <input type="hidden" name="_subject" value="Cerere vizită Școala Verde - Hotel Astoria" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://astoriahotels.ro/multumim" />
            <div className="space-y-5">
              <div>
                <label htmlFor="sust-nume" className="block text-sm font-medium text-primary mb-1.5">
                  {t('sustainability.formName')} <span className="text-error">*</span>
                </label>
                <input id="sust-nume" type="text" name="Nume și Prenume" required placeholder={t('sustainability.formNamePlaceholder')} className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] transition-all" />
              </div>
              <div>
                <label htmlFor="sust-institutie" className="block text-sm font-medium text-primary mb-1.5">
                  {t('sustainability.formSchool')} <span className="text-error">*</span>
                </label>
                <input id="sust-institutie" type="text" name="Instituția de învățământ" required placeholder={t('sustainability.formSchoolPlaceholder')} className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sust-oras" className="block text-sm font-medium text-primary mb-1.5">
                    {t('sustainability.formCity')} <span className="text-error">*</span>
                  </label>
                  <input id="sust-oras" type="text" name="Oraș" required placeholder={t('sustainability.formCityPlaceholder')} className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] transition-all" />
                </div>
                <div>
                  <label htmlFor="sust-data" className="block text-sm font-medium text-primary mb-1.5">
                    {t('sustainability.formDate')} <span className="text-error">*</span>
                  </label>
                  <input id="sust-data" type="text" name="Data Dorită" required placeholder={t('sustainability.formDatePlaceholder')} className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="sust-mesaj" className="block text-sm font-medium text-primary mb-1.5">
                  {t('sustainability.formMessage')}
                </label>
                <textarea id="sust-mesaj" name="Mesaj" rows={3} placeholder={t('sustainability.formMessagePlaceholder')} className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] transition-all resize-none" />
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-br from-primary to-primary-light text-white font-medium rounded-lg text-base tracking-wider uppercase hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                {t('sustainability.formSubmit')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

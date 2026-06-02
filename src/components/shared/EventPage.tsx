import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

interface Feature {
  num?: string
  title: string
  text: string
  tag?: string
}

interface Reason {
  icon: string
  title?: string
  text: string
}

interface EventPageProps {
  namespace: string
  heroSlides: string[]
  galleryImages: string[]
  features: Feature[]
  includedBenefits: string[]
  optionalBenefits: string[]
  reasons: Reason[]
  hasWhySection?: boolean
}

export function EventPage({
  namespace,
  heroSlides,
  galleryImages,
  features,
  includedBenefits,
  optionalBenefits,
  reasons,
  hasWhySection = true,
}: EventPageProps) {
  const { t } = useTranslation()
  const ns = namespace

  const [slideIdx, setSlideIdx] = useState(0)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const openLb = useCallback((idx: number) => {
    setLbIdx(idx)
    setLbOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLb = useCallback(() => {
    setLbOpen(false)
    document.body.style.overflow = ''
  }, [])

  const navLb = useCallback((dir: number) => {
    setLbIdx((prev) => (prev + dir + galleryImages.length) % galleryImages.length)
  }, [galleryImages.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lbOpen) return
      if (e.key === 'Escape') closeLb()
      if (e.key === 'ArrowLeft') navLb(-1)
      if (e.key === 'ArrowRight') navLb(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lbOpen, closeLb, navLb])

  return (
    <Layout>
      <Helmet>
        <title>{t(`${ns}.metaTitle`)}</title>
        <meta name="description" content={t(`${ns}.metaDescription`)} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={t(`${ns}.altHero`)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === slideIdx ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/45 to-[#0a1912]/65" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.25em] uppercase text-accent mb-5"
          >
            {t(`${ns}.heroEyebrow`, 'Hotel Astoria · Alba Iulia')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6"
          >
            {t(`${ns}.heroTitle`)} <em className="italic text-accent-light">{t(`${ns}.heroTitleItalic`)}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm md:text-base font-light text-white/80 max-w-[540px] mx-auto mb-10 leading-relaxed"
          >
            {t(`${ns}.heroSubtitle`)}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="mailto:evenimente@astoriahotels.ro"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-primary bg-accent px-10 py-4 rounded-sm hover:bg-accent-light hover:-translate-y-0.5 transition-all duration-200"
            >
              {t(`${ns}.heroCta1`)}
            </a>
            <a
              href="#galerie"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-white border border-white/50 px-10 py-4 rounded-sm hover:border-accent hover:bg-accent/10 transition-all duration-200"
            >
              {t(`${ns}.heroCta2`)}
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[0.68rem] tracking-[0.15em] uppercase z-10 animate-bounce">
          {t(`${ns}.heroDiscover`)}
          <span className="block w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Intro */}
      <section className="bg-primary py-20 md:py-24 text-center">
        <div className="w-15 h-px bg-accent mx-auto mb-8" />
        <p
          className="font-display text-xl md:text-2xl font-light italic text-accent max-w-[720px] mx-auto px-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t(`${ns}.introText`) }}
        />
      </section>

      {/* Features */}
      <section className="py-24 md:py-28 bg-bg" id="avantaje">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">
            {t(`${ns}.featuresEyebrow`)}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            {t(`${ns}.featuresTitle`)} <em className="italic">{t(`${ns}.featuresTitleItalic`)}</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px max-w-[1200px] mx-auto px-6 bg-[#EDE7DC]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface px-10 py-12 md:py-14 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-accent transition-all duration-400 group-hover:h-full" />
              {f.num && (
                <span className="font-display text-5xl font-light text-[#EDE7DC] leading-none block mb-5">{f.num}</span>
              )}
              <h3 className="font-display text-xl font-semibold text-primary mb-4 leading-tight">{f.title}</h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: f.text }} />
              {f.tag && (
                <span className="inline-block mt-4 text-xs text-accent font-medium">{f.tag}</span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-28 bg-[#EDE7DC]" id="galerie">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">
            {t(`${ns}.galleryEyebrow`)}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            {t(`${ns}.galleryTitle`)} <em className="italic">{t(`${ns}.galleryTitleItalic`)}</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
          {galleryImages.map((src, i) => {
            const isDouble = i === 0 || i === 8 || i === 16
            const isWide = i === 4 || i === 13
            return (
              <div
                key={src}
                className={`relative group cursor-pointer overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''} ${isWide ? 'md:col-span-2' : ''} ${isDouble && i !== 0 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 0 ? 'h-[560px]' : 'h-[280px]'} ${isDouble && i !== 0 ? 'md:h-[560px]' : ''}`}
                onClick={() => openLb(i)}
              >
                <div className="absolute inset-0 bg-[#EDE7DC]" />
                <img
                  src={src}
                  alt={`${t(`${ns}.galleryAlt`)} ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/35 transition-all duration-400 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-80 group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lbOpen && (
        <div className="fixed inset-0 z-[1000] bg-[#0a120e]/96 flex items-center justify-center" onClick={(e) => { if (e.target === e.currentTarget) closeLb() }}>
          <button onClick={closeLb} className="absolute top-6 right-8 text-3xl text-white/70 hover:text-white font-display font-light transition-colors bg-none border-none cursor-pointer">×</button>
          <button onClick={() => navLb(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 bg-accent/15 border border-accent/30 text-white flex items-center justify-center text-xl hover:bg-accent/30 transition-all cursor-pointer">&#8592;</button>
          <img src={galleryImages[lbIdx]} alt="" className="max-w-[90vw] max-h-[88vh] object-contain border border-accent/20" />
          <button onClick={() => navLb(1)} className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 bg-accent/15 border border-accent/30 text-white flex items-center justify-center text-xl hover:bg-accent/30 transition-all cursor-pointer">&#8594;</button>
        </div>
      )}

      {/* Benefits */}
      <section className="bg-primary py-24 md:py-28" id="beneficii">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">
            {t(`${ns}.benefitsEyebrow`)}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-accent">
            {t(`${ns}.benefitsTitle`)} <em className="italic text-accent-light">{t(`${ns}.benefitsTitleItalic`)}</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="font-display text-lg font-semibold text-accent-light mb-7 pb-4 border-b border-accent/30">
              {t(`${ns}.includedTitle`)}
            </h3>
            <ul className="space-y-0">
              {includedBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3.5 py-2.5 text-sm font-light text-white/80 leading-relaxed border-b border-white/6" dangerouslySetInnerHTML={{ __html: '✦ ' + b }} />
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h3 className="font-display text-lg font-semibold text-accent-light mb-7 pb-4 border-b border-accent/30">
              {t(`${ns}.optionalTitle`)}
            </h3>
            <ul className="space-y-0">
              {optionalBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3.5 py-2.5 text-sm font-light text-white/80 leading-relaxed border-b border-white/6">
                  <span className="text-accent text-[0.6rem] mt-1 shrink-0">✦</span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="font-display italic text-sm text-accent-light mt-5">{t(`${ns}.optionalNote`)}</p>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      {hasWhySection && (
        <section className="py-24 md:py-28 bg-bg">
          <div className="text-center mb-16 px-6">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">
              {t(`${ns}.whyEyebrow`)}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
              {t(`${ns}.whyTitle`)} <em className="italic">{t(`${ns}.whyTitleItalic`)}</em>
            </h2>
            <div className="w-12 h-px bg-accent mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-[1100px] mx-auto px-6">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center px-6 py-10 bg-surface border-b-2 border-transparent hover:border-accent hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl block mb-4">{r.icon}</span>
                {r.title && <h4 className="font-display text-lg font-semibold text-primary mb-2.5">{r.title}</h4>}
                <p className="text-sm font-light text-text-muted leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative py-28 md:py-32 text-center bg-primary-light overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[28rem] text-white/[0.025] font-display pointer-events-none leading-none select-none" aria-hidden="true">∞</span>
        <div className="relative z-10 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-5">
            {t(`${ns}.ctaEyebrow`)}
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            {t(`${ns}.ctaTitle`)} <em className="italic text-accent-light">{t(`${ns}.ctaTitleItalic`)}</em>
            {t(`${ns}.ctaTitleEnd`) && <><br />{t(`${ns}.ctaTitleEnd`)}</>}
          </h2>
          <p className="text-sm md:text-base font-light text-white/70 mb-12 leading-relaxed">
            {t(`${ns}.ctaSubtitle`)}
          </p>
          <div className="flex gap-10 justify-center flex-wrap mb-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-white/45">Email</span>
              <a href="mailto:evenimente@astoriahotels.ro" className="font-display text-lg text-accent-light hover:text-white transition-colors">
                evenimente@astoriahotels.ro
              </a>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-white/45">{t('common.phone')}</span>
              <a href="tel:+40731190948" className="font-display text-lg text-accent-light hover:text-white transition-colors">
                0731 190 948
              </a>
            </div>
          </div>
          <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-primary bg-accent px-10 py-4 rounded-sm hover:bg-accent-light hover:-translate-y-0.5 transition-all duration-200">
            {t(`${ns}.ctaBtn`)}
          </a>
        </div>
      </section>
    </Layout>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Layout } from '@/components/layout/Layout'

const base = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/pooparty-astoria'
const heroSlides = [`${base}1.webp`, `${base}4.webp`, `${base}7.webp`]
const galleryImages = Array.from({ length: 9 }, (_, i) => `${base}${i + 1}.webp`)

export function PoolPartyPage() {
  const { t } = useTranslation()
  const [slideIdx, setSlideIdx] = useState(0)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)

  const features = t('poolParty.features', { returnObjects: true }) as { num: string; title: string; text: string; tag?: string }[]
  const extraCards = t('poolParty.extraCards', { returnObjects: true }) as { icon: string; title: string; text: string }[]

  useEffect(() => {
    const interval = setInterval(() => setSlideIdx((p) => (p + 1) % heroSlides.length), 5500)
    return () => clearInterval(interval)
  }, [])

  const openLb = useCallback((idx: number) => { setLbIdx(idx); setLbOpen(true); document.body.style.overflow = 'hidden' }, [])
  const closeLb = useCallback(() => { setLbOpen(false); document.body.style.overflow = '' }, [])
  const navLb = useCallback((dir: number) => { setLbIdx((p) => (p + dir + galleryImages.length) % galleryImages.length) }, [])

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
        <title>{t('poolParty.metaTitle')}</title>
        <meta name="description" content={t('poolParty.metaDescription')} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <img key={src} src={src} alt={t('poolParty.altHero')} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1400 ${i === slideIdx ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,25,35,.3) 0%, rgba(14,40,55,.5) 40%, rgba(5,15,20,.82) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(26,154,176,.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(240,180,41,.08) 0%, transparent 50%)' }} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs font-medium tracking-[0.28em] uppercase mb-4" style={{ color: '#3DBDD4' }}>
            {t('poolParty.heroEyebrow')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-5">
            {t('poolParty.heroTitleLine1')}<br /><em style={{ color: '#FFD166' }} className="italic">{t('poolParty.heroTitleLine2')}</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-body text-sm md:text-base font-light text-white/80 max-w-[560px] mx-auto mb-10 leading-relaxed">
            {t('poolParty.heroFullSubtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200" style={{ color: '#0E1E1A', background: '#F0B429' }}>
              {t('poolParty.heroCta1')}
            </a>
            <a href="#galerie" className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-white px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200 border" style={{ borderColor: 'rgba(61,189,212,.6)' }}>
              {t('poolParty.heroCta2')}
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[0.68rem] tracking-[0.15em] uppercase z-10 animate-bounce">
          {t('poolParty.heroDiscover')}
          <span className="block w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Intro */}
      <section className="bg-primary py-20 md:py-24 text-center">
        <div className="w-15 h-px mx-auto mb-8" style={{ backgroundColor: '#3DBDD4' }} />
        <p className="font-display text-xl md:text-2xl font-light italic text-accent max-w-[780px] mx-auto px-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('poolParty.fullIntroText') }} />
      </section>

      {/* Features */}
      <section className="py-24 md:py-28" id="avantaje" style={{ background: '#EBF8FC' }}>
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#1A9AB0' }}>{t('poolParty.featuresEyebrow')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            {t('poolParty.fullFeaturesTitle')}<br /><em className="italic">{t('poolParty.fullFeaturesTitleItalic')}</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#1A9AB0' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px max-w-[1200px] mx-auto px-6" style={{ background: 'rgba(26,154,176,.12)' }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="bg-surface px-10 py-12 md:py-14 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: 'linear-gradient(90deg, #1A9AB0, #F0B429)' }} />
              <h3 className="font-display text-xl font-semibold text-primary mb-4 leading-tight">{f.title}</h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: f.text }} />
              {f.tag && <span className="inline-block mt-4 text-xs font-semibold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-sm border" style={{ color: '#1A9AB0', background: 'rgba(26,154,176,.1)', borderColor: 'rgba(26,154,176,.35)' }}>{f.tag}</span>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-28 bg-primary" id="galerie">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#3DBDD4' }}>{t('poolParty.galleryEyebrow')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-accent">
            {t('poolParty.fullGalleryTitle')} <em className="italic" style={{ color: '#FFD166' }}>{t('poolParty.fullGalleryTitleItalic')}</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#3DBDD4' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-1 px-1 max-w-full">
          {galleryImages.map((src, i) => {
            const spans = ['col-span-2 md:col-span-5 md:row-span-2','col-span-1 md:col-span-4','col-span-1 md:col-span-3','col-span-1 md:col-span-3','col-span-1 md:col-span-4','col-span-1 md:col-span-4','col-span-1 md:col-span-4','col-span-1 md:col-span-4','col-span-2 md:col-span-12']
            return (
              <div key={src} className={`relative group cursor-pointer overflow-hidden ${spans[i]} h-[200px] md:h-[210px] ${i === 0 ? 'md:h-[420px]' : ''} ${i === 8 ? 'md:h-[210px]' : ''}`} onClick={() => openLb(i)}>
                <div className="absolute inset-0 bg-[#0D1F1A]" />
                <img src={src} alt={`${t('poolParty.galleryAlt')} ${i + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                <div className="absolute inset-0 transition-all duration-400 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lbOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center" style={{ background: 'rgba(5,18,25,.97)' }} onClick={(e) => { if (e.target === e.currentTarget) closeLb() }}>
          <button onClick={closeLb} className="absolute top-6 right-8 text-3xl text-white/70 hover:text-white font-display font-light transition-colors bg-none border-none cursor-pointer">×</button>
          <button onClick={() => navLb(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl hover:bg-azure/30 transition-all cursor-pointer" style={{ background: 'rgba(26,154,176,.15)', border: '1px solid rgba(26,154,176,.35)', color: 'white' }}>&#8592;</button>
          <img src={galleryImages[lbIdx]} alt="" className="max-w-[90vw] max-h-[88vh] object-contain" style={{ border: '1px solid rgba(26,154,176,.3)' }} />
          <button onClick={() => navLb(1)} className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl hover:bg-azure/30 transition-all cursor-pointer" style={{ background: 'rgba(26,154,176,.15)', border: '1px solid rgba(26,154,176,.35)', color: 'white' }}>&#8594;</button>
        </div>
      )}

      {/* Extra Info */}
      <section className="py-24 md:py-28" id="info" style={{ background: '#EBF8FC' }}>
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#1A9AB0' }}>{t('poolParty.extraInfoEyebrow')}</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            {t('poolParty.extraInfoTitle')} <em className="italic">{t('poolParty.extraInfoTitleItalic')}</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#1A9AB0' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[1100px] mx-auto px-6">
          {extraCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-surface px-9 py-11 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <h3 className="font-display text-xl font-semibold text-primary mb-3.5 flex items-center gap-3">
                <span className="text-2xl">{card.icon}</span> {card.title}
              </h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: card.text }} />
            </motion.div>
          ))}
        </div>
        <div className="max-w-[900px] mx-auto px-6 mt-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-7 md:p-9 border-l-4 text-sm font-light leading-relaxed" style={{ background: '#FFF8EC', borderColor: '#F0B429', color: '#3A4A47' }} dangerouslySetInnerHTML={{ __html: t('poolParty.importantNote') }} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-32 text-center overflow-hidden" style={{ background: '#0E1E1A' }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] text-white/[0.025] font-display pointer-events-none leading-none select-none" aria-hidden="true">~</span>
        <div className="relative z-10 px-6">
          <span className="text-xs font-medium tracking-[0.28em] uppercase block mb-5" style={{ color: '#3DBDD4' }}>{t('poolParty.ctaFullEyebrow')}</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            {t('poolParty.ctaFullTitle')}<br /><em className="italic" style={{ color: '#FFD166' }}>{t('poolParty.ctaFullTitleItalic')}</em>
          </h2>
          <p className="text-sm md:text-base font-light text-white/65 mb-12 leading-relaxed">{t('poolParty.ctaFullSubtitle')}</p>
          <div className="flex gap-10 justify-center flex-wrap mb-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,.38)' }}>Email</span>
              <a href="mailto:evenimente@astoriahotels.ro" className="font-display text-lg transition-colors" style={{ color: '#3DBDD4' }}>evenimente@astoriahotels.ro</a>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,.38)' }}>{t('common.phone')}</span>
              <a href="tel:+40731190948" className="font-display text-lg transition-colors" style={{ color: '#3DBDD4' }}>0731 190 948</a>
            </div>
          </div>
          <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200" style={{ color: '#0E1E1A', background: '#F0B429' }}>{t('poolParty.ctaFullBtn')}</a>
        </div>
      </section>
    </Layout>
  )
}

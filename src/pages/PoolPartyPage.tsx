import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const base = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/pooparty-astoria'

const heroSlides = [
  `${base}1.webp`,
  `${base}4.webp`,
  `${base}7.webp`,
]

const galleryImages = Array.from({ length: 9 }, (_, i) =>
  `${base}${i + 1}.webp`
)

const features = [
  {
    num: '01',
    title: 'Exclusivitate pentru evenimente de amploare',
    text: 'Pentru evenimentele cu <strong>peste 300 de persoane</strong>, oferim exclusivitate asupra locației, astfel încât petrecerea să se desfășoare fără restricții, într-un cadru dedicat integral participanților.',
    tag: '✦ Exclusivitate totală',
  },
  {
    num: '02',
    title: 'Petrecere fără griji, indiferent de vreme',
    text: 'Un avantaj unic al Hotelului Astoria este flexibilitatea: în caz de vreme nefavorabilă, Pool Party-ul se poate muta rapid în interior, locația dispunând de o <strong>sală de evenimente cu o capacitate de până la 350 de persoane</strong>. Distracția continuă fără compromisuri.',
    tag: '✦ Backup interior 350 persoane',
  },
  {
    num: '03',
    title: 'Design de eveniment personalizat',
    text: 'Locația beneficiază de <strong>două căi de acces</strong>, oferind libertate totală în realizarea unui design de eveniment unic. Există multiple variante pentru amplasarea meselor, a ringului de dans sau a zonelor de socializare, adaptate conceptului ales.',
    tag: '',
  },
  {
    num: '04',
    title: 'Sunet, lumini și show la piscină',
    text: 'Pool Party-urile la Astoria sunt completate de <strong>sonorizare profesională</strong> și lumini dedicate în zona piscinei. Posibilitatea amplasării <strong>standului DJ-ului pe platforma de deasupra piscinei</strong> creează un efect vizual spectaculos și o experiență cu adevărat unică.',
    tag: '✦ DJ pe platforma piscinei',
  },
  {
    num: '05',
    title: 'Beneficiile unui hotel premium',
    text: 'Organizarea unui Pool Party la Hotel Astoria vine cu aceleași beneficii ca o locație hotelieră premium: <strong>confort, servicii profesioniste și logistică bine pusă la punct</strong>. Mai mult, beneficiezi de tarife preferențiale la cazare și posibilitatea de a servi <strong>micul dejun sau brunch-ul a doua zi</strong>.',
    tag: '',
  },
]

const extraCards = [
  {
    icon: '🎉',
    title: 'Tipuri de evenimente',
    text: 'Petrecerile la piscină sunt o soluție ideală pentru <strong>evenimente corporate</strong>, dar și pentru <strong>nunți, botezuri sau majorate</strong> — orice ocazie merită un cadru spectaculos.',
  },
  {
    icon: '🌙',
    title: 'Cazare & brunch',
    text: 'Distracția nu trebuie să se oprească: beneficiezi de <strong>tarife preferențiale la cazare</strong> pentru invitați și posibilitatea unui <strong>brunch elegant a doua zi</strong> dimineața.',
  },
  {
    icon: '⚠️',
    title: 'Siguranță & taxe',
    text: 'Siguranța participanților revine <strong>organizatorului evenimentului</strong>, care asigură respectarea regulilor pe întreaga durată. Pentru exclusivitate și zona piscinei se percep <strong>taxe suplimentare</strong> în funcție de complexitatea evenimentului.',
  },
]

export function PoolPartyPage() {
  const [slideIdx, setSlideIdx] = useState(0)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

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
  }, [])

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
        <title>Pool Party la Hotel Astoria Alba Iulia — Distracție la piscină</title>
        <meta name="description" content="Organizează cel mai spectaculos Pool Party la Hotel Astoria Alba Iulia — piscină exclusivă, DJ pe platformă, sonorizare profesională, sală backup 350 persoane." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Pool Party Hotel Astoria"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1400 ${
                i === slideIdx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(10,25,35,.3) 0%, rgba(14,40,55,.5) 40%, rgba(5,15,20,.82) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 20% 80%, rgba(26,154,176,.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(240,180,41,.08) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.28em] uppercase mb-4"
            style={{ color: '#3DBDD4' }}
          >
            Hotel Astoria · Alba Iulia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-5"
          >
            Pool Party.<br /><em style={{ color: '#FFD166' }} className="italic">La un alt nivel.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm md:text-base font-light text-white/80 max-w-[560px] mx-auto mb-10 leading-relaxed"
          >
            Atmosfera vibrantă, spațiul generos și posibilitățile multiple de personalizare fac din Astoria alegerea perfectă pentru evenimente de impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <a
              href="mailto:evenimente@astoriahotels.ro"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200"
              style={{ color: '#0E1E1A', background: '#F0B429' }}
            >
              Cere ofertă personalizată
            </a>
            <a
              href="#galerie"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-white px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200 border"
              style={{ borderColor: 'rgba(61,189,212,.6)' }}
            >
              Vezi galeria
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-[0.68rem] tracking-[0.15em] uppercase z-10 animate-bounce">
          Descoperă
          <span className="block w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Intro */}
      <section className="bg-primary py-20 md:py-24 text-center">
        <div className="w-15 h-px mx-auto mb-8" style={{ backgroundColor: '#3DBDD4' }} />
        <p className="font-display text-xl md:text-2xl font-light italic text-accent max-w-[780px] mx-auto px-6 leading-relaxed">
          De ce să organizezi un eveniment obișnuit când poți să găzduiești un <strong className="not-italic font-semibold" style={{ color: '#3DBDD4' }}>Pool Party memorabil la Hotel Astoria</strong>? Cu o experiență vastă în organizarea petrecerilor în aer liber, echipa Astoria poate transforma orice eveniment <strong className="not-italic font-semibold" style={{ color: '#3DBDD4' }}>într-un party de neuitat</strong>.
        </p>
      </section>

      {/* Features */}
      <section className="py-24 md:py-28" id="avantaje" style={{ background: '#EBF8FC' }}>
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#1A9AB0' }}>Ce oferim</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            Experiența verii,<br /><em className="italic">fără compromisuri</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#1A9AB0' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px max-w-[1200px] mx-auto px-6" style={{ background: 'rgba(26,154,176,.12)' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface px-10 py-12 md:py-14 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: 'linear-gradient(90deg, #1A9AB0, #F0B429)' }} />
              <h3 className="font-display text-xl font-semibold text-primary mb-4 leading-tight">{f.title}</h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: f.text }} />
              {f.tag && (
                <span className="inline-block mt-4 text-xs font-semibold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-sm border" style={{ color: '#1A9AB0', background: 'rgba(26,154,176,.1)', borderColor: 'rgba(26,154,176,.35)' }}>
                  {f.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-28 bg-primary" id="galerie">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#3DBDD4' }}>Galerie foto</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-accent">
            Vibes de <em className="italic" style={{ color: '#FFD166' }}>vară</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#3DBDD4' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-1 px-1 max-w-full">
          {galleryImages.map((src, i) => {
            const spans = [
              'col-span-2 md:col-span-5 md:row-span-2',
              'col-span-1 md:col-span-4',
              'col-span-1 md:col-span-3',
              'col-span-1 md:col-span-3',
              'col-span-1 md:col-span-4',
              'col-span-1 md:col-span-4',
              'col-span-1 md:col-span-4',
              'col-span-1 md:col-span-4',
              'col-span-2 md:col-span-12',
            ]
            return (
              <div
                key={src}
                className={`relative group cursor-pointer overflow-hidden ${spans[i]} h-[200px] md:h-[210px] ${i === 0 ? 'md:h-[420px]' : ''} ${i === 8 ? 'md:h-[210px]' : ''}`}
                onClick={() => openLb(i)}
              >
                <div className="absolute inset-0 bg-[#0D1F1A]" />
                <img
                  src={src}
                  alt={`Pool Party Hotel Astoria fotografie ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-106"
                />
                <div className="absolute inset-0 transition-all duration-400 flex items-center justify-center" style={{ background: 'rgba(26,154,176,0)' }}>
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
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: 'rgba(5,18,25,.97)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeLb() }}
        >
          <button onClick={closeLb} className="absolute top-6 right-8 text-3xl text-white/70 hover:text-white font-display font-light transition-colors bg-none border-none cursor-pointer">×</button>
          <button onClick={() => navLb(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl hover:bg-azure/30 transition-all cursor-pointer" style={{ background: 'rgba(26,154,176,.15)', border: '1px solid rgba(26,154,176,.35)', color: 'white' }}>&#8592;</button>
          <img src={galleryImages[lbIdx]} alt="Galerie" className="max-w-[90vw] max-h-[88vh] object-contain" style={{ border: '1px solid rgba(26,154,176,.3)' }} />
          <button onClick={() => navLb(1)} className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl hover:bg-azure/30 transition-all cursor-pointer" style={{ background: 'rgba(26,154,176,.15)', border: '1px solid rgba(26,154,176,.35)', color: 'white' }}>&#8594;</button>
        </div>
      )}

      {/* Extra Info */}
      <section className="py-24 md:py-28" id="info" style={{ background: '#EBF8FC' }}>
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#1A9AB0' }}>De știut</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            Potrivit pentru <em className="italic">orice eveniment</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#1A9AB0' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-[1100px] mx-auto px-6">
          {extraCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface px-9 py-11 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              style={{ borderTop: '3px solid transparent' }}
            >
              <h3 className="font-display text-xl font-semibold text-primary mb-3.5 flex items-center gap-3">
                <span className="text-2xl">{card.icon}</span> {card.title}
              </h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: card.text }} />
            </motion.div>
          ))}
        </div>
        <div className="max-w-[900px] mx-auto px-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-7 md:p-9 border-l-4 text-sm font-light leading-relaxed"
            style={{ background: '#FFF8EC', borderColor: '#F0B429', color: '#3A4A47' }}
          >
            <strong style={{ color: '#0E1E1A' }}>Important!</strong> Pentru buna desfășurare a Pool Party-urilor, siguranța participanților revine organizatorului evenimentului, care are responsabilitatea de a se asigura că regulile de siguranță sunt respectate atât în zona piscinei, cât și în spațiile adiacente. Pentru organizarea evenimentelor la piscină și/sau pentru exclusivitate se percep taxe suplimentare, stabilite în funcție de dimensiunea și complexitatea evenimentului.
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-32 text-center overflow-hidden" style={{ background: '#0E1E1A' }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] text-white/[0.025] font-display pointer-events-none leading-none select-none" aria-hidden="true">~</span>
        <div className="relative z-10 px-6">
          <span className="text-xs font-medium tracking-[0.28em] uppercase block mb-5" style={{ color: '#3DBDD4' }}>Vara aceasta</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            Fă valuri cu<br />un pool party <em className="italic" style={{ color: '#FFD166' }}>de neuitat</em>
          </h2>
          <p className="text-sm md:text-base font-light text-white/65 mb-12 leading-relaxed">Cere o ofertă personalizată și echipa Astoria va construi alături de tine experiența perfectă de vară.</p>
          <div className="flex gap-10 justify-center flex-wrap mb-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,.38)' }}>Email</span>
              <a href="mailto:evenimente@astoriahotels.ro" className="font-display text-lg transition-colors" style={{ color: '#3DBDD4' }}>evenimente@astoriahotels.ro</a>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,.38)' }}>Telefon</span>
              <a href="tel:+40731190948" className="font-display text-lg transition-colors" style={{ color: '#3DBDD4' }}>0731 190 948</a>
            </div>
          </div>
          <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200" style={{ color: '#0E1E1A', background: '#F0B429' }}>Trimite cererea acum</a>
        </div>
      </section>
    </Layout>
  )
}

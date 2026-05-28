import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const base = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/majorat-astoria'

const heroSlides = [
  `${base}1.webp`,
  `${base}3.webp`,
  `${base}5.webp`,
]

const galleryImages = Array.from({ length: 5 }, (_, i) =>
  `${base}${i + 1}.webp`
)

const features = [
  {
    num: '01',
    title: 'Spațiu de eveniment perfect pentru distracție',
    text: 'Sala de evenimente este gândită pentru <strong>energie maximă și distracție non-stop</strong>, dotată cu <strong>ring de dans premium cu parchet special</strong>, ideal pentru party, dans și momente wow alături de prieteni. Sunetul, luminile și spațiul generos creează vibe-ul perfect pentru o petrecere reușită.',
  },
  {
    num: '02',
    title: 'After party la piscină — experiență exclusivă',
    text: 'Unul dintre cele mai mari avantaje ale locației este <strong>accesul la after party la piscină</strong>, un concept <strong>unic în Alba Iulia</strong>. În lunile de vară, distracția continuă într-un cadru relaxat și cool, perfect pentru socializare, muzică bună și amintiri de neuitat.',
    tag: '✦ Unic în Alba Iulia',
  },
  {
    num: '03',
    title: 'Spații ideale pentru poze și momente speciale',
    text: 'Hotel Astoria oferă multiple zone perfecte pentru <strong>ședințe foto de majorat</strong> — de la spațiile moderne interioare, până la <strong>curtea interioară privată</strong> și zona piscinei. Fiecare colț al locației este gândit pentru cadre spectaculoase, perfecte pentru social media.',
    tag: '✦ Ședință foto gratuită',
  },
  {
    num: '04',
    title: 'Camere spațioase pentru confort și relaxare',
    text: 'Pentru invitați sau pentru sărbătorit, punem la dispoziție <strong>camere spațioase și confortabile</strong>, ideale pentru relaxare, schimbări rapide de outfit sau pauze între momentele de distracție. Invitații pot beneficia de <strong>până la 15% reducere la cazare</strong>, în funcție de disponibilitate.',
  },
]

const includedBenefits = [
  '<strong>Cameră gratuită pentru aniversat</strong> în ziua majoratului',
  'Parcare gratuită pentru toți invitații',
  'Cutie de dar',
  'Covor roșu la intrare',
  'Numere de mese',
  'Arcadă de flori la intrare',
  'Asistență în organizarea evenimentului',
  'Ședință foto gratuită în incinta hotelului',
]

const optionalBenefits = [
  'Huse de scaune',
  'Meniu tipărit pe mese',
  'Aranjamente florale pentru mese',
  'Lemonade bar',
  'Fântână de ciocolată',
  'Sonorizare profesională',
  'Cazare pentru invitați (reducere până la 15%)',
  'Acces piscină — after party exclusiv',
]

const reasons = [
  { icon: '🏊', title: 'After party la piscină', text: 'Concept unic în Alba Iulia — distracția continuă în aer liber vara, într-un cadru exclusiv' },
  { icon: '🌅', title: 'Terasă exterioară', text: 'Spațiu de relaxare și socializare pentru pauze între momentele de party' },
  { icon: '📸', title: 'Spații foto premium', text: 'Curtea interioară, zona piscinei și spațiile moderne — perfecte pentru social media' },
  { icon: '🛏️', title: 'Cazare avantajoasă', text: 'Camere confortabile cu până la 15% reducere pentru invitații majoratului tău' },
]

export function MajoratPage() {
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
        <title>Majorat la Hotel Astoria Alba Iulia — Petrecere de neuitat</title>
        <meta name="description" content="Organizează petrecerea de majorat la Hotel Astoria din Alba Iulia — ring de dans premium, after party la piscină, spații foto și beneficii exclusive pentru aniversat." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Majorat Hotel Astoria"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1400 ${
                i === slideIdx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(27,58,47,.6) 0%, rgba(5,12,9,.72) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 30% 60%, rgba(126,200,200,.08) 0%, transparent 65%), radial-gradient(ellipse at 70% 30%, rgba(201,169,110,.06) 0%, transparent 55%)',
          }} />
        </div>

        {/* Age badge */}
        <div className="absolute z-10 hidden md:flex" style={{ top: '50%', right: '6%', transform: 'translateY(-50%)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-[110px] h-[110px] rounded-full border-2 border-accent flex flex-col items-center justify-center"
          >
            <span className="absolute inset-[-6px] rounded-full border" style={{ borderColor: 'rgba(126,200,200,.4)', animation: 'spin 12s linear infinite' }} />
            <span className="font-display text-5xl font-light leading-none" style={{ color: '#E2C898' }}>18</span>
            <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,.6)' }}>ani</span>
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.28em] uppercase mb-4"
            style={{ color: '#7EC8C8' }}
          >
            Hotel Astoria · Alba Iulia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-5"
          >
            Majoratul tău,<br /><em className="italic" style={{ color: '#E2C898' }}>la superlativ</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm md:text-base font-light text-white/82 max-w-[560px] mx-auto mb-10 leading-relaxed"
          >
            Dacă vrei un majorat care să iasă din tipare, ai ajuns unde trebuie — locație modernă, spații premium și atmosferă de distracție totală.
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
              Cere ofertă personalizată
            </a>
            <a
              href="#galerie"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-white border border-white/50 px-10 py-4 rounded-sm hover:border-accent hover:bg-accent/10 transition-all duration-200"
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
        <div className="w-15 h-px bg-accent mx-auto mb-8" />
        <p className="font-display text-xl md:text-2xl font-light italic text-accent max-w-[740px] mx-auto px-6 leading-relaxed">
          Majoratul merită să fie sărbătorit la superlativ! La <strong className="not-italic font-semibold text-accent-light">Hotel Astoria din Alba Iulia</strong>, organizăm <strong className="not-italic font-semibold text-accent-light">petreceri de majorat memorabile</strong>, într-o locație modernă, cu spații premium și atmosferă de distracție totală.
        </p>
      </section>

      {/* Features */}
      <section className="py-24 md:py-28 bg-bg" id="avantaje">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">Ce oferim</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            O petrecere care <em className="italic">iese din tipare</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px max-w-[1000px] mx-auto px-6 bg-[#EDE7DC]">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-surface px-10 py-12 md:py-14 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-[#7EC8C8] transition-all duration-400 group-hover:h-full" />
              <span className="font-display text-5xl font-light text-[#EDE7DC] leading-none block mb-5">
                {f.num}
              </span>
              <h3 className="font-display text-xl font-semibold text-primary mb-4 leading-tight">{f.title}</h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: f.text }} />
              {f.tag && (
                <span className="inline-block mt-4 text-xs font-semibold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-sm border" style={{ color: '#4AABAB', background: 'rgba(126,200,200,.18)', borderColor: 'rgba(126,200,200,.4)' }}>
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
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#7EC8C8' }}>Galerie foto</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-accent">
            Momente de <em className="italic" style={{ color: '#E2C898' }}>distracție totală</em>
          </h2>
          <div className="w-12 h-px mx-auto mt-5" style={{ backgroundColor: '#7EC8C8' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-10 gap-1 px-1 max-w-full">
          {galleryImages.map((src, i) => {
            const spans = [
              'col-span-2 md:col-span-4 md:row-span-2',
              'col-span-1 md:col-span-3',
              'col-span-1 md:col-span-3',
              'col-span-1 md:col-span-6',
              'col-span-1 md:col-span-4',
            ]
            return (
              <div
                key={src}
                className={`relative group cursor-pointer overflow-hidden ${spans[i]} h-[200px] md:h-[280px] ${i === 0 ? 'md:h-[560px]' : ''}`}
                onClick={() => openLb(i)}
              >
                <div className="absolute inset-0 bg-[#0D1F1A]" />
                <img
                  src={src}
                  alt={`Majorat Hotel Astoria fotografie ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-106"
                />
                <div className="absolute inset-0 transition-all duration-400 flex items-center justify-center" style={{ background: 'rgba(126,200,200,0)' }}>
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
          style={{ background: 'rgba(5,12,9,.96)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeLb() }}
        >
          <button onClick={closeLb} className="absolute top-6 right-8 text-3xl text-white/70 hover:text-white font-display font-light transition-colors bg-none border-none cursor-pointer">×</button>
          <button onClick={() => navLb(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl transition-all cursor-pointer" style={{ background: 'rgba(126,200,200,.12)', border: '1px solid rgba(126,200,200,.3)', color: 'white' }}>&#8592;</button>
          <img src={galleryImages[lbIdx]} alt="Galerie" className="max-w-[90vw] max-h-[88vh] object-contain" style={{ border: '1px solid rgba(126,200,200,.2)' }} />
          <button onClick={() => navLb(1)} className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl transition-all cursor-pointer" style={{ background: 'rgba(126,200,200,.12)', border: '1px solid rgba(126,200,200,.3)', color: 'white' }}>&#8594;</button>
        </div>
      )}

      {/* Benefits */}
      <section className="py-24 md:py-28" id="beneficii" style={{ background: '#EDE7DC' }}>
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">Pachet majorat</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            Beneficii <em className="italic">exclusive</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="font-display text-lg font-semibold text-primary mb-7 pb-4 border-b-2" style={{ borderColor: '#4AABAB' }}>Incluse în pachet</h3>
            <ul className="space-y-0">
              {includedBenefits.map((b) => (
                <li key={b} className="py-2.5 text-sm font-light text-text-muted leading-relaxed border-b border-[rgba(27,58,47,.07)] flex items-start gap-3.5" dangerouslySetInnerHTML={{ __html: '✦ ' + b }} />
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h3 className="font-display text-lg font-semibold text-primary mb-7 pb-4 border-b-2" style={{ borderColor: '#4AABAB' }}>Servicii opționale — discount până la 90%</h3>
            <ul className="space-y-0">
              {optionalBenefits.map((b) => (
                <li key={b} className="py-2.5 text-sm font-light text-text-muted leading-relaxed border-b border-[rgba(27,58,47,.07)] flex items-start gap-3.5">
                  <span style={{ color: '#4AABAB' }} className="text-[0.6rem] mt-1 shrink-0">✦</span> {b}
                </li>
              ))}
            </ul>
            <p className="font-display italic text-sm text-primary mt-5">* Serviciile opționale sunt disponibile cu discount de până la 90% față de prețul pieței.</p>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 md:py-28 bg-bg">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">De ce Astoria</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">4 motive să alegi <em className="italic">Hotel Astoria</em></h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-[1100px] mx-auto px-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center px-6 py-10 bg-surface border-b-2 border-transparent hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: 'transparent' }}
            >
              <span className="text-3xl block mb-4">{r.icon}</span>
              <h4 className="font-display text-lg font-semibold text-primary mb-2.5">{r.title}</h4>
              <p className="text-sm font-light text-text-muted leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-32 text-center bg-primary overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] text-white/[0.025] font-display pointer-events-none leading-none select-none" aria-hidden="true">✦</span>
        <div className="relative z-10 px-6">
          <span className="text-xs font-medium tracking-[0.28em] uppercase block mb-5" style={{ color: '#7EC8C8' }}>Hai să planificăm</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            Vino să planificăm împreună<br />un party <em className="italic" style={{ color: '#E2C898' }}>de neuitat</em>
          </h2>
          <p className="text-sm md:text-base font-light text-white/70 mb-12 leading-relaxed">Cere o ofertă personalizată și lasă-ne să facem din majoratul tău un eveniment de care toți prietenii tăi vor vorbi.</p>
          <div className="flex gap-10 justify-center flex-wrap mb-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-white/40">Email</span>
              <a href="mailto:evenimente@astoriahotels.ro" className="font-display text-lg text-accent-light hover:text-white transition-colors">evenimente@astoriahotels.ro</a>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-white/40">Telefon</span>
              <a href="tel:+40731190948" className="font-display text-lg text-accent-light hover:text-white transition-colors">0731 190 948</a>
            </div>
          </div>
          <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-primary bg-accent px-10 py-4 rounded-sm hover:bg-accent-light hover:-translate-y-0.5 transition-all duration-200">Trimite cererea acum</a>
        </div>
      </section>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Layout>
  )
}

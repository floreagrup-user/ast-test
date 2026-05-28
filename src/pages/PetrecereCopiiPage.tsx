import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const base = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/petrecere-copii-astoria'

const heroSlides = [
  `${base}1.webp`,
  `${base}2.webp`,
  `${base}3.webp`,
]

const galleryImages = Array.from({ length: 3 }, (_, i) =>
  `${base}${i + 1}.webp`
)

const features = [
  {
    title: 'Tobogane gonflabile și jocuri interactive',
    text: 'Pentru o petrecere plină de energie, copiii pot aduce <strong>tobogane gonflabile</strong>, iar spațiul generos permite desfășurarea celor mai îndrăznețe jocuri. De la alergat și sărit, până la competiții amuzante, fiecare petrecere devine o <strong>explozie de veselie</strong>.',
    icon: '\u{1F3AA}',
    accent: '#F5A623',
  },
  {
    title: 'Evenimente în aer liber, în grădina interioară',
    text: 'În sezonul cald, organizăm petreceri de copii în aer liber, în <strong>grădina interioară privată</strong> a hotelului. Acest spațiu sigur și intim este perfect pentru <strong>joacă liberă, activități creative</strong> și distracție în natură, fără griji pentru părinți.',
    icon: '\u{1F33F}',
    accent: '#F4735A',
  },
  {
    title: 'Petreceri pentru copii la piscină',
    text: 'Dacă cei mici au aniversarea vara, își pot organiza ziua de naștere <strong>în perimetrul piscinei</strong>. Punem la dispoziție una dintre <strong>cele trei filigorii</strong> amplasate pe spațiul verde, iar pizzeria asigură meniul preferat al celor mici!',
    icon: '\u{1F3CA}',
    accent: '#4ABFA0',
  },
  {
    title: 'Spațiu sigur și confort pentru toți',
    text: 'Sala de evenimente și grădina interioară oferă <strong>spații generoase, sigure și bine organizate</strong>, ideale atât pentru joacă, cât și pentru momentele de pauză. Părinții se pot relaxa, știind că cei mici se distrează într-un <strong>mediu controlat și elegant</strong>.',
    icon: '\u{1F6E1}',
    accent: '#78C8E8',
  },
]

const reasons = [
  { icon: '\u{1F4CD}', text: 'Locație accesibilă în centrul orașului Alba Iulia' },
  { icon: '\u{1F3E7}', text: 'Spații mari pentru joacă, activități și tobogane gonflabile' },
  { icon: '\u{1F33F}', text: 'Grădină interioară privată pentru petreceri în aer liber' },
  { icon: '\u{1F31F}', text: 'Activități creative: căutări de comori, curse cu obstacole' },
  { icon: '\u{1F382}', text: 'Evenimente personalizate, adaptate temei și vârstei copiilor' },
  { icon: '\u{1F355}', text: 'Meniu preferat al celor mici asigurat de pizzeria hotelului' },
]

const reasonAccents = ['#F5A623', '#F4735A', '#4ABFA0', '#78C8E8', '#C4A8E0', '#F5A623']

export function PetrecereCopiiPage() {
  const [slideIdx, setSlideIdx] = useState(0)
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
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
        <title>Petreceri Copii la Hotel Astoria Alba Iulia — Distracție și siguranță</title>
        <meta name="description" content="Petreceri de copii la Hotel Astoria Alba Iulia — tobogane gonflabile, grădină interioară privată, petreceri la piscină și activități creative pentru cei mici." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Petrecere copii Hotel Astoria"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1400 ${
                i === slideIdx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(170deg, rgba(27,58,47,.45) 0%, rgba(10,20,15,.70) 100%)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 15% 25%, rgba(245,166,35,.12) 0%, transparent 40%), radial-gradient(ellipse at 85% 70%, rgba(120,200,232,.1) 0%, transparent 40%), radial-gradient(ellipse at 50% 90%, rgba(74,191,160,.08) 0%, transparent 35%)',
          }} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.28em] uppercase mb-4"
            style={{ color: '#FFD080' }}
          >
            Hotel Astoria · Alba Iulia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-5"
          >
            Petreceri de copii<br /><em className="italic" style={{ color: '#FFD080' }}>de neuitat</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm md:text-base font-light text-white/82 max-w-[560px] mx-auto mb-10 leading-relaxed"
          >
            Creăm evenimente unde cei mici se distrează în siguranță, iar părinții se bucură de un cadru organizat, elegant și relaxant.
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
              style={{ color: '#1B3A2F', background: '#F5A623' }}
            >
              Cere ofertă personalizată
            </a>
            <a
              href="#galerie"
              className="inline-block text-xs font-medium tracking-[0.12em] uppercase text-white px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200 border border-white/50 hover:border-[#FFD080] hover:bg-[rgba(245,166,35,.1)]"
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
        <div className="w-15 h-px mx-auto mb-8" style={{ backgroundColor: '#F5A623' }} />
        <p className="font-display text-xl md:text-2xl font-light italic text-accent max-w-[760px] mx-auto px-6 leading-relaxed">
          La <strong className="not-italic font-semibold" style={{ color: '#FFD080' }}>Hotel Astoria din Alba Iulia</strong>, petrecerile de copii se transformă în <strong className="not-italic font-semibold" style={{ color: '#FFD080' }}>adevărate aventuri pline de culoare, râsete și energie</strong>. Tu alegi tema, noi creăm distracția!
        </p>
      </section>

      {/* Features */}
      <section className="py-24 md:py-28" id="avantaje" style={{ background: '#FFFBF4' }}>
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#F4735A' }}>Ce oferim</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            O aventură pentru <em className="italic">fiecare copil</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#F5A623' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] mx-auto px-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="px-10 py-12 md:py-14 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              style={{
                background: i === 0 ? '#FFF8EE' : i === 1 ? '#FFF4F2' : i === 2 ? '#F0FDFB' : '#F0FBFF',
                borderTop: `4px solid ${f.accent}`,
              }}
            >
              <span className="text-[2.8rem] block mb-5" style={{ animation: 'wiggle 3s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}>{f.icon}</span>
              <h3 className="font-display text-xl font-semibold text-primary mb-4 leading-tight">{f.title}</h3>
              <p className="font-body text-sm font-light text-text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: f.text }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-28 bg-primary" id="galerie">
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#FFD080' }}>Galerie foto</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-accent">
            Zâmbete și <em className="italic" style={{ color: '#FFD080' }}>amintiri</em>
          </h2>
          <div className="w-12 h-0.5 mx-auto mt-5" style={{ backgroundColor: '#F5A623' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-1 px-1 max-w-full">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              className={`relative group cursor-pointer overflow-hidden ${i === 0 ? 'md:row-span-2 h-[320px] md:h-[600px]' : 'h-[220px] md:h-[298px]'}`}
              onClick={() => openLb(i)}
            >
              <div className="absolute inset-0 bg-[#0D1F1A]" />
              <img
                src={src}
                alt={`Petrecere copii Hotel Astoria fotografie ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-106"
              />
              <div className="absolute inset-0 transition-all duration-400 flex items-center justify-center" style={{ background: 'rgba(245,166,35,0)' }}>
                <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-80 group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lbOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: 'rgba(10,18,8,.97)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeLb() }}
        >
          <button onClick={closeLb} className="absolute top-6 right-8 text-3xl text-white/70 hover:text-white font-display font-light transition-colors bg-none border-none cursor-pointer">×</button>
          <button onClick={() => navLb(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl transition-all cursor-pointer" style={{ background: 'rgba(245,166,35,.15)', border: '1px solid rgba(245,166,35,.3)', color: 'white' }}>&#8592;</button>
          <img src={galleryImages[lbIdx]} alt="Galerie" className="max-w-[90vw] max-h-[88vh] object-contain" style={{ border: '1px solid rgba(245,166,35,.2)' }} />
          <button onClick={() => navLb(1)} className="absolute right-6 top-1/2 -translate-y-1/2 w-13 h-13 flex items-center justify-center text-xl transition-all cursor-pointer" style={{ background: 'rgba(245,166,35,.15)', border: '1px solid rgba(245,166,35,.3)', color: 'white' }}>&#8594;</button>
        </div>
      )}

      {/* Why */}
      <section className="py-24 md:py-28" style={{ background: '#EDE7DC' }}>
        <div className="text-center mb-16 px-6">
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-accent block mb-3">De ce Astoria</span>
          <h2 className="font-display text-3xl md:text-5xl font-light text-primary">
            Tot ce îți dorești<br /><em className="italic">pentru ziua lui specială</em>
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px max-w-[1100px] mx-auto px-6" style={{ background: 'rgba(0,0,0,.04)' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-surface text-center px-6 py-9 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" style={{ background: reasonAccents[i] }} />
              <span className="text-2xl block mb-3">{r.icon}</span>
              <p className="text-sm font-light text-text-muted leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Notice */}
      <section className="py-16 px-6" style={{ background: '#FFFBF4' }}>
        <div className="max-w-[900px] mx-auto bg-[#FFF8EE] border-l-4 p-8 md:p-10" style={{ borderColor: '#F5A623' }}>
          <h3 className="font-display text-lg font-semibold text-primary mb-3.5 flex items-center gap-2.5">
            <span>⚠️</span> Important de știut
          </h3>
          <p className="font-body text-sm font-light leading-relaxed" style={{ color: '#4A4A47' }}>
            <strong>Responsabilitatea pentru siguranța copiilor revine părinților sau însoțitorilor legali</strong> pe toată durata evenimentului. Copiii trebuie supravegheați permanent, atât în spațiile interioare, cât și în cele exterioare. De asemenea, <strong>copiii sub 16 ani au acces la piscină doar însoțiți de un adult</strong>, pentru a asigura un mediu sigur și plăcut pentru toți participanții.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-32 text-center bg-primary overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] text-white/[0.025] font-display pointer-events-none leading-none select-none" aria-hidden="true">✦</span>
        <div className="relative z-10 px-6">
          <span className="text-xs font-medium tracking-[0.28em] uppercase block mb-5" style={{ color: '#FFD080' }}>Hai să planificăm</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            Tu alegi tema,<br /><em className="italic" style={{ color: '#FFD080' }}>noi creăm distracția!</em>
          </h2>
          <p className="text-sm md:text-base font-light text-white/70 mb-12 leading-relaxed">Cere o ofertă personalizată și echipa Astoria va transforma ziua lui specială într-o aventură de neuitat.</p>
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
          <a href="mailto:evenimente@astoriahotels.ro" className="inline-block text-xs font-medium tracking-[0.12em] uppercase px-10 py-4 rounded-sm hover:-translate-y-0.5 transition-all duration-200" style={{ color: '#1B3A2F', background: '#F5A623' }}>Trimite cererea acum</a>
        </div>
      </section>

      <style>{`@keyframes wiggle { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }`}</style>
    </Layout>
  )
}

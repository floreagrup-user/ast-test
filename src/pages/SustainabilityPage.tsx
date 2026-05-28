import { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'

const stats = [
  { value: '130', unit: 'kW', label: 'Energie verde produsă de panouri fotovoltaice' },
  { value: '10.500', unit: 'mp', label: 'Spațiu verde amenajat' },
  { value: '140', unit: '+', label: 'Copaci și arbori ornamentali' },
  { value: '336', unit: 'mp', label: 'Piscină cu filtrare ecologică' },
]

const features = [
  {
    icon: '☀️',
    title: 'Investiții în Energie Verde',
    paragraphs: [
      'Investițiile în energie verde reprezintă o direcție strategică pe termen lung, Hotel Astoria având obiective ambițioase în privința performanței ESG (Environment – Social – Governance).',
      'În 2025, hotelul a suplimentat capacitatea sistemului fotovoltaic de la 40 kW la 130 kW, diminuând dependența de energia din rețea și reducând corespunzător emisiile de CO₂ asociate.',
    ],
    image: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate6.webp',
    alt: 'Panouri fotovoltaice Hotel Astoria',
    reverse: false,
    dark: false,
  },
  {
    icon: '💧',
    title: 'Sistem de Filtrare Ecologică',
    paragraphs: [
      'Piscina de 336 mp, cea mai mare din județ, este dotată cu un sistem de filtrare a apei cu ajutorul sării, un element esențial pentru un hotel verde. Acest tip de sistem reduce semnificativ utilizarea substanțelor chimice agresive, având un impact mai mic asupra mediului înconjurător.',
      'Filtrarea cu sare contribuie și la un consum mai eficient al resurselor, deoarece apa necesită mai puține înlocuiri și tratamente chimice frecvente. Astfel, se reduc atât cantitatea de deșeuri chimice eliminate, cât și amprenta ecologică a hotelului.',
    ],
    image: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate5.webp',
    alt: 'Soluții invizibile Hotel Astoria',
    reverse: true,
    dark: true,
  },
  {
    icon: '🚗',
    title: 'Mobilitate Sustenabilă',
    paragraphs: [
      'Ca o măsură suplimentară, hotelul și-a extins flota de autoturisme electrice utilizate în activitățile operaționale, renunțând la autoturismele alimentate de combustibil fosil în favoarea celor cu emisii zero.',
      'Tot în 2025, locația și-a modernizat infrastructura de încărcare, prin upgrade-ul stațiilor electrice, consolidând astfel angajamentul față de eficiență energetică și mobilitate sustenabilă.',
    ],
    image: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate11.webp',
    alt: 'Filtrare ecologică Hotel Astoria',
    reverse: false,
    dark: false,
  },
  {
    icon: '🌿',
    title: 'Soluții Invizibile, Impact Vizibil',
    paragraphs: [
      'Dincolo de măsurile vizibile, există investiții majore în amenajarea complexului hotelier care asigură sustenabilitatea locației fără a fi neapărat vizibile turiștilor.',
      'Vorbim despre o soluție de pavare a spațiilor pietonale și de parcare care asigură un drenaj optim al apelor pluviale, cu un raport ideal între zona pavată și zona verde. De asemenea, sistemul de încălzire a apei din piscină funcționează cu ajutorul energiei solare.',
    ],
    image: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate1.webp',
    alt: 'Mobilitate sustenabilă Hotel Astoria',
    reverse: true,
    dark: true,
  },
]

const galleryImages = [
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate10.webp', alt: 'Hotel Astoria - Vedere generală' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate9.webp', alt: 'Hotel Astoria - Ecosistem natural' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate8.webp', alt: 'Hotel Astoria - Livadă' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate5.webp', alt: 'Hotel Astoria - Restaurant' },
  { src: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate3.webp', alt: 'Hotel Astoria - Natură' },
]

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

export function SustainabilityPage() {
  return (
    <Layout>
      <Helmet>
        <title>Sustenabilitate — Hotel Astoria Alba Iulia</title>
        <meta name="description" content="Hotel Astoria Alba Iulia — angajament pentru sustenabilitate. Energie verde, filtrare ecologică, 10.500 mp spațiu verde și educație pentru generațiile viitoare." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-[#5a8a76]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/articole/sustenabilitate2.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary-light/60 to-[#5a8a76]/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 80%, rgba(201, 169, 98, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(125, 155, 140, 0.2) 0%, transparent 50%)
            `
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-[900px]">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-light tracking-[0.3em] uppercase text-accent-light mb-6"
          >
            Hotel Astoria Alba Iulia
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-6"
          >
            Angajament pentru Sustenabilitate
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 h-0.5 bg-accent mx-auto mb-6 relative"
          >
            <span className="absolute left-[-30px] top-1/2 -translate-y-1/2 text-2xl">🌿</span>
            <span className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-2xl">🌿</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-xl md:text-2xl italic text-[#a8c4b5] max-w-[700px] mx-auto leading-relaxed"
          >
            A fi o locație verde înseamnă mai mult decât o etichetă. Înseamnă acțiuni concrete, zi de zi și an de an.
          </motion.p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-surface py-16 md:py-24">
        <AnimateOnScroll className="max-w-[900px] mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary mb-6">
            Mai mult decât o etichetă verde
          </h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-[800px] mx-auto">
            A fi o locație verde înseamnă mai mult decât o etichetă pusă la intrare sau o stație de încărcare electrică. Este vorba de acțiuni concrete și recurente, aliniate într-un proces de optimizare continuă a practicilor sustenabile. Asta demonstrează Hotelul Astoria din Alba Iulia, zi de zi și an de an.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-[1400px] mx-auto px-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 md:p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-400"
            >
              <div className="font-display text-3xl md:text-5xl font-semibold text-accent leading-none mb-2">
                {stat.value} <span className="text-xl md:text-2xl font-normal">{stat.unit}</span>
              </div>
              <p className="text-xs md:text-sm text-[#a8c4b5] leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Sections */}
      {features.map((feature) => (
        <section
          key={feature.title}
          className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] ${feature.reverse ? '' : ''}`}
        >
          <div
            className={`relative overflow-hidden min-h-[300px] lg:min-h-[500px] order-1 ${
              feature.reverse ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <img
              src={feature.image}
              alt={feature.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 hover:scale-105"
            />
          </div>
          <div
            className={`flex flex-col justify-center px-6 md:px-16 py-12 order-2 ${
              feature.reverse ? 'lg:order-1' : 'lg:order-2'
            } ${feature.dark ? 'bg-primary text-[#a8c4b5]' : 'bg-surface text-text-muted'}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-4xl md:text-5xl block mb-6">{feature.icon}</span>
              <h3 className={`font-display text-2xl md:text-3xl font-normal mb-5 ${
                feature.dark ? 'text-accent' : 'text-primary'
              }`}>
                {feature.title}
              </h3>
              {feature.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="text-base leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Gallery */}
      <section className="bg-[#ebe7df] py-16 md:py-24">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary">Galerie Sustenabilitate</h2>
        </AnimateOnScroll>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-[1400px] mx-auto px-4">
          {galleryImages.map((img, index) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-lg group ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108"
                style={{ minHeight: index === 0 ? '560px' : '260px' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Local Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <AnimateOnScroll className="bg-bg px-6 md:px-16 py-12 md:py-16 flex flex-col justify-center">
          <h3 className="font-display text-2xl md:text-3xl font-normal text-primary mb-6">
            🍽️ Ingrediente Locale, Autenticitate Regională
          </h3>
          <p className="text-base text-text-muted leading-relaxed mb-6">
            În incinta Hotelului Astoria se regăsește și o sală de evenimente care găzduiește anual zeci de nunți, botezuri sau întâlniri corporate. Cu o capacitate de peste 300 de persoane, oaspeții acestor evenimente se pot bucura de preparate specifice zonei cu ingrediente provenite de la furnizori locali.
          </p>
          <ul className="space-y-3">
            {[
              'Livadă proprie cu fructe proaspete de sezon',
              'Ingrediente de la furnizori locali verificați',
              'Veselă achiziționată de la producători din Alba Iulia',
              'Tradiția porțelanului local în serviciile de restaurant',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="text-accent font-semibold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
        <AnimateOnScroll className="bg-primary px-6 md:px-16 py-12 md:py-16 flex flex-col justify-center">
          <h3 className="font-display text-2xl md:text-3xl font-normal text-accent mb-6">
            🏞️ Un Ecosistem Recreat
          </h3>
          <p className="text-base text-[#a8c4b5] leading-relaxed mb-4">
            Un alt aspect important de luat în considerare este amplasarea complexului hotelier, într-o zonă periferică, în vecinătatea unor puncte industriale. Transformarea acestui perimetru într-o oază de verdeață este benefică nu doar pentru turiștii cazați aici, ci și pentru întreaga regiune.
          </p>
          <p className="text-base text-[#a8c4b5] leading-relaxed mb-6">
            Dintr-un spațiu abandonat, împrejurul Hotelului Astoria s-a creat un adevărat ecosistem, care include:
          </p>
          <ul className="space-y-3">
            {[
              'Lac cu pești amenajat',
              'Mare varietate de specii de păsări endemice',
              'Peste 140 de copaci și arbori ornamentali',
              '10.500 mp de spațiu verde întreținut',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#a8c4b5]">
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
          <h2 className="font-display text-3xl md:text-4xl font-normal text-primary mb-6">
            🎓 Educație pentru Generațiile Viitoare
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            An de an, Hotel Astoria este un partener important pentru proiectele din cadrul „Săptămâna verde" a școlilor și grădinițelor, organizând lecții deschise pentru educația verde.
          </p>
          <div className="bg-surface p-8 md:p-12 rounded-xl shadow-xl border-l-4 border-accent text-left"
            style={{ boxShadow: '0 20px 60px rgba(26, 58, 47, 0.1)' }}
          >
            <p className="text-lg md:text-xl italic text-text leading-relaxed">
              „Credem că sustenabilitatea începe cu educația. De aceea, deschidem porțile complexului nostru pentru a inspira și învăța generațiile viitoare despre importanța protejării mediului."
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* School Visit Form */}
      <section id="scoala-verde" className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        <div className="relative z-10 max-w-[700px] mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-6xl block mb-6">🌱</span>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-4">
              Programează o vizită în cadrul Școala Verde
            </h2>
            <p className="text-lg text-[#a8c4b5]">
              Invităm școlile și grădinițele să descopere împreună cu noi frumusețea și importanța practicilor sustenabile.
            </p>
          </div>
          <form
            className="bg-surface p-6 md:p-12 rounded-xl"
            style={{ boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)' }}
            action="https://formsubmit.co/iuliagus@floreagrup.ro"
            method="POST"
          >
            <input type="hidden" name="_subject" value="Cerere vizită Școala Verde - Hotel Astoria" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://astoriahotels.ro/multumim" />

            <div className="space-y-5">
              <div>
                <label htmlFor="sust-nume" className="block text-sm font-medium text-primary mb-1.5">
                  Nume și Prenume <span className="text-error">*</span>
                </label>
                <input
                  id="sust-nume"
                  type="text"
                  name="Nume și Prenume"
                  required
                  placeholder="Introduceți numele complet"
                  className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] focus:ring-4 focus:ring-[#7d9b8c]/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="sust-institutie" className="block text-sm font-medium text-primary mb-1.5">
                  Instituția de învățământ <span className="text-error">*</span>
                </label>
                <input
                  id="sust-institutie"
                  type="text"
                  name="Instituția de învățământ"
                  required
                  placeholder="Numele școlii sau grădiniței"
                  className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] focus:ring-4 focus:ring-[#7d9b8c]/20 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="sust-oras" className="block text-sm font-medium text-primary mb-1.5">
                    Oraș <span className="text-error">*</span>
                  </label>
                  <input
                    id="sust-oras"
                    type="text"
                    name="Oraș"
                    required
                    placeholder="Orașul"
                    className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] focus:ring-4 focus:ring-[#7d9b8c]/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="sust-data" className="block text-sm font-medium text-primary mb-1.5">
                    Data Dorită <span className="text-error">*</span>
                  </label>
                  <input
                    id="sust-data"
                    type="text"
                    name="Data Dorită"
                    required
                    placeholder="ex: 15 martie sau dată flexibilă"
                    className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] focus:ring-4 focus:ring-[#7d9b8c]/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="sust-mesaj" className="block text-sm font-medium text-primary mb-1.5">
                  Mesaj suplimentar (opțional)
                </label>
                <textarea
                  id="sust-mesaj"
                  name="Mesaj"
                  rows={3}
                  placeholder="Detalii adiționale despre grupul dvs. sau întrebări"
                  className="w-full px-4 py-3 border-2 border-[#ebe7df] rounded-lg bg-bg text-sm outline-none focus:border-[#7d9b8c] focus:ring-4 focus:ring-[#7d9b8c]/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-br from-primary to-primary-light text-white font-medium rounded-lg text-base tracking-wider uppercase hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
              >
                Trimite Cererea
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  )
}

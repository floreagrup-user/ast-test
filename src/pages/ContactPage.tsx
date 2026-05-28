import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { contactFormSchema, type ContactFormData } from '@/lib/schemas'

const subjects = [
  { value: 'rezervare-camera', label: 'Rezervare cameră' },
  { value: 'rezervare-restaurant', label: 'Rezervare restaurant' },
  { value: 'eveniment', label: 'Eveniment' },
  { value: 'pool-park', label: 'Pool Park' },
  { value: 'altele', label: 'Altele' },
]

export function ContactPage() {
  const [searchParams] = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subiect: (searchParams.get('subiect') as ContactFormData['subiect']) || 'altele',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Mock submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Form data:', data)
    setIsSubmitting(false)
    setSubmitted(true)
    reset()
  }

  return (
    <Layout>
      <Helmet>
        <title>Contact — Hotel Astoria Alba Iulia</title>
        <meta name="description" content="Contactează Hotel Astoria Alba Iulia. Telefon: +40 731 190 948. Email: office@astoriahotels.ro. DN 1, km 387, Alba Iulia." />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie21.webp"
            alt="Hotel Astoria"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="relative container-xl z-10">
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white tracking-tight">
            Contactează-ne
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-8">Informații de contact</h2>
              <ul className="space-y-6 mb-10">
                <li>
                  <a href="tel:+40731190948" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Telefon</p>
                      <p className="font-medium group-hover:text-accent transition-colors">+40 731 190 948</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:office@astoriahotels.ro" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Email</p>
                      <p className="font-medium group-hover:text-accent transition-colors">office@astoriahotels.ro</p>
                    </div>
                  </a>
                </li>
                <li>
                  <span className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">Adresă</p>
                      <p className="font-medium">DN 1, km 387, Alba Iulia, Alba</p>
                    </div>
                  </span>
                </li>
              </ul>

              {/* Social */}
              <div className="mb-10">
                <p className="text-sm text-text-muted mb-3">Urmărește-ne</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/AstoriaHotelAlbaIulia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a
                    href="https://www.instagram.com/astoriahotelalba"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-video rounded-sm overflow-hidden border border-border">
                <iframe
                  src="https://maps.google.com/maps?q=46.122656,23.622188&z=15&output=embed&hl=ro"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locație Hotel Astoria pe Google Maps"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-2xl font-normal mb-8">Trimite un mesaj</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-success/5 border border-success/20 rounded-sm p-8 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="font-display text-xl font-normal mb-2">Mesaj trimis!</h3>
                  <p className="text-text-muted text-sm mb-6">
                    Îți mulțumim! Te vom contacta în cel mai scurt timp.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-primary hover:text-accent transition-colors font-medium"
                  >
                    Trimite un alt mesaj
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nume" className="text-sm font-medium block mb-1.5">
                        Nume <span className="text-error">*</span>
                      </label>
                      <input
                        id="nume"
                        type="text"
                        {...register('nume')}
                        className={`w-full px-4 py-3 border rounded-sm text-sm outline-none transition-colors ${
                          errors.nume ? 'border-error' : 'border-border focus:border-accent'
                        }`}
                        aria-invalid={!!errors.nume}
                        aria-describedby={errors.nume ? 'nume-error' : undefined}
                      />
                      {errors.nume && (
                        <p id="nume-error" className="text-xs text-error mt-1" role="alert">
                          {errors.nume.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="prenume" className="text-sm font-medium block mb-1.5">
                        Prenume <span className="text-error">*</span>
                      </label>
                      <input
                        id="prenume"
                        type="text"
                        {...register('prenume')}
                        className={`w-full px-4 py-3 border rounded-sm text-sm outline-none transition-colors ${
                          errors.prenume ? 'border-error' : 'border-border focus:border-accent'
                        }`}
                        aria-invalid={!!errors.prenume}
                        aria-describedby={errors.prenume ? 'prenume-error' : undefined}
                      />
                      {errors.prenume && (
                        <p id="prenume-error" className="text-xs text-error mt-1" role="alert">
                          {errors.prenume.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                        Email <span className="text-error">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 border rounded-sm text-sm outline-none transition-colors ${
                          errors.email ? 'border-error' : 'border-border focus:border-accent'
                        }`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-error mt-1" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="telefon" className="text-sm font-medium block mb-1.5">
                        Telefon
                      </label>
                      <input
                        id="telefon"
                        type="tel"
                        {...register('telefon')}
                        className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subiect" className="text-sm font-medium block mb-1.5">
                      Subiect <span className="text-error">*</span>
                    </label>
                    <select
                      id="subiect"
                      {...register('subiect')}
                      className="w-full px-4 py-3 border border-border rounded-sm text-sm outline-none focus:border-accent transition-colors bg-white"
                    >
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mesaj" className="text-sm font-medium block mb-1.5">
                      Mesaj <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="mesaj"
                      rows={5}
                      {...register('mesaj')}
                      className={`w-full px-4 py-3 border rounded-sm text-sm outline-none transition-colors resize-none ${
                        errors.mesaj ? 'border-error' : 'border-border focus:border-accent'
                      }`}
                      aria-invalid={!!errors.mesaj}
                      aria-describedby={errors.mesaj ? 'mesaj-error' : undefined}
                    />
                    {errors.mesaj && (
                      <p id="mesaj-error" className="text-xs text-error mt-1" role="alert">
                        {errors.mesaj.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="gdpr"
                      type="checkbox"
                      {...register('gdpr')}
                      className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <label htmlFor="gdpr" className="text-sm text-text-muted">
                      Sunt de acord cu{' '}
                      <Link to="/politica-confidentialitate" className="text-primary hover:underline">
                        politica de confidențialitate
                      </Link>{' '}
                      și prelucrarea datelor personale. <span className="text-error">*</span>
                    </label>
                  </div>
                  {errors.gdpr && (
                    <p className="text-xs text-error" role="alert">{errors.gdpr.message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-medium py-3.5 rounded-sm hover:bg-primary-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      'Trimite mesajul'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

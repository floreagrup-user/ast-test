import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { images } from '@/data/images'
import { cn } from '@/lib/utils'

const footerLinks = {
  hotel: [
    { label: 'Apartament 4★', to: '/camere/apartament' },
    { label: 'Standard 3★', to: '/camere/standard' },
    { label: 'Standard cu Balcon', to: '/camere/standard-balcon' },
    { label: 'Restaurant', to: '/restaurant' },
    { label: 'Pool Park', to: '/pool-park' },
  ],
  servicii: [
    { label: 'Nunți', to: '/evenimente' },
    { label: 'Conferințe', to: '/evenimente' },
    { label: 'Team Building', to: '/evenimente' },
    { label: 'Sustenabilitate', to: '/sustenabilitate' },
  ],
  informatii: [
    { label: 'Politica de confidențialitate', to: '/politica-confidentialitate' },
    { label: 'Termeni și condiții', to: '/termeni-conditii' },
    { label: 'Cookies', to: '/cookies' },
  ],
}

function FooterSection({
  title,
  links,
  mobileOpen,
  onToggle,
}: {
  title: string
  links: { label: string; to: string }[]
  mobileOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="md:col-span-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full md:cursor-default md:pointer-events-none"
        aria-expanded={mobileOpen}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">{title}</h3>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-white/60 md:hidden transition-transform duration-300',
            mobileOpen && 'rotate-180'
          )}
        />
      </button>
      <ul
        className={cn(
          'mt-4 space-y-2.5 md:mt-4 overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96' : 'max-h-0 md:max-h-96'
        )}
      >
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-white/60 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hotel: false,
    servicii: false,
    informatii: false,
  })

  const toggle = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="container-xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={images.logo}
                alt="Astoria Hotel Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Un refugiu de eleganță și confort în inima Transilvaniei. 20 de camere rafinate,
              restaurant internațional și Astoria Pool Park.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/AstoriaHotelAlbaIulia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-accent transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/astoriahotelalba"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-accent transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Hotel */}
          <FooterSection
            title="Hotel"
            links={footerLinks.hotel}
            mobileOpen={openSections.hotel}
            onToggle={() => toggle('hotel')}
          />

          {/* Servicii */}
          <FooterSection
            title="Servicii"
            links={footerLinks.servicii}
            mobileOpen={openSections.servicii}
            onToggle={() => toggle('servicii')}
          />

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+40731190948"
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>+40 731 190 948</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@astoriahotels.ro"
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>office@astoriahotels.ro</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>DN 1, km 387, Alba Iulia, Alba</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>
              © 2026 Astoria Hotel · Parte a{' '}
              <a
                href="https://floreagrup.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Florea Grup
              </a>
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {footerLinks.informatii.map((link) => (
                <Link key={link.to} to={link.to} className="hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2">
                <a
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  ANPC SAL
                </a>
                <span>·</span>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  ANPC SOL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

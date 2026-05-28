import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { images } from '@/data/images'

const navLinks = [
  { label: 'Acasă', to: '/' },
  {
    label: 'Camere',
    to: '/camere',
    children: [
      { label: 'Apartament 4★', to: '/camere/apartament' },
      { label: 'Standard 3★', to: '/camere/standard' },
      { label: 'Standard cu Balcon', to: '/camere/standard-balcon' },
    ],
  },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'Pool Park', to: '/pool-park' },
  {
    label: 'Evenimente',
    to: '/evenimente',
    children: [
      { label: 'Nuntă', to: '/evenimente/nunta' },
      { label: 'Botez', to: '/evenimente/botez' },
      { label: 'Pool Party', to: '/evenimente/pool-party' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScrollDirection()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrolled = scrollY > 50

  const isTransparent = isHome && !scrolled

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const { trackPhoneCall } = useAnalytics()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-white/95 backdrop-blur-md shadow-sm text-text'
      }`}
      role="banner"
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50" aria-label="Acasă - Hotel Astoria">
            <img
              src={images.logo}
              alt="Astoria Hotel Logo"
              className={`h-10 md:h-12 w-auto transition-all duration-300 ${
                isTransparent ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigare principală">
            {navLinks.map((link) => (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.to)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.to}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm flex items-center gap-1 ${
                    isTransparent
                      ? 'hover:bg-white/10'
                      : 'hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.children && activeDropdown === link.to && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-1 bg-white rounded-sm shadow-lg border border-border py-2 min-w-52"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2.5 text-sm text-text hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+40731190948"
              onClick={() => trackPhoneCall('+40731190948')}
              className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
                isTransparent
                  ? 'text-white hover:text-accent-light'
                  : 'text-text hover:text-primary'
              }`}
              aria-label="Sună la +40 731 190 948"
            >
              <Phone className="w-4 h-4" />
              0731 190 948
            </a>
            <Link
              to="/contact"
              className={`hidden md:inline-flex text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-300 ${
                isTransparent
                  ? 'bg-accent text-primary hover:bg-accent-light'
                  : 'bg-primary text-white hover:bg-primary-light'
              }`}
            >
              Rezervă
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-sm transition-colors ${
                isTransparent ? 'hover:bg-white/10' : 'hover:bg-primary/5'
              }`}
              aria-label={mobileOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <nav aria-label="Navigare mobilă">
                  {navLinks.map((link) => (
                    <div key={link.to} className="border-b border-border">
                      <Link
                        to={link.to}
                        className="block py-4 text-lg font-display font-medium text-text hover:text-primary transition-colors"
                        onClick={() => !link.children && setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="pb-4 pl-4 space-y-2">
                          {link.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="block py-2 text-sm text-text-muted hover:text-primary transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-8 space-y-4">
                  <a
                    href="tel:+40731190948"
                    onClick={() => trackPhoneCall('+40731190948')}
                    className="flex items-center gap-2 text-primary font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    0731 190 948
                  </a>
                  <Link
                    to="/contact"
                    className="block text-center bg-accent text-primary font-medium py-3 rounded-sm hover:bg-accent-light transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Rezervă acum
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

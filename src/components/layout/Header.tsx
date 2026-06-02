import { useState, useEffect, useRef, type KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { images } from '@/data/images'
import { cn } from '@/lib/utils'

function isLinkActive(linkPath: string, currentPath: string): boolean {
  if (linkPath === '/') return currentPath === '/'
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`)
}

export function Header() {
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScrollDirection()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrolled = scrollY > 50
  const isTransparent = isHome && !scrolled
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    {
      label: t('nav.rooms'),
      to: '/camere',
      children: [
        { label: t('nav.roomsChildren.apartment'), to: '/camere/apartament' },
        { label: t('nav.roomsChildren.standard'), to: '/camere/standard' },
        { label: t('nav.roomsChildren.standardBalcony'), to: '/camere/standard-balcon' },
      ],
    },
    { label: t('nav.restaurant'), to: '/restaurant' },
    { label: t('nav.poolPark'), to: '/pool-park' },
    {
      label: t('nav.events'),
      to: '/evenimente',
      children: [
        { label: t('nav.eventsChildren.wedding'), to: '/evenimente/nunta' },
        { label: t('nav.eventsChildren.baptism'), to: '/evenimente/botez' },
        { label: t('nav.eventsChildren.coming'), to: '/evenimente/majorat' },
        { label: t('nav.eventsChildren.poolParty'), to: '/evenimente/pool-party' },
        { label: t('nav.eventsChildren.kidsParty'), to: '/evenimente/petrecere-copii' },
      ],
    },
    { label: t('nav.contact'), to: '/contact' },
  ]

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

  useEffect(() => {
    if (!activeDropdown) return
    const handleClickOutside = (e: MouseEvent) => {
      const ref = dropdownRefs.current[activeDropdown]
      if (ref && !ref.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeDropdown])

  const { trackPhoneCall } = useAnalytics()

  const handleDropdownKey = (e: KeyboardEvent<HTMLButtonElement>, to: string) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveDropdown(activeDropdown === to ? null : to)
    } else if (e.key === 'Escape' && activeDropdown === to) {
      setActiveDropdown(null)
    }
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ro' ? 'en' : 'ro')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-white/95 backdrop-blur-md shadow-sm text-text'
      )}
      role="banner"
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 z-50" aria-label={t('nav.homeLabel')}>
            <img
              src={images.logo}
              alt="Astoria Hotel Logo"
              className={cn(
                'h-10 md:h-12 w-auto transition-all duration-300',
                isTransparent && 'brightness-0 invert'
              )}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label={t('nav.mainNav')}>
            {navLinks.map((link) => {
              const active = isLinkActive(link.to, location.pathname)
              if (!link.children) {
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm',
                      isTransparent ? 'hover:bg-white/10' : 'hover:bg-primary/5',
                      active && (isTransparent ? 'text-accent-light' : 'text-primary')
                    )}
                  >
                    {link.label}
                  </Link>
                )
              }
              const isOpen = activeDropdown === link.to
              return (
                <div
                  key={link.to}
                  ref={(el) => {
                    dropdownRefs.current[link.to] = el
                  }}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.to)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setActiveDropdown(isOpen ? null : link.to)}
                    onKeyDown={(e) => handleDropdownKey(e, link.to)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-sm flex items-center gap-1',
                      isTransparent ? 'hover:bg-white/10' : 'hover:bg-primary/5',
                      active && (isTransparent ? 'text-accent-light' : 'text-primary')
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')}
                    />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 pt-1">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="menu"
                        aria-label={`${t('nav.submenu')} ${link.label}`}
                        className="bg-white/95 backdrop-blur-md rounded-sm shadow-lg border border-border py-2 min-w-52"
                      >
                        {link.children.map((child) => {
                          const childActive = isLinkActive(child.to, location.pathname)
                          return (
                            <Link
                              key={child.to}
                              to={child.to}
                              role="menuitem"
                              aria-current={childActive ? 'page' : undefined}
                              className={cn(
                                'block px-4 py-2.5 text-sm text-text hover:bg-primary/5 hover:text-primary transition-colors',
                                childActive && 'text-primary font-medium'
                              )}
                            >
                              {child.label}
                            </Link>
                          )
                        })}
                      </motion.div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t('common.switchLangLabel')}
              className={cn(
                'hidden md:flex items-center text-xs font-semibold tracking-widest px-2.5 py-1 rounded-sm border transition-all duration-200',
                isTransparent
                  ? 'border-white/40 text-white/80 hover:border-white hover:text-white'
                  : 'border-border text-text-muted hover:border-primary hover:text-primary'
              )}
            >
              {t('common.switchLang')}
            </button>

            <a
              href="tel:+40731190948"
              onClick={() => trackPhoneCall('+40731190948')}
              className={cn(
                'hidden md:flex items-center gap-2 text-sm font-medium transition-colors',
                isTransparent ? 'text-white hover:text-accent-light' : 'text-text hover:text-primary'
              )}
              aria-label={t('nav.phoneLabel')}
            >
              <Phone className="w-4 h-4" />
              0731 190 948
            </a>
            <Link
              to="/contact"
              className={cn(
                'hidden md:inline-flex text-sm font-medium px-5 py-2.5 rounded-sm transition-all duration-300',
                isTransparent
                  ? 'bg-accent text-primary hover:bg-accent-light'
                  : 'bg-primary text-white hover:bg-primary-light'
              )}
            >
              {t('common.reserve')}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden p-2 rounded-sm transition-colors',
                isTransparent ? 'hover:bg-white/10' : 'hover:bg-primary/5'
              )}
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

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
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.mobileMenu')}
            >
              <div className="p-6 pt-20">
                <nav aria-label={t('nav.mobileNav')}>
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.to, location.pathname)
                    return (
                      <div key={link.to} className="border-b border-border">
                        <Link
                          to={link.to}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'block py-4 text-lg font-display font-medium text-text hover:text-primary transition-colors',
                            active && 'text-primary'
                          )}
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
                                aria-current={isLinkActive(child.to, location.pathname) ? 'page' : undefined}
                                className="block py-2 text-sm text-text-muted hover:text-primary transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>
                <div className="mt-8 space-y-4">
                  {/* Language switcher mobile */}
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
                  >
                    <span className="text-xs tracking-widest border border-border rounded-sm px-2 py-0.5">
                      {t('common.switchLang')}
                    </span>
                    <span>{t('common.switchLangLabel')}</span>
                  </button>

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
                    {t('common.reserveNow')}
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

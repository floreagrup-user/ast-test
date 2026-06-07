import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, BarChart3, Megaphone, Settings } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface CookiePreferences {
  functional: boolean
  preferences: boolean
  statistics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'astoria-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    functional: true,
    preferences: false,
    statistics: false,
    marketing: false,
  })
  const { updateConsent } = useAnalytics()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    updateConsent({ statistics: prefs.statistics, marketing: prefs.marketing })
    setVisible(false)
  }

  const acceptAll = () => {
    saveConsent({
      functional: true,
      preferences: true,
      statistics: true,
      marketing: true,
    })
  }

  const acceptSelected = () => {
    saveConsent(preferences)
  }

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'functional') return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-border shadow-2xl"
          role="dialog"
          aria-label="Consimțiment cookies"
        >
          <div className="container-xl py-4 md:py-6">
            {!showDetails ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-text">
                      Utilizăm cookies pentru a îmbunătăți experiența ta pe site. Poți alege ce tipuri
                      de cookies accepți.{' '}
                      <Link to="/cookies" className="text-primary hover:underline font-medium">
                        Află mai multe
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Detalii
                  </button>
                  <button
                    onClick={acceptAll}
                    className="text-sm bg-primary text-white font-medium px-5 py-2 rounded-sm hover:bg-primary-light transition-colors"
                  >
                    Accept toate
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-normal">Preferințe cookies</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-1 hover:bg-bg rounded-sm transition-colors"
                    aria-label="Închide detalii"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: 'functional' as const, icon: Shield, label: 'Funcționale', desc: 'Necesare pentru funcționarea site-ului', locked: true },
                    { key: 'preferences' as const, icon: Settings, label: 'Preferințe', desc: 'Rețin setările tale de navigare', locked: false },
                    { key: 'statistics' as const, icon: BarChart3, label: 'Statistici', desc: 'Ne ajută să înțelegem utilizarea site-ului', locked: false },
                    { key: 'marketing' as const, icon: Megaphone, label: 'Marketing', desc: 'Conținut relevant pe alte platforme', locked: false },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start gap-3 p-3 bg-bg rounded-sm border border-border"
                    >
                      <input
                        type="checkbox"
                        checked={preferences[item.key]}
                        onChange={() => handleToggle(item.key)}
                        disabled={item.locked}
                        className="mt-0.5 w-4 h-4 rounded border-border text-accent focus:ring-accent disabled:opacity-50"
                        id={`cookie-${item.key}`}
                      />
                      <label htmlFor={`cookie-${item.key}`} className="cursor-pointer flex-1">
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.locked && (
                            <span className="text-xs text-text-muted">(întotdeauna active)</span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={acceptSelected}
                    className="text-sm bg-primary text-white font-medium px-5 py-2 rounded-sm hover:bg-primary-light transition-colors"
                  >
                    Salvează preferințele
                  </button>
                  <button
                    onClick={acceptAll}
                    className="text-sm bg-accent text-primary font-medium px-5 py-2 rounded-sm hover:bg-accent-light transition-colors"
                  >
                    Accept toate
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

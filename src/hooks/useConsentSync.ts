import { useEffect } from 'react'
import { useAnalytics } from './useAnalytics'

const STORAGE_KEY = 'astoria-cookie-consent'

type StoredConsent = {
  functional?: boolean
  preferences?: boolean
  statistics?: boolean
  marketing?: boolean
}

export function useConsentSync() {
  const { updateConsent } = useAnalytics()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const prefs = JSON.parse(stored) as StoredConsent
      updateConsent({ statistics: !!prefs.statistics, marketing: !!prefs.marketing })
    } catch {
      // localStorage value corrupted — ignore silently
    }
  }, [updateConsent])
}

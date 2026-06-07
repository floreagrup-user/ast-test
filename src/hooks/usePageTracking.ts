import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAnalytics } from './useAnalytics'

export function usePageTracking() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const { trackPageView } = useAnalytics()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView(location.pathname + location.search, i18n.language)
  }, [location.pathname, location.search, i18n.language, trackPageView])
}

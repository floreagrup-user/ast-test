import { useCallback, useMemo } from 'react'
import { hotel } from '@/data/hotel'

type Properties = Record<string, string | number | boolean | null | undefined>

type ConsentInput = {
  statistics?: boolean
  marketing?: boolean
}

const PHONE = hotel.contact.phone.e164

function safe<T extends (...args: never[]) => void>(fn: T): T {
  return ((...args: Parameters<T>) => {
    if (typeof window === 'undefined' || !window.zaraz) return
    fn(...args)
  }) as T
}

const track = safe((event: string, properties?: Properties) => {
  if (properties) window.zaraz!.track(event, properties)
  else window.zaraz!.track(event)
})

const setProperty = safe((key: string, value: unknown) => {
  window.zaraz!.set(key, value)
})

const setConsent = safe((input: ConsentInput) => {
  window.zaraz!.consent({
    ...(input.statistics !== undefined && { statistics: { enabled: input.statistics } }),
    ...(input.marketing !== undefined && { marketing: { enabled: input.marketing } }),
  })
})

export function useAnalytics() {
  const trackPageView = useCallback((path: string, language?: string) => {
    track('page_view', { path, language })
  }, [])

  const trackFormSubmit = useCallback((formName: string, success = true) => {
    track('form_submit', { form_name: formName, success })
  }, [])

  const trackPhoneCall = useCallback((location?: string) => {
    track('phone_call', { phone: PHONE, ...(location && { click_location: location }) })
  }, [])

  const trackCTAClick = useCallback((label: string, destination: string) => {
    track('cta_click', { cta_label: label, cta_destination: destination })
  }, [])

  const trackOutboundLink = useCallback((url: string) => {
    track('outbound_link', { url })
  }, [])

  const trackLanguageSwitch = useCallback((from: string, to: string) => {
    track('language_switch', { from, to })
  }, [])

  const updateConsent = useCallback((input: ConsentInput) => {
    setConsent(input)
  }, [])

  const setUserProperty = useCallback((key: string, value: unknown) => {
    setProperty(key, value)
  }, [])

  return useMemo(
    () => ({
      trackPageView,
      trackFormSubmit,
      trackPhoneCall,
      trackCTAClick,
      trackOutboundLink,
      trackLanguageSwitch,
      updateConsent,
      setUserProperty,
    }),
    [
      trackPageView,
      trackFormSubmit,
      trackPhoneCall,
      trackCTAClick,
      trackOutboundLink,
      trackLanguageSwitch,
      updateConsent,
      setUserProperty,
    ],
  )
}

type ConsentArgs = {
  analytics_storage?: 'granted' | 'denied'
  ad_storage?: 'granted' | 'denied'
  ad_user_data?: 'granted' | 'denied'
  ad_personalization?: 'granted' | 'denied'
  functionality_storage?: 'granted' | 'denied'
  personalization_storage?: 'granted' | 'denied'
  security_storage?: 'granted' | 'denied'
}

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

function push(...args: unknown[]) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(...args)
}

export function useAnalytics() {
  function updateConsent(consent: ConsentArgs) {
    push({ 'consent': 'update', ...consent })
  }

  function trackPageView(page: string, title: string) {
    push({
      event: 'page_view',
      page,
      title,
    })
  }

  function trackEvent(action: string, params?: EventParams) {
    push({
      event: 'custom_event',
      action,
      ...params,
    })
  }

  function trackClick(label: string, category?: string) {
    push({
      event: 'click',
      label,
      category: category || 'engagement',
    })
  }

  function trackFormSubmit(formName: string) {
    push({
      event: 'form_submit',
      form_name: formName,
    })
  }

  function trackPhoneCall(phone: string) {
    push({
      event: 'phone_click',
      phone,
    })
  }

  return {
    updateConsent,
    trackPageView,
    trackEvent,
    trackClick,
    trackFormSubmit,
    trackPhoneCall,
  }
}

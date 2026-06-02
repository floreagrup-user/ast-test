import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ro from './ro'
import en from './en'

i18n.use(initReactI18next).init({
  resources: {
    ro: { translation: ro },
    en: { translation: en },
  },
  lng: localStorage.getItem('astoria-lang') || 'ro',
  fallbackLng: 'ro',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('astoria-lang', lng)
  document.documentElement.lang = lng
})

export default i18n

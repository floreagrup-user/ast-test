import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from './App'
import { CookieConsent } from './components/shared/CookieConsent'
import './i18n'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

import { lazy, Suspense, type ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'
import { usePageTracking } from '@/hooks/usePageTracking'
import { useConsentSync } from '@/hooks/useConsentSync'

type LazyPage = ComponentType

const HomePage = lazy<LazyPage>(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage } as { default: LazyPage })))
const RoomsListingPage = lazy<LazyPage>(() => import('@/pages/rooms/RoomsListingPage').then(m => ({ default: m.RoomsListingPage } as { default: LazyPage })))
const RoomDetailPage = lazy<LazyPage>(() => import('@/pages/rooms/RoomDetailPage').then(m => ({ default: m.RoomDetailPage } as { default: LazyPage })))
const RestaurantPage = lazy<LazyPage>(() => import('@/pages/RestaurantPage').then(m => ({ default: m.RestaurantPage } as { default: LazyPage })))
const RestaurantMenuPage = lazy<LazyPage>(() => import('@/pages/RestaurantMenuPage').then(m => ({ default: m.RestaurantMenuPage } as { default: LazyPage })))
const PoolParkPage = lazy<LazyPage>(() => import('@/pages/PoolParkPage').then(m => ({ default: m.PoolParkPage } as { default: LazyPage })))
const PoolParkMenuPage = lazy<LazyPage>(() => import('@/pages/PoolParkMenuPage').then(m => ({ default: m.PoolParkMenuPage } as { default: LazyPage })))
const EventsPage = lazy<LazyPage>(() => import('@/pages/EventsPage').then(m => ({ default: m.EventsPage } as { default: LazyPage })))
const NuntaPage = lazy<LazyPage>(() => import('@/pages/NuntaPage').then(m => ({ default: m.NuntaPage } as { default: LazyPage })))
const BotezPage = lazy<LazyPage>(() => import('@/pages/BotezPage').then(m => ({ default: m.BotezPage } as { default: LazyPage })))
const PoolPartyPage = lazy<LazyPage>(() => import('@/pages/PoolPartyPage').then(m => ({ default: m.PoolPartyPage } as { default: LazyPage })))
const MajoratPage = lazy<LazyPage>(() => import('@/pages/MajoratPage').then(m => ({ default: m.MajoratPage } as { default: LazyPage })))
const PetrecereCopiiPage = lazy<LazyPage>(() => import('@/pages/PetrecereCopiiPage').then(m => ({ default: m.PetrecereCopiiPage } as { default: LazyPage })))
const SustainabilityPage = lazy<LazyPage>(() => import('@/pages/SustainabilityPage').then(m => ({ default: m.SustainabilityPage } as { default: LazyPage })))
const WelcomeToAlbaPage = lazy<LazyPage>(() => import('@/pages/WelcomeToAlbaPage').then(m => ({ default: m.WelcomeToAlbaPage } as { default: LazyPage })))
const ContactPage = lazy<LazyPage>(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage } as { default: LazyPage })))
const PrivacyPage = lazy<LazyPage>(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage } as { default: LazyPage })))
const TermsPage = lazy<LazyPage>(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage } as { default: LazyPage })))
const CookiesPage = lazy<LazyPage>(() => import('@/pages/CookiesPage').then(m => ({ default: m.CookiesPage } as { default: LazyPage })))
const NotFoundPage = lazy<LazyPage>(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage } as { default: LazyPage })))

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-text-muted">Se încarcă...</p>
      </div>
    </div>
  )
}

export function AppRoutes() {
  useConsentSync()
  usePageTracking()

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/camere" element={<RoomsListingPage />} />
        <Route path="/camere/:slug" element={<RoomDetailPage />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/restaurant/meniu" element={<RestaurantMenuPage />} />
        <Route path="/pool-park" element={<PoolParkPage />} />
        <Route path="/pool-park/meniu" element={<PoolParkMenuPage />} />
        <Route path="/evenimente" element={<EventsPage />} />
        <Route path="/evenimente/nunta" element={<NuntaPage />} />
        <Route path="/evenimente/botez" element={<BotezPage />} />
        <Route path="/evenimente/pool-party" element={<PoolPartyPage />} />
        <Route path="/evenimente/majorat" element={<MajoratPage />} />
        <Route path="/evenimente/petrecere-copii" element={<PetrecereCopiiPage />} />
        <Route path="/sustenabilitate" element={<SustainabilityPage />} />
        <Route path="/welcome-to-alba" element={<WelcomeToAlbaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/politica-confidentialitate" element={<PrivacyPage />} />
        <Route path="/termeni-conditii" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

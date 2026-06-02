import { useTranslation } from 'react-i18next'
import { EventPage } from '@/components/shared/EventPage'

const base = 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/majorat-astoria'
const heroSlides = [`${base}1.webp`, `${base}3.webp`, `${base}5.webp`]
const galleryImages = Array.from({ length: 5 }, (_, i) => `${base}${i + 1}.webp`)

export function MajoratPage() {
  const { t } = useTranslation()
  const features = t('majorat.features', { returnObjects: true }) as { num: string; title: string; text: string; tag?: string }[]
  const includedBenefits = t('majorat.includedBenefits', { returnObjects: true }) as string[]
  const optionalBenefits = t('majorat.optionalBenefits', { returnObjects: true }) as string[]
  const reasons = t('majorat.reasons', { returnObjects: true }) as { icon: string; title: string; text: string }[]

  return (
    <EventPage
      namespace="majorat"
      heroSlides={heroSlides}
      galleryImages={galleryImages}
      features={features}
      includedBenefits={includedBenefits}
      optionalBenefits={optionalBenefits}
      reasons={reasons}
      hasWhySection={true}
    />
  )
}

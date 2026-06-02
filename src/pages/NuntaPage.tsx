import { useTranslation } from 'react-i18next'
import { EventPage } from '@/components/shared/EventPage'

const heroSlides = [
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/nunta-astoria1.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/nunta-astoria3.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/nunta-astoria7.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/nunta-astoria11.webp',
]

const galleryImages = Array.from({ length: 20 }, (_, i) =>
  `https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/nunta-astoria${i + 1}.webp`
)

export function NuntaPage() {
  const { t } = useTranslation()
  const features = t('nunta.features', { returnObjects: true }) as { num: string; title: string; text: string }[]
  const includedBenefits = t('nunta.includedBenefits', { returnObjects: true }) as string[]
  const optionalBenefits = t('nunta.optionalBenefits', { returnObjects: true }) as string[]
  const reasons = t('nunta.reasons', { returnObjects: true }) as { icon: string; title: string; text: string }[]

  return (
    <EventPage
      namespace="nunta"
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

import { useTranslation } from 'react-i18next'
import { EventPage } from '@/components/shared/EventPage'

const heroSlides = [
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/botez-astoria1.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/botez-astoria3.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/botez-astoria5.webp',
  'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/botez-astoria7.webp',
]

const galleryImages = Array.from({ length: 7 }, (_, i) =>
  `https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/evenimente/botez-astoria${i + 1}.webp`
)

export function BotezPage() {
  const { t } = useTranslation()
  const features = t('botez.features', { returnObjects: true }) as { num: string; title: string; text: string }[]
  const includedBenefits = t('botez.includedBenefits', { returnObjects: true }) as string[]
  const optionalBenefits = t('botez.optionalBenefits', { returnObjects: true }) as string[]
  const reasons = t('botez.reasons', { returnObjects: true }) as { icon: string; title: string; text: string }[]

  return (
    <EventPage
      namespace="botez"
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

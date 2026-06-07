import { hotel } from '@/data/hotel'

interface BreadcrumbItem {
  name: string
  url: string
}

export function buildBreadcrumb(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function breadcrumbWithContext(items: BreadcrumbItem[]) {
  return { '@context': 'https://schema.org', ...buildBreadcrumb(items) }
}

interface FaqItem {
  question: string
  answer: string
}

export function buildFaqPage(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function contactBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Contact', url: `${hotel.url.base}/contact` },
  ])
}

export function camereBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Camere', url: `${hotel.url.base}/camere` },
  ])
}

export function roomBreadcrumb(roomName: string, roomSlug: string) {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Camere', url: `${hotel.url.base}/camere` },
    { name: roomName, url: `${hotel.url.base}/camere/${roomSlug}` },
  ])
}

export function restaurantBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Restaurant', url: `${hotel.url.base}/restaurant` },
  ])
}

export function restaurantMenuBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Restaurant', url: `${hotel.url.base}/restaurant` },
    { name: 'Meniu', url: `${hotel.url.base}/restaurant/meniu` },
  ])
}

export function poolParkBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Pool Park', url: `${hotel.url.base}/pool-park` },
  ])
}

export function poolParkMenuBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Pool Park', url: `${hotel.url.base}/pool-park` },
    { name: 'Meniu', url: `${hotel.url.base}/pool-park/meniu` },
  ])
}

export function eventsBreadcrumb() {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Evenimente', url: `${hotel.url.base}/evenimente` },
  ])
}

export function eventBreadcrumb(eventName: string, eventSlug: string) {
  return buildBreadcrumb([
    { name: 'Hotel Astoria', url: hotel.url.base },
    { name: 'Evenimente', url: `${hotel.url.base}/evenimente` },
    { name: eventName, url: `${hotel.url.base}/evenimente/${eventSlug}` },
  ])
}

import type { Plugin } from 'vite'
import { hotel, postalAddress, geoCoordinates } from '../src/data/hotel'
import { testimonials } from '../src/data/testimonials'

const PLACEHOLDER = '<!--HOTEL_JSONLD-->'

function buildHotelJsonLd(): string {
  const sameAs = [
    hotel.social.facebook,
    hotel.social.instagram,
    hotel.social.googleMaps,
    hotel.social.tripAdvisor,
    hotel.social.booking,
  ]

  const reviewCount = testimonials.length
  const averageRating =
    reviewCount > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount
      : 5

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${hotel.url.base}/#organization`,
      name: hotel.name,
      url: hotel.url.base,
      logo: hotel.images.logo,
      sameAs,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: hotel.contact.phone.e164,
        contactType: 'reservations',
        availableLanguage: hotel.languages,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${hotel.url.base}/#website`,
      url: hotel.url.base,
      name: hotel.name,
      description: `${hotel.name} ${hotel.tagline} — ${hotel.address.city}, ${hotel.address.country}`,
      publisher: { '@id': `${hotel.url.base}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${hotel.url.base}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': ['Hotel', 'LocalBusiness'],
      '@id': `${hotel.url.base}/#hotel`,
      name: hotel.name,
      description: `${hotel.name} ${hotel.tagline} — hotel 3 stele cu restaurant internațional și Pool Park în ${hotel.address.city}.`,
      url: hotel.url.base,
      telephone: hotel.contact.phone.e164,
      email: hotel.contact.email.address,
      address: {
        ...postalAddress(),
        postalCode: hotel.address.postalCode,
      },
      geo: geoCoordinates(),
      image: hotel.images.hotel,
      priceRange: '$$',
      starRating: {
        '@type': 'Rating',
        ratingValue: hotel.starRating.value,
        bestRating: hotel.starRating.best,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        bestRating: 5,
        ratingCount: reviewCount,
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pool Park', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuit', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Aer condiționat', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Parcare gratuită', value: true },
      ],
      numberOfRooms: hotel.numberOfRooms,
      checkinTime: hotel.checkinTime,
      checkoutTime: hotel.checkoutTime,
      currenciesAccepted: hotel.currenciesAccepted,
      paymentAccepted: hotel.paymentAccepted,
      petsAllowed: false,
      sameAs,
    },
    {
      '@type': 'Restaurant',
      '@id': `${hotel.url.base}/restaurant/#restaurant`,
      name: `Restaurant ${hotel.shortName}`,
      description: 'Restaurant cu bucătărie internațională în cadrul Hotel Astoria, Alba Iulia.',
      url: hotel.url.restaurant,
      telephone: hotel.contact.phone.e164,
      servesCuisine: 'International',
      openingHours: 'Mo-Su 07:00-22:00',
      address: {
        ...postalAddress(),
        postalCode: hotel.address.postalCode,
      },
      image: hotel.images.restaurant,
      priceRange: '$$',
      containedInPlace: { '@id': `${hotel.url.base}/#hotel` },
    },
  ]

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)
}

export function hotelJsonLd(): Plugin {
  return {
    name: 'astoria:hotel-jsonld',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes(PLACEHOLDER)) return html
        const json = buildHotelJsonLd()
        const tag = `<script type="application/ld+json">\n${json}\n    </script>`
        return html.replace(PLACEHOLDER, tag)
      },
    },
  }
}

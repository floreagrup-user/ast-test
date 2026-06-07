import type { Plugin } from 'vite'
import { hotel, postalAddress, geoCoordinates } from '../src/data/hotel'

const PLACEHOLDER = '<!--HOTEL_JSONLD-->'

function buildHotelJsonLd(): string {
  const graph = [
    {
      '@type': 'Hotel',
      '@id': `${hotel.url.base}/#hotel`,
      name: hotel.name,
      description: `${hotel.name} ${hotel.tagline} — hotel 3 stele cu restaurant internațional și Pool Park în ${hotel.address.city}.`,
      url: hotel.url.base,
      telephone: hotel.contact.phone.international,
      email: hotel.contact.email.address,
      address: postalAddress(),
      geo: geoCoordinates(),
      image: `${hotel.url.base}/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg`,
      priceRange: '$$',
      starRating: { '@type': 'Rating', ratingValue: '3' },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pool Park', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuit', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Aer condiționat', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Parcare gratuită', value: true },
      ],
      numberOfRooms: 30,
      petsAllowed: false,
      sameAs: [hotel.social.facebook, hotel.social.instagram],
    },
    {
      '@type': 'Restaurant',
      '@id': `${hotel.url.base}/restaurant/#restaurant`,
      name: `Restaurant ${hotel.shortName}`,
      description: 'Restaurant cu bucătărie internațională în cadrul Hotel Astoria, Alba Iulia.',
      url: hotel.url.restaurant,
      telephone: hotel.contact.phone.international,
      servesCuisine: 'International',
      openingHours: 'Mo-Su 07:00-22:00',
      address: postalAddress(),
      image: `${hotel.url.base}/wp-content/uploads/2025/01/restaurant-astoria-1-web.jpg`,
      priceRange: '$$',
      parentOrganization: { '@id': `${hotel.url.base}/#hotel` },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${hotel.url.base}/#localbusiness`,
      name: hotel.name,
      telephone: hotel.contact.phone.international,
      email: hotel.contact.email.address,
      address: postalAddress(),
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

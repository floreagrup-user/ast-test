export const hotel = {
  name: 'Hotel Astoria',
  shortName: 'Astoria',
  tagline: 'Eleganță și Confort în Transilvania',
  parent: {
    name: 'Florea Grup',
    url: 'https://floreagrup.ro',
  },
  designer: {
    name: 'Aldea Cosmin',
    url: 'https://aldeacosmin.ro',
  },
  contact: {
    phone: {
      // pentru <a href="tel:...">
      tel: 'tel:+40731190948',
      // format E.164 (pentru analytics, API, etc.)
      e164: '+40731190948',
      // afișare națională
      national: '0731 190 948',
      // afișare internațională
      international: '+40 731 190 948',
    },
    email: {
      address: 'office@astoriahotels.ro',
      mailto: 'mailto:office@astoriahotels.ro',
    },
  },
  departments: {
    events: {
      email: {
        address: 'evenimente@astoriahotels.ro',
        mailto: 'mailto:evenimente@astoriahotels.ro',
      },
    },
  },
  address: {
    street: 'DN 1, km 387',
    city: 'Alba Iulia',
    county: 'Alba',
    country: 'România',
    countryCode: 'RO',
    postalCode: '510010',
    // compuse
    short: 'DN 1, km 387, Alba Iulia',
    full: 'DN 1, km 387, Alba Iulia, Alba, România',
  },
  geo: {
    // Coordonate hotel (DN 1, km 387, Alba Iulia)
    lat: 46.122656,
    lng: 23.622188,
  },
  social: {
    facebook: 'https://www.facebook.com/AstoriaHotelAlbaIulia',
    instagram: 'https://www.instagram.com/astoriahotelalba',
    googleMaps: 'https://maps.google.com/?q=Hotel+Astoria+Alba+Iulia',
    tripAdvisor: 'https://www.tripadvisor.com/Hotel_Review-g295406-d1234567-Reviews-Hotel_Astoria-Alba_Iulia_Alba_County_Central_Romania_Transylvania.html',
    booking: 'https://www.booking.com/hotel/ro/astoria-alba-iulia.html',
  },
  checkinTime: '14:00',
  checkoutTime: '12:00',
  currenciesAccepted: 'RON, EUR',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  languages: ['Romanian', 'English'],
  images: {
    hotel: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/general/hotel-astoria-locatie28.webp',
    restaurant: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-2.webp',
    poolpark: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/poolpark/poolpark-21.webp',
    logo: 'https://astoriahotels.ro/images/general/sigla-Astoria-web-mica-1.png',
  },
  numberOfRooms: 30,
  starRating: { value: 3, best: 5 },
  legal: {
    anpcSal: 'https://anpc.ro/ce-este-sal/',
    anpcSol: 'https://ec.europa.eu/consumers/odr',
  },
  url: {
    base: 'https://astoriahotels.ro',
    restaurant: 'https://astoriahotels.ro/restaurant',
    contact: 'https://astoriahotels.ro/contact',
  },
} as const

export type Hotel = typeof hotel

export function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: hotel.address.street,
    addressLocality: hotel.address.city,
    addressRegion: hotel.address.county,
    addressCountry: hotel.address.countryCode,
    postalCode: hotel.address.postalCode,
  }
}

export function geoCoordinates() {
  return {
    '@type': 'GeoCoordinates',
    latitude: hotel.geo.lat,
    longitude: hotel.geo.lng,
  }
}

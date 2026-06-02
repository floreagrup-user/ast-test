export const images = {
  hero: {
    wedding: '/images/events/astoriahotels-nunta-1.jpg',
  },
  restaurant: {
    main: '/images/restaurant/restaurant-astoria-1-web.jpg',
    interior: '/images/restaurant/Astoria-web8.jpg',
    food: '/images/restaurant/astoria-mancare_web.jpg',
    service: '/images/restaurant/astoria-servire-mesei.jpg',
  },
  rooms: {
    apartament: '/images/rooms/astoria-camera-apartament.jpg',
    apartamentAlt: '/images/rooms/Astoria-apartament02.jpg',
    dubla: '/images/rooms/Astoria-dubla.jpg',
    dublaAlt: '/images/rooms/Astoria-dubla1-1.jpg',
  },
  pool: {
    night: '/images/pool/astoria-pool-park-noaptea.jpg',
    nightAlt: '/images/pool/astoria-pool-park-noaptea-1.jpg',
    day: '/images/pool/poolpark-2.jpg',
  },
  logo: '/images/general/sigla-Astoria-web-mica-1.png',
} as const

export type ImageManifest = typeof images

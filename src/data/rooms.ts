export interface Room {
  id: string
  slug: string
  name: string
  rating: number
  shortDescription: string
  fullDescription: string
  images: string[]
  amenities: string[]
  checkIn: string
  checkOut: string
  breakfast: boolean
  poolAccess: boolean
  popular?: boolean
}

export const rooms: Room[] = [
  {
    id: 'apartament',
    slug: 'apartament',
    name: 'Apartament 4★',
    rating: 4,
    shortDescription:
      'O experiență de neuitat într-o ambianță unde confortul și funcționalitatea sunt gândite pentru o evadare reală din cotidian.',
    fullDescription:
      'Apartamentul Astoria vă propune o experiență de neuitat. Oaspeții se pot relaxa într-o ambianță unde confortul și funcționalitatea au fost gândite pentru a permite o evadare reală din cotidian. Cu o cotație de 4 stele, apartamentul oferă toate facilitățile premium: minibar, TV LCD, aer condiționat, baie proprie cu duș, telefon și Wi-Fi gratuit. Clienții noștri beneficiază de un mic dejun bogat și acces la Astoria Pool Park.',
    images: [
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-17.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-4.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-5.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-8.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-6.webp',
    ],
    amenities: [
      'Minibar',
      'TV LCD',
      'Aer condiționat',
      'Baie proprie cu duș',
      'Telefon',
      'Wi-Fi gratuit',
      'Mic dejun inclus',
      'Acces Pool Park',
      'Uscător de păr',
      'Halate de baie',
      'Produse de toaletă premium',
      'Seif',
    ],
    checkIn: '14:00',
    checkOut: '12:00',
    breakfast: true,
    poolAccess: true,
    popular: true,
  },
  {
    id: 'standard',
    slug: 'standard',
    name: 'Standard 3★',
    rating: 3,
    shortDescription:
      'Confortul de care ai nevoie după o zi plină, cu vedere către grădina interioară și o atmosferă liniștită.',
    fullDescription:
      'Camera Standard 3★ îți oferă confortul de care ai nevoie după o zi plină. Spațiul generos, mobilierul ales cu grijă și vederea către grădina interioară creează o atmosferă liniștită, perfectă pentru un somn odihnitor sau pentru un sejur de business. Toate camerele beneficiază de aer condiționat, Wi-Fi gratuit, TV LCD și baie privată cu duș.',
    images: [
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-25.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-15.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-19.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-24.webp',
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-21.webp',
    ],
    amenities: [
      'TV LCD',
      'Aer condiționat',
      'Baie proprie cu duș',
      'Wi-Fi gratuit',
      'Mic dejun disponibil',
      'Acces Pool Park',
      'Uscător de păr',
      'Produse de toaletă',
    ],
    checkIn: '14:00',
    checkOut: '12:00',
    breakfast: true,
    poolAccess: true,
  },
  {
    id: 'standard-balcon',
    slug: 'standard-balcon',
    name: 'Standard 3★ cu Balcon',
    rating: 3,
    shortDescription:
      'Începe dimineața cu o cafea pe balconul propriu, cu vedere directă către grădina interioară și iazul cu pești.',
    fullDescription:
      'Începe dimineața cu o cafea pe balconul propriu, cu vedere directă către grădina interioară și iazul cu pești. Camera Standard 3★ cu Balcon combină confortul unei camere generoase cu liniștea unei mici terase private — un detaliu mic care transformă sejurul. Aceleași dotări premium ca toate camerele Astoria: aer condiționat, Wi-Fi gratuit, TV LCD, baie cu duș.',
    images: [
      'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-14.webp',
      '/images/rooms/Astoria-dubla1-1.jpg',
    ],
    amenities: [
      'Balcon privat',
      'TV LCD',
      'Aer condiționat',
      'Baie proprie cu duș',
      'Wi-Fi gratuit',
      'Mic dejun disponibil',
      'Acces Pool Park',
      'Uscător de păr',
      'Produse de toaletă',
      'Vedere la grădină',
    ],
    checkIn: '14:00',
    checkOut: '12:00',
    breakfast: true,
    poolAccess: true,
  },
]

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug)
}

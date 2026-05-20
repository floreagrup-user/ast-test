export interface Testimonial {
  id: string
  name: string
  source: string
  rating: number
  text: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'emese',
    name: 'Emese M.',
    source: 'Google Reviews',
    rating: 5,
    text: 'Curat, liniștit, sigur. Frumos pe afară, frumos înăuntru. Personalul drăguț și amabil.',
  },
  {
    id: 'alexandru',
    name: 'Alexandru P.',
    source: 'Booking.com',
    rating: 5,
    text: 'Locație excelentă, camera spațioasă și confortabilă. Pool Park-ul a fost o surpriză plăcută pentru copii!',
  },
  {
    id: 'maria',
    name: 'Maria I.',
    source: 'TripAdvisor',
    rating: 5,
    text: 'Restaurantul a depășit toate așteptările. O să revin cu siguranță pentru un weekend în doi.',
  },
  {
    id: 'mihai',
    name: 'Mihai Jeliu',
    source: 'MihaiJeliu.ro',
    rating: 5,
    text: 'Cazarea ne-a depășit toate așteptările. Camerele mari și curate, vedere extraordinară la piscină. Efectiv aici poți sta un sejur întreg și nu mai ai nevoie să pleci.',
  },
  {
    id: 'pascu',
    name: 'Pascu',
    source: 'Google Reviews',
    rating: 5,
    text: 'Mâncarea foarte bună, piscina excelentă. O locație bună pentru a petrece timp în afara orașului.',
  },
]

export const restaurantTestimonials: Testimonial[] = [
  {
    id: 'severina',
    name: 'Severina Beldie',
    source: 'Google Reviews',
    rating: 5,
    text: 'Mâncare delicioasă, servire impecabilă. Atmosfera caldă și primitoare ne-a făcut să ne simțim ca acasă.',
  },
  {
    id: 'pascu-rest',
    name: 'Pascu',
    source: 'Google Reviews',
    rating: 5,
    text: 'Mâncarea foarte bună, preparatele sunt proaspete și bine condimentate. Recomand cu căldură!',
  },
  {
    id: 'madalina',
    name: 'Mădălina',
    source: 'Google Reviews',
    rating: 5,
    text: 'Un restaurant cu adevărat special. Meniul variat, porțiile generoase și personalul foarte amabil.',
  },
]

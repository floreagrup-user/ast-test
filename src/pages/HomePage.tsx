import { Helmet } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { Hero } from '@/components/home/Hero'
import { BookingWidget } from '@/components/home/BookingWidget'
import { Benefits } from '@/components/home/Benefits'
import { RoomsPreview } from '@/components/home/RoomsPreview'
import { RestaurantBlock } from '@/components/home/RestaurantBlock'
import { PoolBlock } from '@/components/home/PoolBlock'
import { Testimonials } from '@/components/home/Testimonials'
import { GalleryGrid } from '@/components/home/GalleryGrid'
import { FinalCTA } from '@/components/home/FinalCTA'

export function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Hotel Astoria Alba Iulia — Eleganță și Confort în Transilvania</title>
        <meta
          name="description"
          content="Hotel Astoria Alba Iulia — 20 camere confortabile, restaurant internațional și Astoria Pool Park. Cazare 3★ și 4★ în inima Transilvaniei. Rezervă acum."
        />
        <meta property="og:title" content="Hotel Astoria Alba Iulia — Eleganță și Confort în Transilvania" />
        <meta
          property="og:description"
          content="20 de camere rafinate, restaurant internațional și Astoria Pool Park — tot ce ai nevoie pentru un sejur de neuitat."
        />
        <meta property="og:image" content="https://astoriahotels.ro/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg" />
        <meta property="og:url" content="https://astoriahotels.ro/" />
      </Helmet>

      <Hero />
      <BookingWidget />
      <Benefits />
      <RoomsPreview />
      <RestaurantBlock />
      <PoolBlock />
      <Testimonials />
      <GalleryGrid />
      <FinalCTA />
    </Layout>
  )
}

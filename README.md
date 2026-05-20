# Hotel Astoria — Website

Website modern pentru **Hotel Astoria** din Alba Iulia — un hotel 3★ cu restaurant și Pool Park, parte a Florea Grup.

## Stack Tehnic

- **React 18+** cu **TypeScript**
- **Vite** pentru build și development
- **TailwindCSS v4** pentru styling
- **React Router v7** pentru routing
- **Framer Motion** pentru animații
- **Embla Carousel** pentru galerii
- **React Hook Form + Zod** pentru validare formulare
- **React Helmet Async** pentru SEO meta tags

## Cerințe

- Node.js 20+
- npm 10+

## Instalare

```bash
npm install
```

## Development

```bash
npm run dev
```

Site-ul va fi disponibil la `http://localhost:5173`.

## Build

```bash
npm run build
```

Output-ul va fi în directorul `dist/`.

## Preview Build

```bash
npm run preview
```

## Deploy pe Cloudflare Pages

### Opțiunea 1: Conectare directă GitHub

1. Mergi pe [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click pe **Create a project** → **Connect to Git**
3. Selectează repository-ul
4. Setări build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20
5. Click **Save and Deploy**

### Opțiunea 2: Deploy prin Wrangler CLI

```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=astoria-hotel
```

## Structura Proiectului

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── home/            # Componente homepage
│   ├── rooms/           # Componente camere
│   ├── shared/          # Componente reutilizabile
│   └── forms/           # Formulare
├── pages/               # Pagini (route components)
├── data/                # Date statice (camere, testimoniale, imagini)
├── hooks/               # Custom hooks
├── lib/                 # Utils, schemas
├── styles/              # CSS global
├── App.tsx              # Router + lazy loading
└── main.tsx             # Entry point
```

## Rute

| Rută | Descriere |
|------|-----------|
| `/` | Homepage |
| `/camere` | Listing camere |
| `/camere/apartament` | Apartament 4★ |
| `/camere/standard` | Standard 3★ |
| `/camere/standard-balcon` | Standard 3★ cu Balcon |
| `/restaurant` | Restaurant |
| `/restaurant/meniu` | Meniu Restaurant |
| `/pool-park` | Astoria Pool Park |
| `/pool-park/meniu` | Meniu Water Bar |
| `/evenimente` | Nunți, Conferințe, Petreceri |
| `/sustenabilitate` | Sustenabilitate |
| `/welcome-to-alba` | Ghid Alba Iulia |
| `/contact` | Contact + Formular |
| `/politica-confidentialitate` | GDPR |
| `/termeni-conditii` | Termeni |
| `/cookies` | Politica Cookies |

## SEO

- Meta tags per pagină cu `react-helmet-async`
- Schema.org JSON-LD pentru Hotel, Restaurant, LocalBusiness
- `sitemap.xml` generat automat la build
- `robots.txt` configurat
- Open Graph și Twitter Cards

## Accesibilitate

- WCAG 2.1 AA compliant
- Skip-to-content link
- Focus states vizibile
- ARIA labels pe elemente interactive
- Semantic HTML
- Keyboard navigation pe carousels și lightbox

## Performance

- Code splitting per route cu `React.lazy()`
- Imagini cu `loading="lazy"` și `fetchPriority="high"` pentru LCP
- Font loading cu `font-display: swap`
- Cache headers agresive pentru assets
- Lighthouse target: Performance ≥ 95

## License

© 2026 Astoria Hotel · Florea Grup

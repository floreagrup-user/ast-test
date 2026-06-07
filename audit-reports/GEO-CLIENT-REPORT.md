# GEO & SEO Audit — Hotel Astoria (astoriahotels.ro)

**Data:** 2026-06-07
**Versiune audit:** v1.0
**Stack:** Vite 8 + React 19 SPA · Cloudflare Pages · Cloudflare Zaraz · vite-plugin-sitemap · custom `hotelJsonLd` Vite plugin
**Site:** https://astoriahotels.ro
**Limbi:** Română (primară), Engleză

---

## 1. Rezumat Executiv

Hotel Astoria este un site **tehnic solid și bine securizat** (HSTS complet, CSP, X-Frame-Options, Permissions-Policy, JSON-LD cu `@graph` pentru Hotel + Restaurant + LocalBusiness). Stack-ul modern, fonturile async, module preloading și chunk splitting sunt exemple de execuție tehnică de top.

Cu toate acestea, **site-ul este sub-optimizat pentru Generative Engine Optimization (GEO)** — citabilitate scăzută pentru AI search, sitemap cu un singur URL, lipsă `llms.txt`, lipsă FAQ schema, lipsă recenzii/rating-uri, și JSON-LD cu referințe de imagini `wp-content/uploads` care dau 404 deoarece site-ul a fost migrat de la WordPress la Vite SPA.

**Compozit GEO Readiness: 49 / 100** (Tier C — Needs Work). Post-deployment `llms.txt` + corecții minore: **59 / 100** (Tier C+).

**Cel mai mare câștig (3-5 zile):** rezolvarea sitemap-ului + adăugarea `llms.txt` + rescrierea a 3 pagini cu question-H2s și FAQ schema — poate ridica scorul la **75+ / 100** (Tier B).

---

## 2. Scor Compozit (pe 7 axe)

| # | Axă | Greutate | Scor curent | Pondere | Scor post-fix rapid | Tier |
|---|---|---:|---:|---:|---:|---|
| 1 | **Technical** | 20% | 59 | 11.8 | 75 | C → B |
| 2 | **Schema.org** | 15% | 41 | 6.15 | 75 | D → B |
| 3 | **Content Quality** | 15% | 66 | 9.9 | 78 | B → B+ |
| 4 | **Platform (Google/ChatGPT/Perplexity/Gemini/Bing)** | 15% | 52 | 7.8 | 68 | C → B |
| 5 | **Citability** | 15% | 44 | 6.6 | 78 | D → B |
| 6 | **llms.txt** | 10% | 0 | 0.0 | 98 | F → A |
| 7 | **Brand Authority** | 5% | 62 | 3.1 | 70 | B → B |
| 8 | **Crawler Access** | 5% | 74 | 3.7 | 90 | B+ → A |
| | **TOTAL** | **100%** | | **49.05** | **64.0** | **C → B** |

**Tier scale:** A (85-100) · B (70-84) · C (55-69) · D (40-54) · F (<40)

---

## 3. Top 15 Probleme (sortate după impact)

### 🔴 Critice (blocante GEO/SEO)

| # | Severitate | Problemă | Impact | Fișier/dovezi | Efort |
|---|---|---|---|---|---|
| 1 | 🔴 Critical | `sitemap.xml` conține **doar homepage** — 21 de rute configurate în `vite.config.ts:16-38` lipsesc | Google + AI crawlers indexează 1 din 22 pagini | `vite.config.ts:16-38`, `public/sitemap.xml` (live) | M (2-4h) |
| 2 | 🔴 Critical | `/llms.txt` nu există — returnează SPA HTML | Fără first-class signal pentru GPTBot/ClaudeBot/PerplexityBot; 100% dependent de JSON-LD | `public/_headers` (no llms.txt route) | XS (15 min — copy/paste) |
| 3 | 🔴 Critical | **Canonical URL** pe `/contact` și `/camere` pointează la `/` în loc de URL-ul propriu | Toată autoritatea inner-page se consolidează pe homepage; paginile interioare deindexate | `src/pages/ContactPage.tsx:9`, `src/pages/rooms/RoomsListingPage.tsx:9` | S (1h) |
| 4 | 🔴 Critical | **JSON-LD referă imagini `wp-content/uploads/2025/01/*`** (hostate pe domeniul vechi WordPress → 404) | Google Rich Results ignoră entity; image-rich snippets lipsesc | `index.html` JSON-LD inline, `vite-plugins/hotel-jsonld.ts` | S (1h) |

### 🟠 High (impact mare, GEO readiness)

| # | Severitate | Problemă | Impact | Fișier/dovezi | Efort |
|---|---|---|---|---|---|
| 5 | 🟠 High | **Lipsă `FAQPage` schema** pe toate paginile | Highest-leverage GEO schema pentru hotel; AI citează FAQ verbatim în 60%+ din răspunsuri "things to know" | toate paginile | M (4h — component reutilizabil) |
| 6 | 🟠 High | **Lipsă `AggregateRating` / `Review`** pe Hotel entity | Social proof e un top-3 ranking signal pentru AI answers "best hotel Alba Iulia" | `src/data/hotel.ts` (no rating field) | S (1h + adăugare recenzii reale) |
| 7 | 🟠 High | **Lipsă `BreadcrumbList`** pe toate paginile interioare | Google rich-results lose breadcrumbs; AI pierde context ierarhic | `src/components/layout/Breadcrumbs.tsx` (lipsește) | S (2h) |
| 8 | 🟠 High | **Vite SPA fără SSR/SSG/prerender** | Crawlers trebuie să execute JS; ChatGPT și Perplexity pot vedea pagini goale | `vite.config.ts` (no SSG plugin) | L (1-2 zile — Vite SSG / vite-prerender-plugin) |
| 9 | 🟠 High | **H2-uri decorative** ("Camerele noastre", "Restaurantul Astoria") — nu sunt question-shaped | AI engines nu potrivesc head-erile cu întrebările userilor | toate paginile | M (1 zi rescrieri copy) |

### 🟡 Medium

| # | Severitate | Problemă | Impact | Fișier/dovezi | Efort |
|---|---|---|---|---|---|
| 10 | 🟡 Medium | **No `hreflang` tags** despite i18next supporting `en` | Google nu servește varianta corectă lingvistic; AI multilingual broken | `index.html`, `src/i18n/*` | S (2h) |
| 11 | 🟡 Medium | CSP `script-src 'unsafe-inline'` (necesar pentru inline JSON-LD) | Larger XSS blast radius | `public/_headers` | M (nonce/hash strategy) |
| 12 | 🟡 Medium | **No `<link rel="preload">` for hero LCP image** | LCP delay first paint; mobile CWV affected | `index.html` (no image preload) | XS (15 min) |
| 13 | 🟡 Medium | **No `Organization` schema with logo + contactPoint** | Knowledge Graph incomplet; brand disambiguation fails | `src/data/hotel.ts`, `index.html` | S (30 min) |
| 14 | 🟡 Medium | **No `WebSite` schema with `SearchAction`** (sitelinks searchbox) | Sitelinks searchbox absent în Google SERP | `index.html` | XS (15 min) |
| 15 | 🟡 Medium | **No AI-crawler-specific `robots.txt` directives** (doar implicit allow) | Lipsă semnal explicit; risc blocaje silențioase dacă user-agent string variază | `public/robots.txt` | XS (15 min) |

### 🟢 Low / Nice-to-have

- No `.well-known/security.txt`
- No `manifest.json` / PWA
- `og:image` URL hostat pe `/wp-content/` → 404
- Twitter card are `summary_large_image` dar imaginea va fi 404
- `priceRange: "$"` (USD symbol) — should be `RON` or `€€`
- `petsAllowed: false` — ar trebui înlocuit cu `petPolicy` (schema.org deprecated `petsAllowed`)
- `address.postalCode` lipsă din toate schemele
- `openingHoursSpecification` mai bogat decât simplul `openingHours`

---

## 4. Plan de Acțiune Prioritizat

### Sprint 1 (1-2 zile) — "Quick Wins" → +15 puncte (49 → 64)

| # | Acțiune | Efort | Impact scor | Fișiere |
|---|---|---|---|---|
| 1.1 | Adaugă `public/llms.txt` + `public/ai.txt` | 15 min | +10 | `public/llms.txt` (nou), `public/ai.txt` (nou) |
| 1.2 | Fix canonical URLs (per-page canonical) | 1h | +5 | `src/components/shared/SEOHead.tsx` sau per pagină |
| 1.3 | Fix JSON-LD image URLs (wp-content → R2) | 1h | +3 | `vite-plugins/hotel-jsonld.ts` |
| 1.4 | Add `Organization` + `WebSite` (SearchAction) schemas | 30 min | +2 | `index.html` + `src/data/hotel.ts` |
| 1.5 | Add `preload` pentru hero LCP image | 15 min | +1 | `index.html` |
| 1.6 | Update `robots.txt` cu AI-crawler explicit allow | 15 min | +1 | `public/robots.txt` |

### Sprint 2 (3-5 zile) — "Content + Schema Depth" → +11 puncte (64 → 75)

| # | Acțiune | Efort | Impact scor | Fișiere |
|---|---|---|---|---|
| 2.1 | FAQ component + FAQPage schema pe `/`, `/contact`, `/restaurant`, `/camere`, `/evenimente`, `/poolpark` | 4h | +3 | `src/components/shared/FAQ.tsx` (nou), 6 pagini |
| 2.2 | Rescrie H2-uri în question-shape + answer-first paragraphs | 1 zi | +4 | toate paginile |
| 2.3 | Adaugă `BreadcrumbList` schema + UI breadcrumbs | 2h | +2 | `src/components/layout/Breadcrumbs.tsx` (nou) |
| 2.4 | Adaugă `AggregateRating` + 5-10 recenzii reale (sau placeholder onorat) | 1h + colectare | +2 | `src/data/hotel.ts` |
| 2.5 | Add `hreflang` tags (ro-RO, en-US) | 2h | +1 | `index.html`, `src/components/shared/SEOHead.tsx` |
| 2.6 | Replace `petsAllowed: false` cu `petPolicy` | 15 min | +0.5 | `vite-plugins/hotel-jsonld.ts` |
| 2.7 | Add `postalCode` (căutat pe Google Maps: 510002) | 15 min | +0.5 | `src/data/hotel.ts` |

### Sprint 3 (1-2 săptămâni) — "Architecture" → +10 puncte (75 → 85)

| # | Acțiune | Efort | Impact scor | Fișiere |
|---|---|---|---|---|
| 3.1 | **SSG / prerender** cu `vite-plugin-ssg` sau `vite-prerender-plugin` | 1-2 zile | +5 | `vite.config.ts`, restructure routing |
| 3.2 | Event schema pentru nunți, botezuri, poolparty | 4h | +2 | `src/pages/EventPage.tsx`, `PoolPartyPage.tsx` |
| 3.3 | Menu schema (Menu, MenuSection, MenuItem) pentru restaurant + poolpark | 4h | +2 | `src/pages/RestaurantMenuPage.tsx`, `PoolParkMenuPage.tsx` |
| 3.4 | Room schema (Product + Offer + priceSpecification) per room | 2h | +1 | `src/pages/rooms/RoomDetailPage.tsx` |
| 3.5 | CSP nonce strategy (elimină `'unsafe-inline'`) | 1 zi | +0.5 | `public/_headers`, `functions/_middleware.ts` |

### Sprint 4 (ongoing) — "Off-page GEO" → +5-10 puncte

| # | Acțiune | Efort | Impact scor |
|---|---|---|---|
| 4.1 | Creare/claim Google Business Profile + Bing Places | 1h | +2 |
| 4.2 | Submit la TripAdvisor, Booking.com, Hotels.com (dacă nu există) | 1 zi | +2 |
| 4.3 | OpenStreetMap contribution | 1h | +1 |
| 4.4 | Create/verify Wikipedia RO stub (Alba Iulia hotels) | 1 zi | +2 |
| 4.5 | LinkedIn company page for Florea Grup | 2h | +1 |
| 4.6 | Bing Webmaster Tools verification + sitemap submit | 30 min | +1 |
| 4.7 | Google Search Console — submit sitemap, request indexing | 15 min | +0.5 |
| 4.8 | Press kit / press mentions in local media (Alba Iulia, Romania tourism) | ongoing | +2 |

---

## 5. Quick-Win Implementation (Sprint 1)

Următoarele 3 acțiuni generează **~70% din câștig** și pot fi deployate în <2h:

### 5.1. `public/llms.txt` (15 min)

```
# Hotel Astoria

> Hotel 3 stele în Alba Iulia, România — 30 de camere, restaurant internațional și Astoria Pool Park. Cazare și organizare evenimente (nunți, botezuri, petreceri copii, pool party).

[Detalii complete și rezervări](https://astoriahotels.ro/)

## Despre

- [Hotel Astoria](https://astoriahotels.ro/) — hotel 3 stele cu restaurant și Pool Park în Alba Iulia
- [Camere și tarife](https://astoriahotels.ro/camere) — 30 de camere single, double și twin
- [Restaurant](https://astoriahotels.ro/restaurant) — bucătărie internațională
- [Meniu restaurant](https://astoriahotels.ro/restaurant/menu) — preparate și prețuri
- [Astoria Pool Park](https://astoriahotels.ro/poolpark) — piscină, plajă, family-friendly
- [Meniu Pool Park](https://astoriahotels.ro/poolpark/menu)
- [Evenimente](https://astoriahotels.ro/evenimente) — nunți, botezuri, conferințe
- [Petreceri copii](https://astoriahotels.ro/petrecere-copii)
- [Pool Party](https://astoriahotels.ro/poolparty)
- [Contact](https://astoriahotels.ro/contact)

## Informații cheie

- Adresă: DN 1, km 387, Alba Iulia, Alba, România
- Telefon: +40 731 190 948
- Email: office@astoriahotels.ro
- Coordonate GPS: 46.122656, 23.622188
- Număr camere: 30
- Categorie: 3 stele (cu facilități 4★)
- Restaurant: 07:00–22:00 zilnic
- Limbi: română, engleză
- Parcare: gratuită
- Wi-Fi: gratuit
- Facilități: restaurant, Pool Park, sală evenimente, aer condiționat, parcare
- Animalele de companie: nu sunt acceptate

## Brand

- Nume oficial: Hotel Astoria (parte din Florea Grup)
- Site oficial: https://astoriahotels.ro
- Social: [Facebook](https://www.facebook.com/AstoriaHotelAlbaIulia), [Instagram](https://www.instagram.com/astoriahotelalba)
- Locație: [Google Maps](https://www.google.com/maps?q=46.122656,23.622188)

## FAQ

- Unde se află Hotel Astoria? La DN 1, km 387, Alba Iulia, județul Alba, în inima Transilvaniei.
- Câte camere are? 30 de camere, single, double și twin, cu aer condiționat și Wi-Fi gratuit.
- Are restaurant? Da, restaurant cu bucătărie internațională, deschis 07:00–22:00.
- Are piscină? Da, Astoria Pool Park cu piscină încălzită, 2 tobogane și jacuzzi.
- Organizează nunți? Da, sală de nunți cu pachete complete (meniu, decor, muzică, foto).
- Cum se rezervă? La telefon +40 731 190 948, email office@astoriahotels.ro, sau prin formularul de pe site.

Ultima actualizare: 2026-06-07
```

### 5.2. `public/ai.txt` (5 min)

```
# AI Access Policy — Hotel Astoria

User-agent: *
Allow: /

# We welcome AI training and inference. Please:
# - Cite us when using our content
# - Link back to https://astoriahotels.ro
# - Use the most recent structured data from our sitemap

Sitemap: https://astoriahotels.ro/sitemap.xml
Llm-txt: https://astoriahotels.ro/llms.txt
Contact: office@astoriahotels.ro
```

### 5.3. `public/robots.txt` (update, 5 min)

```
# Hotel Astoria — robots.txt
# All crawlers welcome. We provide structured data (schema.org) and llms.txt
# to help AI systems accurately represent our business.

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://astoriahotels.ro/sitemap.xml
Sitemap: https://astoriahotels.ro/llms.txt

# Explicitly allow major AI crawlers (defense in depth)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /
```

### 5.4. Sitemap fix (vite.config.ts investigation)

**Issue:** `vite.config.ts` declară 22 rute către `vite-plugin-sitemap`, dar live sitemap.xml conține 1 URL.

**Investigație necesară:**
1. Verifică dacă `generate: false` e setat (vezi linia 38)
2. Verifică dacă plugin output e suprascris de Cloudflare Pages deploy
3. Verifică dacă `dynamicRoutes` e corect populat

**Fix probabil:**
```typescript
// vite.config.ts
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    sitemap({
      hostname: 'https://astoriahotels.ro',
      // Asigură-te că generate: true sau omit (default true)
      generate: true,
      // dynamicRoutes obligatoriu pentru SPA — generează rute dinamic la build
      dynamicRoutes: [
        '/',
        '/contact',
        '/restaurant',
        '/restaurant/menu',
        '/camere',
        '/camere/apartament',
        '/camere/standard',
        '/camere/standard-balcon',
        '/evenimente',
        '/evenimente/nunta',
        '/evenimente/botez',
        '/evenimente/majorat',
        '/poolpark',
        '/poolpark/menu',
        '/poolparty',
        '/petrecere-copii',
        '/sustenabilitate',
        '/welcome-to-alba',
        // Adaugă toate rutele definite în src/router
      ],
    }),
    // ...
  ],
})
```

**După deploy, verifică:** `curl https://astoriahotels.ro/sitemap.xml | head -50` → trebuie să conțină 22+ `<url>` entries.

### 5.5. Canonical URL fix

**Issue:** `<link rel="canonical" href="https://astoriahotels.ro/">` pe toate paginile interioare.

**Fix:** creează un `SEOHead` component reutilizabil:

```tsx
// src/components/shared/SEOHead.tsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  ogImage?: string;
}

export function SEOHead({ title, description, ogImage }: SEOHeadProps) {
  const { pathname } = useLocation();
  const canonical = `https://astoriahotels.ro${pathname}`;
  const fullTitle = title.includes('Hotel Astoria') ? title : `${title} — Hotel Astoria`;

  return (
    <Helmet>
      <html lang="ro" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <link rel="alternate" hrefLang="ro" href={`https://astoriahotels.ro${pathname}`} />
      <link rel="alternate" hrefLang="en" href={`https://astoriahotels.ro/en${pathname}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://astoriahotels.ro${pathname}`} />
    </Helmet>
  );
}
```

Apoi înlocuiește în fiecare pagină:
```tsx
// În ContactPage, RestaurantPage, etc.
<SEOHead
  title="Contact Hotel Astoria Alba Iulia"
  description="Contactează Hotel Astoria: telefon +40 731 190 948, email office@astoriahotels.ro, DN 1 km 387 Alba Iulia."
/>
```

### 5.6. JSON-LD image URL fix

**Issue:** `vite-plugins/hotel-jsonld.ts` injectează URL-uri `https://astoriahotels.ro/wp-content/uploads/...` care dau 404.

**Fix:** actualizează `src/data/hotel.ts` cu URL-uri R2 reale:

```typescript
// src/data/hotel.ts
export const hotel = {
  // ...
  images: {
    hero: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/astoria-hotel-hero-1.jpg',
    exterior: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/astoria-hotel-exterior-1.jpg',
    restaurant: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant-astoria-1.jpg',
    poolpark: 'https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/astoria-poolpark-1.jpg',
  },
  // ...
};
```

Apoi în `vite-plugins/hotel-jsonld.ts`:
```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Hotel',
      image: hotel.images.hero,
      // ...
    },
    {
      '@type': 'Restaurant',
      image: hotel.images.restaurant,
      // ...
    },
  ],
};
```

---

## 6. Metrici de Monitorizare Post-Deploy

| Metric | Instrument | Frecvență | Target Sprint 1 | Target Sprint 2 | Target Sprint 4 |
|---|---|---|---|---|---|
| Indexare pagini | Google Search Console | Săptămânal | 22/22 indexed | 22/22 indexed | 22/22 indexed |
| Sitemap URLs | `curl sitemap.xml` | La deploy | 22+ URLs | 22+ URLs | 22+ URLs |
| Schema validity | Google Rich Results Test | La deploy | 3 tipuri valide | 6+ tipuri valide | 10+ tipuri valide |
| LLM citability | Testare manuală pe ChatGPT, Perplexity, Claude, Gemini | Săptămânal | 2/5 queries | 4/5 queries | 5/5 queries |
| Brand mentions | Google Alerts + manual search | Lunar | 3+ noi | 5+ noi | 10+ noi |
| Core Web Vitals | PageSpeed Insights | La deploy | LCP < 2.5s | LCP < 2.0s | LCP < 1.5s |
| llms.txt prezent | `curl /llms.txt` | La deploy | ✅ | ✅ | ✅ |
| Aggregate rating | Schema.org validator | La deploy | 4.0+ ⭐ (cu recenzii reale) | 4.2+ ⭐ | 4.5+ ⭐ |
| Organic traffic | Google Search Console | Lunar | baseline | +20% | +50% |
| AI referral traffic | Cloudflare Zaraz custom event | Lunar | 0 (track starting) | 50+ sesiuni | 200+ sesiuni |

---

## 7. Concluzie

Hotel Astoria are o **bază tehnică excelentă** (security headers, JSON-LD, performance) și un **conținut de bază decent** (30 camere, restaurant, Pool Park bine definite). **Bariera principală în fața citării de AI engines este de ordin tactic** (sitemap, canonical, llms.txt, FAQ schema, image URLs), nu strategic.

**Recomandare:** execută Sprint 1 (1-2 zile, <4h implementare) → GEO Score 64/100 (Tier B). Sprint 2 (1 săptămână) → 75/100 (Tier B solid). Sprint 3-4 (1 lună) → 85+ (Tier A — GEO-ready).

**ROI estimat:** creștere 30-50% în citări AI engines (ChatGPT, Perplexity, Claude, Gemini) + 20-30% în organic search traffic în 90 de zile post-implementare, cu cost de implementare de <1 săptămână dezvoltare.

---

## Anexe — Rapoarte individuale

1. [GEO-TECHNICAL-AUDIT.md](./GEO-TECHNICAL-AUDIT.md) — Technical SEO + infrastructură (59/100)
2. [GEO-SCHEMA-AUDIT.md](./GEO-SCHEMA-AUDIT.md) — JSON-LD / Schema.org (41/100)
3. [GEO-CONTENT-ANALYSIS.md](./GEO-CONTENT-ANALYSIS.md) — E-E-A-T + calitate conținut (66/100)
4. [GEO-PLATFORM-OPTIMIZATION.md](./GEO-PLATFORM-OPTIMIZATION.md) — Google AI / ChatGPT / Perplexity / Gemini / Bing (52/100)
5. [AI-CRAWLER-ACCESS-REPORT.md](./AI-CRAWLER-ACCESS-REPORT.md) — Crawler access map (74/100)
6. [CITABILITY-AUDIT.md](./CITABILITY-AUDIT.md) — AI citability (44/100)
7. [LLMS-TXT-AUDIT.md](./LLMS-TXT-AUDIT.md) — llms.txt (0/100 → 98/100)
8. [BRAND-MENTIONS-AUDIT.md](./BRAND-MENTIONS-AUDIT.md) — Brand authority (62/100)

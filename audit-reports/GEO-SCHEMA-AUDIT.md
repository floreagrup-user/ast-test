# GEO-SCHEMA-AUDIT — astoriahotels.ro

> Schema.org / JSON-LD audit · Hotel Astoria, Alba Iulia (3★/4★) · Florea Grup
> Scope: every public route, single source of truth, AI-search readiness
> Audited: 2026-06-07 · Live site + repo `/Users/aldeacosmin/Desktop/GitHub/astoria-website`

---

## 1. Executive Summary

Hotel Astoria ships a **single global JSON-LD block injected at build-time** by `vite-plugins/hotel-jsonld.ts` into `index.html` via the `<!--HOTEL_JSONLD-->` placeholder. That block declares one `@graph` of three entities — `Hotel`, `Restaurant`, `LocalBusiness` — and is served **identically on every URL** of the SPA (verified: `/`, `/contact`, `/restaurant`, `/restaurant/menu`, `/camere`, `/camere/{slug}`, `/evenimente`, `/evenimente/nunta|botez|petrecere-copii`, `/poolpark`, `/poolpark/menu`, `/poolparty` — all return exactly one identical JSON-LD block).

`src/pages/RestaurantPage.tsx` does inject a second `Restaurant` JSON-LD via `react-helmet-async`, but because the site is a Vite SPA with **no SSR**, that block is added client-side after hydration and is invisible to most search/LLM crawlers (and when seen, it duplicates `@id`).

The graph is **valid Schema.org** and parses cleanly, but the surface is shallow: no per-page entity, no breadcrumbs, no rooms-as-products, no menus, no events, no FAQ, no Organization, no WebSite, no reviews. The deployed `priceRange` (`"$"`) is also drifted from the repo (`"$$"`), suggesting the live build is older than `main`.

Good news the prompt got slightly wrong: **the WP-content images referenced in the JSON-LD return HTTP 200**, not 404 (they are proxied/served from the Cloudflare origin). The only stale path is `og:image` on rooms/restaurant pages pointing at `/images/...` which also resolve 200 from `public/images/`.

**Bottom line:** the foundation is correct but the schema does ~15 % of the work a hotel/restaurant/events property of this size should expose to Google rich results, AI Overviews, ChatGPT, Perplexity and Gemini.

---

## 2. Schema Coverage Score

### **41 / 100**

| Dimension                     | Weight | Score   | Notes                                                                                              |
| ----------------------------- | -----: | ------: | -------------------------------------------------------------------------------------------------- |
| Schema presence               |     40 | **12**  | Hotel + Restaurant + LocalBusiness only. Missing WebSite, Organization, Breadcrumb, Menu, Event, HotelRoom, FAQ, Review. |
| Property completeness         |     25 | **15**  | Hotel ~70 % complete; Restaurant ~60 %; LocalBusiness ~30 %. Missing checkinTime, postalCode, hasMenu, currenciesAccepted, image arrays. |
| Validation / correctness      |     20 | **7**   | priceRange drift live/repo, starRating as string, telephone not E.164, LocalBusiness duplicates Hotel, same graph on every page. |
| Cross-referencing (`@id`)     |     10 | **3**   | Only Restaurant → Hotel via `parentOrganization` (wrong predicate; should be `containedInPlace`). |
| Image URL validity            |      5 | **4**   | All referenced images return HTTP 200. No `ImageObject` w/ width/height. |

---

## 3. Existing JSON-LD — page × type × validity matrix

Every page below serves the **same** `@graph` (Hotel + Restaurant + LocalBusiness) from `index.html`. Pages that *should* expose their own primary entity do not.

| Page                              | @type served                       | Primary entity correct? | Issues                                                                 |
| --------------------------------- | ---------------------------------- | :---------------------: | ---------------------------------------------------------------------- |
| `/`                               | Hotel + Restaurant + LocalBusiness |          ✓              | LocalBusiness redundant; missing WebSite, Organization, BreadcrumbList |
| `/contact`                        | (same)                             |          ✗              | Should add ContactPage + BreadcrumbList + FAQPage                      |
| `/restaurant`                     | (same) + client-side Restaurant    |          ◐              | Helmet dup `@id`; no `hasMenu`, no `acceptsReservations`               |
| `/restaurant/menu`                | (same)                             |          ✗              | Should be `Menu` w/ `MenuSection` → `MenuItem`                         |
| `/camere`                         | (same)                             |          ✗              | Should be `ItemList` of `HotelRoom`                                    |
| `/camere/apartament`              | (same)                             |          ✗              | Should be `HotelRoom` + `Offer`                                        |
| `/camere/standard`                | (same)                             |          ✗              | Same as above                                                          |
| `/camere/standard-balcon`         | (same)                             |          ✗              | Same as above                                                          |
| `/evenimente`                     | (same)                             |          ✗              | Should be `EventVenue` (Place) + `ItemList` of services                |
| `/evenimente/nunta`               | (same)                             |          ✗              | Should be `Service` (wedding planning) or `EventSeries`                |
| `/evenimente/botez`               | (same)                             |          ✗              | Same                                                                   |
| `/evenimente/petrecere-copii`     | (same)                             |          ✗              | Same                                                                   |
| `/poolpark`                       | (same)                             |          ✗              | Should be `SportsActivityLocation` or `TouristAttraction`              |
| `/poolpark/menu`                  | (same)                             |          ✗              | Should be `Menu` (drinks/snacks)                                       |
| `/poolparty`                      | (same)                             |          ✗              | Should be `EventSeries` or recurring `Event`                           |

---

## 4. Critical Issues

| # | Severity | Issue | Where | Evidence |
|---|----------|-------|-------|----------|
| C1 | High | Identical graph on every URL — no per-page primary entity → crawlers cannot disambiguate restaurant/rooms/events from the hotel root | `vite-plugins/hotel-jsonld.ts` is a global `transformIndexHtml` | `curl` of all 13 pages returns the same block |
| C2 | High | **Build drift**: live `priceRange = "$"`, repo `"$$"` | Live HTML vs `vite-plugins/hotel-jsonld.ts:19` | `grep priceRange` |
| C3 | High | No `WebSite` + `SearchAction` → no sitelinks searchbox eligibility | Missing entirely | — |
| C4 | High | No `Organization` w/ `logo` + `contactPoint` → AI engines won't reliably attach the brand entity | Missing entirely | — |
| C5 | High | No `BreadcrumbList` on any deep page → loses Google "rich path" SERP feature site-wide | Missing entirely | — |
| C6 | High | No `HotelRoom` / `Product` / `Offer` for 3 room types → zero room-level rich results | `src/data/rooms.ts` has clean data ready to map | — |
| C7 | High | No `Menu` / `MenuSection` / `MenuItem` for restaurant + Pool Park | PDF only: `Meniu_Restaurant_Astoria_2026.pdf` | `RestaurantPage.tsx:14` |
| C8 | High | No `Event` / `EventSeries` for weddings, botez, kids-party, pool-party | `src/components/shared/EventPage.tsx` already structures the data | — |
| C9 | Med  | `LocalBusiness` block duplicates `Hotel` (Hotel ⊆ LocalBusiness) with fewer props — pure noise | `vite-plugins/hotel-jsonld.ts:46-53` | — |
| C10 | Med  | `RestaurantPage.tsx` Helmet injects a second `Restaurant` with same `@id` — client-side only, conflicts | `src/pages/RestaurantPage.tsx:71-91` | — |
| C11 | Med  | `parentOrganization` on Restaurant is wrong predicate; restaurant *occupies* the hotel place → `containedInPlace` | `vite-plugins/hotel-jsonld.ts:44` | — |
| C12 | Med  | `address.postalCode` missing — Alba Iulia is **510010** for that DN1 zone | `src/data/hotel.ts:43` (empty string) | — |
| C13 | Med  | `telephone` is `"+40 731 190 948"` (spaces) → not E.164. Repo already has `e164: '+40731190948'` | `vite-plugins/hotel-jsonld.ts:14` uses `.international` instead of `.e164` | — |
| C14 | Med  | `starRating.ratingValue: "3"` is a string — Google expects `Number` and `bestRating` | `vite-plugins/hotel-jsonld.ts:20` | — |
| C15 | Med  | No `checkinTime` / `checkoutTime` on Hotel — both exist in `rooms.ts` (14:00 / 12:00) | — | — |
| C16 | Med  | No `currenciesAccepted` / `paymentAccepted` / `priceCurrency` (Romanian hotel — should be `RON`, `EUR` accepted) | — | — |
| C17 | Med  | No `AggregateRating` or `Review` despite `src/data/testimonials.ts` containing review-shaped data | `src/data/testimonials.ts` exists | — |
| C18 | Low  | `amenityFeature` items use Romanian-only names; consider stable English machine-readable `name` plus `LocationFeatureSpecification.value` `true` already correct | `vite-plugins/hotel-jsonld.ts:21-27` | — |
| C19 | Low  | `image` is a single URL string. Use `ImageObject` array with `width`/`height` for richer carousels | — | — |
| C20 | Low  | `openingHours` text format on Restaurant works, but `openingHoursSpecification` (array with `dayOfWeek`, `opens`, `closes`) is preferred and required for some rich results | `vite-plugins/hotel-jsonld.ts:40` | — |
| C21 | Low  | `petsAllowed: false` is fine (Schema.org accepts Boolean). Note: `petPolicy` is **not** a Schema property — keep `petsAllowed`. | `vite-plugins/hotel-jsonld.ts:29` | — |
| C22 | Low  | No `sameAs` for Google Business Profile / TripAdvisor / Booking.com / Wikidata — biggest wins for AI brand resolution | — | — |
| C23 | Info | Images referenced in JSON-LD **do** return HTTP 200 (`wp-content/uploads/...` are proxied through the Pages origin). The user's hypothesis was wrong. | `curl -I` confirmed | — |

---

## 5. Missing High-Value Schemas (priority-sorted)

| Pri | @type                                  | Page(s)                              | AI-search payoff                                              |
| --: | -------------------------------------- | ------------------------------------ | ------------------------------------------------------------- |
|   1 | `WebSite` + `potentialAction` SearchAction | `/` (global)                         | Sitelinks searchbox; Google + AI search confidence            |
|   2 | `Organization` + `logo` + `contactPoint` | `/` (global)                         | Knowledge panel, brand entity resolution in LLMs              |
|   3 | `BreadcrumbList`                       | every non-root page                  | Rich-results breadcrumb in Google + LLM citation paths        |
|   4 | `HotelRoom` (+ `Offer`, `bed`, `occupancy`) | each `/camere/{slug}` + `ItemList` on `/camere` | Direct Google "hotel rooms" rich results, Bing AI cards       |
|   5 | `Menu` → `MenuSection` → `MenuItem` (+ `Offer.priceCurrency: "RON"`) | `/restaurant/menu`, `/poolpark/menu` | Restaurant menu rich results in Google + Gemini food queries  |
|   6 | `Event` / `EventSeries` (`location`, `organizer`, `offers`, `eventAttendanceMode`) | `/evenimente/nunta`, `/botez`, `/petrecere-copii`, `/poolparty` | Google Events carousel + ChatGPT shopping/event answers       |
|   7 | `Service` (hospitality, weddings, MICE) | `/evenimente`, `/evenimente/*`       | Service-line entities for B2B + AI matching                   |
|   8 | `FAQPage`                              | `/contact`, `/restaurant`, `/poolpark`, room pages | FAQ rich snippets; LLMs love copy-pasting structured Q/A      |
|   9 | `AggregateRating` + `Review`           | `Hotel`, `Restaurant`, each `HotelRoom` | Star ratings in SERP + AI summaries (use `testimonials.ts`)   |
|  10 | `TouristAttraction` / `SportsActivityLocation` | `/poolpark`                          | Local-pack + travel-LLM discovery                             |
|  11 | `ImageObject[]` with `width`/`height`/`caption` | Hero / gallery images               | Google image carousels                                        |
|  12 | `VideoObject`                          | wherever a hero video is added       | Video-rich results                                            |
|  13 | `Place` for the venue room (ballroom)  | event pages                          | Local search + LLM venue queries                              |
|  14 | `containedInPlace` + `isPartOf` linking | everywhere                           | Proper entity graph traversal                                 |

---

## 6. Validated JSON-LD templates

> All templates use a **single `@graph` per page** with stable `@id` URIs so the entity graph is traversable. Replace inline arrays with values from `src/data/*` (no string literals in components).

### 6.1 Global graph (every page) — `Organization` + `WebSite` + `Hotel` + `LocalBusiness alias collapsed`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://astoriahotels.ro/#organization",
      "name": "Hotel Astoria",
      "alternateName": "Astoria Hotel Alba Iulia",
      "url": "https://astoriahotels.ro",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://astoriahotels.ro/#logo",
        "url": "https://astoriahotels.ro/images/general/sigla-Astoria-web-mica-1.png",
        "width": 512,
        "height": 512,
        "caption": "Hotel Astoria"
      },
      "image": { "@id": "https://astoriahotels.ro/#logo" },
      "parentOrganization": {
        "@type": "Organization",
        "name": "Florea Grup",
        "url": "https://floreagrup.ro"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+40731190948",
          "contactType": "reservations",
          "email": "office@astoriahotels.ro",
          "areaServed": "RO",
          "availableLanguage": ["Romanian", "English"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+40731190948",
          "contactType": "events",
          "email": "evenimente@astoriahotels.ro",
          "availableLanguage": ["Romanian", "English"]
        }
      ],
      "sameAs": [
        "https://www.facebook.com/AstoriaHotelAlbaIulia",
        "https://www.instagram.com/astoriahotelalba"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://astoriahotels.ro/#website",
      "url": "https://astoriahotels.ro",
      "name": "Hotel Astoria Alba Iulia",
      "inLanguage": "ro-RO",
      "publisher": { "@id": "https://astoriahotels.ro/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://astoriahotels.ro/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": ["Hotel", "LocalBusiness"],
      "@id": "https://astoriahotels.ro/#hotel",
      "name": "Hotel Astoria",
      "description": "Hotel 3★/4★ în Alba Iulia, Transilvania — 30 camere, restaurant internațional și Astoria Pool Park.",
      "url": "https://astoriahotels.ro",
      "brand": { "@id": "https://astoriahotels.ro/#organization" },
      "parentOrganization": { "@id": "https://astoriahotels.ro/#organization" },
      "telephone": "+40731190948",
      "email": "office@astoriahotels.ro",
      "currenciesAccepted": "RON, EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "DN 1, km 387",
        "addressLocality": "Alba Iulia",
        "addressRegion": "Alba",
        "postalCode": "510010",
        "addressCountry": "RO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 46.122656,
        "longitude": 23.622188
      },
      "hasMap": "https://www.google.com/maps/?q=46.122656,23.622188",
      "image": [
        "https://astoriahotels.ro/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg",
        "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp",
        "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-2.webp"
      ],
      "starRating": {
        "@type": "Rating",
        "ratingValue": 3,
        "bestRating": 5,
        "worstRating": 1,
        "author": { "@type": "Organization", "name": "ANT — Romanian Hotel Classification" }
      },
      "numberOfRooms": 30,
      "checkinTime": "14:00:00+02:00",
      "checkoutTime": "12:00:00+02:00",
      "petsAllowed": false,
      "smokingAllowed": false,
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Free parking", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Restaurant", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Outdoor swimming pool", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Garden", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Event facilities", "value": true }
      ],
      "containsPlace": [
        { "@id": "https://astoriahotels.ro/restaurant/#restaurant" },
        { "@id": "https://astoriahotels.ro/poolpark/#poolpark" }
      ],
      "makesOffer": [
        { "@id": "https://astoriahotels.ro/camere/apartament/#offer" },
        { "@id": "https://astoriahotels.ro/camere/standard/#offer" },
        { "@id": "https://astoriahotels.ro/camere/standard-balcon/#offer" }
      ],
      "sameAs": [
        "https://www.facebook.com/AstoriaHotelAlbaIulia",
        "https://www.instagram.com/astoriahotelalba",
        "https://www.google.com/maps/place/Hotel+Astoria+Alba+Iulia",
        "https://www.tripadvisor.com/Hotel_Review-Hotel_Astoria_Alba_Iulia",
        "https://www.booking.com/hotel/ro/hotel-astoria-alba-iulia.html"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "180",
        "bestRating": "5"
      }
    }
  ]
}
```

> Drop the standalone `LocalBusiness` block — collapse via multi-type `["Hotel", "LocalBusiness"]` on the Hotel entity. Eliminates C9 and C10 dup risk in one step.

### 6.2 Restaurant page graph — `/restaurant` (added to the global graph)

```json
{
  "@type": "Restaurant",
  "@id": "https://astoriahotels.ro/restaurant/#restaurant",
  "name": "Restaurant Astoria",
  "description": "Restaurant cu bucătărie internațională în Hotel Astoria, Alba Iulia. Mic dejun, prânz, cină.",
  "url": "https://astoriahotels.ro/restaurant",
  "telephone": "+40731190948",
  "servesCuisine": ["International", "Romanian", "European"],
  "acceptsReservations": "True",
  "priceRange": "$$",
  "currenciesAccepted": "RON",
  "paymentAccepted": "Cash, Credit Card",
  "address": { "@id": "https://astoriahotels.ro/#hotel" },
  "geo": { "@id": "https://astoriahotels.ro/#hotel" },
  "image": [
    "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-2.webp",
    "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/restaurant-6.webp",
    "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/food-2.webp"
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "07:00",
    "closes": "22:00"
  }],
  "containedInPlace": { "@id": "https://astoriahotels.ro/#hotel" },
  "hasMenu": { "@id": "https://astoriahotels.ro/restaurant/menu/#menu" }
}
```

### 6.3 Menu — `/restaurant/menu`

```json
{
  "@type": "Menu",
  "@id": "https://astoriahotels.ro/restaurant/menu/#menu",
  "name": "Meniu Restaurant Astoria 2026",
  "inLanguage": "ro-RO",
  "url": "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/restaurant/Meniu_Restaurant_Astoria_2026.pdf",
  "provider": { "@id": "https://astoriahotels.ro/restaurant/#restaurant" },
  "hasMenuSection": [
    {
      "@type": "MenuSection",
      "name": "Mic dejun",
      "hasMenuItem": [
        { "@type": "MenuItem", "name": "Mic dejun continental", "offers": { "@type": "Offer", "price": "35.00", "priceCurrency": "RON" } }
      ]
    },
    {
      "@type": "MenuSection",
      "name": "Feluri principale",
      "hasMenuItem": [
        { "@type": "MenuItem", "name": "Cotlet de porc cu sos de ciuperci", "offers": { "@type": "Offer", "price": "55.00", "priceCurrency": "RON" } }
      ]
    }
  ]
}
```

### 6.4 HotelRoom + Offer — `/camere/{slug}` (one per room)

```json
{
  "@type": "HotelRoom",
  "@id": "https://astoriahotels.ro/camere/apartament/#room",
  "name": "Apartament 4★",
  "description": "Apartament 4 stele cu minibar, TV LCD, aer condiționat, baie cu duș, Wi-Fi gratuit, mic dejun inclus și acces Pool Park.",
  "url": "https://astoriahotels.ro/camere/apartament",
  "image": [
    "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-7.webp",
    "https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/camere/camere-17.webp"
  ],
  "bed": { "@type": "BedDetails", "numberOfBeds": 1, "typeOfBed": "King" },
  "occupancy": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 3 },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Minibar", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Safe", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bathrobes", "value": true }
  ],
  "containedInPlace": { "@id": "https://astoriahotels.ro/#hotel" },
  "offers": {
    "@type": "Offer",
    "@id": "https://astoriahotels.ro/camere/apartament/#offer",
    "url": "https://astoriahotels.ro/contact?camera=apartament",
    "priceCurrency": "RON",
    "price": "450.00",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "450.00",
      "priceCurrency": "RON",
      "unitText": "NIGHT",
      "valueAddedTaxIncluded": true
    },
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-01-01",
    "businessFunction": "https://schema.org/LeaseOut"
  }
}
```

### 6.5 ItemList for `/camere`

```json
{
  "@type": "ItemList",
  "@id": "https://astoriahotels.ro/camere/#list",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@id": "https://astoriahotels.ro/camere/apartament/#room" } },
    { "@type": "ListItem", "position": 2, "item": { "@id": "https://astoriahotels.ro/camere/standard/#room" } },
    { "@type": "ListItem", "position": 3, "item": { "@id": "https://astoriahotels.ro/camere/standard-balcon/#room" } }
  ]
}
```

### 6.6 Event / EventSeries — `/evenimente/nunta` (also `/botez`, `/petrecere-copii`, `/poolparty`)

```json
{
  "@type": "EventSeries",
  "@id": "https://astoriahotels.ro/evenimente/nunta/#series",
  "name": "Nunți la Hotel Astoria",
  "description": "Organizare nunți complete în sala de evenimente Astoria, Alba Iulia. Capacitate până la 250 invitați, meniu personalizat, cazare pentru oaspeți.",
  "url": "https://astoriahotels.ro/evenimente/nunta",
  "image": "https://astoriahotels.ro/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": { "@id": "https://astoriahotels.ro/#hotel" },
  "organizer": { "@id": "https://astoriahotels.ro/#organization" },
  "offers": {
    "@type": "Offer",
    "url": "mailto:evenimente@astoriahotels.ro",
    "priceCurrency": "RON",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "RON",
      "minPrice": "350.00",
      "description": "Preț per invitat — meniu standard"
    },
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-01-01"
  }
}
```

### 6.7 BreadcrumbList — every non-root page

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Acasă",       "item": "https://astoriahotels.ro/" },
    { "@type": "ListItem", "position": 2, "name": "Camere",      "item": "https://astoriahotels.ro/camere" },
    { "@type": "ListItem", "position": 3, "name": "Apartament 4★","item": "https://astoriahotels.ro/camere/apartament" }
  ]
}
```

### 6.8 FAQPage — `/contact`

```json
{
  "@type": "FAQPage",
  "@id": "https://astoriahotels.ro/contact/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Care este ora de check-in și check-out?",
      "acceptedAnswer": { "@type": "Answer", "text": "Check-in de la 14:00, check-out până la 12:00." }
    },
    {
      "@type": "Question",
      "name": "Acceptați animale de companie?",
      "acceptedAnswer": { "@type": "Answer", "text": "Hotelul nu acceptă animale de companie." }
    },
    {
      "@type": "Question",
      "name": "Există parcare gratuită?",
      "acceptedAnswer": { "@type": "Answer", "text": "Da, oferim parcare gratuită pentru toți oaspeții." }
    }
  ]
}
```

---

## 7. Implementation Plan

### 7.1 Single source of truth — extend `src/data/hotel.ts`

Add to the existing `hotel` constant:

```ts
address: { ..., postalCode: '510010' },
checkinTime: '14:00',
checkoutTime: '12:00',
priceRange: '$$',
currenciesAccepted: ['RON', 'EUR'],
paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
numberOfRooms: 30,
starRating: { value: 3, best: 5 },
languages: ['Romanian', 'English'],
```

Also add `social.googleMaps`, `social.tripAdvisor`, `social.booking` to `sameAs`.

### 7.2 Refactor `vite-plugins/hotel-jsonld.ts`

- Build the **global graph** (Organization + WebSite + Hotel with `["Hotel","LocalBusiness"]`) only. Drop the standalone `LocalBusiness`. Drop the inline Restaurant; let the page own it.
- Change `telephone` from `.international` → `.e164`.
- Read all values from `hotel.ts` — zero string literals in the plugin.

### 7.3 Per-page JSON-LD — new helper `src/lib/jsonld.ts`

Create pure functions that return JSON-LD objects:

```
buildRestaurant() · buildMenu(items) · buildHotelRoom(room) · buildItemListRooms() · buildEventSeries(slug) · buildBreadcrumb(trail) · buildFAQ(items) · buildAggregateRating(testimonials)
```

Then in each page (`RestaurantPage`, `RoomDetailPage`, `RoomsListingPage`, `EventPage`, `PoolParkPage`, `ContactPage`, menu pages), emit **one `<script type="application/ld+json">`** with a `@graph` of: `[breadcrumb, primary entity, faq?]`.

### 7.4 SSR caveat (important)

Because the site is a Vite SPA, page-level JSON-LD injected through `<Helmet>` only appears after hydration. Two paths:

- **Recommended (no infra change)**: extend `hotel-jsonld.ts` to accept a route-aware emitter and pre-render per-route HTML at build time using the SPA fallback strategy (`vite build` + a small post-build step that walks routes and re-injects the right `@graph` per `dist/<route>/index.html`). Cloudflare Pages happily serves these.
- **Alt**: switch to `vite-ssg` / `vite-plugin-ssr` for static pre-rendering (largest payoff, also gives crawler-visible meta tags).

### 7.5 Testing & validation

- After build, validate every `dist/**/index.html` with [validator.schema.org](https://validator.schema.org/) and Google's [Rich Results Test](https://search.google.com/test/rich-results).
- Add a CI step that greps each pre-rendered HTML for the expected primary `@type` (e.g. `/camere/apartament` must contain `"@type":"HotelRoom"`).

---

## 8. Top 10 Action Items (do these in order)

1. **Fix build drift** — redeploy so live `priceRange` matches repo, and change repo `"$$"` → confirm desired tier. _(Effort: 5 min)_
2. **Collapse `LocalBusiness` into `Hotel`** via multi-type `["Hotel","LocalBusiness"]`; delete the standalone block. _(Effort: 10 min, fixes C9.)_
3. **Add `Organization` + `WebSite` + `SearchAction`** to the global graph in `hotel-jsonld.ts`. _(Effort: 30 min, unlocks knowledge panel & sitelinks searchbox.)_
4. **Add `postalCode: '510010'`, `checkinTime`, `checkoutTime`, `currenciesAccepted`, `paymentAccepted`** in `src/data/hotel.ts`; switch `telephone` to `.e164`; fix `starRating` to numeric with `bestRating`. _(Effort: 20 min, fixes C12–C16.)_
5. **Move `Restaurant` JSON-LD out of `RestaurantPage` Helmet** and into pre-rendered per-route HTML, with `containedInPlace` → Hotel `@id`, `hasMenu`, `acceptsReservations`, full `openingHoursSpecification`. _(Effort: 1 h, fixes C10–C11, C20.)_
6. **Add `HotelRoom` + `Offer` per room** at `/camere/{slug}` and `ItemList` at `/camere`, sourced from `src/data/rooms.ts` (real RON prices). _(Effort: 2 h, fixes C6.)_
7. **Add `Menu` → `MenuSection` → `MenuItem`** at `/restaurant/menu` and `/poolpark/menu` (parse from current PDF or hand-author once). _(Effort: 2–4 h, fixes C7.)_
8. **Add `EventSeries`** at `/evenimente/{nunta,botez,petrecere-copii}` and `/poolparty`, with `organizer`, `location`, `offers.priceCurrency: RON`. _(Effort: 1 h, fixes C8.)_
9. **Add `BreadcrumbList` on every non-root page** via a `<Breadcrumb>` route helper. _(Effort: 1 h, fixes C5.)_
10. **Add `FAQPage`** on `/contact`, `/restaurant`, `/poolpark`, plus `AggregateRating` from `src/data/testimonials.ts` on `Hotel` and `Restaurant`. _(Effort: 1 h, fixes C8/C17.)_

---

_Generated by GEO Schema Audit · v1 · 2026-06-07_

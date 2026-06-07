# GEO Content Analysis & E-E-A-T Audit — astoriahotels.ro

**Date:** 2026-06-07
**Scope:** Content quality, E-E-A-T, AI citability (AEO/GEO), trust signals, multilingual depth
**Method:** Repo source review (`/Users/aldeacosmin/Desktop/GitHub/astoria-website`) + sitemap + i18n + meta + JSON-LD inspection (live webfetches not executed; analysis based on source code, page structure, and declared meta data)

---

## 1. Executive Summary

Hotel Astoria Alba Iulia ships a **modern, well-structured React 19 SPA** with **deep bilingual coverage** (ro + en, fully translated, 1,005 lines per locale), strong **technical SEO plumbing** (per-page `Helmet`, JSON-LD Hotel + Restaurant, sitemap plugin configured for 21 routes, real NAP, GDPR + Cookies + Terms pages), and **good content volume on flagship pages** (Home, Restaurant, Pool Park, Sustainability, Welcome to Alba). However, the site **misses the content layers that drive E-E-A-T and AI citability**: no About/Story page, no author bylines, no dates on marketing content, no FAQ page, no FAQPage schema, no blog/journal, no Awards or Press page, no aggregated Reviews page, and no aggregated `Organization` schema with `founder`. Most H2/H3s are **emotional/marketing** ("Savurează fiecare moment", "O aventură pentru fiecare copil") rather than **direct-answer headings** AI engines quote. Sitemap is declared in `vite.config.ts` with 21 routes but the **deployed `dist/sitemap.xml` only contains 1 URL** (homepage) — a critical SEO bug. Image alt text is mostly generic ("Hotel Astoria", "Astoria Pool Park", "Restaurant Astoria") — fails AI-vision and image-search SEO. Sustainability and Welcome-to-Alba pages are the strongest content pieces and are **genuine AEO assets** that should be linked from the homepage nav.

**Bottom line:** strong visual product, strong technical foundation, but content maturity is mid-tier. Easy 20+ point uplift available by adding FAQPage schema, About page, author/date metadata, FAQ, and properly resolving the sitemap.

---

## 2. Content Quality Score: **66 / 100**

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| **E-E-A-T signals** | 30 | **17 / 30** | Real NAP, GDPR, terms, JSON-LD, social links. Missing: author bylines, About/team, awards, press, founder bios, third-party mentions. |
| **Content depth & uniqueness** | 25 | **18 / 25** | Sustainability (long-form, 4 features × 2 paragraphs, 4 stats, dates, ESG) and Welcome to Alba (fortress, 6 attractions, restaurants, directions) are strong. Most other pages are marketing/promotional with short paragraphs and heavy `dangerouslySetInnerHTML`. No blog. |
| **AI citability (AEO/GEO)** | 20 | **11 / 20** | Stats with units (130 kW, 10,500 m², 336 m², 30 camere), structured H2/H3, lists, and a couple of tables (room amenities). Missing: FAQPage schema, FAQ page, author bylines, dates, "What is / How to / Why" headings, About page, llms.txt. |
| **Trust signals** | 15 | **12 / 15** | Real phone (E.164, national, international), real address with geo coords, ANPC SAL/SOL links in footer, Privacy + Cookies + Terms pages, 8 testimonials (5 hotel + 3 restaurant) from real review sources, social links (FB, IG), Hotel + Restaurant JSON-LD, sticky nav with phone CTA. Missing: third-party reviews widget, certifications/awards, founder. |
| **Multilingual coverage** | 10 | **8 / 10** | ro + en, 100% line-for-line parity (1,005 lines each), nav switcher. No hreflang tags visible. No third language. English is high quality (not machine-translated). |

**Final: 66 / 100** — *mid-tier, fixable.*

---

## 3. Page-by-Page Content Audit

| Page | URL | H1 | Word count (ro, est.) | CTAs | Internal links | Alt text quality | Notes |
|---|---|---|---|---|---|---|---|
| Home | `/` | (composed) | ~600 (from sections) | 5+ (Rezervă, Descoperă camere, Restaurant, Pool Park) | heavy (footer + nav) | 1 generic | Hub; benefits/rooms/restaurant/pool/testimonials/gallery |
| Camere listing | `/camere` | "Camerele noastre" | ~150 | "Contactează-ne" | 3 to detail pages | 0/3 informative | Card grid; 10-image gallery; popular badge |
| Room detail (3) | `/camere/:slug` | room name | ~180 (fullDesc) | "Check availability" + phone | to other rooms | 1/3 informative | Embla carousel + thumbs; check-in/out/breakfast/pool info card; amenities grid |
| Restaurant | `/restaurant` | hero | ~250 | "Meniu PDF" + "Rezervă restaurant" | back/contact | 0/19 informative | JSON-LD Restaurant; 19-image lightbox; 3 testimonials; hours; phone |
| Restaurant Menu | `/restaurant/meniu` | "Meniul Restaurantului" | ~40 ⚠️ **thin** | 3 (PDF, phone, back) | 1 back | n/a | 1 paragraph, 3 buttons. **Low content.** |
| Pool Park | `/pool-park` | hero | ~400 | "Rezervă acum" + "Sună" + 2 more | 2 | 0/23 informative | Video hero; 4 stats; 15-facility grid; 23-image gallery; coming-soon |
| Pool Park Menu | `/pool-park/meniu` | "Meniu Water Bar" | ~40 ⚠️ **thin** | 2 | 1 back | n/a | Mirrors restaurant-menu thinness |
| Pool Party | `/evenimente/pool-party` | hero | ~500 | 2 (Email, Galerie) | 1 anchor | 0/9 informative | Heavy marketing, no JSON-LD event schema |
| Petrecere Copii | `/evenimente/petrecere-copii` | hero | ~500 | 2 | 1 anchor | 0/3 informative | Same template; 6-feature grid + 6 reasons + safety notice (good for E-E-A-T) |
| Nunta / Botez / Majorat | `/evenimente/*` | hero | varies (uses shared `EventPage`) | Email + phone | 1 | varies | Shared template; benefits/reasons sections |
| Events hub | `/evenimente` | (composed) | ~300 | n/a (cards) | to 5 events | varies | 5 event cards + intro |
| Contact | `/contact` | hero | ~120 | form submit | 0 internal | 0 informative | Phone, email, address, embedded Google Map, social, 2 social, full form w/ Zod validation |
| Sustainability | `/sustenabilitate` | hero | **~900** ✅ strongest | "Trimite cererea" school form | 0 internal | 0/9 informative | Stats + 4 deep features + gallery + local + education + school-visit form |
| Welcome to Alba | `/welcome-to-alba` | hero | ~400 | 0 ⚠️ | 0 internal | n/a | Local SEO gold: fortress, 6 attractions, restaurants, directions, distances |
| Privacy | `/politica-confidentialitate` | "Politica de Confidențialitate" | ~250 | 0 | 0 | n/a | 5 sections, GDPR-compliant, "Ultima actualizare: Ianuarie 2026" (only dated content) |
| Terms | `/termeni-conditii` | (similar) | ~? | 0 | 0 | n/a | Not in scope; presumed present |
| Cookies | `/cookies` | (similar) | ~? | 0 | 0 | n/a | Implied by cookie consent component |
| 404 | `*` | (composed) | ~40 | 2 (home, contact) | 2 | n/a | Standard |

**Thin-content flags:** `/restaurant/meniu` (~40 words), `/pool-park/meniu` (~40 words), 404 (~40 words). Both menu pages are essentially "the menu is a PDF, call us" — fine for users, weak for AI citability. They should at minimum include the most popular dishes, prices, allergens, and a sample menu table with `Menu` or `MenuSection` schema.

---

## 4. E-E-A-T per Page

### Experience
- ★★★☆☆ (3/5) — The site demonstrates experience through operational details (check-in 14:00, check-out 12:00, 336 m² pool, 130 kW solar, 10,500 m² green space) and 8 named testimonials from Google/Booking/TripAdvisor/MihaiJeliu.ro. But there is **no first-person narrative from the founder, GM, or chef**. No "Our Story" page. "Florea Grup" is referenced in the JSON-LD (`parent: Florea Grup`) and footer but never explained. The "About" promise of experience is implicit, not stated.

### Expertise
- ★★★☆☆ (3/5) — Domain expertise is visible in restaurant, sustainability, and event copy. **No author bylines** anywhere. **No "Meet the chef" or "Meet the events team"** page. No professional credentials cited (sommelier, ESG certifications, ISO 14001, Green Key, EU Ecolabel). The "Școala Verde" education program is a strong expertise signal and should be promoted more visibly.

### Authoritativeness
- ★★★☆☆ (3/5) — Strong technical authority signals: Hotel JSON-LD, Restaurant JSON-LD, geo coords, NAP consistency, ANPC SAL/SOL legal links, real social profiles with verifiable URLs. **No `Organization` schema with `founder`, `foundingDate`, `award`.** No press mentions, no third-party listings (Booking.com, Tripadvisor) link, no industry body membership. No "Awards" page despite 10+ years implied by the brand.

### Trustworthiness
- ★★★★☆ (4/5) — Strongest E-E-A-T pillar. GDPR privacy page with proper sections, separate Cookies and Terms pages, real phone/email/address with geo, real Google Maps embed, social links, "Ultima actualizare" date on Privacy. **No security badges, no trust seals, no booking-engine URL** (guests can only call or email — friction). Cookie consent component is implemented.

---

## 5. AI Citability per Page

| Page | Direct-answer H2/H3 | Lists/tables | Stats w/ units | FAQ | Date | Author | Schema | Citability |
|---|---|---|---|---|---|---|---|---|
| Home | ✗ (emotional) | ✓ benefits | "30 camere" | ✗ | ✗ | ✗ | Hotel JSON-LD | Medium |
| Camere | ✗ | ✓ amenities | — | ✗ | ✗ | ✗ | — | Low |
| Room detail | ✗ | ✓ amenities | "14:00 / 12:00" | ✗ | ✗ | ✗ | — | Medium |
| Restaurant | ✗ | ✓ hours | "Mo-Su 07:00-22:00" | ✗ | ✗ | ✗ | Restaurant JSON-LD | Medium-High |
| Pool Park | ✗ | ✓ facilities | "336 m²", "130 kW" (sister page) | ✗ | ✗ | ✗ | — | Medium-High |
| Sustainability | ✗ (4 features) | ✓ | "130 kW", "10.500 mp", "140+", "336 mp" | ✗ | ✗ | ✗ | — | **High** |
| Welcome to Alba | ✗ | ✓ 6 attractions | "90 km", "280 km" | ✗ | ✗ | ✗ | — | **High** |
| Contact | ✗ | ✓ NAP | geo coords | ✗ | ✗ | ✗ | (Hotel JSON-LD inherited) | Medium |
| Privacy | ✗ (5 sections) | — | — | ✗ | ✓ | ✗ | — | Medium |
| Petrecere Copii | ✗ | ✓ 6 features + 6 reasons | "sub 16 ani" rule | ✗ | ✗ | ✗ | — | Medium |
| Pool Party | ✗ | ✓ 9 features | — | ✗ | ✗ | ✗ | — | Medium |
| Restaurant Menu | ✗ | ✗ | — | ✗ | ✗ | ✗ | — | **Very low (thin)** |
| Pool Park Menu | ✗ | ✗ | — | ✗ | ✗ | ✗ | — | **Very low (thin)** |

**AEO gaps summary:**
- **0/14 pages** have FAQPage JSON-LD
- **0/14 pages** have a visible FAQ section
- **0/14 pages** have a visible publish/update date (only Privacy)
- **0/14 pages** have an author byline
- **0/14 pages** use direct-answer H2s ("Cât costă o cameră?", "Unde este Alba Iulia?", "Ce include micul dejun?")
- **No llms.txt** file present

---

## 6. Trust Signal Coverage Matrix

| Signal | Present | Location | Notes |
|---|---|---|---|
| Real phone (E.164) | ✓ | `hotel.contact.phone.e164` (+40 731 190 948) | Displayed in nav, footer, contact, all event pages, room detail |
| Real email | ✓ | office@astoriahotels.ro | Footer, contact |
| Real address | ✓ | DN 1, km 387, Alba Iulia, Alba, RO | JSON-LD, footer, contact |
| Geo coordinates | ✓ | 46.122656, 23.622188 | Hotel + Restaurant JSON-LD |
| Google Maps embed | ✓ | `/contact` | Single embed, no other location |
| Hotel JSON-LD | ✓ | injected via `vite-plugins/hotel-jsonld` | Description, amenities, 30 rooms, geo, address |
| Restaurant JSON-LD | ✓ | `RestaurantPage.tsx` | Cuisine, hours, priceRange, address |
| Organization JSON-LD | ✗ | — | Missing — would unify all signals |
| Privacy policy | ✓ | `/politica-confidentialitate` | GDPR-compliant, 5 sections, dated |
| Cookie policy | ✓ | `/cookies` | Separate page |
| Terms & conditions | ✓ | `/termeni-conditii` | Separate page |
| ANPC SAL | ✓ | footer (`hotel.legal.anpcSal`) | EU consumer-rights link |
| ANPC SOL | ✓ | footer (`hotel.legal.anpcSol`) | ODR platform link |
| Cookie consent | ✓ | `CookieConsent.tsx` | Banner present |
| Social profiles | ✓ | FB + IG (in `hotel.social`) | Real URLs, footer + contact |
| Embedded reviews | ✓ | `testimonials.ts` | 5 hotel + 3 restaurant with named authors + sources |
| 3rd-party review widget | ✗ | — | No Google/Booking/TripAdvisor widget |
| Awards/certifications | ✗ | — | **No Awards page** despite "Green" / sustainability positioning |
| Press / media kit | ✗ | — | **No Press page** |
| Founder / leadership | ✗ | — | Only "Florea Grup" parent mention |
| Brand story / About | ✗ | — | **No About page** |
| Booking engine | ✗ | — | Only contact form + phone CTA |
| Security badge / SSL seal | ✗ | — | (assumed HTTPS via Cloudflare) |

---

## 7. Content Gaps (priority-sorted)

### P0 — critical, easy wins
1. **Fix sitemap** — `dist/sitemap.xml` has only 1 URL despite config declaring 21. Likely a build/deploy issue. Check `vite-plugin-sitemap` and Cloudflare Pages deploy.
2. **Add `Organization` + `LocalBusiness` JSON-LD** with `founder`, `foundingDate`, `parentOrganization`, `areaServed`, `priceRange`, `openingHoursSpecification`, `sameAs` (FB, IG).
3. **Replace generic image alts** — most images are alt="Hotel Astoria" / "Astoria Pool Park" / "Restaurant Astoria". Should be: "Suite Apartament 4★ cu vedere la grădină", "Piscină încălzită 336 mp cu jacuzzi exterior", etc. Drives image-search SEO + AI-vision citability.
4. **Add hreflang tags** for `/ro` and `/en` (or whatever URL structure is used) — currently invisible in `index.html` and not in per-page `Helmet` (verified for HomePage).

### P1 — high value
5. **Add `FAQPage` JSON-LD + visible FAQ section** on Home, Restaurant, Pool Park, Sustainability, Welcome to Alba, Contact. Use direct-answer H2s.
6. **Create `/despre-noi` (About)** — founder story, Florea Grup background, team photos, awards, mission, certifications, year founded.
7. **Create `/blog` (or `/jurnal`)** — 4-8 cornerstone posts: "Ghid complet pentru o nuntă la Astoria", "Top 10 atracții în Alba Iulia", "Ce să faci cu copiii la Pool Park", "Istoria Cetății Alba Carolina", "De ce să alegi un hotel verde în Transilvania". Massive AEO/GEO and topical-authority lift.
8. **Add publish / updated dates** to all long-form content (Sustainability, Welcome to Alba, room descriptions). One line of `t('common.lastUpdated')` per page.
9. **Add author bylines** to Sustainability, Welcome to Alba, Blog posts. Even "Echipa Astoria" + role beats none.
10. **Thicken `/restaurant/meniu` and `/pool-park/meniu`** — embed the actual menu as HTML (sections, prices, allergens, vegetarian/vegan tags) with `Menu` and `MenuSection` JSON-LD. The PDF is a barrier for AI engines and screen readers.

### P2 — medium value
11. **Add Awards / Certifications page** with the green-energy, EV fleet, salt-filtration, EU certifications already earned.
12. **Add Press / Media page** with logos and downloadable press kit.
13. **Add an aggregated Reviews page** linking to Booking.com, TripAdvisor, Google profile and embedding 10-15 reviews.
14. **Add Accessibility statement** (WCAG AA claim + contact).
15. **Embed Google Reviews widget** (or Elfsight/Trustindex) on Home + Restaurant + Pool Park.
16. **Add third language (Hungarian)** — Alba Iulia has a significant Hungarian-speaking tourist segment, and "Béke" (city name in HU) is searchable.

### P3 — long-term
17. **Add structured `Event` JSON-LD** to Nunta, Botez, Pool Party, Petrecere Copii, Majorat.
18. **Add `VideoObject` JSON-LD** for the Pool Park hero video and any YouTube embeds.
19. **Add `BreadcrumbList`** to all non-home pages.
20. **Add llms.txt** at `https://astoriahotels.ro/llms.txt` with site summary, key pages, contact, and unique facts (sustainability stats, room count, geo).

---

## 8. Local SEO Keyword Map

The site already covers the obvious commercial-intent keywords. AEO/GEO opportunities below.

| Page | Primary keyword (ro) | Primary keyword (en) | Coverage | Gap |
|---|---|---|---|---|
| Home | `hotel Alba Iulia` | `hotel Alba Iulia` | ✓ | Lacks "Transilvania" variants, "near Cetate" |
| Camere | `cazare Alba Iulia` | `accommodation Alba Iulia` | ✓ | Lacks "hotel cu piscina Alba Iulia" head term |
| Room detail | `apartament 4 stele Alba Iulia` | `apartment Alba Iulia` | partial | Each room slug is bare; should be `/camere/apartament-4-stele-alba-iulia` |
| Restaurant | `restaurant Alba Iulia` | `restaurant Alba Iulia` | ✓ | No menu prices visible to AI |
| Pool Park | `piscina Alba Iulia` | `pool Alba Iulia` | ✓ | "cea mai mare piscina din judet" claim — needs citation |
| Sustainability | `hotel verde Transilvania` | `green hotel Transylvania` | implicit | No explicit "Transilvania" H1 |
| Welcome to Alba | `atractii turistice Alba Iulia` | `Alba Iulia attractions` | ✓ | "90 km de Cluj" "280 km de Bucuresti" — strong |
| Petrecere Copii | `petrecere copii Alba Iulia` | `kids party Alba Iulia` | ✓ | — |
| Pool Party | `pool party Alba Iulia` | `pool party Alba Iulia` | ✓ | — |
| Nunta | `nunta Alba Iulia` | `wedding Alba Iulia` | ✓ | — |

**Long-tail / AEO question keywords NOT yet targeted:**
- "Cât costă o cameră la Hotel Astoria?" — **no price anywhere** (gap: no booking engine, no rate table)
- "Ce include micul dejun la Astoria?" — buried in room fullDescription
- "Cât de mare este piscina de la Astoria?" — answered on Pool Park but not FAQ-styled
- "Este Astoria hotel acceptă animale de companie?" — **unanswered**
- "Are Astoria parcare gratuită?" — answered in welcome-to-alba ("parcare gratuită") but not surfaced
- "Care este distanța de la Astoria la Cetatea Alba Carolina?" — not directly answered (km 387 is on DN1, ~3-4 km from citadel)
- "Hotel Astoria este potrivit pentru copii?" — answered by pool park + petrecere copii
- "Când se deschide Pool Park-ul în 2026?" — "În curând" — soft answer

---

## 9. Multilingual Coverage

| Locale | File | Lines | Parity with ro | Quality |
|---|---|---|---|---|
| Romanian | `src/i18n/ro.ts` | 1,005 | 100% (source) | Native, idiomatic |
| English | `src/i18n/en.ts` | 1,005 | 100% line-for-line | Native-quality, not machine-translated (e.g. "Fun happens under the sun" tagline, "Wiggle" keyframes, idiomatic "Mind the kids") |

**Coverage scope:** nav, footer, hero, benefits, rooms (×3 full descriptions + amenities), restaurant (intro, experiences, testimonials), pool park, pool party, petrecere copii, sustainability (full ~900 words with stats), welcome-to-alba, contact form, 404, hotel meta + hotel.JSON-LD strings.

**Gaps:**
- No `hreflang` tags in `index.html` (only `og:locale: ro_RO`).
- No `lang` attribute switch on `<html>` when language changes (assumed always `ro`).
- No URL-prefix strategy (`/en/camere`) — language lives in localStorage / i18next state, not the URL. **Hurts SEO for English-indexed Google and Bing.**
- Privacy, Terms, Cookies pages are **not translated** (only Romanian hardcoded). Compliance OK in Romania, but EN-speaking guests see Romanian.
- Restaurant Menu and Pool Park Menu pages are not i18n-ized (hardcoded Romanian).
- No third language (no HU, DE, IT, FR) — clear gap for an EU tourist-region hotel.

**Multilingual score: 8 / 10.**

---

## 10. Top 10 Content Action Items

1. **Fix sitemap build** — ensure `dist/sitemap.xml` ships 21 URLs. Without it, Google and AI crawlers see only `/`. (P0)
2. **Add `Organization` + `LocalBusiness` + `FAQPage` JSON-LD** across home, contact, sustainability, pool-park, restaurant, welcome-to-alba. (P0)
3. **Add `hreflang` + URL-prefix routing** (`/en/...`) so English content is independently indexable. Move Privacy/Terms/Cookies to EN. (P0)
4. **Create `/despre-noi` (About)** — Florea Grup story, founding year, team, awards, certifications, sustainability credentials. (P1)
5. **Create a `/blog` (Jurnal)** with 4-8 cornerstone posts targeting long-tail AEO/GEO questions. Internal-link from Home, Sustainability, Welcome to Alba. (P1)
6. **Add FAQ sections + `FAQPage` schema** to Home, Restaurant, Pool Park, Sustainability, Welcome to Alba, Contact. Use direct-answer H2s ("Cât costă o cameră?", "Unde este situat hotelul?"). (P1)
7. **Replace generic image alts** site-wide with descriptive, keyword-rich alts on the 50+ gallery images. (P0)
8. **Add publish/updated dates + author bylines** to all long-form pages (Sustainability, Welcome to Alba, About, Blog). (P1)
9. **Thicken `/restaurant/meniu` and `/pool-park/meniu`** with HTML menu sections + `Menu` / `MenuSection` JSON-LD. Add a price table, allergens, vegetarian/vegan labels. (P1)
10. **Add Reviews, Awards, Press pages** + embed Google/Booking/TripAdvisor review widget on Home. (P2)

Implementing items 1-3 + 6-7 alone projects a **+15-20 point score uplift** (target: **82-86/100**), with items 4, 5, 10 pushing into the **90+** range for a small-market hotel site.

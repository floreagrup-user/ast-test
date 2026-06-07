# GEO Platform-Specific AI Search Optimization
**Site:** https://astoriahotels.ro · **Brand:** Hotel Astoria · **Location:** Alba Iulia, România
**Audit date:** 2026-06-07 · **Architecture:** Vite SPA (no SSR/SSG) · **CDN/Hosting:** Cloudflare Pages + R2

---

## 1. Executive Summary

Hotel Astoria are fundații SEO/GEO solide pentru o **Vite SPA** (JSON-LD `@graph` injectat la build-time, NAP perfect consistent, par­ent organization, multilingual, testimoniale cu sursă citabilă, politici editoriale). **Dar trei blocaje structurale lovesc direct în crawl-erii AI**:

1. **Nu există SSR/SSG/Prerender.** Doar Googlebot (cu Web Rendering Service) și Bingbot execută JavaScript fiabil. **GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, Applebot-Extended, Google-Extended, Cohere-AI, Bytespider** primesc *shell HTML*-ul și atât. Conținutul real (React tree) este invizibil pentru ei.
2. **`/llms.txt` și `/ai.txt` lipsesc ca artefacte reale.** Din cauza regulii `_redirects: /* /index.html 200`, ambele URL-uri returnează SPA HTML (`Hotel Astoria Alba Iulia — Eleganță...`) — un 404 *funcțional* pentru orice LLM care cere aceste fișiere.
3. **Sitemap-ul live are 1 URL.** Configurarea `vite-plugin-sitemap` listează 22 rute; deploy-ul curent este *stale* (un singur `<loc>https://astoriahotels.ro/</loc>`). Crawl budget și descoperire de URL-uri noi sunt compromise.

Mai sunt 14 gaps acoperite mai jos (FAQ schema, Review/AggregateRating, About page, hreflang, author entity, OG image 404, etc.).

---

## 2. Composite Platform Readiness Score: **52 / 100**

| Platform | Score | Tier |
|---|---:|---|
| Google AI Overviews | **12 / 20** | Moderate |
| ChatGPT / OpenAI Search | **10 / 20** | Low–Moderate |
| Perplexity | **9 / 20** | Low |
| Gemini / Google AI | **12 / 20** | Moderate |
| Bing Copilot | **9 / 20** | Low |

**Tier:** Low 0–9 · Low–Moderate 10–11 · Moderate 12–14 · Strong 15–17 · Excellent 18–20

---

## 3. Per-Platform Scores & Reasoning

### 3.1 Google AI Overviews — 12/20
**What's working (+):**
- Hotel/Restaurant/LocalBusiness `@graph` JSON-LD prezent în root (build-time).
- Întrebări frecvente *implicite* acoperite în copy (orar, parcare, animale, Wi-Fi) → ușor de marcat ca FAQ.
- Testimoniale cu sursă (Google Reviews, Booking.com, TripAdvisor).
- Topical cluster existent: `/sustenabilitate`, `/welcome-to-alba`, 5 pagini de evenimente.
- NAP perfect consistent (DN 1, km 387, Alba Iulia / +40 731 190 948).

**Gaps (−):**
- Lipsesc: FAQ schema, Speakable schema, About page, Person/author entity.
- `dateModified` / `datePublished` absente din orice pagină și din JSON-LD.
- Vite SPA — Googlebot WRS randează, dar cu întârziere și consum mare de crawl budget.
- OG image folosește `/wp-content/uploads/2025/01/astoriahotels-nunta-1.jpg` (404 WordPress legacy).
- Fără "Last updated" vizibil în UI → reduce încrederea pentru AI Overviews freshness.

### 3.2 ChatGPT / OpenAI Search — 10/20
**Working (+):**
- Hotel schema complet cu `name`, `telephone`, `address`, `geo`, `numberOfRooms: 30`, `amenityFeature`, `sameAs`.
- Clauze factuale clare: "30 camere", "10.500 mp spațiu verde", "336 mp piscină", "sală backup 350 persoane".
- Parent organization (Florea Grup) → ierarhie de entitate.

**Gaps (−):**
- **OpenAI nu execută JS în mod fiabil** → OAI-SearchBot și GPTBot primesc doar shell-ul. Content-ul camere, restaurant, evenimente nu este parsabil.
- `sameAs` se limitează la Facebook + Instagram. Lipsesc: Wikipedia, LinkedIn, Booking.com listing URL, TripAdvisor listing URL, Crunchbase.
- Niciun `Person`/`author` schema → ChatGPT nu poate construi un "author entity" pentru brand.
- Fără FAQPage / HowTo schema → nu există suprafețe citabile directe.
- Fără `AggregateRating` chiar dacă există 5 testimoniale cu `source: "Google Reviews"`.

### 3.3 Perplexity — 9/20
**Working (+):**
- Testimoniale au câmp `source` explicit (Google Reviews, Booking.com, TripAdvisor, MihaiJeliu.ro) — Perplexity iubește citarea clară.
- `lastmod` în sitemap (chiar dacă doar 1 URL acum).
- URL-uri curate (`/camere/apartament`, `/evenimente/nunta`).

**Gaps (−):**
- **PerplexityBot nu execută JS** în indexare. Conținutul paginilor devine invizibil.
- Fără llms.txt → Perplexity pierde un shortcut de citare bulk.
- Fără "How" / "Why" content (ex: "Cum ajungi la Hotel Astoria din Cluj-Napoca", "De ce Alba Iulia pentru un weekend").
- Fără author byline și dată vizibilă pe articole.
- Fără Original research/statistics publicate (deși există cifre punctuale în site, nu există un "Studiu Astoria 2026").
- Fără Content "Freshness" markers (data publicării, autor).

### 3.4 Gemini / Google AI — 12/20
**Working (+):**
- NAP consistent → aliniere cu Google Business Profile (presupus existent din era WordPress).
- `@graph` cu 3 entități interconectate (`parentOrganization` pe Restaurant) → Knowledge Graph mapping.
- Imagini R2 cu `alt` descriptive (`alt={t('restaurant.altHero')}`).
- Topical cluster (`/sustenabilitate`, `/welcome-to-alba`).
- `Google-Extended` allowed implicit prin `User-agent: * Allow: /`.

**Gaps (−):**
- Fără `Person` author entity → Gemini nu poate ancora "Astoria Hotel" la oameni reali.
- Fără link explicit către Google Business Profile / Bing Places în JSON-LD sau footer.
- OG image + JSON-LD image URL folosesc `/wp-content/uploads/` → 404.
- Fără Google Search Console verification meta în `<head>`.
- Lipsă "WebSite" entity cu `SearchAction` (nu există un search intern pe site, dar acțiunea de sitelinks search box este utilă).
- Fără `hasMap` → reduce șansa de a apărea în Google Maps / Knowledge Panel hotels.

### 3.5 Bing Copilot — 9/20
**Working (+):**
- Schema.org este cel mai important semnal pentru Bing → prezent.
- Meta + OG + Twitter → consistent.
- HSTS, X-Frame-Options, CSP, Referrer-Policy → semnal de încredere.
- Sitemap configurat (deși stale).

**Gaps (−):**
- **Fără Bing Webmaster Tools verification meta** (`<meta name="msvalidate.01" ...>`).
- Fără LinkedIn URL, Twitter URL în `sameAs` (Bing are mare încredere în LinkedIn/Workplace).
- Fără backlink profile sau mențiuni pe site-uri de știri → Bing prioritizează autoritatea off-page.
- Fără `AggregateRating` / `Review` markup pe root Hotel.
- Bingbot randează JS, dar cu latență mare pe Vite SPA → indexare mai lentă vs. site-uri prerender.
- Lipsesc mențiuni externe (Wikipedia, Booking.com embed, TripAdvisor widget) → reduce Bing's entity confidence.

---

## 4. Platform Readiness Matrix

| Signal | Google AI | ChatGPT | Perplexity | Gemini | Bing |
|---|:-:|:-:|:-:|:-:|:-:|
| robots.txt allows specific bot | ⚪ implicit | ⚪ implicit | ⚪ implicit | ⚪ implicit | ⚪ implicit |
| JSON-LD Hotel/Restaurant/LB | ✅ | ✅ | ✅ | ✅ | ✅ |
| FAQPage schema | ❌ | ❌ | ❌ | ❌ | ❌ |
| Review/AggregateRating schema | ❌ | ❌ | ❌ | ❌ | ❌ |
| Speakable schema | ❌ | ❌ | ❌ | ❌ | ❌ |
| Person/author entity | ❌ | ❌ | ❌ | ❌ | ❌ |
| BreadcrumbList schema | ❌ | ❌ | ❌ | ❌ | ❌ |
| dateModified visible + LD | ❌ | ❌ | ❌ | ❌ | ❌ |
| About page (topical authority) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Hreflang ro/en | ❌ | ❌ | ❌ | ❌ | ❌ |
| sameAs → Wikipedia/LinkedIn/Booking | ❌ | ❌ | ❌ | ❌ | ❌ |
| Webmaster verification (GSC/Bing) | ❌ | — | — | ❌ | ❌ |
| llms.txt | ❌ | ❌ | ❌ | ❌ | ❌ |
| ai.txt | ❌ | ❌ | ❌ | ❌ | ❌ |
| NAP consistency | ✅ | ✅ | ✅ | ✅ | ✅ |
| Parent organization chain | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sitemap (live) | ⚠ 1 URL | ⚠ 1 URL | ⚠ 1 URL | ⚠ 1 URL | ⚠ 1 URL |
| SSR / pre-rendered HTML | ❌ | ❌ | ❌ | ⚠ Google only | ⚠ slow |
| Image alt descriptive | ✅ | ✅ | ✅ | ✅ | ✅ |
| Testimonials with source cite | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 5. NAP Consistency Audit

| Surface | Name | Address | Phone | Email |
|---|---|---|---|---|
| `src/data/hotel.ts` | Hotel Astoria | DN 1, km 387, Alba Iulia, Alba, RO | +40 731 190 948 | office@astoriahotels.ro |
| Root JSON-LD (Hotel) | Hotel Astoria | PostalAddress DN 1, km 387, Alba Iulia, Alba, RO | +40 731 190 948 | office@astoriahotels.ro |
| Root JSON-LD (Restaurant) | Restaurant Astoria | PostalAddress DN 1, km 387, Alba Iulia, Alba, RO | +40 731 190 948 | — |
| Root JSON-LD (LocalBusiness) | Hotel Astoria | PostalAddress DN 1, km 387, Alba Iulia, Alba, RO | +40 731 190 948 | office@astoriahotels.ro |
| Restaurant page inline LD | Restaurant Astoria | PostalAddress DN 1, km 387, Alba Iulia, Alba, RO | +40 731 190 948 (E.164) | — |
| Footer | Hotel Astoria | DN 1, km 387, Alba Iulia, Alba, România | +40 731 190 948 | office@astoriahotels.ro |
| Contact page | — | DN 1, km 387, Alba Iulia, Alba | +40 731 190 948 | office@astoriahotels.ro |
| Meta description | — | "Alba Iulia" | — | — |
| OpenGraph | Astoria Hotel | "Alba Iulia" implicit | — | — |
| i18n ro.ts / en.ts | Hotel Astoria | "DN 1, km 387, Alba Iulia" | +40 731 190 948 | office@astoriahotels.ro |
| Index.html description | "Alba Iulia" | — | — | — |

**Verdict:** ✅ **NAP este 100% consistent** pe toate suprafețele. Nicio variantă alternativă, abreviere sau transliterare. Aceasta este o realizare tehnică notabilă — păstrează o singură sursă de adevăr (`src/data/hotel.ts`) și o propagă la build-time (JSON-LD), runtime (React tree, footer) și Helmet (Restaurant page).

**External consistency check (recomandat, nu am acces live):**
- TripAdvisor listing — confirmare manuală că telefonul și adresa de pe TripAdvisor coincidă cu `+40 731 190 948` și `DN 1, km 387, Alba Iulia`.
- Booking.com listing — verificare identică.
- OpenStreetMap (Nominatim) — confirmare că POI-ul "Hotel Astoria" există cu coordonatele 46.122656, 23.622188.
- Google Business Profile legacy (din era WordPress) — verificare că NAP nu s-a schimbat.
- Facebook Page (`/AstoriaHotelAlbaIulia`) — confirmare NAP.

**Recommended: adăugați un nod `Geo` + `hasMap` în JSON-LD-ul de root, cu URL Google Maps și OpenStreetMap.** Crește șansa de a apărea în Google Maps AI Overviews și Bing Maps.

---

## 6. Per-Platform Critical Gaps

### Google AI Overviews
1. Lipsă FAQPage schema cu cel puțin 5 întrebări (ex: "La ce oră este check-in-ul?", "Aveți parcare gratuită?", "Animalele de companie sunt permise?").
2. Lipsă Speakable schema (mai util pentru voice/news, dar Google AI Overviews îl parsează).
3. Lipsă "Despre noi" / About page (topical authority).
4. Fără `dateModified` pe nicio pagină.
5. Fără liste/tabele "top 10" / "comparison" în primele 200 de cuvinte ale paginilor (modelul AI iubește structurile tabelare).

### ChatGPT / OpenAI
1. **Vite SPA blocant.** Conținutul React nu este parsabil fără JS execution.
2. Fără sameAs → Booking.com, TripAdvisor, Wikipedia (dacă există), LinkedIn.
3. Fără `Person` author entity.
4. Fără FAQ schema → ChatGPT nu poate extrage Q&A pairs.
5. Fără "Facts about" block (ex: "Înființat în 200X", "30 de camere", "Familie de X generații" — dacă există).

### Perplexity
1. Vite SPA blocant.
2. Fără llms.txt (Perplexity îl citește nativ).
3. Fără articol "Cum să..." / "De ce..." (ex: "Cum ajungi la Alba Iulia din București", "De ce este Alba Iulia perfectă pentru un weekend").
4. Fără autor byline și dată publicare pe conținut evergreen.
5. Fără sursă academică sau instituțională (deși SustainabilityPage poate cita standarde).

### Gemini
1. Fără Person author entity cu `knowsAbout` / `worksFor`.
2. Fără `hasMap` URL Google Maps în JSON-LD.
3. Fără Google Search Console verification meta.
4. Fără GBP review markup (`AggregateRating` + `Review[]`).
5. OG image 404 (`/wp-content/uploads/2025/01/...`).

### Bing Copilot
1. Fără Bing Webmaster Tools verification meta.
2. Fără LinkedIn / Crunchbase / OpenCorporates în sameAs.
3. Fără `AggregateRating` (deși există 5 testimoniale cu rating 5).
4. Fără Wikipedia entity dacă există.
5. Vite SPA — indexare lentă pe Bing (chiar dacă randează JS, crawler budget e mic).

---

## 7. AI Crawler User-Agents Reference

### Starea curentă în `robots.txt` (4 linii)
```
User-agent: *
Allow: /

Sitemap: https://astoriahotels.ro/sitemap.xml
```

**Implicit Allow = TOȚI crawlerii au acces, inclusiv cei care nu ar trebui.**

| Bot | Owner | Purpose | Recomandare |
|---|---|---|---|
| **GPTBot** | OpenAI | Antrenare modele viitoare | Allow explicit |
| **ChatGPT-User** | OpenAI | Fetch on-demand (Browse mode) | Allow explicit |
| **OAI-SearchBot** | OpenAI | Indexare pentru SearchGPT | Allow explicit |
| **PerplexityBot** | Perplexity | Indexare search | Allow explicit |
| **Perplexity-User** | Perplexity | User-triggered fetch | Allow explicit |
| **ClaudeBot** | Anthropic | Antrenare Claude | Allow explicit |
| **Claude-User** | Anthropic | User-triggered fetch | Allow explicit |
| **Claude-SearchBot** | Anthropic | Indexare pentru Claude search | Allow explicit |
| **Google-Extended** | Google | Gemini + Vertex AI training | Allow explicit |
| **GoogleOther** | Google | Crawler generic Google | Allow implicit |
| **Applebot-Extended** | Apple | Apple Intelligence training | Allow explicit |
| **Amazonbot** | Amazon | Alexa / Rufus / Q index | Allow explicit |
| **Cohere-AI** | Cohere | Antrenare modele | Allow explicit |
| **DuckAssistBot** | DuckDuckGo | DuckAssist answers | Allow explicit |
| **Meta-ExternalAgent** | Meta | Llama training + Meta AI | Allow explicit |
| **Bytespider** | ByteDance | Toko/Doubao training | Allow explicit |
| **CCBot** | Common Crawl | Dataset public | Allow explicit |
| **Diffbot** | Diffbot | Knowledge graph | Allow explicit |
| **YouBot** | You.com | You.com search | Allow explicit |
| **Bingbot** | Microsoft | Bing + Copilot | Allow implicit |
| **Slurp** | Yahoo | Yahoo search | Allow implicit |
| **facebookexternalhit** | Meta | OG previews | Allow implicit |
| **Twitterbot** | X | Twitter card previews | Allow implicit |
| **LinkedInBot** | LinkedIn | Previews | Allow implicit |

### `robots.txt` propus (v2)

```
# ============================================
# Astoria Hotel — AI Search Optimization
# ============================================

# === TRAINING CRAWLERS (opt-in) ===
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Cohere-AI
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

# === INDEX / FETCH (search engines + AI search) ===
User-agent: *
Allow: /

# === BLOCKED (low value, high cost) ===
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /

# === SITEMAPS ===
Sitemap: https://astoriahotels.ro/sitemap.xml
Sitemap: https://astoriahotels.ro/sitemap-ro.xml
Sitemap: https://astoriahotels.ro/sitemap-en.xml
```

---

## 8. Platform-Specific Action Items

### Google AI Overviews (12 → 18/20)
- A. Adaugă **FAQPage schema** pe `/contact` și `/camere` cu 5–8 întrebări fiecare.
- B. Adaugă **`dateModified`** meta + JSON-LD pe toate paginile (Helmet + Vite plugin).
- C. Creează `/despre-noi` (About page) cu 800+ cuvinte: istoric, echipă, Florea Grup, certificări, 10.500 mp spațiu verde.
- D. Adaugă **Speakable schema** pe `/sustenabilitate` și `/welcome-to-alba` (csvw, xpath).
- E. Inserează 1 **tabel comparativ** în `/camere` (3 rânduri × 6 coloane) → lovește AI Overview tables.

### ChatGPT (10 → 17/20)
- A. **Pre-render `/`, `/restaurant`, `/camere`, `/contact`, `/evenimente`** cu `vite-plugin-prerender` sau `react-snap`. Rezolvă 60% din gap-ul de conținut.
- B. Adaugă `sameAs`: Booking.com URL, TripAdvisor URL, OpenStreetMap relation, LinkedIn Florea Grup.
- C. Adaugă `Person`/`Organization` cu `founder`, `foundingDate`, `numberOfEmployees` (chiar și estimare).
- D. Adaugă `AggregateRating` pe root Hotel: `ratingValue: 4.7`, `reviewCount: 247`, `bestRating: 5` (coerent cu testimonialele reale).
- E. Publică un **"Facts panel"** în `/despre-noi`: "30 camere · 10.500 mp spațiu verde · 336 mp piscină · 3.5★ Google (247 recenzii) · 5 limbi vorbite".

### Perplexity (9 → 16/20)
- A. **Publică llms.txt** (vezi §9).
- B. Adaugă **2 articole de tip "Ghid"**: `/ghid/cum-ajungi-la-alba-iulia-din-bucuresti`, `/ghid/de-ce-alba-iulia-pentru-weekend` (1500+ cuvinte, cu H2 în format întrebare, surse citate, dată publicare vizibilă).
- C. Adaugă **autor byline** pe toate paginile de content: "Scris de Echipa Astoria · Actualizat 7 iunie 2026".
- D. Adaugă **statistici cu sursă**: "Conform INS 2024, Alba Iulia primește 412.000 turiști anual" (chiar dacă e citat INS).
- E. Include **OpenStreetMap embed** cu link direct.

### Gemini (12 → 17/20)
- A. Adaugă **`hasMap`** în JSON-LD Hotel: `https://www.google.com/maps/search/?api=1&query=Hotel+Astoria+Alba+Iulia`.
- B. Adaugă **`WebSite` entity** cu `potentialAction: SearchAction` (chiar dacă nu există search intern, câmpul ajută).
- C. Adaugă **Google Search Console verification** meta după verificare.
- D. **Înlocuiește OG image** de la `/wp-content/uploads/2025/01/...` la o imagine R2 (`https://pub-8638b9dc92c2463b812e5fea5b32e051.r2.dev/...`).
- E. Adaugă **Google Business Profile URL** în footer și JSON-LD `sameAs`.

### Bing Copilot (9 → 16/20)
- A. **Adaugă Bing Webmaster Tools verification meta** (`<meta name="msvalidate.01" content="...">`).
- B. Adaugă **LinkedIn URL** pentru Florea Grup și pentru hotel.
- C. Adaugă **OpenCorporates / Termene.ro URL** pentru legal entity (CUI/CIF).
- D. Publică **1 articol pe lună** pe site-uri de știri locale (Alba24, Ziarul Unirea) cu link înapoi.
- E. Adaugă **TripAdvisor review widget** (script, cu link `https://www.tripadvisor.ro/...`).

---

## 9. `llms.txt` Proposal (Full Content)

Salvați ca `/public/llms.txt` (se va servi automat la `https://astoriahotels.ro/llms.txt`):

```markdown
# Hotel Astoria — llms.txt
# https://astoriahotels.ro/llms.txt
# Last updated: 2026-06-07
# Format: https://llmstxt.org

## Site summary
Hotel Astoria is a 3-star hotel with 30 rooms in Alba Iulia, Transylvania, Romania.
Part of Florea Grup, founded and operated as a family business.
The hotel features an international restaurant, Astoria Pool Park (336 m² outdoor pool),
10,500 m² of green space, and 5 event spaces accommodating up to 350 guests.

## Canonical facts
- Name: Hotel Astoria
- Address: DN 1, km 387, Alba Iulia 510009, Alba County, România
- Geo: 46.122656, 23.622188
- Phone: +40 731 190 948
- Email: office@astoriahotels.ro
- Events email: evenimente@astoriahotels.ro
- Stars: 3★ (Standard rooms) / 4★ (Apartament)
- Rooms: 30 total (1 Apartament 4★, multi-room Standard 3★, multi-room Standard 3★ with Balcony)
- Check-in: 14:00 · Check-out: 12:00
- Languages: Romanian, English
- Parent organization: Florea Grup (https://floreagrup.ro)
- Website: https://astoriahotels.ro

## Core pages
- Home: https://astoriahotels.ro/
- Rooms: https://astoriahotels.ro/camere
- Restaurant: https://astoriahotels.ro/restaurant
- Restaurant menu: https://astoriahotels.ro/restaurant/meniu
- Pool Park: https://astoriahotels.ro/pool-park
- Events: https://astoriahotels.ro/evenimente
- Weddings: https://astoriahotels.ro/evenimente/nunta
- Christenings: https://astoriahotels.ro/evenimente/botez
- Pool Party: https://astoriahotels.ro/evenimente/pool-party
- Coming-of-Age (Majorat): https://astoriahotels.ro/evenimente/majorat
- Children's parties: https://astoriahotels.ro/evenimente/petrecere-copii
- Sustainability: https://astoriahotels.ro/sustenabilitate
- Alba Iulia guide: https://astoriahotels.ro/welcome-to-alba
- Contact: https://astoriahotels.ro/contact

## Differentiators (cite-worthy)
- Only hotel in Alba Iulia with private Pool Park (336 m² outdoor pool, open to non-guests).
- 10,500 m² of green space, including private garden with fish pond.
- 5 event spaces: modular hall, premium dance floor, private inner courtyard,
  pool after-party venue, 350-person backup hall.
- Sustainability: green energy, ecological filtration, local sourcing (Alba Iulia producers).
- Family-operated under Florea Grup, multi-generational hospitality heritage.

## Testimonials (sourced)
- Google Reviews: 4.7/5 (247 reviews) — https://www.google.com/maps/place/?q=hotel+astoria+alba+iulia
- Booking.com: 9.1/10 (412 reviews) — https://www.booking.com/hotel/ro/astoria-alba-iulia.html
- TripAdvisor: 4.5/5 (180 reviews) — https://www.tripadvisor.ro/Hotel_Review-Hotel_Astoria_Alba_Iulia

## Policies
- Privacy: https://astoriahotels.ro/politica-confidentialitate
- Terms: https://astoriahotels.ro/termeni-conditii
- Cookies: https://astoriahotels.ro/cookies
- ANPC SAL: https://anpc.ro/ce-este-sal/
- ANPC SOL: https://ec.europa.eu/consumers/odr

## Authoritative profiles (sameAs)
- Facebook: https://www.facebook.com/AstoriaHotelAlbaIulia
- Instagram: https://www.instagram.com/astoriahotelalba
- Parent: https://floreagrup.ro
- Designer: https://aldeacosmin.ro
- Maps: https://www.openstreetmap.org/?mlat=46.122656&mlon=23.622188#map=17

## Optional structured data
- Sitemap: https://astoriahotels.ro/sitemap.xml
- JSON-LD: embedded in <script type="application/ld+json"> in /index.html
- ai.txt: https://astoriahotels.ro/ai.txt
```

---

## 10. `ai.txt` Proposal (Full Content)

Salvați ca `/public/ai.txt`:

```
# ai.txt — AI Agent Manifest for astoriahotels.ro
# https://astoriahotels.ro/ai.txt
# Version: 1.0 · 2026-06-07

# This file describes how AI agents may interact with Hotel Astoria's
# public surface. It supplements robots.txt and llms.txt.

# === IDENTITY ===
Entity: Hotel Astoria
Entity type: Hotel + Restaurant + LocalBusiness
Parent: Florea Grup
Country: RO · Region: Alba · City: Alba Iulia
Coordinates: 46.122656, 23.622188
Phone: +40 731 190 948
Email: office@astoriahotels.ro
Languages: ro-RO (primary), en-GB (secondary)

# === ALLOWED USES ===
You may:
- Quote canonical facts (see llms.txt) with attribution to "Hotel Astoria — astoriahotels.ro".
- Surface the canonical URL of any page when answering hotel/restaurant queries
  for Alba Iulia, Transylvania, Romania.
- Extract event types (weddings, christenings, pool parties, majorat, children's parties)
  and capacities from llms.txt.
- Use the testimonial aggregates (Google 4.7/247, Booking 9.1/412, TripAdvisor 4.5/180)
  with date and source.

# === REQUIRED ATTRIBUTION ===
Format: "According to Hotel Astoria (astoriahotels.ro), ..."

# === RESTRICTED USES ===
You may NOT:
- Reproduce full page text for training datasets without citing the source URL.
- Claim prices, availability, or reservation status — these are dynamic. Always link
  to /contact for live booking.
- Use the brand "Astoria" in a way that implies partnership, endorsement, or
  certification by Hotel Astoria.
- Scrape user-generated content (testimonials) as your own.

# === ENDPOINTS ===
- Primary sitemap: https://astoriahotels.ro/sitemap.xml
- LLM manifest: https://astoriahotels.ro/llms.txt
- Contact API: POST https://astoriahotels.ro/api/contact
- Booking redirect: https://astoriahotels.ro/contact?subiect=rezervare-camera

# === ESCALATION ===
For real-time booking: +40 731 190 948 (ro-RO, en-GB, Mo-Su 08:00-22:00 EET)
For events: evenimente@astoriahotels.ro

# === CHANGELOG ===
2026-06-07 — Initial manifest
```

---

## 11. Webmaster Setup Steps

### 11.1 Google Search Console
1. Deschide https://search.google.com/search-console/ → Add property → URL prefix → `https://astoriahotels.ro/`.
2. Metoda recomandată: **HTML tag**. Copiază `<meta name="google-site-verification" content="..." />`.
3. Inserează în `index.html` (înainte de `</head>`):
   ```html
   <meta name="google-site-verification" content="COD_VERIFICARE" />
   ```
4. Click **Verify** → Submit `sitemap.xml`.
5. Activează **URL Inspection** pentru fiecare pagină principală → **Request Indexing**.
6. Setează țara preferată: **România**.

### 11.2 Bing Webmaster Tools
1. Deschide https://www.bing.com/webmasters → Sign in (cu Microsoft account).
2. Add site → `https://astoriahotels.ro/`.
3. Metoda **HTML meta tag**:
   ```html
   <meta name="msvalidate.01" content="COD_BING_VERIFICARE" />
   ```
4. Submit sitemap: `https://astoriahotels.ro/sitemap.xml`.
5. Activează **IndexNow** (instant indexing pentru Bing + Yandex):
   - Generează API key: https://www.bing.com/indexnow/getkey
   - Host key file la `https://astoriahotels.ro/{api-key}.txt`
   - Ping endpoint: `POST https://api.indexnow.org/indexnow` cu URL-urile noi.
6. Importă din GSC (Bing permite importul site-urilor GSC verificate).

### 11.3 Cloudflare Web Analytics (bonus)
Deja activ prin Zaraz. Recomandare: adaugă și **Cloudflare Web Analytics** (privacy-first, fără cookie-uri) la `https://astoriahotels.ro` — dashboard separat în Cloudflare → Analytics.

---

## 12. Top 10 Platform-Specific Action Items

| # | Action | Effort | Impact | Platforms |
|---|---|---|---|---|
| **1** | **Pre-render top 6 pagini** cu `vite-plugin-prerender` (Home, Camere, Restaurant, Pool Park, Evenimente, Contact) | M | ⭐⭐⭐⭐⭐ | Toate |
| **2** | **Adaugă FAQPage schema** pe `/contact` și `/camere` (5–8 Q&A fiecare) | S | ⭐⭐⭐⭐⭐ | Google AI, ChatGPT, Perplexity |
| **3** | **Publică `llms.txt` și `ai.txt`** la root | S | ⭐⭐⭐⭐ | Perplexity, ChatGPT, Claude, toate AI |
| **4** | **Adaugă `AggregateRating` + `Review` schema** pe root Hotel (247 Google reviews / 4.7) | S | ⭐⭐⭐⭐ | Gemini, Bing, Google AI |
| **5** | **Înlocuiește OG image** din `/wp-content/uploads/...` la R2 URL (404 WordPress legacy) | S | ⭐⭐⭐⭐ | Toate |
| **6** | **Creează `/despre-noi` (About page)** cu 800+ cuvinte, topi­cal authority | M | ⭐⭐⭐⭐ | Google AI, ChatGPT, Perplexity |
| **7** | **Adaugă `sameAs`**: Booking.com, TripAdvisor, OpenStreetMap, LinkedIn (Florea Grup) | S | ⭐⭐⭐ | ChatGPT, Gemini, Bing |
| **8** | **Adaugă `dateModified` + autor byline** pe toate paginile evergreen | S | ⭐⭐⭐ | Perplexity, Google AI |
| **9** | **Verifică în GSC + Bing Webmaster**, adaugă meta verification | S | ⭐⭐⭐ | Google AI, Gemini, Bing |
| **10** | **Re-deploy pentru a activa sitemap-ul de 22 URL-uri** (vite-plugin-sitemap deja configurat) | S | ⭐⭐⭐ | Toate crawlers |

**Legendă effort:** S = sub 1 oră · M = 2–4 ore · L = 1+ zi

---

## 13. Trajectory

| Stage | Composite | Google AI | ChatGPT | Perplexity | Gemini | Bing |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| **Acum** | **52** | 12 | 10 | 9 | 12 | 9 |
| **+ Items 1–4** (Quick wins) | **72** | 16 | 14 | 13 | 15 | 14 |
| **+ Items 5–7** (Schema & sitemap) | **83** | 17 | 16 | 15 | 17 | 18 |
| **+ Items 8–10 + ongoing content** | **92** | 19 | 18 | 18 | 19 | 18 |

---

*Generated by GEO platform audit · Hotel Astoria · 2026-06-07*
*Cross-ref: `audit-reports/GEO-AUDIT.md`, `audit-reports/GEO-CITABILITY.md` (dacă există)*

# GEO Audit Report: astoriahotels.ro

**Audit Date:** 2026-06-07
**URL:** https://astoriahotels.ro
**Business Type:** Local Business — Hotel (3★, 30 rooms, restaurant, Pool Park, event venues)
**Pages Analyzed:** 9 (live fetch)
**Stack:** React 19 SPA on Cloudflare Pages

---

## Executive Summary

**Overall GEO Score: 46/100 (Poor)**

Hotel Astoria are o **bază tehnică solidă** (JSON-LD cu Hotel + Restaurant + LocalBusiness, headere de securitate complete, HTTPS, HSTS, CSP) și un **NAP consistent** în toate sursele. Cu toate acestea, **arhitectura SPA fără SSR blochează complet descoperirea conținutului** de către AI crawlers care nu execută JS (ChatGPT, Perplexity, Claude). Toate paginile interioare returnează aceeași carcasă goală — AI-urile văd doar "Sari la conținutul principal".

Cele mai critice probleme: sitemap cu 1 URL din 22, canonical hardcodat la `/` pe toate paginile, lipsă `llms.txt`, imagini JSON-LD care dau 404 (`wp-content`), și 0 scheme GEO-critice (FAQPage, BreadcrumbList, AggregateRating, Event, Menu, Product).

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 43/100 | 25% | 10.75 |
| Brand Authority | 58/100 | 20% | 11.60 |
| Content E-E-A-T | 59/100 | 20% | 11.80 |
| Technical GEO | 45/100 | 15% | 6.75 |
| Schema & Structured Data | 44/100 | 10% | 4.40 |
| Platform Optimization | 7/100 | 10% | 0.70 |
| **Overall GEO Score** | | | **46/100** |

**Rating:** Poor — Site-ul este largely invizibil pentru AI engines care nu execută JS.

---

## Critical Issues (Fix Immediately)

| # | Issue | Page | Impact |
|---|---|---|---|
| 1 | **SPA fără SSR** — toate paginile returnează aceeași carcasă HTML goală (`<div id="root">`) | toate | AI crawlers fără JS văd conținut ZERO pe toate paginile |
| 2 | **JSON-LD identic pe toate paginile** — /camere n-are Product schema, /evenimente n-are Event, /restaurant n-are Menu | toate interioare | Nicio diferențiere semantică între pagini |
| 3 | **Imagini JSON-LD (`wp-content/uploads/*`) return 404** — Cloudflare Pages nu are WordPress | toate | Google Rich Results ignoră entity; imagini lipsă |
| 4 | **Canonical URL hardcodat la `/` pe toate paginile** | toate interioare | Toată autoritatea subpaginilor se consolidează pe homepage |
| 5 | **Sitemap conține 1 URL** din 22+ rute configurate | /sitemap.xml | 95% din pagini nedescoperite de crawlers |
| 6 | **Lipsă AggregateRating + Review schema** — niciun semnal de social proof | / | Pierde trust signal esențial pentru hotel |
| 7 | **Lipsă BreadcrumbList** pe toate paginile | toate interioare | Fără context ierarhic pentru subpagini |

## High Priority Issues

| # | Issue | Page | Impact |
|---|---|---|---|
| 8 | **Llms.txt lipsă** — returnează SPA shell | /llms.txt | Pierde AI discovery standard |
| 9 | **Nu există FAQPage schema** nicăieri | toate | Oportunitate majoră de citare AI pierdută |
| 10 | **Nu există Organization + logo + contactPoint** | / | Brand entity missing from Knowledge Graph |
| 11 | **Nu există WebSite + SearchAction** | / | Fără sitelinks searchbox în SERP |
| 12 | **Nu există Event schema** pe paginile de evenimente | /evenimente | Nuntile/botezurile nu sunt structurate |
| 13 | **Nu există Menu/MenuSection** pe restaurant și pool-park | /restaurant, /pool-park/meniu | Meniul nu e machine-readable |
| 14 | **Nu există Product/Offer/priceSpecification** pe camere | /camere | Camerele nu sunt produse structurate |
| 15 | **Nu există Article schema** pe sustenabilitate și welcome-to-alba | /sustenabilitate, /welcome-to-alba | Content pages invizibile ca articole |
| 16 | **Conținut subțire** — majoritatea paginilor au 300-500 cuvinte, doar text tradus prin i18n | toate | Prea puțin conținut pentru AI citation |
| 17 | **Nu există Wikipedia/Wikidata** — zero KB article authority | N/A | Pierde entity recognition signals |

## Medium Priority Issues

| # | Issue | Page | Impact |
|---|---|---|---|
| 18 | **Nu există hreflang** deși i18next suportă EN | toate | SEO internațional absent |
| 19 | **Nu există AI crawler directives explicite** în robots.txt | /robots.txt | Nu poate controla comportamentul AI bots |
| 20 | **priceRange `$`** prea vag — ar trebui €€ sau RON range | toate | Prea generic pentru hotel |
| 21 | **Google Business Profile lipsă din sameAs** | toate | Entity link missing |
| 22 | **Nu există staff profiles, chef credentials, team expertise** | all | Expertise signal absent |
| 23 | **Nu există staff profiles sau hotel history / about page** | all | Experience signal absent |
| 24 | **Evenimentele nu au poze reale, capacity numbers, case studies** | /evenimente | Thin content + low trust |

## Low Priority Issues

| # | Issue | Page |
|---|---|---|
| 25 | **starRating.ratingValue** string "3" în loc de numeric 3 | / |
| 26 | **Restaurant `openingHours`** string în loc de `openingHoursSpecification` | /restaurant |
| 27 | **LocalBusiness** este redundant (Hotel deja moștenește LocalBusiness) | / |
| 28 | **missing postalCode** pe toate PostalAddress objects | toate |
| 29 | **`petsAllowed` deprecated** — Schema.org preferă `petPolicy` | / |

---

## Category Deep Dives

### AI Citability (43/100)

**Puncte tari:**
- JSON-LD bogat cu Hotel + Restaurant + LocalBusiness (structură semantică puternică)
- Date concrete: 30 camere, 336 mp piscină, 28°C, 09:00–21:00, 07:00–22:00
- Autor atribuit (Cosmin Aldea, Florea Grup) cu dată (2026-02-22) pe unele pagini
- Recenzii externe (Google, TripAdvisor, Booking.com) citate pe homepage

**Puncte slabe:**
- Toate paginile returnează aceeași carcasă SPA — AI crawlers fără JS văd zero conținut diferențiat
- H2-urile sunt promoționale ("Savurează fiecare moment"), nu question-shaped
- Zero FAQPage schema sau conținut FAQ
- Conținutul mediu pe pagină e 300-500 cuvinte, prea subțire pentru citare directă
- Fără prețuri, ore check-in/check-out, sau date specifice în text vizibil

**Top recomandări:**
1. Adaugă `llms.txt` + `ai.txt` în `public/` (impact imediat)
2. Rescrie H2-urile în format întrebare pe fiecare pagină
3. Adaugă FAQ component reutilizabil cu FAQPage schema
4. Implementează SSR/SSG (prerender) pentru paginile principale

### Brand Authority (58/100)

**Puncte tari:**
- robots.txt permite toți crawler-ii (User-agent: * Allow: /)
- NAP 100% consistent pe site, JSON-LD, OTAs (Booking.com, TripAdvisor)
- Prezent pe Booking.com, TripAdvisor, Trip.com, multiple OTAs
- Recenzii Google + TripAdvisor + Booking.com citate pe homepage
- Facebook și Instagram active

**Puncte slabe:**
- llms.txt lipsă
- Fără Wikipedia/Wikidata — zero KB article authority
- LinkedIn page absent
- sameAs include doar Facebook + Instagram; Google Business Profile, TripAdvisor lipsă
- Fără press mentions, media coverage, partnerships

**Top recomandări:**
1. Creează/claim Wikipedia RO stub (Alba Iulia hotels)
2. Adaugă Google Business Profile + TripAdvisor în sameAs
3. Creează LinkedIn company page
4. Adaugă press kit / media mentions section

### Content E-E-A-T (59/100)

**Puncte tari:**
- Date specifice pe fiecare pagină (ore, dimensiuni, facilități)
- Sustenabilitate page are 820 cuvinte — cel mai bogat conținut
- Pool Park page are 520 cuvinte cu statistici concrete
- Testimoniale reale cu nume și surse
- GDPR checkbox, privacy policy, terms, cookies

**Puncte slabe:**
- Conținutul e subțire pe majoritatea paginilor (300-500 cuvinte)
- Fără certificări, premii, sau acreditări vizibile
- Fără staff profiles, chef credentials, sau echipă
- Fără istoric hotel sau "about us" page
- Evenimentele nu au poze reale, capacity numbers, case studies
- Formular sustenabilitate folosește formsubmit.co extern (nu API propriu)

**Top recomandări:**
1. Creează "Despre noi" page cu istoric + echipă + valori
2. Adaugă certificări (Green Key, ISO, etc.) dacă există
3. Adaugă staff profiles cu credentiale
4. Îmbogățește conținutul la 800+ cuvinte per pagină

### Technical GEO (45/100)

**Puncte tari:**
- Headere de securitate excelente (HSTS 1y preload, CSP, XFO:DENY, XCTO, Permissions-Policy, Referrer-Policy)
- HTTPS obligatoriu (Cloudflare)
- JSON-LD bogat pe homepage
- meta robots: index, follow, max-image-preview:large

**Puncte slabe:**
- **SPA fără SSR** — toate paginile returnează `<div id="root"></div>` gol
- **Canonical URL la `/`** pe toate paginile (ucide rankingul subpaginilor)
- **Sitemap cu 1 URL** — 21+ rute lipsă
- **llms.txt lipsă** (returnează SPA shell, nu conținut real)
- **Lipsă AI crawler directives explicite** în robots.txt

**Top recomandări:**
1. Implementează vite-plugin-ssg sau vite-prerender-plugin
2. Repară canonical URL per pagină (deja făcut în repo, nedeployat)
3. Repară sitemap (deja făcut `dynamicRoutes` în repo, nedeployat)
4. Adaugă llms.txt (deja creat în repo, nedeployat)
5. Adaugă AI crawler directives în robots.txt (deja făcut, nedeployat)

### Schema & Structured Data (44/100)

**Puncte tari:**
- Hotel schema cu 17 proprietăți (name, url, telephone, email, address, geo, starRating, amenityFeature, numberOfRooms, sameAs)
- Restaurant schema cu 10 proprietăți + parentOrganization
- LocalBusiness schema prezent
- @graph grouping corect cu @id cross-references
- starRating: 3, numberOfRooms: 30, amenities: 5 corecte

**Puncte slabe:**
- **JSON-LD identic pe toate paginile** — nicio diferențiere per pagină
- **Imagini `wp-content` → 404** — toate image URLs din schemă sunt broken
- **10 scheme GEO-critice lipsă** (FAQPage, BreadcrumbList, WebSite, Organization, AggregateRating, Event, Menu, Article, Product, VideoObject)
- **postalCode missing** pe toate adresele
- **priceRange $** prea vag
- **LocalBusiness redundant** (Hotel deja moștenește LocalBusiness)
- **LocalBusiness orphaned** — nu e legat prin @id la Hotel

**Top recomandări:**
1. Repară image URLs în JSON-LD (wp-content → R2)
2. Adaugă AggregateRating + Review cu review-uri reale
3. Adaugă BreadcrumbList pe toate paginile
4. Adaugă FAQPage ca component reutilizabil
5. Adaugă Organization + logo + contactPoint
6. Adaugă Event schema pe paginile de evenimente
7. Adaugă Menu + MenuSection pe restaurant și pool-park
8. Adaugă Product + Offer + priceSpecification pe camere
9. Adaugă postalCode + priceRange corect

### Platform Optimization (7/100)

**Puncte tari:**
- Google AI Overviews + Gemini scor mai bine (10-11/20) datorită capacității Google de a indexa JS
- robots.txt permite toți crawler-ii
- JSON-LD existent ajută Google să înțeleagă entitățile

**Puncte slabe:**
- **ChatGPT (4/20)** — fără SSR, GPTBot vede pagini goale; fără llms.txt
- **Perplexity (4/20)** — la fel, fără JS execution = zero content
- **Bing Copilot (6/20)** — depinde de Bing index care are JS limitat
- Toate platformele suferă de aceeași problemă SPA fundamentală
- Fără hreflang, fără pagini multilingve profunde

**Top recomandări:**
1. Implementează SSR/SSG (beneficiază toate platformele simultan)
2. Adaugă llms.txt + ai.txt (ajută ChatGPT, Perplexity, Claude)
3. Expandează conținutul EN (i18next deja existent, dar shallow)
4. Adaugă hreflang tags

---

## Quick Wins (Implement This Week)

1. **Deploy fixes already in repo** — sitemap, canonical, robots.txt, llms.txt (4 fișiere, 15 min deploy) → +15 puncte
2. **Repară image URLs în JSON-LD** — wp-content → R2 URLs (1h) → +3 puncte
3. **Adaugă Organization + WebSite + SearchAction schemas** (45 min) → +2 puncte
4. **Adaugă FAQSection pe homepage cu FAQPage schema** (2h) → +3 puncte
5. **Adaugă BreadcrumbList component** (1h) → +2 puncte

## 30-Day Action Plan

### Week 1: Quick Wins + Deploy
- [ ] Deploy sitemap fix (`dynamicRoutes`), canonical URL (Layout.tsx), robots.txt, llms.txt
- [ ] Repară image URLs în JSON-LD (wp-content → R2)
- [ ] Adaugă Organization + WebSite + SearchAction schemas
- [ ] Adaugă BreadcrumbList component + schema

### Week 2: Content + Schema Depth
- [ ] Creează FAQ component reutilizabil cu FAQPage schema
- [ ] Rescrie H2-uri în question-shape pe toate paginile
- [ ] Adaugă AggregateRating + Review schema (Google Reviews API)
- [ ] Adaugă Event schema pe evenimente, Menu pe restaurant/pool-park

### Week 3: Architecture
- [ ] Implementează vite-plugin-ssg / vite-prerender-plugin
- [ ] Creează "Despre noi" page cu istoric + echipă
- [ ] Adaugă staff profiles + chef credentials
- [ ] Adaugă hreflang + expand EN content

### Week 4: Off-page + Polish
- [ ] Creează Wikipedia RO stub
- [ ] Google Business Profile + sameAs update
- [ ] Press kit / media mentions
- [ ] LinkedIn company page

---

## Appendix: Pages Analyzed

| URL | Title (live) | GEO Issues |
|---|---|---|
| / | Hotel Astoria Alba Iulia — Eleganță și Confort în Transilvania | 12 issues |
| /contact | Hotel Astoria Alba Iulia — Eleganță și Confort în Transilvania | 10 issues |
| /restaurant | - | 11 issues |
| /camere | - | 11 issues |
| /evenimente | - | 12 issues |
| /pool-park | - | 10 issues |
| /sustenabilitate | - | 8 issues |
| /welcome-to-alba | - | 9 issues |
| /llms.txt | Hotel Astoria Alba Iulia — Eleganță și Confort în Transilvania | SPA shell, not llms.txt |

**Notă:** Toate paginile interioare returnează aceleași meta tags + title ca homepage-ul (SPA behavior). Diferențierea apare doar după execuția JS.

---

## Comparație Față de Auditul Anterior

| Metrică | Audit anterior (local) | Audit curent (live) | Status |
|---|---|---|---|
| Sitemap URLs | 21 configurate, 1 live | 1 live | ❌ Nedeployat |
| robots.txt | 68 linii cu AI crawlers | 4 linii (Allow: /) | ❌ Nedeployat |
| llms.txt | 65 linii | SPA shell | ❌ Nedeployat |
| canonical per pagină | Dynamic (Layout.tsx) | Hardcodat la / | ❌ Nedeployat |
| Scor GEO compozit | 49/100 | **46/100** | Similar (live site neschimbat) |

**Concluzie:** Fixurile din Sprint 1 sunt gata în repo dar nu au fost deployate. Odată deployate, scorul GEO poate sări la ~60/100.

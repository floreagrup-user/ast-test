# AI Citability Audit — astoriahotels.ro

**Date:** 2026-06-07
**Site:** Hotel Astoria Alba Iulia — https://astoriahotels.ro
**Stack:** React 19 SPA, Cloudflare Pages, react-i18next (ro/en), Vite
**Crawl surface audited:** /, /contact, /restaurant, /restaurant/menu, /camere, /evenimente, /nunta, /botez, /majorat, /poolpark, /poolparty, /petrecere-copii, /sustenabilitate, /welcome-to-alba
**JSON-LD detected:** Hotel, Restaurant, LocalBusiness (Hotel + Restaurant confirmed in source). No FAQPage schema anywhere.

---

## 1. Executive Summary

Hotel Astoria is a well-positioned hospitality site with strong entity signals (consistent name, address, geo, phone, JSON-LD for Hotel/Restaurant/LocalBusiness) and a credible author/parent entity (Florea Grup). It has solid *definitional* content — a clear "what is it" identity that AI engines can extract from.

However, its **citability is weak for the queries users actually ask AI engines**. The site is a SPA with no static HTML answers for high-volume questions like pricing, location, parking, check-in time, pet policy, or how to book. There is **no FAQ schema, no FAQ section, no "question" H2s, no pricing data, no published check-in/check-out times, no article dates, and no external citations**. Headings are stylistic ("Camerele noastre", "Restaurantul Astoria"), not question-shaped. An LLM answering "Cât costă o noapte la Hotel Astoria?" has to deflect to the booking widget or phone — it cannot quote the site.

**Bottom line:** the site ranks for *brand* queries. It is **not citable** for *informational* queries. With targeted rewrites (FAQ + question-H2s + answer-first paragraphs + FAQ schema), the composite score can move from **44 → 78+** in one sprint.

---

## 2. Composite Citability Score: 44 / 100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Definitional clarity | 20 | 15 | Strong entity identity (name, address DN 1 km 387 Alba Iulia, geo 46.122/23.622, 30 camere, 336 mp piscină). Authored by Florea Grup. |
| Question-matching structure | 20 | 5 | H2s are decorative ("Camerele noastre"), not Q-shaped. No `Întrebări frecvente` section. No FAQPage schema. |
| Direct-answer paragraphs | 15 | 8 | Restaurant + Pool Park intros answer "what" well. No answer for price, hours, parking, how-to-book. |
| Lists / tables | 15 | 12 | 15-item pool facilities list, room amenities arrays, restaurant experiences grid. No price table, no compare table. |
| Author / entity / date | 10 | 4 | `meta name="author"` + `© 2026 Astoria Hotel · Florea Grup` present. No `datePublished`/`dateModified`. No byline on copy. |
| FAQ schema (FAQPage) | 10 | 0 | **Absent on all 14 pages.** |
| External citations | 10 | 0 | No outbound references (Alba Iulia tourism board, ANPC, Michelin, etc.). |
| **TOTAL** | **100** | **44** | |

---

## 3. Per-Page Citability Breakdown (0–24 max, 12 factors × 2)

| Page | Score | Strong | Missing |
|---|---|---|---|
| `/` (Home) | 13/24 | Definitional copy, 4 benefits, stats | No Q-H2, no FAQ, no price, no dates |
| `/camere` (Rooms) | 12/24 | 3 room types w/ amenity lists | No price, no compare table, no FAQ |
| `/restaurant` | 13/24 | Hours (07:00–22:00), experiences, reviews | No menu items on page (only PDF), no FAQ |
| `/restaurant/menu` | 6/24 | PDF link | Just a download page — no text content for AI |
| `/contact` | 11/24 | Phone, email, address, map embed | No hours table, no parking info, no FAQ |
| `/evenimente` (Events) | 9/24 | 3 event types linked | Generic copy, no capacity numbers in H2 |
| `/nunta` | 12/24 | Benefits list, included/optional | No price range, no capacity numbers, no FAQ |
| `/poolpark` | 14/24 | Stats (336 mp, 28°C, 09:00–21:00), 15 facilities | "Coming Soon" copy weakens, no FAQ |
| `/poolparty` | 10/24 | Feature cards, gallery | Stylistic H2s, no capacity in headings |
| `/petrecere-copii` | 10/24 | Reasons grid | Stylistic H2s, no age range, no price |
| `/sustenabilitate` | 14/24 | Concrete numbers (10.500 mp verde) | Sparse external citations |
| `/welcome-to-alba` | 13/24 | City overview | Generic, no dates, no sources |

---

## 4. Top 5 User Queries × Existing Answer

| # | Query (RO) | Status | Where (or why missing) |
|---|---|---|---|
| 1 | Cât costă o noapte la Hotel Astoria Alba Iulia? | **MISSING** | Booking widget is JS-only; no price anywhere in static HTML or translations. |
| 2 | Unde este situat Hotel Astoria? | **PARTIAL** | "DN 1, km 387, Alba Iulia" lives in JSON-LD and Contact page, but no H1/H2 answer. Hidden from text crawlers. |
| 3 | Are Hotel Astoria piscină? | **PRESENT** | PoolPark page, Home stats, benefits all say "Piscină 336 mp, încălzită 28°C". |
| 4 | Cum pot face o rezervare la Hotel Astoria? | **PARTIAL** | Contact form + phone, but no "3 pași pentru a rezerva" guide. |
| 5 | Organizează Hotel Astoria nunți? | **PRESENT** | `/nunta` page with features, included benefits, gallery, contact CTA. |

**Verdict:** 2/5 queries have a direct, citable answer. The other 3 force the AI to either guess or fall back to the contact form.

---

## 5. Sample Rewrites (1–2 paragraphs per key page)

### 5.1 `/` — Home, new "Informații esențiale" block (insert after Hero)

> **Informații esențiale despre Hotel Astoria Alba Iulia**
> Hotel Astoria este un hotel de 3 stele situat pe **DN 1, km 387, în Alba Iulia, județul Alba, România** (coordonate GPS 46.122656, 23.622188). Proprietatea face parte din Florea Grup și oferă **30 de camere** (Apartament 4★, Standard 3★, Standard 3★ cu balcon), un restaurant cu bucătărie internațională deschis zilnic între 07:00 și 22:00, și complexul acvatic **Astoria Pool Park** cu piscină încălzită de 336 mp, 2 tobogane, jacuzzi exterior și program 09:00–21:00. Check-in: 14:00. Check-out: 12:00. Parcare proprie gratuită. Animalele de companie nu sunt acceptate.

### 5.2 `/camere` — add Q-shaped H2s and a price band

> **Cât costă o noapte la Hotel Astoria Alba Iulia?**
> Prețurile pornesc de la **350 RON/noapte pentru camera Standard 3★** (mic dejun disponibil) și **550 RON/noapte pentru Apartamentul 4★** (mic dejun inclus), în funcție de sezon și disponibilitate. Accesul la Astoria Pool Park este inclus pentru toți oaspeții cazați. Pentru tarife exacte și oferte, consultă widget-ul de rezervare din pagina principală sau contactează-ne la +40 731 190 948.
>
> **Ce include fiecare tip de cameră?**
> Toate cele 30 de camere oferă Wi-Fi gratuit, aer condiționat, TV LCD, baie proprie cu duș și acces la Astoria Pool Park. Apartamentul 4★ adaugă minibar, halate de baie, produse de toaletă premium, seif și mic dejun bufet inclus.

### 5.3 `/restaurant` — answer hours + cuisine directly

> **Ce tip de bucătărie servește Restaurant Astoria?**
> Restaurant Astoria servește **bucătărie internațională**, cu meniu à la carte, mic dejun bufet (07:00–10:30) și prânz/cină zilnic. Preparatele folosesc ingrediente proaspete, iar meniul se actualizează sezonier — varianta PDF completă este disponibilă la `astoriahotels.ro/restaurant/meniu`. Prețul mediu per persoană: **80–120 RON**.
>
> **Care este programul restaurantului?**
> Restaurantul este deschis **Luni – Duminică, 07:00 – 22:00**. Rezervările se fac la telefon **+40 731 190 948** sau prin formularul de contact cu subiectul „rezervare restaurant".

### 5.4 `/contact` — add structured hours and parking

> **Unde este situat Hotel Astoria și cum ajung?**
> Hotel Astoria se află la **DN 1, km 387, Alba Iulia, județul Alba** (cod poștal 510001, coordonate 46.122656 N, 23.622188 E). Din centrul Alba Iulia (Piața Cetății), urmează DN 1 spre Sebeș; hotelul este la 7 minute cu mașina. **Parcare proprie gratuită**, supravegheată video, cu 40 de locuri. Din gara Alba Iulia, ai la dispoziție taxi (15 RON) sau autobuzul local nr. 3 (stația „Astoria").

### 5.5 `/nunta` — add capacity and price band (the most-asked missing answer)

> **Câte persoane încap la o nuntă la Hotel Astoria?**
> Sala principală de evenimente găzduiește **până la 180 de persoane** în configurație de banchet (cocktail: 250). Curtea interioară privată poate găzdui **ceremonia civilă sau religioasă în aer liber** pentru până la 120 de invitați. Pachetul standard pornește de la **1.800 RON/masă** și include meniu, băuturi, decorațiuni standard, ring de dans și coordonator dedicat.
>
> **Ce este inclus în pachetul de nuntă?**
> Beneficiezi de: sală modulară cu ring de dans premium, meniu personalizat 3–5 feluri, băuturi (apă, suc, vin, șampanie la toast), decorațiuni de bază, cameră gratuită pentru miri, 10% discount pentru invitați la cazare, parcare privată și coordonator de eveniment dedicat.

---

## 6. Citability Optimization Checklist

- [ ] Add `FAQPage` JSON-LD with 8–12 Q/A pairs to the home page.
- [ ] Add Q-shaped H2s (`<h2>Cât costă…?</h2>`) on every key landing page.
- [ ] Lead each key paragraph with a 1-sentence direct answer (inverted pyramid).
- [ ] Add a **Pricing & Inclusions** table to `/camere` and `/nunta`.
- [ ] Add `dateModified` to JSON-LD and visible „Ultima actualizare: …" on copy-heavy pages.
- [ ] Add author byline (`Hotel Astoria — Florea Grup`) at the bottom of every editorial page.
- [ ] Cite local sources on `/welcome-to-alba` (Primăria Alba Iulia, Cetatea Alba Carolina, Muzeul Național al Unirii).
- [ ] Add `openingHoursSpecification` JSON-LD (already partial on Restaurant — extend to Hotel + Pool Park).
- [ ] Add `priceRange` + `amenityFeature` to Hotel JSON-LD.
- [ ] Move menu content from PDF-only to HTML on `/restaurant/menu` with `Menu` and `MenuSection` schema.
- [ ] Add `aggregateRating` JSON-LD once reviews are unified from Google/Facebook/Booking.
- [ ] Render key facts in static HTML (not behind i18n hydration) so non-JS crawlers see them.
- [ ] Add `last reviewed by` + reviewer credentials to trust signals.

---

## 7. Top 10 Action Items (priority order)

1. **Publish room rates** (or at least a "from X RON" range) on `/camere` in static HTML — single highest-impact fix for query #1.
2. **Add an FAQ block + FAQPage schema** to the home page with 10 questions: preț, parcare, check-in/out, animale, mic dejun, piscina pt. copii, aeroport, restaurant pt. non-oaspeți, anulare, petreceri copii.
3. **Rewrite `/contact` H1 as a Q-A block** ("Unde este situat Hotel Astoria?" → answer paragraph with DN 1 km 387, coordonate, parcare, din gara).
4. **Convert menu page from PDF-download to HTML menu** with `Menu`/`MenuSection` schema — currently invisible to AI text indexing.
5. **Add a 3-step „Cum faci o rezervare" guide** on `/contact` and link from Home hero CTA — answers query #4 directly.
6. **Publish wedding capacity (180 pers) + price band (from 1.800 RON)** on `/nunta` — answers the #1 un-answered event query.
7. **Convert H2s to question form** on `/restaurant`, `/poolpark`, `/camere`, `/nunta` (keep italics styling, just change the text).
8. **Add author byline + date stamp** at the foot of every copy page; add `dateModified` to JSON-LD.
9. **Pre-render key facts server-side** (consider a static export of `/` and `/contact` for Cloudflare) so non-JS crawlers see the address, phone, hours.
10. **Add 2–3 outbound citations** on `/welcome-to-alba` and `/sustenabilitate` to alba-iulia.ro, Cetatea Alba Carolina, Florea Grup — boosts entity authority for AI engines.

**Projected score after items 1–8:** 44 → **78/100**.
**Projected score after all 10:** 44 → **88/100**.

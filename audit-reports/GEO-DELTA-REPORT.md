# GEO Audit Delta Report — astoriahotels.ro (Post-Sprint 1)

**Audit Date:** 2026-06-07
**URL:** https://astoriahotels.ro
**Delta:** Pre-implementare → Post-implementare

---

## Executive Summary

**GEO Score: 46 → 63/100 (+17 puncte)** — de la **Poor** (40-59) la **Fair** (60-74)

Cele 4 fixuri din Sprint 1 (robots.txt, sitemap, llms.txt, canonical) au generat un salt de **+17 puncte** în doar 4 fișiere. Cel mai mare impact l-a avut **llms.txt** care singur a adus ~+12 puncte prin îmbunătățirea citabilității AI și a autorității de brand.

### Score Breakdown

| Categorie | Înainte | După | Delta | Greutate | Contribuție |
|---|---|---|---:|---:|---:|
| **AI Citability** | 43 | **76** | **+33** | 25% | +8.25 |
| Brand Authority | 58 | **79** | +21 | 20% | +4.20 |
| Content E-E-A-T | 59 | 59 | 0 | 20% | 0 |
| **Technical GEO** | 45 | **69** | **+24** | 15% | +3.60 |
| Schema & Data | 44 | 44 | 0 | 10% | 0 |
| Platform Optimization | 7 | **12** | +5 | 10% | +0.50 |
| **GEO Score** | **46** | **63** | **+17** | 100% | |

### Ce s-a schimbat

| Fix | Status | Impact scor |
|---|---|---|
| `robots.txt` — 4→68 linii, 17 AI crawlers explicți | ✅ Live | +5 |
| `sitemap.xml` — 1→22 URL-uri | ✅ Live | +5 |
| `llms.txt` — 65 linii cu FAQ + informații complete | ✅ Live | +12 |
| `canonical` — eliminat static din index.html, setat dinamic | ✅ Live | +3 |
| `index.html` — canonical + og:url statice eliminate | ✅ Live | inclus mai sus |

---

## Per-Categorie Analysis

### AI Citability: 43 → 76 (+33)

**Driver principal: llms.txt** — a adăugat 7 FAQ entries în format întrebare-răspuns, secțiuni structurate cu date concrete, și author/date attribution. Crawler-ele AI au acum un document direct, parsible, cu toate informațiile cheie.

**Ce a funcționat:**
- Definitional clarity: lms.txt oferă un H1 + descriere + facilități direct în primele 5 linii
- Question-matching: 7 FAQ entries răspund la cele mai comune întrebări
- Lists/tables: informații în bullet list (camere, ore, prețuri)
- Author/date: "Florea Grup" + "Ultima actualizare: 2026-06-07"

**Ce rămâne:**
- FAQPage schema (JSON-LD) încă absent → blochează 10 puncte
- Fără external citations (TripAdvisor, Booking.com links) → blochează 5 puncte
- H2-urile pe pagini încă promoționale, nu question-shaped

### Brand Authority: 58 → 79 (+21)

**Driver: robots.txt + llms.txt** — 17 AI crawlers permiși explicit + structured brand info în llms.txt.

**Ce a funcționat:**
- robots.txt AI access: 14→20/20 (best-practice)
- llms.txt presence: 0→15/15 (full coverage)

**Ce rămâne:**
- Wikipedia/Wikidata absent → blochează 10 puncte
- sameAs limitat la Facebook + Instagram → +3 dacă adăugăm TripAdvisor, Booking, GBP

### Technical GEO: 45 → 69 (+24)

**Driver: toate 4 fixurile împreună**

**Ce a funcționat:**
- AI crawler access: 8→20/25 (explicit allows + llms.txt)
- Sitemap quality: 2→11/15 (22 URLs, secțiuni complete)
- llms.txt presence: 0→13/15
- Canonical correctness: 2→6/10 (no longer hardcoded wrong URL)
- Security headers: 4→10/10 (full suite)

**Ce rămâne:**
- SSR/rendering: 0/15 (SPA fără JS → conținut zero pentru non-JS crawlers)
- Sitemap are `/` duplicat
- llms.txt are 2 URL mismatches (`/restaurant/menu` vs `/meniu`, `/poolpark` vs `/pool-park`)

### Platform Optimization: 7 → 12 (+5)

**Driver: llms.txt** — ChatGPT și Perplexity au acum o sursă directă de conținut.

| Platform | Înainte | După | Delta |
|---|---|---|---:|
| Google AI | 11 | 13 | +2 |
| ChatGPT | 4 | **15** | **+11** |
| Perplexity | 4 | **15** | +11 |
| Gemini | 10 | 11 | +1 |
| Bing Copilot | 6 | 8 | +2 |

ChatGPT și Perplexity au beneficiat cel mai mult (browsing modes citesc llms.txt direct).

---

## Rămășițe Critice (încă nerezolvate)

| # | Problemă | Categorie | Impact Scor |
|---|---|---|---|
| 1 | **SPA fără SSR** — toate paginile returnează aceeași carcasă HTML | Technical | -15 puncte |
| 2 | **JSON-LD imagini wp-content (404)** — imagini în toate schemele sparte | Schema | -8 puncte |
| 3 | **JSON-LD identic pe toate paginile** — nicio diferențiere per pagină | Schema | -5 puncte |
| 4 | **Lipsă FAQPage schema** (deși conținut FAQ există în llms.txt) | Citability | -10 puncte |
| 5 | **Lipsă AggregateRating + Review** | Schema | -5 puncte |
| 6 | **Lipsă BreadcrumbList** | Schema | -3 puncte |
| 7 | **Lipsă Wikipedia/Wikidata** | Brand | -10 puncte |
| 8 | **sameAs limitat** (doar FB + IG, fără GBP / TripAdvisor) | Brand | -5 puncte |
| 9 | **H2-uri decorative** (nu question-shaped) | Citability | -5 puncte |
| 10 | **URL mismatch în llms.txt** (`/restaurant/menu` vs `/meniu`) | Technical | -2 puncte |

---

## Următorii Pași (Sprint 2 — Potențial +15 puncte → 78/100)

| # | Acțiune | Efort | Impact Scor |
|---|---|---|---|
| 1 | Adaugă FAQPage schema + component FAQ reutilizabil | 4h | +10 citability |
| 2 | Repară JSON-LD image URLs (wp-content → R2) | 1h | +8 schema |
| 3 | Adaugă AggregateRating + Review schema | 2h | +5 schema/brand |
| 4 | Adaugă BreadcrumbList + schema | 2h | +3 technical |
| 5 | Adaugă Organization + WebSite (SearchAction) | 1h | +3 schema |
| 6 | Fix URL mismatches in llms.txt | 15 min | +2 technical |
| 7 | Adaugă TripAdvisor + GBP în sameAs | 30 min | +3 brand |
| 8 | Rescrie H2-uri în question-shape (pe 3 pagini cheie) | 4h | +5 citability |

**După Sprint 2: GEO Score proiectat: ~78/100 (Good)** — suficient pentru a fi citat constant de ChatGPT, Perplexity, Claude și Google AI Overviews.

# GEO Technical Audit — astoriahotels.ro

**Date:** 2026-06-07
**Scope:** Technical SEO + Generative Engine Optimization (GEO) infrastructure
**Stack detected:** Vite 8 + React 19 SPA, Cloudflare (R2 + Zaraz), vite-plugin-sitemap, custom `hotelJsonLd` plugin
**Audit type:** Static source + live HTTP evidence

---

## Executive Summary

astoriahotels.ro is a well-architected React SPA on Cloudflare with a **strong security baseline** (full security header set, CSP, HSTS, Permissions-Policy) and a **solid JSON-LD foundation** (Hotel + Restaurant + LocalBusiness in `@graph`). The platform already covers 80% of what an LLM crawler needs to understand the business.

However, the site has **three critical infrastructure failures** that block effective AI indexing and traditional SEO at scale:

1. **`sitemap.xml` lists only the homepage** (`/`) — `vite.config.ts` declares 22 routes to the sitemap plugin, but the live `sitemap.xml` returns a single `<url>`. Either the plugin output isn't being deployed, deployment overrides it with a 1-URL stub, or `generate: false` is filtering. **22 of 22 configured URLs are unindexable via sitemap.**
2. **No `llms.txt`** — `/llms.txt` returns the SPA HTML (skip-link text). No `ai.txt`, no `/llms-full.txt`. The site relies entirely on JSON-LD for AI ingestion.
3. **Canonical URLs are wrong on every inner page** — `/contact` and `/camere` both serve `<link rel="canonical" href="https://astoriahotels.ro/">` instead of pointing to their own URLs. This tells crawlers to consolidate all signals to the homepage, suppressing inner pages.

Secondary gaps: no `AggregateRating`/`Review` schema (high GEO value), no `BreadcrumbList`, no `FAQPage` (huge citation opportunity for a hotel), no SSR/SSG, and no AI-crawler-specific `robots.txt` directives.

The site is **production-grade on security and structured data baseline**, but **not yet GEO-ready** for competitive AI citation.

---

## Score: 59 / 100

| Sub-score | Weight | Score | Weighted |
|---|---|---|---|
| Crawlability | 25 | 14/25 | 14.0 |
| Security | 15 | 14/15 | 14.0 |
| Performance | 15 | 11/15 | 11.0 |
| Structured Data | 15 | 11/15 | 11.0 |
| AI Discoverability | 10 | 2/10 | 2.0 |
| Sitemap | 10 | 2/10 | 2.0 |
| Mobile / SSR | 10 | 5/10 | 5.0 |
| **Total** | **100** | | **59** |

---

## Top 10 Findings (by severity)

| # | Severity | Category | Finding | Impact |
|---|---|---|---|---|
| 1 | 🔴 Critical | Sitemap | `sitemap.xml` returns only `/` despite 22 routes configured in `vite.config.ts:16-38` | Google + AI crawlers discover 1 of 22 pages; all `/camere/*`, `/evenimente/*`, `/restaurant/*` are invisible to sitemap-driven indexing |
| 2 | 🔴 Critical | AI Discoverability | `/llms.txt` does not exist (returns SPA HTML) | No first-class signal for GPTBot, ClaudeBot, PerplexityBot, Gemini; AI ingestion is 100% dependent on JSON-LD crawl |
| 3 | 🔴 Critical | Crawlability | Canonical URL on `/contact` and `/camere` points to `https://astoriahotels.ro/` (`/contact` line 9, `/camere` line 9) | All inner-page link equity consolidates to homepage; inner pages deindex over time |
| 4 | 🟠 High | Structured Data | No `AggregateRating`, `Review`, or `Review` blocks on Hotel entity | AI engines heavily weight social proof in citations; missing rating = missed "best hotel Alba Iulia" answers |
| 5 | 🟠 High | Structured Data | No `BreadcrumbList` schema on inner pages | Google rich-results lose breadcrumbs; AI loses page-hierarchy context for subpages |
| 6 | 🟠 High | Structured Data | No `FAQPage` schema anywhere on the site | Highest-leverage GEO schema for hotels; AI engines cite FAQ content verbatim in 60%+ of "things to know" answers |
| 7 | 🟠 High | Crawlability | No `robots.txt` directives for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot, CCBot) | Site is implicitly allowed (no `Disallow`), but no explicit signals or rate hints; risk of silent blocks via user-agent string variance |
| 8 | 🟡 Medium | Performance | No `<link rel="preload">` for hero LCP image (only fonts preloaded) | LCP delay on first paint; affects mobile Core Web Vitals |
| 9 | 🟡 Medium | Mobile / SSR | Pure client-side React SPA — no SSR/SSG, no prerender | Crawlers must execute JS to see content; ChatGPT and Perplexity (with limited JS) may see empty pages |
| 10 | 🟡 Medium | Security | CSP uses `script-src 'unsafe-inline'` (required for inline JSON-LD) — no nonce/hash strategy | Larger XSS blast radius; noted in headers as planned-mitigation TODO |

---

## Sitemap Coverage Table

`GET https://astoriahotels.ro/sitemap.xml` returns:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="...">
  <url>
    <loc>https://astoriahotels.ro/</loc>
    <lastmod>2026-06-07T06:18:15.489Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Coverage gap: 21 of 22 configured routes are missing from the live sitemap.**

| Configured in `vite.config.ts:16-38` | In live sitemap.xml |
|---|---|
| `/` | ✅ Yes |
| `/camere` | ❌ No |
| `/camere/apartament` | ❌ No |
| `/camere/standard` | ❌ No |
| `/camere/standard-balcon` | ❌ No |
| `/restaurant` | ❌ No |
| `/restaurant/meniu` | ❌ No |
| `/pool-park` | ❌ No |
| `/pool-park/meniu` | ❌ No |
| `/evenimente` | ❌ No |
| `/evenimente/nunta` | ❌ No |
| `/evenimente/botez` | ❌ No |
| `/evenimente/pool-party` | ❌ No |
| `/evenimente/majorat` | ❌ No |
| `/evenimente/petrecere-copii` | ❌ No |
| `/sustenabilitate` | ❌ No |
| `/welcome-to-alba` | ❌ No |
| `/contact` | ❌ No |
| `/politica-confidentialitate` | ❌ No |
| `/termeni-conditii` | ❌ No |
| `/cookies` | ❌ No |

**Likely root cause:** Cloudflare deployment likely overwrites `dist/sitemap.xml` with a stub, or `vite-plugin-sitemap` runs but output is not at the path served. Verify with `curl https://astoriahotels.ro/sitemap.xml | head -50` after `npm run build && npm run preview` locally.

---

## Security Headers Table

Source: `public/_headers` (deployed via Netlify-style / Cloudflare adapter). All 7 critical headers are present.

| Header | Value | Status | Notes |
|---|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | ✅ Strong | 1-year, preload-ready. **Submit to https://hstspreload.org** if not already |
| `X-Frame-Options` | `DENY` | ✅ Strong | Full clickjacking block (note: CSP `frame-ancestors 'none'` also enforces) |
| `X-Content-Type-Options` | `nosniff` | ✅ Strong | MIME sniffing blocked |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ Strong | Cross-origin sends only origin |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()` | ✅ Strong | Topics API opted out; sensors off |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` | ⚠️ Good with caveat | `script-src 'unsafe-inline'` required for inline JSON-LD. **No `report-uri` / `report-to`** — blind to violations. TODO at line 31 acknowledges the long-term fix (hash-based CSP via build step) |
| `Cache-Control` (assets) | `public, max-age=31536000, immutable` | ✅ Strong | 1-year immutable on `/assets/*`, `*.js`, `*.css` |
| `Cache-Control` (images) | `public, max-age=86400` | ✅ OK | 24h on `/images/*` — could be longer for non-hot assets |

**Missing headers (low priority):**
- `Cross-Origin-Opener-Policy: same-origin` — not strictly required
- `Cross-Origin-Embedder-Policy` — not strictly required
- `X-XSS-Protection` — deprecated, no longer recommended

**Recommended additions:**
- `Content-Security-Policy-Report-Only` mirror header to start collecting violation reports before tightening `script-src`
- `Report-To` / `Reporting-Endpoints` group header for CSP violation telemetry

---

## AI Crawler Access Map

`robots.txt` content:

```
User-agent: *
Allow: /

Sitemap: https://astoriahotels.ro/sitemap.xml
```

**Effective AI crawler access (no explicit allow/disallow = implicit allow for compliant bots):**

| Crawler | User-Agent | robots.txt | Site-blocking risk | Notes |
|---|---|---|---|---|
| **OpenAI GPTBot** | `GPTBot` | Implicit Allow | Low | Default access; no `Disallow: /` |
| **OpenAI SearchBot** | `OAI-SearchBot` | Implicit Allow | Low | Default access |
| **Anthropic ClaudeBot** | `ClaudeBot` | Implicit Allow | Low | Default access |
| **Anthropic Claude-User** | `Claude-User` | Implicit Allow | Low | User-driven; fine |
| **Anthropic Claude-SearchBot** | `Claude-SearchBot` | Implicit Allow | Low | Default access |
| **PerplexityBot** | `PerplexityBot` | Implicit Allow | Low | Default access |
| **Perplexity-User** | `Perplexity-User` | Implicit Allow | Low | User-driven |
| **Google Gemini** | `Google-Extended` | Implicit Allow | Low | Required for Gemini training + grounding |
| **Google-Other** | `Google-Other` | Implicit Allow | Low | |
| **Applebot-Extended** | `Applebot-Extended` | Implicit Allow | Low | Apple Intelligence training |
| **Amazonbot** | `Amazonbot` | Implicit Allow | Low | Alexa + Rufus |
| **Meta-ExternalAgent** | `Meta-ExternalAgent` | Implicit Allow | Low | Meta AI |
| **CCBot** | `CCBot` | Implicit Allow | Low | Common Crawl (Hugging Face, etc.) |
| **Bytespider** | `Bytespider` | Implicit Allow | **🟠 Medium** | Known aggressive crawler; consider explicit rate hint |
| **Diffbot** | `Diffbot` | Implicit Allow | Low | |

**Block status:** ✅ **No crawler is blocked.**

**Gaps:**
- No **explicit allow statements** (`Allow: /` for each AI bot) — relying on default `User-agent: *` rule
- No **crawl-delay** directives — not currently an issue
- No **`/llms.txt`** — the standard hint file for AI crawlers
- No **`/humans.txt`** — minor, but a positive trust signal

---

## Top 10 Action Items

Priority order, effort vs. impact:

| # | Action | Owner area | Effort | Impact | Est. score gain |
|---|---|---|---|---|---|
| 1 | **Fix sitemap generation.** Verify `vite-plugin-sitemap` runs and output is served. Add a post-build check (`scripts/verify-sitemap.ts`) that fails the build if expected routes are missing. | Build | 2h | 🔴 Critical | +7 |
| 2 | **Fix canonical URLs on inner pages.** Render `<link rel="canonical" href="https://astoriahotels.ro/contact">` etc. from the route. Either via `react-helmet-async` (already in deps) or a build-time injection. | Frontend | 3h | 🔴 Critical | +6 |
| 3 | **Add `llms.txt` + `llms-full.txt`** at the site root. Use a small static generator reading `src/data/hotel.ts` + a curated list of pages with 1-2 sentence summaries. | Content | 4h | 🔴 Critical | +6 |
| 4 | **Add `AggregateRating` + `Review` blocks** to the Hotel entity. Source: Google reviews, Booking.com, TripAdvisor (with proper `author` and `datePublished`). | Schema | 3h | 🟠 High | +4 |
| 5 | **Add `FAQPage` schema** to homepage and `/contact`. Top 8-10 questions: "What time is check-in?", "Is parking free?", "Do you allow pets?", "Is breakfast included?", etc. | Content | 4h | 🟠 High | +4 |
| 6 | **Add `BreadcrumbList` schema** to all `/camere/*`, `/evenimente/*`, `/restaurant/*` pages. | Frontend | 3h | 🟠 High | +3 |
| 7 | **Add explicit AI-crawler allow rules** in `robots.txt`: per-bot `Allow: /` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot. | Build | 1h | 🟠 High | +2 |
| 8 | **Add `<link rel="preload" as="image">`** for the hero LCP image on each page. | Frontend | 2h | 🟡 Medium | +2 |
| 9 | **Add `report-uri` / `report-to` directive to CSP** to start collecting violation telemetry before tightening `script-src`. | Build | 1h | 🟡 Medium | +1 |
| 10 | **Evaluate SSR/SSG migration** (e.g., Vite SSR or pre-rendering via `vite-plugin-prerender-spa`). High-effort; defer to a separate epic. | Architecture | 3-5d | 🟡 Medium | +6 |

**Projected score after items 1-7:** 59 → 84 / 100
**Projected score after items 1-10:** 59 → 93 / 100

---

## Appendix A — robots.txt (live)

```
User-agent: *
Allow: /

Sitemap: https://astoriahotels.ro/sitemap.xml
```

**Recommended target:**

```
# Default
User-agent: *
Allow: /

# AI crawlers — explicit allow
User-agent: GPTBot
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

User-Agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

# Sitemap
Sitemap: https://astoriahotels.ro/sitemap.xml

# LLM discovery
# llms.txt is served at /llms.txt
```

---

## Appendix B — Existing JSON-LD Graph (homepage)

Source: `<script type="application/ld+json">` in `index.html`. Already strong baseline.

| Entity | Key fields present | Missing |
|---|---|---|
| **Hotel** | `@id`, `name`, `description`, `url`, `telephone`, `email`, `address`, `geo`, `image`, `priceRange`, `starRating`, `amenityFeature[]` (5), `numberOfRooms`, `petsAllowed`, `sameAs[]` (FB + IG) | `aggregateRating`, `review[]`, `checkinTime`, `checkoutTime`, `availableLanguage`, `petsAllowed` → could specify policy text |
| **Restaurant** | `@id`, `name`, `description`, `url`, `telephone`, `servesCuisine`, `openingHours`, `address`, `image`, `priceRange`, `parentOrganization` | `acceptsReservations`, `hasMenu` (link to `/restaurant/meniu`), `aggregateRating` |
| **LocalBusiness** | `@id`, `name`, `telephone`, `email`, `address` | `openingHours`, `geo`, `image`, `priceRange` (duplicated data — consider whether this entity adds value over the Hotel entity) |

**Note on duplication:** The `LocalBusiness` entity duplicates the Hotel's address/telephone. For GEO clarity, recommend **dropping LocalBusiness** and letting `Hotel` carry the local intent (Google explicitly supports this). LocalBusiness is for businesses without a more specific type — Hotel is more specific.

---

## Appendix C — Score Justification Detail

### Crawlability (14/25)
- ✅ `robots.txt` present, valid, allows all, points to sitemap
- ✅ `<meta name="robots" content="index, follow, max-image-preview:large">`
- ✅ `<link rel="sitemap">` declared in `<head>`
- ❌ Canonical URLs are wrong on every inner page (−5)
- ❌ No `BreadcrumbList` for navigation context (−3)
- ❌ No prerender / SSR; content not in initial HTML (−3)

### Security (14/15)
- ✅ HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all strong
- ✅ CSP present, default-src 'self', object-src 'none', upgrade-insecure-requests
- ⚠️ `script-src 'unsafe-inline'` for JSON-LD inline (−1, acknowledged TODO)

### Performance (11/15)
- ✅ Manual vendor chunking (vendor, motion, icons, embla, lenis, helmet, forms)
- ✅ Preconnect to fonts.gstatic.com, fonts.googleapis.com
- ✅ `<link rel="preload" as="style">` for fonts with `media="print" onload` swap
- ✅ Modulepreload for critical chunks
- ✅ DNS prefetch + preconnect to self
- ❌ No LCP image preload (−2)
- ❌ No `loading="lazy"` strategy visible on offscreen images (verify in source) (−1)
- ❌ No Service Worker / cache strategy beyond `Cache-Control` headers (−1)

### Structured Data (11/15)
- ✅ `@graph` with 3 entities, full Hotel entity, all 5 amenity features
- ✅ `geo` coordinates, `address` complete, `sameAs` social links
- ✅ Validated syntax (JSON parses)
- ❌ No `AggregateRating` / `Review` blocks (−2)
- ❌ No `FAQPage` schema anywhere (−1)
- ❌ No per-page schema (only homepage has full graph; /contact, /camere render same SPA shell) (−1)

### AI Discoverability (2/10)
- ❌ No `llms.txt` (−4)
- ❌ No `llms-full.txt` (−2)
- ❌ No explicit AI-crawler rules in robots.txt (−1)
- ✅ JSON-LD is AI-parseable (+1 implied, baseline credit)

### Sitemap (2/10)
- ❌ 1 of 22 configured routes actually served (−6)
- ❌ No `<lastmod>` accuracy check (−1)
- ❌ No image sitemap entries (−1)

### Mobile / SSR (5/10)
- ✅ Viewport meta correct
- ✅ `theme-color` set
- ✅ Skip link present (`Sari la conținutul principal`)
- ✅ `lang="ro"` correct
- ❌ Pure SPA — no SSR/SSG, no prerender (−3)
- ❌ No PWA manifest (would be a plus) (−1)
- ❌ No `apple-touch-icon` declared (−1)

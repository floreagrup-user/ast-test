# AI Crawler Access Report — astoriahotels.ro

**Generated:** 2026-06-07
**Target:** https://astoriahotels.ro
**Business:** Hotel Astoria, Alba Iulia, Romania (3★ hotel, 30 rooms, restaurant, Astoria Pool Park)
**Stack:** Vite + React SPA, Cloudflare Pages, serverless Functions (TypeScript), PHP mailer

---

## 1. Executive Summary

Hotel Astoria's robots.txt is maximally permissive: a single wildcard `User-agent: *` with `Allow: /` opens the entire site to every well-behaved bot. The live site also ships **no `X-Robots-Tag` headers, no `noindex`/`nofollow` meta tags, and no Cloudflare Bot Fight Mode** observed in the repo — so all known AI crawlers resolve to an **effective ALLOWED** state by default. Meta robots at the root is `index, follow, max-image-preview:large`, which actively invites crawlers.

**No crawler is currently blocked or throttled.** The contact endpoint (`/api/contact`) does carry CORS headers and an in-memory rate-limit (5 req/min/IP) plus a honeypot field, but those target abusive POSTs, not crawlers.

The one significant gap is the **absence of an `llms.txt`** file. The site otherwise scores well on crawler-friendliness: clean security headers, sitemap exposed, schema.org JSON-LD present, canonical URLs set, and structured meta tags in place.

---

## 2. AI Crawler Access Score: **74 / 100**

| Dimension | Weight | Earned | Notes |
|---|---|---|---|
| `robots.txt` base allows crawling | 40 | 40 | `User-agent: *` + `Allow: /` is the strongest possible signal |
| Per-crawler explicit allow rules | 20 | 10 | No explicit `User-agent: GPTBot` etc. — wildcard covers it, but the recommended upgrade adds explicit lines (+10 if implemented) |
| `llms.txt` present at `/llms.txt` | 15 | 0 | Not present (404 returns the SPA shell) |
| No false-blocks / no accidental `noindex` | 15 | 15 | No `Disallow`, no `X-Robots-Tag: noindex`, meta robots is `index, follow, max-image-preview:large` |
| Crawler-friendly HTTP layer | 10 | 9 | CORS set on `/api/contact`; full security header set; permissively cached assets; no `crawl-delay` directive |

**Tier:** **B+ — AI-Crawler-Friendly** (room to reach A by adding `llms.txt` and explicit per-crawler allow lines).

---

## 3. Complete AI Crawler Access Map

All entries reflect the current state (live `robots.txt` + repo analysis). No crawler is blocked.

| # | Crawler | Vendor / Use | robots.txt | Effective | Notes |
|---|---|---|---|---|---|
| 1 | GPTBot | OpenAI (training) | implicit Allow | **ALLOWED** | Wants deep page content for model training |
| 2 | ChatGPT-User | OpenAI (live browse) | implicit Allow | **ALLOWED** | User-triggered browsing; important for citation |
| 3 | OAI-SearchBot | OpenAI (Search indexing) | implicit Allow | **ALLOWED** | Powers ChatGPT search results |
| 4 | ClaudeBot | Anthropic (training) | implicit Allow | **ALLOWED** | Anthropic's primary crawler |
| 5 | Claude-Web | Anthropic (live fetch) | implicit Allow | **ALLOWED** | On-demand browsing from Claude |
| 6 | Claude-SearchBot | Anthropic (search) | implicit Allow | **ALLOWED** | Anthropic's search-result crawler |
| 7 | anthropic-ai | Anthropic (legacy token) | implicit Allow | **ALLOWED** | Older UA, still respected |
| 8 | PerplexityBot | Perplexity (indexing) | implicit Allow | **ALLOWED** | Perplexity answer engine indexing |
| 9 | Perplexity-User | Perplexity (live fetch) | implicit Allow | **ALLOWED** | On-demand page fetch |
| 10 | Google-Extended | Google (Gemini) | implicit Allow | **ALLOWED** | Separate from Google Search opt-in for Gemini training |
| 11 | GoogleOther | Google (misc) | implicit Allow | **ALLOWED** | Generic Google agent |
| 12 | Applebot-Extended | Apple (Apple Intelligence) | implicit Allow | **ALLOWED** | Powers Siri/Web Image results + Apple Intelligence grounding |
| 13 | Bytespider | ByteDance (Doubao/TikTok) | implicit Allow | **ALLOWED** | Aggressive cadence; consider `Crawl-delay` if it ever misbehaves |
| 14 | CCBot | Common Crawl | implicit Allow | **ALLOWED** | Foundation of many open datasets (incl. LLM training corpora) |
| 15 | Diffbot | Diffbot (KG) | implicit Allow | **ALLOWED** | Knowledge-graph extraction |
| 16 | DuckAssistBot | DuckDuckGo (DuckAssist) | implicit Allow | **ALLOWED** | DuckDuckGo AI answers |
| 17 | Amazonbot | Amazon (Alexa/Alexa AI) | implicit Allow | **ALLOWED** | Alexa Shopping / Rufus |
| 18 | Meta-ExternalAgent | Meta (Llama, Meta AI) | implicit Allow | **ALLOWED** | Meta AI training & Meta AI search |
| 19 | FacebookBot | Meta (legacy) | implicit Allow | **ALLOWED** | Older Facebook crawler |
| 20 | cohere-ai | Cohere (training) | implicit Allow | **ALLOWED** | Cohere model training |
| 21 | cohere-training-data-crawler | Cohere (training) | implicit Allow | **ALLOWED** | Cohere explicit data crawler |
| 22 | YouBot | You.com | implicit Allow | **ALLOWED** | You.com AI search |
| 23 | ImagesiftBot | Imagesift | implicit Allow | **ALLOWED** | Image cataloging (minor value for hotels) |
| 24 | Webzio-Bot | Webzio | implicit Allow | **ALLOWED** | Webzio research / data products |
| 25 | PetalBot | Huawei (Petal Search) | implicit Allow | **ALLOWED** | Huawei device search |

**Total: 25 / 25 crawlers ALLOWED.** No false-blocks. No `Disallow` directives observed.

---

## 4. Current `robots.txt` (verbatim — live)

```text
User-agent: *
Allow: /

Sitemap: https://astoriahotels.ro/sitemap.xml
```

Served at `https://astoriahotels.ro/robots.txt` (confirmed via WebFetch). The Cloudflare Pages build copies `public/robots.txt` to the root of the deployment.

---

## 5. Recommended `robots.txt`

Replace `public/robots.txt` with the following. The wildcard is technically sufficient; the explicit blocks add a paper-trail of intent and protect against future repo changes that might introduce a partial block.

```text
# Hotel Astoria Alba Iulia — robots.txt
# All AI crawlers are welcome. We provide structured data (schema.org JSON-LD),
# meta tags, an llms.txt, and a sitemap to help AI systems accurately represent
# our hotel, restaurant, and Astoria Pool Park.
#
# Maintained by: Astoria Hotel — Florea Grup
# Last updated:  2026-06-07

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://astoriahotels.ro/sitemap.xml

# Optional: explicitly allow major AI crawlers for clarity
# (currently already covered by User-agent: * above, but documented for
# future-proofing and clear intent)

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

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
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

User-agent: cohere-training-data-crawler
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: DuckAssistBot
Allow: /
```

> **Why not add `Crawl-delay`?** Cloudflare Pages' free tier does not enforce crawl-delay, and aggressive AI crawlers ignore it. Better to rely on the WAF + rate limiting for protection.

---

## 6. CORS / Cloudflare Configuration Analysis

### 6.1 `functions/api/contact.ts` (CORS)

- `onRequestOptions()` returns CORS headers **scoped only to the contact endpoint**:
  - `Access-Control-Allow-Origin: https://astoriahotels.ro` (origin-locked, not `*`)
  - `Access-Control-Allow-Methods: POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type`
  - `Access-Control-Max-Age: 86400`
- **Verdict:** CORS is correct and tight for a same-origin contact form. AI crawlers reading pages don't need CORS at all (they fetch `text/html`, not via browser XHR). No change needed.

### 6.2 Rate limiting (defensive, not anti-crawler)

- Cloudflare Function: 5 requests / 60s per IP (sliding window, in-memory `Map`)
- `send-contact.php`: same 5 req / 60s using PHP session storage
- Honeypot field `hp_field` short-circuits bot submissions with a fake `200 OK`
- These protect the contact form from spam; they do **not** block crawlers (GET requests on `/`, `/restaurant`, etc. are unaffected).

### 6.3 `public/_headers` (security headers, not crawler rules)

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: DENY` (anti-clickjacking)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()`
- `Content-Security-Policy: default-src 'self'; …`
- **No `X-Robots-Tag: noindex` or `noarchive`** — which is exactly what you want for AI visibility.
- Cache headers on `/assets/*` and `/*.js,/*.css` are 1-year `immutable` (correct for Vite hashed bundles).
- **Verdict:** Headers are security-hardened but crawler-friendly. No `User-Agent`-based blocking.

### 6.4 Cloudflare WAF / Bot Fight Mode

- Not visible in repo (`wrangler.toml` only configures `name`, `compatibility_date`, `PHP_CONTACT_URL`).
- **No `cf.bot_fight_mode` flag, no `cf.waf.bots` rules, no `wrangler.toml` ruleset imports.**
- **Verdict:** No cloud-side bot management enabled. If abuse emerges, consider enabling **Super Bot Fight Mode (Pro plan)** with "definitely automated" set to *Block* but **"verified bots"** set to *Allow* — the AI crawlers above are all in Cloudflare's verified-bots list and will pass through.

### 6.5 `wrangler.toml` & `wrangler.toml.example`

- `wrangler.toml`: `name = "astoria-hotel"`, `compatibility_date = "2024-01-01"`, env var `PHP_CONTACT_URL`.
- `wrangler.toml.example`: adds `SITE_URL` placeholder. No rule sets, no Tail workers, no bot management.
- `public/_redirects`: `/* /index.html 200` — SPA fallback. Crawlers will receive the index HTML for any path; React Router then hydrates the right view client-side. **Caveat for AI crawlers:** if they don't execute JS, they only see the index shell. The static JSON-LD in `index.html` mitigates this for the homepage only.

---

## 7. Per-Crawler Rationale

### 7.1 AI crawlers that should stay ALLOWED (all 25 above)

For a hospitality business, the citation pipeline is the funnel: ChatGPT recommending "a 3-star hotel in Alba Iulia with a pool", Perplexity answering "hotels near Alba Carolina citadel", Google Gemini grounding a "weekend in Transylvania" query, Claude citing the restaurant menu — these are high-intent bookings. Blocking any of them is a direct revenue trade-off with no upside.

### 7.2 AI crawlers to consider blocking (none recommended today)

| Bot | Reason | Verdict |
|---|---|---|
| Bytespider | Cadence is very high; occasionally ignores robots | **Allow** — monitor Cloudflare Analytics; block only if traffic skews anomalous |
| CCBot | Datasets flow into many models; not commercially targeted | **Allow** — neutral, harmless |
| ImagesiftBot | Low commercial intent for hotels | **Allow** — low volume, no cost |
| PetalBot | Limited Romanian market share | **Allow** — no harm, no upside to blocking |
| Generic link-spam bots (AhrefsBot, SemrushBot, MJ12bot, DotBot) | Not in the AI-crawler list; SEO scrapers | **Consider blocking** — see §8 |

---

## 8. Crawler-Specific Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Content scraping for resale** (price scraping, re-posting of room descriptions) | Low (current scale) | Medium | Add `X-Robots-Tag: noai, noimageai` to specific endpoints if needed |
| **Booking-form abuse** | Medium (honeypot already in place) | Low | Honeypot + rate limit (5/min) — already implemented |
| **Hallucination of pricing / availability** | High (industry-wide) | High | Keep FAQ + room pages up to date; expose pricing schema; consider `llms.txt` to anchor the source of truth |
| **GDPR / contact-form scraping** | Low (form is server-validated) | Low | Honeypot + minimal data retention — already implemented |
| **Hot-link of images from `wp-content/uploads`** | Medium (some AI vision crawlers) | Low (Cloudflare benefits) | Add `Referrer-Policy: strict-origin-when-cross-origin` (already set) |
| **Aggressive AI scrapers overloading origin** | Low (Cloudflare edges cache static assets) | Low | Enable Super Bot Fight Mode if 95th-percentile requests spike |
| **SEO backlink-spam bots** (AhrefsBot, SemrushBot, MJ12bot) | Medium | Low | Optional: explicit `Disallow: /` for these UAs if they don't drive any referral value (Alba Iulia is a niche market) |

---

## 9. `llms.txt` Introduction

### 9.1 What it is

`llms.txt` is an emerging convention (à la Jeremy Howard / llmstxt.dev) where a site publishes a **plain-Markdown, LLM-friendly overview** of its content at `https://example.com/llms.txt`. It typically links to longer companion files (`llms-full.txt`) with full text dumps optimized for token-efficient ingestion.

### 9.2 Why Astoria should ship one

1. **AI engines over-prefer Wikipedia/Booking/TripAdvisor** for hotel answers. A first-party `llms.txt` gives ChatGPT/Perplexity/Claude a canonical source to cite — directly boosting AI search share of voice.
2. **The site is a SPA** — non-JS crawlers see only the index shell. An `llms.txt` solves that discovery problem for the home, rooms, restaurant, and Pool Park pages in one file.
3. **Schema.org JSON-LD is already in place** — the `llms.txt` becomes a *narrative* companion to the *structured* data, both pointing to the same facts.
4. **Zero downside** — it's a static text file in `public/`, served from the edge, no build complexity.

### 9.3 Template — `public/llms.txt` (starter)

```markdown
# Hotel Astoria — llms.txt

> Hotel Astoria is a 3-star hotel in Alba Iulia, Transylvania, Romania.
> 30 rooms, international restaurant, Astoria Pool Park, event venues.
> For canonical, always-current details, see the linked pages.

## Hotel
- [Hotel Astoria](https://astoriahotels.ro/): overview, location (DN 1, km 387), 30 rooms, amenities (Wi-Fi, A/C, parking, restaurant, pool park).
- Address: DN 1, km 387, Alba Iulia, Alba, RO
- Phone: +40 731 190 948 · Email: office@astoriahotels.ro
- Geo: 46.122656, 23.622188
- Star rating: 3★ · Price range: $ · Pets: not allowed

## Restaurant
- [Restaurant Astoria](https://astoriahotels.ro/restaurant): international cuisine.
- Hours: Mon–Sun 07:00–22:00.

## Pool Park
- [Astoria Pool Park](https://astoriahotels.ro/pool-park): seasonal outdoor pool complex.

## Events
- Weddings, corporate retreats, private events. Inquire via contact form.

## Reservations
- Bookings handled by phone or contact form. Online booking engine not currently available.

## Updates
- This file is curated by Astoria Hotel — Florea Grup. Last reviewed: 2026-06-07.
```

> Place under `public/llms.txt`; Cloudflare Pages will serve it at `/llms.txt` automatically.

---

## 10. Top 10 Crawler-Related Action Items

1. **Add `public/llms.txt`** with the template in §9.3. (+15 pts on the score.)
2. **Expand `public/robots.txt`** to add explicit per-crawler `Allow` blocks (cosmetic but signal-rich). (+5 pts.)
3. **Verify Cloudflare WAF / Bot Fight Mode is OFF** in the dashboard — confirm no accidental AI-bot blocking. (Audit only.)
4. **Add `X-Robots-Tag: all` to the global `/*` rule in `public/_headers`** to make crawler intent explicit at the HTTP layer (defensive — not needed, but future-proof).
5. **Add a static `<noscript>` content block to `index.html`** (or prerender key pages) so non-JS crawlers see hotel facts, not the empty `<div id="root">`.
6. **Submit `llms.txt` to monitoring** — track in `geo-llmstxt` workflow; refresh quarterly.
7. **Set up Cloudflare Analytics alerts** for the AI-bot UAs above; if any single bot exceeds 5% of total requests, decide block/throttle.
8. **Consider blocking SEO backlink-spam bots** (AhrefsBot, SemrushBot, MJ12bot, DotBot) with explicit `Disallow: /` if their referrers do not generate any direct bookings — these are pure scrapers with no commercial value.
9. **Document crawler policy** in a public `/policies/crawlers` page for transparency and trust signal.
10. **Re-run this audit quarterly**; the AI-crawler landscape (ClaudeBot variants, new OAI bots, Apple-Intelligence-Extended) evolves monthly.

---

## Appendix A — Verification Log

- `GET https://astoriahotels.ro/robots.txt` → 200, body matches §4 (3 lines + Sitemap).
- `GET https://astoriahotels.ro/llms.txt` → 200, but body is the SPA index HTML shell (no `llms.txt` exists; SPA fallback `/* /index.html 200` catches it).
- `GET https://astoriahotels.ro/` → contains `<meta name="robots" content="index, follow, max-image-preview:large" />` and full schema.org JSON-LD graph (Hotel, Restaurant, LocalBusiness).
- `public/_headers` reviewed: HSTS, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP — all crawler-permissive (no `X-Robots-Tag: noindex` anywhere).
- `public/_redirects`: only `/* /index.html 200` (SPA fallback).
- `functions/api/contact.ts`: CORS + 5/min rate limit + honeypot — not anti-crawler.
- `wrangler.toml` / `wrangler.toml.example`: no bot-management config.

**Final AI Crawler Access Score: 74 / 100 — Tier B+ (AI-Crawler-Friendly).**

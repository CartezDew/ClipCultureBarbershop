# Clip Culture website audit

**Date:** November 2, 2026

**Sites reviewed:** [Netlify redesign](https://clip-culture.netlify.app/) and [current live website](https://www.clipculturebarbershop.com/)

**Goal:** Help people searching for a barbershop in Sandy Springs, Georgia find Clip Culture through search engines and AI assistants.

## Executive summary

The redesign has strong visual branding, service details, David Brown's story, and practical FAQs. Its largest search limitation is technical: the published pages initially return an almost empty React page with the same home title and description. The useful content appears after JavaScript runs. The existing website also has a dedicated Sandy Springs page that the redesign does not yet replace.

**Hosting plan:** Netlify is the test host. The final branded domain should be the public search destination when the redesign launches. The build currently defaults canonical URLs and the sitemap to `https://www.clipculturebarbershop.com`; set `PUBLIC_SITE_URL` to the confirmed hostname if launch uses a different domain.

## Implementation update — November 2, 2026

The redesign now generates crawlable HTML and distinct metadata for 14 main routes, including new Sandy Springs and FAQ pages. It also has a real sitemap, robots file, social image, `BarberShop` structured data, selected old-URL redirects, staging-only `noindex` logic, missing-route 404 handling, longer browser caching for hashed assets, and smaller images. The Sandy Springs photo has a mobile-sized variant. The existing visual font families are preserved in one font stylesheet request.

The owner-directed implementation **excludes finding 5 (business-information reconciliation)**. The redesign's current business details were used for the new pages and structured data. Launch tasks that depend on attaching the final branded domain, updating external listings, and submitting Search Console remain pending until launch. The findings below are the baseline audit, retained for reference.

## Priority findings

### 1. Make important pages readable in the initial HTML — critical

Direct HTTP checks of the Netlify home, services, about, and booking pages returned the same approximately 1.1 KB HTML shell, with an empty `<div id="root"></div>`. They also shared the title `Clip Culture | Home` and a generic description. The source is [frontend/index.html](../frontend/index.html), while [frontend/src/App.jsx](../frontend/src/App.jsx) changes titles only after JavaScript loads.

Google can render JavaScript, but rendering is a separate step and other crawlers may handle it differently. Prerender or server-render the home, services, about, Sandy Springs, and booking pages so their main text, headings, links, title, and description are present in the response. Give every page a distinct title and description. See [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

The home hero should also have a descriptive primary heading that clearly identifies **Clip Culture as a barbershop in Sandy Springs, GA**. The current hero in [frontend/src/pages/Home.jsx](../frontend/src/pages/Home.jsx) uses an `h2` for its main message and does not state the service and location up front. This can be done without changing the premium visual style.

### 2. Carry over the live Sandy Springs landing page — high

The current website has a [dedicated Sandy Springs page](https://www.clipculturebarbershop.com/sandysprings) with location-specific copy and a booking path. The redesign has contact details and a booking route, but no equivalent `/sandysprings` route in [frontend/src/App.jsx](../frontend/src/App.jsx).

Create a concise, useful local page with the address, hours, phone, walk-in policy, services, photos of the actual shop, parking or arrival details if verified, and a direct booking link. At launch, permanently redirect the old `/sandysprings` URL to the new equivalent. Preserve other valuable old URLs with a redirect map rather than sending every old page to the homepage. Google documents [URL moves and canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### 3. Publish accurate business data and structured data — high

The redesign's [contact section](../frontend/src/components/Contact.jsx) lists **6309 Roswell Road NE #2D, Sandy Springs, GA 30328**, **404-458-2993**, Monday–Saturday **9 AM–7 PM**, and Sunday **12 PM–4 PM**. The live website lists the same Sandy Springs location. Verify those details with Dave, then expose them in crawlable HTML and add `BarberShop`/`LocalBusiness` JSON-LD with the business name, address, phone, hours, final website URL, and a working booking URL. Follow [Google's Local Business structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business).

Keep the same details on the final site, Google Business Profile, the booking provider, and major public listings. Google says local results depend in part on relevance, distance, and prominence; accurate, complete Business Profile information helps customers find the business. See [Google's local ranking guidance](https://support.google.com/business/answer/7091?hl=en). Structured data does not guarantee a rich result or ranking.

### 4. Repair search and sharing files — high

On the Netlify test site, `/robots.txt` and `/sitemap.xml` returned the site's HTML fallback rather than actual text/XML files. `/og-image.png` also returned the HTML fallback, even though [frontend/index.html](../frontend/index.html) points to that image. The catch-all rule in [frontend/public/_redirects](../frontend/public/_redirects) sends unmatched paths to `index.html` with status 200.

Publish a real robots file, a valid social preview image, and a sitemap using final-domain absolute URLs at launch. Give missing routes a meaningful 404 response. Search engines should be able to distinguish a missing page from a valid page. Google's [sitemap guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) explains URL requirements.

### 5. Reconcile conflicting business information — high

The old site still mentions a Summerhill location on its [home](https://www.clipculturebarbershop.com/), [booking](https://www.clipculturebarbershop.com/book-now), and other pages, while the redesign presents Sandy Springs as the current location. The old pages also use older audience figures, including **134,000+ haircuts** and **7+ years**, while the redesign uses **155K+ clients served** and **9+ years**. These are different measures as well as different dates; do not treat them as interchangeable without records from Dave.

Service prices need verification too. The old website and redesign both list a basic haircut at **$20**, while a [public SQUIRE listing](https://getsquire.com/discover/barbershop/clip-culture-sandy-springs-sandy-springs) displays a haircut at **$45**. That may be a different service or a changed price. Confirm the current booking catalog before launch.

The live [FAQ](https://www.clipculturebarbershop.com/faqs) says cancellations require **four hours** of notice. The redesign [FAQ](../frontend/src/components/facts.jsx) says four hours, but the [booking flow](../frontend/src/components/BookingForm.jsx) and [Book Now page](../frontend/src/pages/BookNow.jsx) say **24 hours**. Confirm the actual policy and use one version everywhere. The late-arrival thresholds also differ between the FAQ and booking flow.

### 6. Improve loading efficiency and measure again — medium

The built site is about **28 MB**, including approximately **8 MB** for two customer videos. The videos in [frontend/src/components/ProductStories.jsx](../frontend/src/components/ProductStories.jsx) use `preload="none"`, which is appropriate for below-the-fold content. Several images are over 500 KB, and [frontend/src/index.css](../frontend/src/index.css) imports seven Google Fonts families. Resize large images for their actual display dimensions, serve responsive variants, reduce font families, and consider splitting below-the-fold home sections into separate chunks.

The live JS response was approximately **146 KB compressed** and CSS approximately **31 KB compressed** during the audit. Versioned static assets were served to browsers with `max-age=0,must-revalidate`. Set a long browser cache for hashed `/assets/*` files while keeping HTML fresh. Netlify already provides edge caching, so this recommendation concerns browser caching. See [Netlify caching documentation](https://docs.netlify.com/build/caching/caching-overview/).

**Measurement limit:** The PageSpeed Insights API returned a rate-limit response. No Lighthouse or Core Web Vitals score was measured, and this audit does not claim one. Run mobile PageSpeed and real-user Core Web Vitals checks after the technical changes.

## What to retain from the current live site

| Current live-site content | Redesign status | Decision |
| --- | --- | --- |
| [Sandy Springs page](https://www.clipculturebarbershop.com/sandysprings) | Location appears in contact area; no dedicated local route | Create a useful replacement page and redirect the old URL. |
| [Appointment FAQs](https://www.clipculturebarbershop.com/faqs) | Most questions are already on the home page | Keep them, make them crawlable, and resolve policy conflicts. |
| [Service names and prices](https://www.clipculturebarbershop.com/book-now) | Most are present on `/services` | Preserve service detail; verify current pricing with the booking provider. |
| [David's background and 2017 founding date](https://www.clipculturebarbershop.com/about-1) | Already well represented on `/about` | Retain the specific, credible story in initial HTML. |
| Direct booking and “Book With David” links | New booking flow exists | Verify the live provider links and whether a David-specific option is still offered. |
| Sandy Springs address, phone, hours, walk-in message | Present in React-rendered content | Verify and retain in HTML, structured data, and listings. |

Do not automatically carry over old Summerhill claims, older customer numbers, outdated prices, or unverified review totals. The redesign's FAQ and About content are existing strengths; they need technical visibility and factual review, not wholesale rewriting.

## AI search and answer visibility

AI assistants are most likely to use content they can access, understand, and corroborate. For the final public site:

1. Answer common customer questions plainly: where the shop is, whether walk-ins are welcome, hours, available services, how to book, and appointment policies.
2. Put those answers on relevant pages in crawlable HTML, with descriptive headings and links between the home, services, Sandy Springs, FAQ, and booking pages.
3. Keep the business name, address, phone, hours, and URLs consistent across the site and reputable third-party listings.
4. Allow search-oriented crawlers where desired. OpenAI identifies **OAI-SearchBot** for ChatGPT search; Anthropic documents **Claude-SearchBot** and **Claude-User**. See [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots?app=1) and [Anthropic crawler documentation](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

No SEO or AEO change can guarantee that Clip Culture appears for a particular search or chatbot answer.

## Staging and launch checklist

### While the redesign is on Netlify for testing

- Prepare the page rendering, local content, metadata, structured data, redirects, and performance improvements.
- Keep the public **Netlify staging hostname** out of search results with a crawlable `noindex` response or access protection to avoid competing copies. Do **not** rely on `robots.txt` Disallow alone for `noindex`; Google must be able to crawl a page to see its `noindex` directive. See [Google's noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- Make the staging-only `noindex` conditional so it cannot accidentally remain on the final domain.
- Keep canonical and sitemap URL generation configurable until the final branded hostname is confirmed.

### At launch on the branded domain

- Connect the final domain and choose one canonical hostname (`www` or non-`www`).
- Remove staging-only `noindex` from production. Publish self-referencing canonical URLs and a sitemap for the final hostname.
- Redirect retired live-site paths to the closest relevant new pages; test the important old URLs.
- Update Google Business Profile, booking providers, and important listings to the final URL and verified business details.
- Verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, and inspect the home, Sandy Springs, services, and booking URLs. [Google's recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) notes that crawling and indexing can take time and are not guaranteed.

## Audit scope and limitations

This review used the public live pages, direct checks of the Netlify responses, and the local React/Vite source. It did not include Google Search Console, Google Business Profile owner access, booking-provider administration, analytics, or a completed PageSpeed Insights run. Those sources are needed to validate actual search impressions, business-profile accuracy, booking prices, and real-user loading speed. No website code or deployment was changed as part of this audit.

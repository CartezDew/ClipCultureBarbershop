# Clip Culture Barbershop website

The website for Clip Culture Barbershop, 6309 Roswell Road NE #2D, Sandy Springs, GA 30328. It is a React + Vite front-end app. Every main page, product, and apparel item is prerendered to static HTML at build time, so search engines and AI assistants can read the content without running JavaScript.

| Folder | What it is |
| --- | --- |
| `frontend/` | The website (React 19, Vite, React Router). This is what gets deployed. |
| `frontend/netlify/edge-functions/` | Netlify edge function: real 404s for unknown URLs, `noindex` on the `*.netlify.app` test host. |
| `frontend/email-templates/` | HTML for the EmailJS visitor acknowledgement email. |
| `docs/` | The November 2026 SEO/AEO audit, kept for reference. |

## Local development

```bash
npm install --prefix frontend
npm run dev
```

The dev server runs at http://localhost:5173. Form emails need the EmailJS variables in `frontend/.env`. [frontend/FORM_SUBMISSION_SETUP.md](frontend/FORM_SUBMISSION_SETUP.md) explains how to set them up.

## Build and checks

Run these from `frontend/`:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check, bundle, prerender all pages, and write `sitemap.xml` and `robots.txt` into `dist/`. |
| `npm run test:seo` | After a build: checks titles, descriptions, canonicals, the sitemap, structured data, the social image, and the 404 and `noindex` behavior. |
| `npx vitest run` | Unit and interaction tests. |
| `npm run lint` | ESLint for JS/JSX/TS. Older style issues show as warnings. |
| `npm run preview` | Serves the built `dist/` at http://localhost:4173. |

## Where things live

- **Business facts:** the address, phone, hours, and social links are in `src/lib/constants.ts`. Structured data and page titles are in `src/lib/seo.js`. The AI-assistant summary is `public/llms.txt`. Update all three when a fact changes.
- **Booking:** every Book Now button leads to `/book-now`, which hands off to Squire (the team) or Acuity (David Brown). The site itself takes no appointments.
- **Services and prices:** the menu lives in `src/pages/Services.jsx`. The structured-data menu in `src/lib/seo.js` repeats the core prices. Keep both in step with Squire and Acuity.
- **Detail pages:** product and apparel URLs are listed in `src/lib/routes.js`. A new product needs its slug added there, or it won't be prerendered and the edge function returns 404.
- **Old website URLs:** `public/_redirects` maps the retired Squarespace URLs to their new pages.
- **Years in business:** this figure is calculated from the December 12, 2017 opening date in `src/lib/business.js`.

## Images

Images are imported as modules so Vite fingerprints them, and the gallery folders are loaded with `import.meta.glob`. Images below the first screen use `loading="lazy"`. To add an image, resize it to at most 1800 px on its long edge (1200 px for logos) and save it as WebP at about quality 80:

```bash
cwebp -q 80 -m 6 -resize 1800 0 input.jpg -o src/assets/gallery/image-72.webp
```

Then import it, or drop it into `src/assets/gallery/` to have the gallery pick it up automatically.

## Deployment

Netlify builds from `frontend/` using `netlify.toml`. Netlify settings to keep:

- **EmailJS variables:** keep the `VITE_EMAILJS_*` variables in Netlify's environment settings.
- **Canonical domain:** canonical URLs, the sitemap, and `llms.txt` always point to `https://www.clipculturebarbershop.com`. Set `PUBLIC_SITE_URL` only if the final domain changes.

### Moving to the GoDaddy domain

Keep the site hosted on Netlify and point the GoDaddy domain at it. GoDaddy shared hosting would not run `_redirects`, `_headers`, or the edge function.

1. In Netlify, go to **Domain management**, add `www.clipculturebarbershop.com` as the primary domain, and add `clipculturebarbershop.com` too.
2. In GoDaddy DNS, replace the Squarespace records with the ones Netlify shows:
   - a `CNAME` for `www` pointing to the Netlify site;
   - an `A` record for `@` pointing to Netlify's load balancer.
3. Wait for Netlify to issue the HTTPS certificate.
4. Check these URLs:
   - `/sandysprings` and `/about-1` redirect to their new pages;
   - the old `/products/p/...` URLs redirect to their new pages;
   - `/robots.txt` lists the `www` sitemap;
   - the `x-robots-tag: noindex` header is gone on the branded domain.
5. Point everything at the new domain:
   - in Google Search Console and Bing Webmaster Tools, submit `https://www.clipculturebarbershop.com/sitemap.xml`;
   - update the website link on Google Business Profile, Squire, Instagram, and Facebook.
6. In EmailJS, add the branded domain if domain restrictions are on, and connect the shop's own mailbox as described in `FORM_SUBMISSION_SETUP.md`.

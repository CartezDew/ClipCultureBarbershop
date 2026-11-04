import { detailPaths, legacyProductSlugs } from '../../src/lib/routes.js';

const staticRoutes = new Set([
  '/', '/sandysprings', '/faqs', '/services', '/about', '/about-1', '/application-form',
  '/franchise-form', '/franchise-form-1', '/shop', '/book-now',
  '/booking', '/mentorship', '/advertise', '/vending-machines', '/franchise',
  '/apply', '/speaking-engagements',
  // Retired Squarespace URLs that _redirects forwards.
  '/home', '/mentorship-1', '/summerhill-old', '/products',
  ...detailPaths,
  ...legacyProductSlugs.map((slug) => `/products/${slug}`),
]);

export default async function searchResponse(request, context) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/';
  const isAsset = path.includes('.');
  const isLegacyProduct = path.startsWith('/products/p/');
  if (!isAsset && !staticRoutes.has(path) && !isLegacyProduct) {
    return new Response('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Clip Culture</title><meta name="robots" content="noindex"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#121817;color:#f7f7f2;font:1.1rem/1.6 system-ui,sans-serif;text-align:center}main{padding:2rem}h1{font-size:clamp(2.5rem,7vw,5rem);line-height:1.1}p{color:#cbd5ce}a{color:#8bc69d;text-underline-offset:.3rem}</style></head><body><main><h1>Page not found</h1><p>That page is unavailable.</p><a href="/">Return to Clip Culture</a></main></body></html>', {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  }

  // The Netlify test hostname stays out of search without blocking the branded domain.
  const isStaging = url.hostname.endsWith('.netlify.app');
  if (!isStaging && !isAsset) return;
  const response = await context.next({ sendConditionalRequest: true });
  if (isAsset && response.headers.get('content-type')?.includes('text/html')) {
    return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  if (isStaging && response.headers.get('content-type')?.includes('text/html')) {
    const staged = new Response(response.body, response);
    staged.headers.set('x-robots-tag', 'noindex');
    return staged;
  }
  return response;
}

export const config = { path: '/*' };

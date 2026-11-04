import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import searchResponse from '../netlify/edge-functions/search-response.js';
import { pages, pageMeta, DEFAULT_SITE_URL } from '../src/lib/seo.js';
import { detailPaths } from '../src/lib/routes.js';

const dist = join(process.cwd(), 'dist');
const siteUrl = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');

for (const [path, meta] of Object.entries(pages)) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
  const html = await readFile(file, 'utf8');
  assert.match(html, /<h1\b/);
  assert.ok(html.includes(meta.title.replaceAll('&', '&amp;')), `${path}: title missing`);
  assert.ok(html.includes(meta.description.replaceAll('&', '&amp;')), `${path}: description missing`);
  assert.ok(html.includes(`href="${pageMeta(path, siteUrl).url}"`), `${path}: canonical missing`);
  assert.ok(!html.includes('/src/assets/'), `${path}: source assets leaked`);
  assert.ok(html.length > 5000, `${path}: empty shell`);
}

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, Object.keys(pages).length + detailPaths.length);
for (const path of detailPaths) {
  const html = await readFile(join(dist, path.slice(1), 'index.html'), 'utf8');
  assert.match(html, /<h1\b/, `${path}: h1 missing`);
  assert.ok(html.includes(`href="${pageMeta(path, siteUrl).url}"`), `${path}: canonical missing`);
}
const faqs = await readFile(join(dist, 'faqs', 'index.html'), 'utf8');
assert.ok(faqs.includes('"@type":"FAQPage"'), 'faqs: FAQPage schema missing');
assert.ok((await readFile(join(dist, 'llms.txt'), 'utf8')).includes('6309 Roswell Road NE #2D'));
const robots = await readFile(join(dist, 'robots.txt'), 'utf8');
assert.match(robots, /Allow: \/|Disallow:/);
assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
const image = await readFile(join(dist, 'og-image.jpg'));
assert.equal(image.readUInt16BE(0), 0xffd8);
const home = await readFile(join(dist, 'index.html'), 'utf8');
const schema = JSON.parse(home.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
assert.equal(schema['@type'], 'BarberShop');
assert.equal(schema.address.addressLocality, 'Sandy Springs');
assert.equal(schema.telephone, '+1-404-458-2993');
assert.equal(schema.potentialAction.target, `${siteUrl}/book-now/`);

const htmlContext = { next: async () => new Response('<h1>Clip Culture</h1>', { headers: { 'content-type': 'text/html' } }) };
const staged = await searchResponse(new Request('https://clip-culture.netlify.app/services'), htmlContext);
assert.equal(staged.headers.get('x-robots-tag'), 'noindex');
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/services'), htmlContext), undefined);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/unknown-page'), htmlContext).then((r) => r.status), 404);
assert.equal(await searchResponse(new Request('https://clip-culture.netlify.app/missing.png'), htmlContext).then((r) => r.status), 404);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/about-1'), htmlContext), undefined);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/products/premium-beard-oil'), htmlContext), undefined);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/products/p/body-wash-ldjy8-efpw7-9ngf3'), htmlContext), undefined);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/products/not-a-product'), htmlContext).then((r) => r.status), 404);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/booking'), htmlContext), undefined);
assert.equal(await searchResponse(new Request('https://www.clipculturebarbershop.com/barber/david-brown'), htmlContext).then((r) => r.status), 404);

console.log(`Verified ${Object.keys(pages).length + detailPaths.length} crawlable pages, sitemap, robots, social image, staging noindex, and 404 behavior.`);

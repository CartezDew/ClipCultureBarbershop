import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createServer as createHttpServer } from 'node:http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import { pageMeta, businessSchema, DEFAULT_SITE_URL } from '../src/lib/seo.js';
import { detailPaths } from '../src/lib/routes.js';
import { markReveals } from '../src/lib/scrollReveal.js';
import { JSDOM } from 'jsdom';

// Canonical URLs always name the final domain; the Netlify test host is kept out of search by noindex.
const siteUrl = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const dist = join(process.cwd(), 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(join(dist, '.vite/manifest.json'), 'utf8'));
const vite = await createServer({ server: { middlewareMode: true, hmr: { server: createHttpServer() } }, appType: 'custom' });

const paths = [
  '/',
  '/sandysprings',
  '/faqs',
  '/services',
  '/about',
  '/shop',
  '/book-now',
  '/mentorship',
  '/advertise',
  '/vending-machines',
  '/franchise',
  '/apply',
  '/speaking-engagements',
  ...detailPaths,
];

// Page source for each route, so its lazy chunk's CSS and JS can be linked from the HTML.
const pageSource = (path) => {
  const section = path.split('/')[1];
  if (section === 'products') return 'src/pages/ProductDetail.jsx';
  if (section === 'apparel') return 'src/pages/ApparelDetail.jsx';
  const name = { '/sandysprings': 'SandySprings', '/faqs': 'FAQs', '/book-now': 'BookNow', '/vending-machines': 'VendingMachines', '/speaking-engagements': 'SpeakingEngagements' }[path]
    || path.slice(1).replace(/^./, (c) => c.toUpperCase());
  return path === '/' ? null : `src/pages/${name}.jsx`;
};

// Without these links the prerendered page paints before its stylesheet arrives and then jumps.
function routeAssets(path) {
  const source = pageSource(path);
  if (!source) return '';
  if (!manifest[source]) throw new Error(`No build chunk for ${path} (${source})`);
  const entryCss = new Set(manifest['index.html'].css || []);
  const css = new Set();
  const scripts = new Set();
  const seen = new Set();
  const walk = (key) => {
    if (seen.has(key) || key === 'index.html' || !manifest[key]) return;
    seen.add(key);
    scripts.add(manifest[key].file);
    (manifest[key].css || []).forEach((file) => { if (!entryCss.has(file)) css.add(file); });
    (manifest[key].imports || []).forEach(walk);
  };
  walk(source);
  return [...css].map((file) => `<link rel="stylesheet" href="/${file}" />`)
    .concat([...scripts].map((file) => `<link rel="modulepreload" href="/${file}" />`))
    .join('\n');
}

const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`;

async function faqSchema() {
  const { faqItems } = await vite.ssrLoadModule('/src/components/facts.jsx');
  const text = (node) => renderToStaticMarkup(node).replace(/<\/(li|p)>/g, ' ').replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: text(a) } })),
  };
}

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const metaTag = (key, value, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}" />`;

function withMetadata(html, path, extraSchema = '') {
  const { title, description, url } = pageMeta(path, siteUrl);
  const image = `${siteUrl}/og-image.jpg`;
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`],
    [/<meta name="description"[^>]*>/, metaTag('description', description)],
    [/<meta property="og:title"[^>]*>/, metaTag('og:title', title, true)],
    [/<meta property="og:description"[^>]*>/, metaTag('og:description', description, true)],
    [/<meta property="og:image"[^>]*>/, metaTag('og:image', image, true)],
    [/<meta name="twitter:title"[^>]*>/, metaTag('twitter:title', title)],
    [/<meta name="twitter:description"[^>]*>/, metaTag('twitter:description', description)],
  ];
  for (const [pattern, value] of replacements) html = html.replace(pattern, value);
  const schema = (path === '/' || path === '/sandysprings' ? jsonLd(businessSchema(siteUrl)) : '') + extraSchema;
  return html.replace('</head>', `${routeAssets(path)}\n${metaTag('og:url', url, true)}\n<link rel="canonical" href="${escape(url)}" />\n${metaTag('twitter:image', image)}\n${schema}\n</head>`);
}

function builtAssetUrls(html) {
  for (const [source, asset] of Object.entries(manifest)) {
    if (!source.startsWith('src/assets/')) continue;
    html = html.replaceAll(`/${source}`, `/${asset.file}`);
    html = html.replaceAll(`/${encodeURI(source)}`, `/${asset.file}`);
  }
  if (html.includes('/src/assets/')) throw new Error('Prerendered HTML contains an unresolved source asset URL');
  return html;
}

try {
  const { AppContent, preloadRoute } = await vite.ssrLoadModule('/src/App.jsx');
  for (const path of paths) {
    await preloadRoute(path);
    const rendered = renderToString(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(AppContent)));
    // Start reveal elements hidden so the page fades in rather than flashing.
    const { window: dom } = new JSDOM(`<div id="root">${rendered}</div>`);
    const container = dom.document.getElementById('root');
    markReveals(container, path);
    const body = container.innerHTML;
    const extraSchema = path === '/faqs' ? jsonLd(await faqSchema()) : '';
    const html = builtAssetUrls(withMetadata(template.replace('<div id="root"></div>', `<div id="root">${body}</div>`), path, extraSchema));
    const target = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
    await mkdir(join(target, '..'), { recursive: true });
    await writeFile(target, html);
    console.log(`Prerendered ${path} (${Math.round(html.length / 1024)} KB)`);
  }
  const urls = paths.map((path) => `  <url><loc>${pageMeta(path, siteUrl).url}</loc></url>`).join('\n');
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
} finally {
  await vite.close();
}

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createServer as createHttpServer } from 'node:http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import { pageMeta, businessSchema, DEFAULT_SITE_URL } from '../src/lib/seo.js';

const siteUrl = (process.env.PUBLIC_SITE_URL || process.env.VITE_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const dist = join(process.cwd(), 'dist');
const template = await readFile(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(await readFile(join(dist, '.vite/manifest.json'), 'utf8'));
const vite = await createServer({ server: { middlewareMode: true, hmr: { server: createHttpServer() } }, appType: 'custom' });

const modules = {
  '/': '/src/pages/Home.jsx',
  '/sandysprings': '/src/pages/SandySprings.jsx',
  '/faqs': '/src/pages/FAQs.jsx',
  '/services': '/src/pages/Services.jsx',
  '/about': '/src/pages/About.jsx',
  '/shop': '/src/pages/Shop.jsx',
  '/book-now': '/src/pages/BookNow.jsx',
  '/booking': '/src/pages/Booking.jsx',
  '/mentorship': '/src/pages/Mentorship.jsx',
  '/advertise': '/src/pages/Advertise.jsx',
  '/vending-machines': '/src/pages/VendingMachines.jsx',
  '/franchise': '/src/pages/Franchise.jsx',
  '/apply': '/src/pages/Apply.jsx',
  '/speaking-engagements': '/src/pages/SpeakingEngagements.jsx',
};

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const metaTag = (key, value, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}" />`;

function withMetadata(html, path) {
  const { title, description, url } = pageMeta(path, siteUrl);
  const image = `${siteUrl}/og-image.webp`;
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
  const schema = path === '/' || path === '/sandysprings'
    ? `<script type="application/ld+json">${JSON.stringify(businessSchema(siteUrl)).replaceAll('<', '\\u003c')}</script>`
    : '';
  return html.replace('</head>', `${metaTag('og:url', url, true)}\n<link rel="canonical" href="${escape(url)}" />\n${metaTag('twitter:image', image)}\n${schema}\n</head>`);
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
  for (const [path, modulePath] of Object.entries(modules)) {
    const { default: Page } = await vite.ssrLoadModule(modulePath);
    const isStandalone = path === '/' || path === '/booking' || path === '/book-now';
    let children = React.createElement(Page);
    if (!isStandalone) {
      const [{ default: Navbar }, { default: Footer }] = await Promise.all([
        vite.ssrLoadModule('/src/components/Navbar.jsx'),
        vite.ssrLoadModule('/src/components/Footer.jsx'),
      ]);
      children = React.createElement(React.Fragment, null,
        React.createElement(Navbar),
        React.createElement('main', null, children),
        React.createElement(Footer));
    }
    const body = renderToString(React.createElement(MemoryRouter, { initialEntries: [path] }, children));
    const html = builtAssetUrls(withMetadata(template.replace('<div id="root"></div>', `<div id="root">${body}</div>`), path));
    const target = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
    await mkdir(join(target, '..'), { recursive: true });
    await writeFile(target, html);
    console.log(`Prerendered ${path} (${Math.round(html.length / 1024)} KB)`);
  }
  const urls = Object.keys(modules).map((path) => `  <url><loc>${pageMeta(path, siteUrl).url}</loc></url>`).join('\n');
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
} finally {
  await vite.close();
}

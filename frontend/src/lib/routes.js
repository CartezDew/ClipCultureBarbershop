// Product and apparel pages that exist; shared by the prerender script and the Netlify 404 edge function.
export const productSlugs = [
  'magic-beard-balm', 'premium-beard-oil', 'therapeutic-shampoo', 'rich-shea-butter',
  'bath-shower-gel', 'curl-twist', 'beard-line-up-enhancement', 'grooming-set',
];
export const legacyProductSlugs = ['beard-wash', 'body-lotion', 'body-wash'];
export const apparelSlugs = [
  'clip-culture-sweatpants', 'clip-culture-snapback-bundle', 'clip-culture-snapback-black-red',
  'clip-culture-snapback-signature-green', 'clip-culture-barbershop-tshirt', 'clip-culture-barbershop-beanie',
];

export const detailPaths = [
  ...productSlugs.map((slug) => `/products/${slug}`),
  ...apparelSlugs.map((slug) => `/apparel/${slug}`),
];

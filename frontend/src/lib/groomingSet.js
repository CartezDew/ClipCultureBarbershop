// The five-product grooming set, shared by the Home section, Shop header, product grid and product pages.
import GiftBox from '../assets/grooming-set/gift-set-gold-box-1280.webp';
import GiftBoxSmall from '../assets/grooming-set/gift-set-gold-box-720.webp';
import TealCase from '../assets/grooming-set/grooming-set-teal-case-1280.webp';
import TealCaseSmall from '../assets/grooming-set/grooming-set-teal-case-720.webp';
import TealCaseSquare from '../assets/grooming-set/grooming-set-teal-case-square-720.webp';
import MarbleLine from '../assets/grooming-set/grooming-line-marble-1280.webp';
import MarbleLineSmall from '../assets/grooming-set/grooming-line-marble-720.webp';

export const groomingSetImages = {
  giftBox: GiftBox,
  giftBoxSmall: GiftBoxSmall,
  tealCase: TealCase,
  tealCaseSmall: TealCaseSmall,
  tealCaseSquare: TealCaseSquare,
  marbleLine: MarbleLine,
  marbleLineSmall: MarbleLineSmall,
};

// Each item's spot (percent of the full teal case photo) lets the Home photo link to its product.
export const groomingSetItems = [
  { name: 'Bath & Shower Gel', label: 'Body wash', slug: 'bath-shower-gel', price: 25, spot: { x: 30, y: 56 } },
  { name: 'Premium Beard Oil', label: 'Beard oil', slug: 'premium-beard-oil', price: 25, spot: { x: 49, y: 50 } },
  { name: 'Therapeutic Shampoo', label: 'Shampoo', slug: 'therapeutic-shampoo', price: 25, spot: { x: 64, y: 40 } },
  { name: 'Rich Shea Butter', label: 'Shea butter', slug: 'rich-shea-butter', price: 25, spot: { x: 41, y: 80 } },
  { name: 'Magic Beard Balm', label: 'Beard balm', slug: 'magic-beard-balm', price: 25, spot: { x: 71, y: 66 } },
];

const separateTotal = groomingSetItems.reduce((sum, item) => sum + item.price, 0);

export const groomingSet = {
  slug: 'grooming-set',
  name: 'Clip Culture Grooming Set',
  price: separateTotal - 15,
  originalPrice: separateTotal,
  savings: 15,
};

export const groomingSetSlugs = groomingSetItems.map((item) => item.slug);

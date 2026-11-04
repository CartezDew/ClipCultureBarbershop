const PAGE_SELECTORS = {
  '/': '.home-product-stories-wrapper .product-stories__intro, .home-product-stories-wrapper .product-story, .top-products__header, .top-products__grid .product-card, .home-barbershop-gallery-wrapper, .testimonials header, .testimonials__grid article, .testimonials__reviews-section, .home-services-preview .container > h2, .home-services-preview .service-item, .home-welcome__left, .home-welcome__right, .contact__header, .contact__image-container, .contact__column',
  '/vending-machines': '.vending-page [data-scroll-reveal]',
  '/shop': '.shop-header, .shop-product-stories-wrapper .product-stories__intro, .shop-product-stories-wrapper .product-story, .shop-page .top-products__header, .shop-page .product-card, .shop-page .books__header, .shop-page .book-card',
  // FAQ questions animate themselves (components/facts.jsx), so they are not listed here.
  '/faqs': '.faqs-page__header, .faqs-page__cta',
  '/apply': '.apply-title, .apply-now-button, .apply-bento-card, .apply-video-wrapper, .apply-video-title, .apply-video-subtitle, .apply-founder-callouts > *, .apply-joinus-wrapper .join-email-title, .apply-joinus-wrapper .join-email-subtitle, .apply-joinus-wrapper .join-email-form',
  '/franchise': '.franchise-header-image, .franchise-header-copy, .franchise-features-list > *, .franchise-program, .franchise-program-card, .franchise-program-actions, .franchise-faq-section h2, .franchise-faq-section .facts-subtitle, .franchise-gallery-wrapper, .franchise-joinus-wrapper .join-email-title, .franchise-joinus-wrapper .join-email-subtitle, .franchise-joinus-wrapper .join-email-form',
  '/speaking-engagements': '.speaking-header-overlay, .speaking-bento-card, .speaking-video-wrapper, .speaking-video-content, .speaking-narrative-main-title, .speaking-narrative-subtitle, .speaking-narrative-content > .speaking-narrative-paragraph, .speaking-narrative-quote, .speaking-topics-block, .speaking-proof-block, .speaking-booking-block, .speaking-gallery-wrapper, .speaking-joinus-wrapper .join-email-title, .speaking-joinus-wrapper .join-email-subtitle, .speaking-joinus-wrapper .join-email-form',
  '/book-now': '.book-now-header, .book-now-progress, .book-now-step-content > :not(.book-now-options-grid), .book-now-option-card, .book-now-products-title, .book-now-product-card',
  '/services': 'main h1, main h2, .services-gallery-wrapper, .promo-ad__image-wrapper, .promo-ad__content, .services__card, .services__cta',
  '/about': 'main h1, .about-stats__item, .about-section__image-wrapper, .about-section__content, .about-closing__content, .about-video__header, .about-video__wrapper, .about-joinus-wrapper .join-email-title, .about-joinus-wrapper .join-email-subtitle, .about-joinus-wrapper .join-email-form',
  '/sandysprings': 'main h1, .sandy-hero__copy p, .sandy-hero__image, .sandy-details__item, .sandy-next',
  '/mentorship': 'main h1, .mentorship-intro, .mentorship-header-image, .mentorship-program-title, .mentorship-program-card, .mentorship-joinus-wrapper .join-email-title, .mentorship-joinus-wrapper .join-email-subtitle, .mentorship-joinus-wrapper .join-email-form',
  '/advertise': 'main h1, .advertise-intro, .advertise-image, .advertise-bento-image-box, .advertise-program-card, .advertise-bento-cta, .advertise-packages-title, .advertise-package-card, .advertise-packages-actions, .advertise-joinus-wrapper .join-email-title, .advertise-joinus-wrapper .join-email-subtitle, .advertise-joinus-wrapper .join-email-form',
};

const DEFAULT_SELECTOR = 'main h1, main h2, main article';

// Elements that animated before the 2026 audit keep their original page motion.
const ORIGINAL_SELECTORS = {
  '/': PAGE_SELECTORS['/'],
  '/vending-machines': PAGE_SELECTORS['/vending-machines'],
  '/shop': PAGE_SELECTORS['/shop'],
  '/faqs': '.faqs-page__header, .faqs-page__cta',
  '/apply': '.apply-header-overlay, .apply-bento-card, .apply-video-wrapper, .apply-video-content, .apply-joinus-wrapper .join-email-title, .apply-joinus-wrapper .join-email-subtitle, .apply-joinus-wrapper .join-email-form',
  '/franchise': PAGE_SELECTORS['/franchise'],
  '/speaking-engagements': PAGE_SELECTORS['/speaking-engagements'],
  '/book-now': '.book-now-header, .book-now-step-content > :not(.book-now-options-grid), .book-now-products-title',
};
const DETAIL_SELECTOR = '.product-detail__image, .product-detail__info, .product-detail__actions-desktop, .product-detail__related-title, .product-detail__related-card';

const MEDIA = 'img, picture, video, [class*="image"], [class*="media"], [class*="photo"], [class*="gallery"], [class*="video"]';
const CARD = '[class*="card"], [class*="item"], li, article, .product-story';

// Each page keeps its signature motion for text; photos and cards get a page-specific
// partner motion so pages feel related but not identical.
const pageMotion = (pathname) => {
  if (pathname === '/vending-machines') return 'vending';
  if (pathname === '/shop' || pathname === '/apply' || pathname.startsWith('/products/') || pathname.startsWith('/apparel/')) return 'lift';
  if (pathname === '/services' || pathname === '/sandysprings') return 'slide-left';
  if (pathname === '/franchise' || pathname === '/advertise' || pathname === '/mentorship' || pathname === '/speaking-engagements') return 'slide-right';
  return 'fade';
};

const MEDIA_MOTIONS = ['settle', 'rise', 'settle', 'slide-right', 'settle', 'slide-left'];
const CARD_MOTIONS = ['rise', 'lift', 'settle', 'rise', 'slide-left', 'slide-right'];

const pageSeed = (pathname) => [...pathname].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);

// Signature motions for specific sections.
const SIGNATURE_MOTIONS = [
  ['.testimonials__grid article', 'tilt'],
  ['.apply-bento-card', 'fold'],
  ['.apply-title, .apply-video-title', 'rise'],
  ['.apply-now-button, .apply-founder-callouts > *', 'settle'],
];

function motionFor(element, pathname, textMotion) {
  if (element.dataset.scrollReveal) return element.dataset.scrollReveal;
  const signature = SIGNATURE_MOTIONS.find(([selector]) => element.matches(selector));
  if (signature) return signature[1];
  if (element.matches(ORIGINAL_SELECTORS[pathname] || DEFAULT_SELECTOR)) return element.matches('.product-story') ? 'lift' : textMotion;
  const seed = pageSeed(pathname);
  if (element.matches(MEDIA)) return MEDIA_MOTIONS[seed % MEDIA_MOTIONS.length];
  if (element.matches(CARD)) return CARD_MOTIONS[(seed >>> 3) % CARD_MOTIONS.length];
  return textMotion;
}

const selectorFor = (pathname) => {
  const isDetailPage = pathname.startsWith('/products/') || pathname.startsWith('/apparel/');
  return PAGE_SELECTORS[pathname] || (isDetailPage ? DETAIL_SELECTOR : DEFAULT_SELECTOR);
};

// Mark one element as waiting to reveal. Shared by the browser and the prerender script,
// so prerendered pages first paint with these elements already hidden: revealing content
// that was painted visible would flash.
function markElement(element, pathname, seen) {
  seen.add(element);
  element.dataset.scrollMotion = motionFor(element, pathname, pageMotion(pathname));
  // Siblings in a row arrive one after another rather than all at once.
  const siblings = element.parentElement ? [...element.parentElement.children].filter((child) => seen.has(child)) : [];
  const order = Math.max(0, siblings.indexOf(element));
  // Testimonials arrive with a longer beat between cards.
  const step = element.dataset.scrollMotion === 'tilt' ? 160 : 80;
  if (order) element.style.setProperty('--reveal-delay', `${Math.min(order, 4) * step}ms`);
  element.dataset.scrollState = 'pending';
}

export function markReveals(root, pathname) {
  const seen = new WeakSet();
  root.querySelectorAll(selectorFor(pathname)).forEach((element) => markElement(element, pathname, seen));
}

// Search and AI crawlers get every element visible straight away: same content, no reveal.
// Keep in step with the matching pattern in index.html.
const CRAWLER = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|inspectiontool|chatgpt|claude|perplexity|bytespider/i;

const unmark = (element) => {
  delete element.dataset.scrollState;
  delete element.dataset.scrollMotion;
  element.style.removeProperty('--reveal-delay');
};

export function setupScrollReveals(pathname) {
  const root = document.querySelector('.App');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!root || reduceMotion || CRAWLER.test(navigator.userAgent) || !('IntersectionObserver' in window)) {
    // Show anything the prerendered page marked as hidden.
    root?.querySelectorAll('[data-scroll-state="pending"]').forEach((element) => { element.dataset.scrollState = 'visible'; });
    document.documentElement.classList.add('reveal-ready');
    return () => {};
  }

  const selector = selectorFor(pathname);
  const isSmallScreen = window.matchMedia('(max-width: 768px)');
  const seen = new WeakSet();
  const marked = new Set();
  const currentPath = () => window.location.pathname.replace(/\/$/, '') || '/';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.dataset.scrollState = 'visible';
      observer.unobserve(target);
    });
  }, { rootMargin: '0px 0px -40px 0px' });

  // Reveal state lives in data attributes: React rewrites className on re-render,
  // which would silently drop classes added here.
  const scan = () => {
    // React inserts the next page before this page's effect is cleaned up, so a scan
    // can see the next page's elements. Leave those to the next page's own setup.
    if (currentPath() !== pathname) return;
    const added = [];
    root.querySelectorAll(selector).forEach((element) => {
      if (seen.has(element)) return;
      // Phones show stacked videos; animating them makes them hard to follow.
      // Layout-only wrappers have no box to fade or observe.
      const skip = (isSmallScreen.matches && (element.matches('video, .product-story') || element.querySelector('video')))
        || getComputedStyle(element).display === 'contents';
      if (skip) {
        seen.add(element);
        unmark(element);
        return;
      }
      const prerendered = element.dataset.scrollState === 'pending';
      // Hide without animating the hide itself; only the reveal should be seen.
      if (!prerendered) element.style.transition = 'none';
      markElement(element, pathname, seen);
      marked.add(element);
      if (!prerendered) added.push(element);
      else observer.observe(element);
    });
    if (!added.length) return;
    // Commit the hidden state before observing, so content already on screen
    // still transitions in instead of switching straight to visible.
    void root.offsetHeight;
    added.forEach((element) => {
      element.style.removeProperty('transition');
      observer.observe(element);
    });
  };

  const mutations = new MutationObserver(scan);
  mutations.observe(root, { childList: true, subtree: true });
  scan();
  document.documentElement.classList.add('reveal-ready');

  return () => {
    mutations.disconnect();
    observer.disconnect();
    // Nothing is left hidden for a page that no longer owns it.
    marked.forEach((element) => {
      if (element.dataset.scrollState === 'pending') unmark(element);
    });
  };
}

const PAGE_SELECTORS = {
  '/': '.shop-by-category__title, .home-product-stories-wrapper .product-stories__intro, .home-product-stories-wrapper .product-story, .top-products__header, .top-products__grid .product-card, .home-barbershop-gallery-wrapper, .testimonials header, .testimonials__grid article, .testimonials__reviews-section, .home-services-preview .container > h2, .home-services-preview .service-item, .home-welcome__left, .home-welcome__right, .professional-team__header, .professional-team__card, .professional-team__join, .contact__header, .contact__image-container, .contact__column',
  '/vending-machines': '.vending-page [data-scroll-reveal]',
  '/shop': '.shop-header, .shop-category-wrapper, .shop-product-stories-wrapper .product-stories__intro, .shop-product-stories-wrapper .product-story, .shop-products-wrapper, .shop-apparel-wrapper, .shop-books-wrapper',
  '/faqs': '.faqs-page__header, .faqs-page__cta, .faqs-page .facts-section',
  '/apply': '.apply-header-overlay, .apply-bento-card, .apply-video-wrapper, .apply-video-content, .apply-joinus-wrapper .join-email-title, .apply-joinus-wrapper .join-email-subtitle, .apply-joinus-wrapper .join-email-form',
  '/franchise': '.franchise-header-image, .franchise-header-copy, .franchise-features, .franchise-program, .franchise-program-card, .franchise-program-actions, .franchise-faq-section .w-full, .franchise-gallery-wrapper, .franchise-joinus-wrapper .join-email-title, .franchise-joinus-wrapper .join-email-subtitle, .franchise-joinus-wrapper .join-email-form',
  '/speaking-engagements': '.speaking-header-overlay, .speaking-bento-card, .speaking-video-wrapper, .speaking-video-content, .speaking-narrative-main-title, .speaking-narrative-subtitle, .speaking-narrative-content > .speaking-narrative-paragraph, .speaking-narrative-quote, .speaking-topics-block, .speaking-proof-block, .speaking-booking-block, .speaking-gallery-wrapper, .speaking-joinus-wrapper .join-email-title, .speaking-joinus-wrapper .join-email-subtitle, .speaking-joinus-wrapper .join-email-form',
  '/team': 'main .section h1, main .section .card',
  '/book-now': '.book-now-header, .book-now-content > *, .book-now-products-title',
  '/booking': '.booking-page-wrapper h1, .booking-page-wrapper h3',
};

const DEFAULT_SELECTOR = 'main h1, main h2, main article';

const pageMotion = (pathname) => {
  if (pathname === '/vending-machines') return 'vending';
  if (pathname === '/shop' || pathname === '/apply' || pathname.startsWith('/products/') || pathname.startsWith('/apparel/')) return 'lift';
  if (pathname === '/services' || pathname === '/sandysprings' || pathname.startsWith('/barber/')) return 'slide-left';
  if (pathname === '/franchise' || pathname === '/advertise' || pathname === '/mentorship' || pathname === '/speaking-engagements') return 'slide-right';
  return 'fade';
};

export function setupScrollReveals(pathname) {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const root = document.querySelector('.App');
  if (!root) return () => {};

  const selector = PAGE_SELECTORS[pathname] || DEFAULT_SELECTOR;
  const mode = pageMotion(pathname);
  const seen = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, { rootMargin: '0px 0px -40px 0px' });

  const scan = () => {
    root.querySelectorAll(selector).forEach((element) => {
      if (seen.has(element)) return;
      seen.add(element);
      if (window.matchMedia('(max-width: 600px)').matches && element.matches('.product-story')) return;
      element.dataset.scrollMotion = element.dataset.scrollReveal || (element.matches('.product-story') ? 'lift' : mode);
      element.classList.add('page-scroll-reveal');
      observer.observe(element);
    });
  };

  const mutations = new MutationObserver(scan);
  mutations.observe(root, { childList: true, subtree: true });
  scan();

  return () => {
    mutations.disconnect();
    observer.disconnect();
  };
}

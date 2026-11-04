// A short, firm squeeze when a button, card, or option is pressed, so taps feel
// acknowledged. It animates the `scale` property, which composes with any hover
// transform or scroll reveal already on the element.
const PRESSABLE = [
  'button:not(:disabled)',
  '[role="button"]',
  '[role="link"]',
  'a[class*="btn"]',
  'a[class*="button"]',
  '.product-card',
  '.category-card',
  '.services__card',
  '.book-now-option-card',
  '.time-slot',
  '.fact',
].join(', ');

export function setupPressFeedback() {
  if (typeof window === 'undefined' || !('animate' in Element.prototype)) return () => {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const handlePointerDown = (event) => {
    if (reduceMotion.matches || event.button > 0) return;
    const element = event.target.closest(PRESSABLE);
    if (!element) return;
    // Large cards move less than buttons so the press never looks wobbly.
    const depth = element.offsetWidth > 280 ? 0.985 : 0.96;
    element.animate(
      [{ scale: '1' }, { scale: String(depth), offset: 0.35 }, { scale: '1' }],
      { duration: 240, easing: 'cubic-bezier(.2, .7, .2, 1)' },
    );
  };

  document.addEventListener('pointerdown', handlePointerDown, { passive: true });
  return () => document.removeEventListener('pointerdown', handlePointerDown);
}

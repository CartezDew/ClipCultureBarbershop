import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import '../styles/shop-by-category.css';

// Temporary imagery sourced from the Books asset folder
import bookImage1 from '../assets/Books/Clip Culture Manual.webp';
import bookImage2 from '../assets/Books/Clip Culture Manual 2.webp';
import bookImage3 from '../assets/Books/Clip Culture Manual 2- Extended Edition.webp';
import amazonImage from '../assets/Books/Amazon.png';

// Mentorship image
import mentorshipImage from '../assets/Mentorship/Mentorship-1.webp';

// Franchise shop images
import Shop1 from '../assets/Contact/Shop_1.webp';
import Shop2 from '../assets/Contact/Shop_2.webp';
import Shop3 from '../assets/gallery/image-62.webp';

// Apparel image
import apparelImage from '../assets/gallery/image-66.webp';

// Advertise and Speaking Engagements images
import advertiseImage from '../assets/gallery/image-69.webp';
import speakingImage from '../assets/gallery/image-61.webp';
import advertisementCategoryImage from '../assets/Stagging/advertisement_category.webp';
import bookCategoryImage from '../assets/Stagging/book_category.webp';

// New Arrivals image
import beardLineUp1 from '../assets/products/Beard-Line-Up-1.webp';

// Category testimonials data (single-source within this component)
import AdultHaircut from '../assets/Testimonials/Adult_haircut_avatar.webp';
import KidsHaircut from '../assets/Testimonials/Kids_haircut_avatar.webp';
import MenHaircut from '../assets/Testimonials/Men_haircut_avatar.webp';

// Product images for testimonials
import Product1 from '../assets/products/Product-1.webp';
import Product2 from '../assets/products/Product-2.webp';
import Product3 from '../assets/products/Product-3.webp';
import Product5 from '../assets/products/Product-5 .webp';
import Product6 from '../assets/products/Product-6.webp';

const categoryTestimonials = {
  newArrivals: [
    { name: 'Tyrone L.', quote: 'New drop, same Clip Culture quality. Shipping was fast too.', photoUrl: MenHaircut },
  ],
  products: [
    { name: 'James R.', quote: 'My beard finally looks groomed, not just grown.', photoUrl: MenHaircut, productImage: Product1 },
    { name: 'Derrick S.', quote: 'The wash + balm combo had me looking shop-fresh all week.', photoUrl: AdultHaircut, productImage: Product2 },
    { name: 'Antoine W.', quote: 'Clean scent, no buildup, and my wife actually noticed.', photoUrl: KidsHaircut, productImage: Product3 },
  ],
  bodySkin: [
    { name: 'Michael T.', quote: 'Soft skin all day. This lotion is the real deal.', photoUrl: MenHaircut, productImage: Product5 },
    { name: 'Kevin D.', quote: 'Body wash that actually moisturizes. Game changer.', photoUrl: AdultHaircut, productImage: Product6 },
  ],
  apparel: [
    { name: 'Brandon C.', quote: 'Comfortable, fitted, and actually represents the culture.', photoUrl: MenHaircut },
    
  ],
  books: [
    { name: 'David H.', quote: 'Straight to the point. Real game for barbers trying to build.', photoUrl: AdultHaircut, bookImage: bookCategoryImage },
    { name: 'Jalen P.', quote: 'Felt like he was talking to me in the shop — practical, not fluff.', photoUrl: MenHaircut, bookImage: bookCategoryImage },
    { name: 'Chris A.', quote: 'I used one chapter and tightened up my prices immediately.', photoUrl: KidsHaircut, bookImage: bookCategoryImage },
  ],
  mentorship: [
    { name: 'David Brown, Owner', quote: 'This isn’t just about cutting better — it’s about building a barber who can lead, earn, and last.', photoUrl: MenHaircut },
    { name: 'David Brown, Owner', quote: 'I show you the systems I actually use in the shop — not theory. If you apply it, you grow.', photoUrl: AdultHaircut },
  ],
  advertise: [
    { name: 'Clip Culture Team', quote: 'Our audience is locked in. If your product fits the culture, we can help it move.', photoUrl: AdultHaircut, advertiseImage: advertisementCategoryImage },
    { name: 'Clip Culture Team', quote: 'We don\'t sell noise — we create placements where the right people are already listening.', photoUrl: MenHaircut, advertiseImage: advertisementCategoryImage },
  ],
  franchise: [
    { name: 'David Brown, Owner', quote: 'We built a shop people trust. Now we\'re handing the blueprint to owners ready to lead.', photoUrl: AdultHaircut, shopImage: Shop3 },
    { name: 'David Brown, Owner', quote: 'You\'re not buying a chair — you\'re stepping into a brand that already has momentum.', photoUrl: MenHaircut, shopImage: Shop3 },
    { name: 'David Brown, Owner', quote: 'If you can protect the culture and run the play, we can help you build a location that lasts.', photoUrl: KidsHaircut, shopImage: Shop3 },
  ],
  speakingEngagements: [
    { name: 'Ashley W.', quote: 'Dave had the entire crowd\'s attention — powerful, authentic, and unforgettable.', photoUrl: AdultHaircut },
    { name: 'Marcus L.', quote: 'The audience walked away inspired and ready to lead with purpose. We\'ll definitely be booking him again.', photoUrl: MenHaircut },
    { name: 'Carla J.', quote: 'Every story he shared connected deeply. The crowd left more empowered to become future leaders.', photoUrl: KidsHaircut },
  ],
};

const categories = [
  { name: 'New Arrivals', image: beardLineUp1, route: '/shop' },
  { name: 'Hair Care', image: Product1, route: '/shop' }, // Default image, will be overridden by active testimonial
  { name: 'Body & Skin', image: Product5, route: '/shop' }, // Default image, will be overridden by active testimonial
  { name: 'Apparel', image: apparelImage, route: '/shop'},
  { name: 'Books', image: bookImage3, route: '/shop#books' },
  { name: 'Mentorship', image: mentorshipImage, route: '/mentorship' },
  { name: 'Advertise', image: advertisementCategoryImage, route: '/advertise' },
  { name: 'Franchise', image: Shop3, route: '/franchise' }, // Default image, will be overridden by active testimonial
  { name: 'Speaking Engagements', image: speakingImage, route: '/speaking-engagements' }
  
];

const REPEAT_COUNT = 2;
const AUTO_SCROLL_SPEED = 0.022; // px per ms (~22px per second) - further slowed for readability
// Distance inside the viewport from the right edge where activation should occur.
// Increase this value to trigger LATER (card travels further into view).
const RIGHT_ACTIVATION_INSET_PX = 120;

const ShopByCategory = () => {
  const navigate = useNavigate();
  const [isAutoScrolling, setIsAutoScrolling] = useState(false); // Start as false, will be enabled after delay
  const [activeGlobalIndex, setActiveGlobalIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  const carouselRef = useRef(null); // viewport
  const trackRef = useRef(null); // inner track that moves
  const animationFrameRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const cardWidthRef = useRef(0);
  const originalWidthRef = useRef(0);
  const activeIndexRef = useRef(0);
  const trackXRef = useRef(0); // current translateX (px)

  const repeatedCategories = [...categories, ...categories];
  const titleRef = useRef(null);
  const bagRef = useRef(null);
  const prevActiveIndexRef = useRef(null);
  const categoryImageCacheRef = useRef({}); // Track last image used for each category

  const clearScheduledResume = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const pauseAutoScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    clearScheduledResume();
    setIsAutoScrolling(false);
  }, [clearScheduledResume]);

  const resumeAutoScroll = useCallback(() => {
    clearScheduledResume();
    setIsAutoScrolling(true);
  }, [clearScheduledResume]);

  // Measure card width and original track width for seamless looping
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const updateMetrics = () => {
      if (!trackRef.current) return;

      const totalWidth = trackRef.current.scrollWidth;
      if (totalWidth) {
        originalWidthRef.current = totalWidth / REPEAT_COUNT;
      }

      const firstCard = trackRef.current.querySelector('.category-card');
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(trackRef.current);
        const gapValue = computedStyle.columnGap || computedStyle.gap || '0';
        const gap = parseFloat(gapValue);
        cardWidthRef.current = cardRect.width + (Number.isNaN(gap) ? 0 : gap);
      }
    };

    updateMetrics();

    const handleResize = () => updateMetrics();
    window.addEventListener('resize', handleResize);

    const images = Array.from(trackEl.querySelectorAll('img'));
    images.forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', updateMetrics, { once: true });
    });

    const timeoutId = window.setTimeout(updateMetrics, 600);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Delay auto-scroll start on initial page load (3 seconds)
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000); // 3 second delay

    return () => {
      clearTimeout(initialDelay);
    };
  }, []); // Run only on mount

  // Auto-scroll animation loop
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const trackEl = trackRef.current;
    if (!trackEl) return;

    if (!isAutoScrolling) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    let lastTimestamp = performance.now();

    const step = (timestamp) => {
      if (!trackRef.current) return;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const distance = delta * AUTO_SCROLL_SPEED;
      const resetWidth = originalWidthRef.current || (trackRef.current.scrollWidth / REPEAT_COUNT) || 1;

      // Move track left (negative X)
      trackXRef.current -= distance;
      if (trackXRef.current <= -resetWidth) {
        trackXRef.current += resetWidth;
      }
      trackEl.style.transform = `translateX(${trackXRef.current}px)`;

      // Determine first visible card index to highlight
      const cardWidth = cardWidthRef.current;
      const viewportEl = carouselRef.current;
      if (cardWidth > 0 && viewportEl) {
        const visibleOffset = -trackXRef.current;
        const viewportWidth = viewportEl.clientWidth || 0;
        // Activation line measured from the left edge of the viewport.
        const activationX = Math.max(0, viewportWidth - RIGHT_ACTIVATION_INSET_PX);
        // Pick the card whose center is closest to the activation line (stable and precise).
        const indexNearLine = Math.round(
          (visibleOffset + activationX - (cardWidth / 2)) / cardWidth
        );
        const repeatedLength = repeatedCategories.length;
        const globalIndex = ((indexNearLine % repeatedLength) + repeatedLength) % repeatedLength;
        if (activeIndexRef.current !== globalIndex) {
          activeIndexRef.current = globalIndex;
          setActiveGlobalIndex(globalIndex);
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame((timestamp) => {
      lastTimestamp = timestamp;
      step(timestamp);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isAutoScrolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearScheduledResume();
    };
  }, [clearScheduledResume]);

  // Helper function to get and set a random testimonial for a category
  const setRandomTestimonialForCategory = useCallback((categoryName) => {
    // Map category names to testimonial keys (handles special cases like "New Arrivals" -> "newArrivals")
    const categoryToKeyMap = {
      'New Arrivals': 'newArrivals',
      'Hair Care': 'products',
      'Products': 'products', // Keep for backwards compatibility
      'Body & Skin': 'bodySkin',
      'Apparel': 'apparel',
      'Books': 'books',
      'Mentorship': 'mentorship',
      'Advertise': 'advertise',
      'Franchise': 'franchise',
      'Speaking Engagements': 'speakingEngagements',
    };
    
    const key = categoryToKeyMap[categoryName] || 'newArrivals';
    const rawList = categoryTestimonials[key] || categoryTestimonials.newArrivals;
    
    // Filter out any empty or invalid testimonials
    const list = Array.isArray(rawList) ? rawList.filter(t => t && t.name && t.quote) : [];
    
    if (list && list.length > 0) {
      // Randomly select from all available testimonials in the category
      // Use crypto.getRandomValues for better randomness if available
      const randomIdx = typeof crypto !== 'undefined' && crypto.getRandomValues
        ? crypto.getRandomValues(new Uint32Array(1))[0] % list.length
        : Math.floor(Math.random() * list.length);
      const selectedTestimonial = list[randomIdx];
      setActiveTestimonial(selectedTestimonial);
      
      // Cache the image for this category when testimonial is selected
      if ((categoryName === 'Hair Care' || categoryName === 'Products') && selectedTestimonial.productImage) {
        categoryImageCacheRef.current['Hair Care'] = selectedTestimonial.productImage;
      } else if (categoryName === 'Body & Skin' && selectedTestimonial.productImage) {
        categoryImageCacheRef.current['Body & Skin'] = selectedTestimonial.productImage;
      } else if (categoryName === 'Books' && selectedTestimonial.bookImage) {
        categoryImageCacheRef.current['Books'] = selectedTestimonial.bookImage;
      } else if (categoryName === 'Advertise' && selectedTestimonial.advertiseImage) {
        categoryImageCacheRef.current['Advertise'] = selectedTestimonial.advertiseImage;
      } else if (categoryName === 'Franchise' && selectedTestimonial.shopImage) {
        categoryImageCacheRef.current['Franchise'] = selectedTestimonial.shopImage;
      }
    } else {
      // Fallback to newArrivals if current category has no testimonials
      const fallbackList = categoryTestimonials.newArrivals || [];
      const validFallback = fallbackList.filter(t => t && t.name && t.quote);
      if (validFallback.length > 0) {
        setActiveTestimonial(validFallback[0]);
      } else {
        setActiveTestimonial(null);
      }
    }
  }, []);

  // Set initial testimonial for "New Arrivals" on mount
  useEffect(() => {
    setRandomTestimonialForCategory('New Arrivals');
  }, [setRandomTestimonialForCategory]); // Run only on mount

  // Sync a random testimonial with the active category whenever it changes
  // Skip initial mount (when activeGlobalIndex is 0) since we already set it above
  useEffect(() => {
    // Skip if this is the initial render and index is 0
    if (prevActiveIndexRef.current === null) {
      prevActiveIndexRef.current = activeGlobalIndex;
      return;
    }
    
    // Only update if the index actually changed
    if (prevActiveIndexRef.current !== activeGlobalIndex) {
      const baseIndex = activeGlobalIndex % categories.length;
      const categoryName = categories[baseIndex]?.name || 'New Arrivals';
      setRandomTestimonialForCategory(categoryName);
      prevActiveIndexRef.current = activeGlobalIndex;
    }
  }, [activeGlobalIndex, setRandomTestimonialForCategory]);

  // Trigger bag wiggle animation when active category changes
  useEffect(() => {
    const bagEl = bagRef.current;
    if (!bagEl) return;

    // Add wiggle class
    bagEl.classList.add('wiggle');
    
    // Remove wiggle class after animation completes (0.4s as per CSS)
    const timeoutId = setTimeout(() => {
      bagEl.classList.remove('wiggle');
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeGlobalIndex]);


  const handleCardClick = (category) => {
    pauseAutoScroll();

    window.setTimeout(() => {
      navigate(category.route);

      if (!category.route.includes('#')) {
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }, 300);
  };

  const handleNextClick = () => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    pauseAutoScroll();

    const cardWidth = cardWidthRef.current || 220;
    const resetWidth = originalWidthRef.current || (trackEl.scrollWidth / REPEAT_COUNT) || cardWidth;

    // Compute target transform position (move one card to the left)
    let targetX = trackXRef.current - cardWidth;
    if (targetX <= -resetWidth) {
      targetX += resetWidth;
    }
    // Smooth transition for manual step
    trackEl.style.transition = 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1)';
    trackEl.style.transform = `translateX(${targetX}px)`;
    trackXRef.current = targetX;
    // Clean up transition after it completes
    window.setTimeout(() => {
      if (trackEl) {
        trackEl.style.transition = 'none';
      }
    }, 340);

    // Update active index after manual step
    if (cardWidth > 0) {
      const viewportEl = carouselRef.current;
      const viewportWidth = viewportEl ? viewportEl.clientWidth : 0;
      const visibleOffset = -trackXRef.current;
      const activationX = Math.max(0, viewportWidth - RIGHT_ACTIVATION_INSET_PX);
      const indexNearLine = Math.round(
        (visibleOffset + activationX - (cardWidth / 2)) / cardWidth
      );
      const repeatedLength = repeatedCategories.length;
      const globalIndex = ((indexNearLine % repeatedLength) + repeatedLength) % repeatedLength;
      activeIndexRef.current = globalIndex;
      setActiveGlobalIndex(globalIndex);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      resumeAutoScroll();
    }, 1000);
  };

  const baseIndex = activeGlobalIndex % categories.length;
  const currentName = categories[baseIndex]?.name || 'New Arrivals';
  
  // Get the product/book/shop image for Products/Books/Franchise categories
  // Uses cached image that persists until the category becomes active again with a new testimonial
  const getCategoryImage = (category) => {
    // Check if we have a cached image for this category
    if (category.name === 'Hair Care' && categoryImageCacheRef.current['Hair Care']) {
      return categoryImageCacheRef.current['Hair Care'];
    }
    if (category.name === 'Body & Skin' && categoryImageCacheRef.current['Body & Skin']) {
      return categoryImageCacheRef.current['Body & Skin'];
    }
    if (category.name === 'Products' && categoryImageCacheRef.current['Products']) {
      return categoryImageCacheRef.current['Products'];
    }
    if (category.name === 'Books' && categoryImageCacheRef.current['Books']) {
      return categoryImageCacheRef.current['Books'];
    }
    if (category.name === 'Advertise' && categoryImageCacheRef.current['Advertise']) {
      return categoryImageCacheRef.current['Advertise'];
    }
    if (category.name === 'Franchise' && categoryImageCacheRef.current['Franchise']) {
      return categoryImageCacheRef.current['Franchise'];
    }
    
    // Return default image if no cached image exists
    return category.image;
  };
  
  const renderTitle = () => {
    if (currentName === 'Franchise') {
      return (
        <>
          Franchise<br />with us
        </>
      );
    } else if (currentName === 'Advertise') {
      return (
        <>
          Advertise<br />with us
        </>
      );
    } else if (currentName === 'Mentorship') {
      return (
        <>
          Mentorship<br />program
        </>
      );
    } else if (currentName === 'Speaking Engagements') {
      return (
        <>
          Speaking<br />Engagements
        </>
      );
    } else {
      return 'Shop\nby categories';
    }
  };

  return (
    <section className="shop-by-category">
      <div className="shop-by-category__container">
        <div className="shop-by-category__title" ref={titleRef}>
          <h2 className="shop-by-category__heading">
            {renderTitle()}
          </h2>
          {activeTestimonial && (
            <div className="category-testimonials">
              <div className="category-testimonial">
                <div className="category-testimonial__avatar-wrapper">
                  <div className="category-testimonial__avatar">
                    <img src={activeTestimonial.photoUrl} alt={activeTestimonial.name} />
                  </div>
                </div>
                <div className="category-testimonial__content">
                  <blockquote className="category-testimonial__quote">
                    {/* small quote icon via unicode to avoid extra import here */}
                    <span className="category-testimonial__quote-icon" aria-hidden>“</span>
                    <p className="category-testimonial__quote-text">{activeTestimonial.quote}</p>
                  </blockquote>
                  <div className="category-testimonial__name">{activeTestimonial.name}</div>
                </div>
              </div>
            </div>
          )}
          {(() => {
            const baseIndex = activeGlobalIndex % categories.length;
            const currentName = categories[baseIndex]?.name || 'New Arrivals';
            const hideBag =
              currentName === 'Franchise' ||
              currentName === 'Advertise' ||
              currentName === 'Mentorship' ||
              currentName === 'Speaking Engagements';
            return hideBag ? null : (
              <div className="bag-demo">
                <div className="bag" ref={bagRef}>
                  <div className="bag-body"></div>
                  <div className="bag-handle"></div>
                </div>
              </div>
            );
          })()}

        </div>

        <div
          className="shop-by-category__carousel-wrapper"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={resumeAutoScroll}
        >
          <div ref={carouselRef} className="shop-by-category__carousel">
            <div ref={trackRef} className="shop-by-category__track">
              {repeatedCategories.map((category, index) => (
              <motion.div
                key={`${category.name}-${index}`}
                className={`category-card ${index === activeGlobalIndex ? 'is-active' : ''}`}
                onClick={() => handleCardClick(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="category-card__image-wrapper">
                  <img
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="category-card__image"
                  />
                  <div className="category-card__overlay"></div>
                </div>
                <div className="category-card__name">
                  {category.name === 'New Arrivals' ? (
                    <>
                      New Arrivals{' '}
                      <span className="flame-emoji">🔥</span>
                    </>
                  ) : (
                    category.name
                  )}
                </div>
              </motion.div>
              ))}
            </div>
          </div>

          <button
            className="carousel-nav-button"
            onClick={handleNextClick}
            aria-label="View next category"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;

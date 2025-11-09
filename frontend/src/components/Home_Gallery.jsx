import { useState, useRef, useEffect } from 'react';
import '../styles/home-gallery.css';

const HomeGallery = () => {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // RAF loop state
  const rafIdRef = useRef(0);
  const lastTsRef = useRef(0);
  const offsetPxRef = useRef(0); // how far we've scrolled (positive -> left)
  const halfWidthPxRef = useRef(0); // width of one full image set
  const slideWidthPxRef = useRef(0); // width of a single slide (responsive)
  const playingRef = useRef(true);

  // Import ALL images in the gallery folder (future-proof). Supports common extensions
  const webpModules = import.meta.glob('../assets/gallery/*.webp', { eager: true });
  const otherModules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,gif}', { eager: true });
  const galleryModules = { ...webpModules, ...otherModules };

  const servicesImages = Object.entries(galleryModules)
    .map(([path, mod]) => {
      const filename = path.split('/').pop() || '';
      const numMatch = filename.match(/(\d+)/);
      const num = numMatch ? parseInt(numMatch[1], 10) : Number.MAX_SAFE_INTEGER;
      return {
        id: num,
        src: mod.default,
        alt: filename
      };
    })
    .sort((a, b) => (a.id - b.id) || a.alt.localeCompare(b.alt));

  // Create extended array for seamless infinite loop - duplicate the array
  const extendedImages = [...servicesImages, ...servicesImages];

  // Helper to apply transform without layout thrash
  const setTrackX = (xPx) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${-xPx}px)`; // translate track left by x
  };

  // Measure sizes and initialize loop
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstSlide = track.querySelector('.services-gallery-slide');
      if (firstSlide) {
        slideWidthPxRef.current = firstSlide.getBoundingClientRect().width;
      }
      halfWidthPxRef.current = slideWidthPxRef.current * servicesImages.length; // one set
    };

    measure();
    const onResize = () => {
      const prevSlideWidth = slideWidthPxRef.current || 1;
      measure();
      // Re-scale offset proportionally to slide width change to avoid jumps
      const ratio = prevSlideWidth ? slideWidthPxRef.current / prevSlideWidth : 1;
      offsetPxRef.current = offsetPxRef.current * ratio;
      setTrackX(offsetPxRef.current % (halfWidthPxRef.current || 1));
    };
    window.addEventListener('resize', onResize);

    // RAF loop
    const speedPxPerSec = 20; // tune speed here
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (playingRef.current && !isNavigating) {
        offsetPxRef.current += speedPxPerSec * dt;
        const limit = halfWidthPxRef.current || 1;
        if (offsetPxRef.current >= limit) {
          offsetPxRef.current -= limit; // seamless wrap
        }
        setTrackX(offsetPxRef.current);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Navigation functions
  const togglePause = () => {
    playingRef.current = !playingRef.current;
    setIsPaused(!playingRef.current);
  };

  const goToSlide = (index) => {
    if (isNavigating) return; // Prevent rapid clicking
    const track = trackRef.current;
    if (!track) return;

    setIsNavigating(true);
    const targetOffset = (index * (slideWidthPxRef.current || 1)) % (halfWidthPxRef.current || 1);

    // Pause the RAF loop for manual navigation
    const prevPlaying = playingRef.current;
    playingRef.current = false;
    setIsPaused(true);

    // Animate to the next position smoothly using CSS transition
    track.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    offsetPxRef.current = targetOffset;
    setTrackX(offsetPxRef.current);
    setCurrentIndex(index);

    // After transition completes, remove transition and optionally resume
    const onDone = () => {
      track.style.transition = 'none';
      track.removeEventListener('transitionend', onDone);
      clearTimeout(safetyTimer);
      setIsNavigating(false);
      // Resume after a beat for seamlessness
      setTimeout(() => {
        playingRef.current = prevPlaying;
        setIsPaused(!prevPlaying);
      }, 150);
    };
    // Fallback in case transitionend doesn’t fire (e.g., zero movement)
    const safetyTimer = setTimeout(onDone, 600);
    track.addEventListener('transitionend', onDone);
  };

  const nextSlide = () => {
    if (isNavigating) return;
    const nextIndex = (currentIndex + 1) % servicesImages.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    if (isNavigating) return;
    const prevIndex = currentIndex === 0 ? servicesImages.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  };

  // Auto-resume is now handled in goToSlide function

  return (
    <section className="home-gallery-section">
        <div className="home-gallery-carousel">
          <div className="home-gallery-wrapper">
            <div 
              ref={trackRef}
              className="home-gallery-track"
            >
              {extendedImages.map((image, index) => (
                <div key={`${image.id}-${index}`} className="services-gallery-slide">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="home-gallery-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="home-gallery-controls-wrapper">
          <div className="home-gallery-controls">
            <button 
              className="home-gallery-nav-btn home-gallery-nav-btn--prev home-gallery-prev-btn" 
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            <button 
              className="home-gallery-pause-btn"
              onClick={togglePause}
              aria-label={isPaused ? "Resume animation" : "Pause animation"}
            >
              {isPaused ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </button>

            <button 
              className="home-gallery-nav-btn home-gallery-nav-btn--next home-gallery-next-btn" 
              onClick={nextSlide}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
          
          {/* Divider */}
          <div className="home-gallery-divider"></div>
        </div>
      </section>
  );
};

export default HomeGallery;

import { useState, useEffect, useRef } from 'react';
import '../styles/gallery.css';

const Gallery = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrapperRef = useRef(null);

  // Gallery images - dynamically generate array for all 60 images
  const totalImages = 60;
  const images = Array.from({ length: totalImages }, (_, index) => ({
    id: index + 1,
    src: `/src/assets/gallery/image-${index + 1}.webp`,
    alt: `Barbershop Interior ${index + 1}`
  }));

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const node = wrapperRef.current;
    if (node) {
      // Get the width of one image (first slide)
      const firstSlide = node.querySelector('.carousel-slide');
      const imageWidth = firstSlide ? firstSlide.offsetWidth : node.clientWidth;
      const maxScroll = node.scrollWidth - node.clientWidth;
      
      // Check if we're at or near the end
      if (node.scrollLeft + imageWidth >= maxScroll) {
        // Scroll to the beginning
        node.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll by one image width
        node.scrollBy({ left: imageWidth, behavior: 'smooth' });
      }
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const node = wrapperRef.current;
    if (node) {
      // Get the width of one image (first slide)
      const firstSlide = node.querySelector('.carousel-slide');
      const imageWidth = firstSlide ? firstSlide.offsetWidth : node.clientWidth;
      
      // Check if we're at or near the beginning
      if (node.scrollLeft - imageWidth <= 0) {
        // Scroll to the end
        const maxScroll = node.scrollWidth - node.clientWidth;
        node.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        // Scroll by one image width backward
        node.scrollBy({ left: -imageWidth, behavior: 'smooth' });
      }
    }
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Optional: Auto-play functionality (disabled to avoid unexpected scroll)

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="carousel-container">
          <div className="carousel-wrapper" ref={wrapperRef}>
            <div className="carousel-track">
              {images.map((image, index) => (
                <div key={image.id} className="carousel-slide">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="carousel-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            className="carousel-nav carousel-nav--prev"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            className="carousel-nav carousel-nav--next"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

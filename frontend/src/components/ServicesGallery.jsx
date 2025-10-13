import { useState, useEffect, useRef } from 'react';
import '../styles/services-gallery.css';

const ServicesGallery = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrapperRef = useRef(null);

  // Services-specific gallery images - using a different subset or different images
  const servicesImages = [
    { id: 1, src: '/src/assets/gallery/image-1.webp', alt: 'Haircut Service 1' },
    { id: 2, src: '/src/assets/gallery/image-2.webp', alt: 'Haircut Service 2' },
    { id: 3, src: '/src/assets/gallery/image-3.webp', alt: 'Haircut Service 3' },
    { id: 4, src: '/src/assets/gallery/image-4.webp', alt: 'Haircut Service 4' },
    { id: 5, src: '/src/assets/gallery/image-5.webp', alt: 'Haircut Service 5' },
    { id: 6, src: '/src/assets/gallery/image-6.webp', alt: 'Haircut Service 6' },
    { id: 7, src: '/src/assets/gallery/image-7.webp', alt: 'Haircut Service 7' },
    { id: 8, src: '/src/assets/gallery/image-8.webp', alt: 'Haircut Service 8' },
    { id: 9, src: '/src/assets/gallery/image-9.webp', alt: 'Haircut Service 9' },
    { id: 10, src: '/src/assets/gallery/image-10.webp', alt: 'Haircut Service 10' },
    { id: 11, src: '/src/assets/gallery/image-11.webp', alt: 'Haircut Service 11' },
    { id: 12, src: '/src/assets/gallery/image-12.webp', alt: 'Haircut Service 12' },
    // Add more specific images for services page
  ];

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
        // Scroll to the next image
        node.scrollBy({ left: imageWidth, behavior: 'smooth' });
      }
      
      // Reset transition state after animation
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const node = wrapperRef.current;
    if (node) {
      // Get the width of one image (first slide)
      const firstSlide = node.querySelector('.carousel-slide');
      const imageWidth = firstSlide ? firstSlide.offsetWidth : node.clientWidth;
      
      // Check if we're at the beginning
      if (node.scrollLeft <= 0) {
        // Scroll to the end
        node.scrollTo({ left: node.scrollWidth, behavior: 'smooth' });
      } else {
        // Scroll to the previous image
        node.scrollBy({ left: -imageWidth, behavior: 'smooth' });
      }
      
      // Reset transition state after animation
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <section className="services-gallery-section">
        <div className="services-gallery-carousel">
          <button 
            className="services-gallery-nav services-gallery-nav--prev" 
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <div className="services-gallery-wrapper" ref={wrapperRef}>
            <div className="services-gallery-track">
              {servicesImages.map((image) => (
                <div key={image.id} className="services-gallery-slide">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="services-gallery-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="services-gallery-nav services-gallery-nav--next" 
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
    </section>
  );
};

export default ServicesGallery;

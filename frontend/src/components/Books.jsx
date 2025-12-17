import React, { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import '../styles/books.css';
import ClipCultureManual from '../assets/Books/Clip Culture Manual.webp';
import ClipCultureManual2 from '../assets/Books/Clip Culture Manual 2.webp';
import ClipCultureManual2Extended from '../assets/Books/Clip Culture Manual 2- Extended Edition.webp';

const Books = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const measureAndSetTitleHeight = () => {
      const gridEl = gridRef.current;
      if (!gridEl) return;
      const titleNodes = gridEl.querySelectorAll('.book-card__name');
      if (!titleNodes.length) return;
      let max = 0;
      titleNodes.forEach((node) => {
        // Reset to natural height before measuring in case of previous min-height
        const prevMin = node.style.minHeight;
        node.style.minHeight = 'auto';
        const h = node.offsetHeight;
        if (h > max) max = h;
        node.style.minHeight = prevMin;
      });
      gridEl.style.setProperty('--book-title-height', `${max}px`);
    };

    // Measure after paint
    const rAF = requestAnimationFrame(measureAndSetTitleHeight);
    window.addEventListener('resize', measureAndSetTitleHeight);

    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener('resize', measureAndSetTitleHeight);
    };
  }, []);
  const products = [
    {
      id: 101,
      name: "Clip Culture Manual",
      price: 18.5,
      rating: 4.8,
      image: ClipCultureManual,
      slug: "clip-culture-manual",
      buyLink: "https://shop.ingramspark.com/b/084?params=nv5ulUqVf9ES5v2YNYUGcHbeQHfLZa5XBfd5giVrX4a",
      format: "Paperback",
      size: "5.5 × 8.5 inches",
      pages: 176,
      isbn: "978-1-953307-48-4"
    },
    {
      id: 102,
      name: "Clip Culture Manual 2",
      price: 22,
      rating: 5,
      image: ClipCultureManual2,
      slug: "clip-culture-manual-2",
      buyLink: "https://shop.ingramspark.com/b/084?params=rps7H6hG1HCmZxRsFHT71PDpSfy0Lz9HKTnFGokLzOM",
      format: "Paperback",
      size: "5 × 8 inches",
      pages: 186,
      isbn: "9781963874020"
    },
    {
      id: 103,
      name: "Clip Culture Manual 2 - Extended Edition",
      price: 22,
      rating: 4.9,
      image: ClipCultureManual2Extended,
      slug: "clip-culture-manual-2-extended-edition",
      buyLink: "https://shop.ingramspark.com/b/084?params=kGQtRncWXZY5F4PhfMqloz4XWCw5scnMTe6xPsyEzpo",
      format: "Paperback",
      size: "5 × 8 inches",
      pages: 156,
      isbn: "978-1-957092-96-6"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">★</span>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      );
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">★</span>
      );
    }

    return stars;
  };

  return (
    <section id="books" className="books">
      <div className="books__container">
        <div className="books__header">
          <h2 className="books__title">Master the Craft. Lead the <em>CULTURE</em>.</h2>
          <p className="books__subtitle">Transform how you think, lead, and grow with every page.</p>
        </div>
        
        <div className="books__grid" ref={gridRef}>
          {products.map((product) => (
            <div key={product.id} className="book-card">
              <div className="book-card__image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="book-card__image"
                  loading="lazy"
                />
              </div>
              <div className="book-card__content">
                <h3 className="book-card__name">{product.name}</h3>
                <div className="book-card__price">
                  <span className="book-card__price-prefix">Starting at</span>
                  <span className="book-card__price-amount">${product.price}</span>
                </div>
                <div className="book-card__rating">
                  {renderStars(product.rating)}
                  <span className="book-card__rating-text">({product.rating})</span>
                </div>
                <div className="book-card__actions">
                  <a 
                    href={product.buyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="book-card__buy-btn"
                  >
                    <ExternalLink size={16} />
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;

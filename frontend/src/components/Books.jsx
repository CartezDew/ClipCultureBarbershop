import React, { useState, useEffect, useRef } from 'react';
import '../styles/books.css';
import AmazonImage from '../assets/Books/Amazon.png';

const Books = () => {
  const gridRef = useRef(null);
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => quantities[productId] || 1;

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities({ ...quantities, [productId]: newQuantity });
    }
  };

  const decreaseQuantity = (productId) => {
    const current = getQuantity(productId);
    if (current > 1) {
      updateQuantity(productId, current - 1);
    }
  };

  const increaseQuantity = (productId) => {
    const current = getQuantity(productId);
    updateQuantity(productId, current + 1);
  };

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
      id: 1,
      name: "Clip Culture Manual",
      price: 9.99,
      rating: 4.8,
      image: "/src/assets/Books/Clip Culture Manual.webp",
      slug: "Clip Culture Manual",
      amazonLink: "https://a.co/d/6JUYT4X"
    },
    {
      id: 2,
      name: "Clip Culture Mnaual 2",
      price: 9.19,
      rating: 5,
      image: "/src/assets/Books/Clip Culture Manual 2.webp",
      slug: "Clip Culture Mnaual 2",
      amazonLink: "https://a.co/d/5lDgae3"
    },
    {
      id: 3,
      name: "Clip Culture Mnaual 2- Extended Edition",
      price: 9.19,
      rating: 4.9,
      image: "/src/assets/Books/Clip Culture Manual 2- Extended Edition.webp",
      slug: "Clip Culture Mnaual 2- Extended Edition",
      amazonLink: "https://a.co/d/7J9qXKz"
    },
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
                <div className="book-card__quantity">
                  <label className="book-card__quantity-label">Quantity</label>
                  <div className="book-card__quantity-selector">
                    <button 
                      className="quantity-btn quantity-btn--minus"
                      onClick={() => decreaseQuantity(product.id)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      className="quantity-input" 
                      value={getQuantity(product.id)}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        updateQuantity(product.id, value);
                      }}
                      min="1"
                    />
                    <button 
                      className="quantity-btn quantity-btn--plus"
                      onClick={() => increaseQuantity(product.id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="book-card__actions">
                  <a 
                    href={product.amazonLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="amazon-button"
                  >
                    <img 
                      src={AmazonImage} 
                      alt="Order now at amazon.com" 
                      className="amazon-button__image"
                    />
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

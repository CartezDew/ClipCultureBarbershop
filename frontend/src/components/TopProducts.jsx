import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import '../styles/top-products.css';
import Product1 from '../assets/products/Product-1.webp';
import Product2 from '../assets/products/Product-2.webp';
import Product3 from '../assets/products/Product-3.webp';
import Product4 from '../assets/products/Product-4.webp';
import Product5 from '../assets/products/Product-5 .webp';
import Product6 from '../assets/products/Product-6.webp';
import BeardLineUp1 from '../assets/products/Beard-Line-Up-1.webp';
import BeardLineUp2 from '../assets/products/Beard-Line-Up-2.webp';

const TopProducts = ({ limit }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [quantities, setQuantities] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Refs to card containers, name elements, and rating elements
  const cardRefs = useRef([]);
  const nameRefs = useRef([]);
  const ratingRefs = useRef([]);

  // Dynamic first-row syncing
  const [firstRowNameHeight, setFirstRowNameHeight] = useState(null); // px number
  const [firstRowRatingHeight, setFirstRowRatingHeight] = useState(null); // px number
  const [firstRowIndices, setFirstRowIndices] = useState(new Set());

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
    const computeSync = () => {
      const firstCard = cardRefs.current[0];
      if (!firstCard) {
        return;
      }

      const rowTop = firstCard.offsetTop;
      const indices = new Set();
      cardRefs.current.forEach((el, idx) => {
        if (el && el.offsetTop === rowTop) indices.add(idx);
      });

      // Find the maximum heights among all first-row cards
      let maxNameHeight = 0;
      let maxRatingHeight = 0;
      
      indices.forEach(idx => {
        const nameEl = nameRefs.current[idx];
        const ratingEl = ratingRefs.current[idx];
        if (nameEl) {
          maxNameHeight = Math.max(maxNameHeight, nameEl.offsetHeight);
        }
        if (ratingEl) {
          maxRatingHeight = Math.max(maxRatingHeight, ratingEl.offsetHeight);
        }
      });

      setFirstRowIndices(indices);
      setFirstRowNameHeight(maxNameHeight); // Apply the maximum name height
      setFirstRowRatingHeight(maxRatingHeight); // Apply the maximum rating height
    };

    // Initial computation after a delay for layout to settle
    const id = window.setTimeout(computeSync, 100);
    
    // Also recompute after a bit more time for images to load
    const id2 = window.setTimeout(computeSync, 500);
    
    window.addEventListener('resize', computeSync);
    
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(id2);
      window.removeEventListener('resize', computeSync);
    };
  }, []); // Empty dependency - runs once on mount and cleanup on unmount
  const products = [
    {
      id: 0,
      name: "Beard & Line Up Enhancement",
      priceFrom: 25,
      rating: null,
      image: BeardLineUp1,
      hoverImage: BeardLineUp2,
      slug: "beard-line-up-enhancement",
      sizes: ["2 oz", "4 oz"],
      isNewDrop: true,
      buyLink: "https://shopclipculture.com/products/revive-premium-beard-line-up-enhancement?variant=47472947200225"
    },
    {
      id: 1,
      name: "Curl Twist",
      price: 20,
      rating: 5,
      image: Product1,
      slug: "curl-twist",
      size: null,
      buyLink: "https://shopclipculture.com/products/curl-twist"
    },
    {
      id: 2,
      name: "Magic Beard Balm",
      price: 20,
      rating: 5,
      image: Product2,
      slug: "magic-beard-balm",
      size: null,
      buyLink: "https://shopclipculture.com/products/magic-beard-balm"
    },
    {
      id: 3,
      name: "Premium Beard Oil",
      price: 20,
      rating: 5,
      image: Product3,
      slug: "premium-beard-oil",
      size: null,
      buyLink: "https://shopclipculture.com/products/premium-beard-oil"
    },
    {
      id: 4,
      name: "Beard Wash",
      price: 20,
      rating: 5,
      image: Product4,
      slug: "beard-wash",
      size: null,
      buyLink: "https://shopclipculture.com/products/beard-wash"
    },
    {
      id: 5,
      name: "Body Lotion",
      price: 20,
      rating: 4.6,
      image: Product5,
      slug: "body-lotion",
      size: null,
      buyLink: "https://shopclipculture.com/products/intensive-body-lotion"
    },
    {
      id: 6,
      name: "Body Wash",
      price: 20,
      rating: 4,
      image: Product6,
      slug: "body-wash",
      size: "16 oz",
      buyLink: "https://shopclipculture.com/products/body-wash"
    }
  ];

  const renderStars = (rating) => {
    if (rating === null || rating === undefined) {
      return null;
    }
    
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
    <>
      <section className="top-products" id="premium-grooming-products">
        <div className="top-products__container">
          <div className="top-products__header">
            <h2 className="top-products__title">Premium Grooming Products</h2>
            <p className="top-products__subtitle">Investing in yourself goes beyond the chair…</p>
          </div>
          
          <div className="top-products__grid">
            {(limit ? products.slice(0, limit) : products).map((product, index) => (
              <div 
                key={product.id} 
                className="product-card"
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="product-card__image-container">
                  <img 
                    src={hoveredProduct === product.id && product.hoverImage ? product.hoverImage : product.image} 
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                  {product.sizes && (
                    <span className="product-card__sizes-badge">
                      {product.sizes.join(' / ')}
                    </span>
                  )}
                </div>
                <div className="product-card__content">
                  <h3 
                    className="product-card__name"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <div className="product-card__price">
                    {product.priceFrom ? `From $${product.priceFrom}` : `$${product.price}`}
                  </div>
                  <div 
                    className="product-card__rating"
                    ref={(el) => (ratingRefs.current[index] = el)}
                    style={firstRowRatingHeight && firstRowIndices.has(index) ? { minHeight: `${firstRowRatingHeight}px` } : undefined}
                  >
                    {product.isNewDrop ? (
                      <span className="product-card__new-drop">
                        new drop{' '}
                        <span className="fire-emoji">🔥</span>
                        <span className="fire-emoji">🔥</span>
                        <span className="fire-emoji">🔥</span>
                      </span>
                    ) : (
                      <>
                        {renderStars(product.rating)}
                        {product.rating !== null && product.rating !== undefined && (
                          <span className="product-card__rating-text">({product.rating})</span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="product-card__quantity">
                    <label className="product-card__quantity-label">Quantity</label>
                    <div className="product-card__quantity-selector">
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
                  <div className="product-card__actions">
                    <a 
                      href={product.buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="productbtn--buy-now"
                    >
                      <ExternalLink size={16} />
                      Buy Now
                    </a>
                    <Link 
                      to={`/products/${product.slug}`} 
                      state={{ from: isHomePage ? 'home' : 'shop' }}
                      className="productbtn--learn-more"
                    >
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {isHomePage && (
            <div className="top-products__cta">
              <Link to="/shop" className="top-products__view-all-btn">
                View All Products
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TopProducts;

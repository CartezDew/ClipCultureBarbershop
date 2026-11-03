import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/top-products.css';
import Product1 from '../assets/products/Product-1.webp';
import CurlTwistBack from '../assets/products/curl-twist-ingredients-back.webp';
import BalmFront from '../assets/products/magic-beard-balm-front.webp';
import BalmBack from '../assets/products/magic-beard-balm-ingredients-back.webp';
import OilFront from '../assets/products/premium-beard-oil-front.webp';
import OilBack from '../assets/products/premium-beard-oil-ingredients-back.webp';
import ShampooFront from '../assets/products/therapeutic-shampoo-front.webp';
import ShampooBack from '../assets/products/therapeutic-shampoo-ingredients-back.webp';
import LotionFront from '../assets/products/rich-shea-butter-front.webp';
import LotionBack from '../assets/products/rich-shea-butter-ingredients-back.webp';
import GelFront from '../assets/products/bath-shower-gel-front.webp';
import GelBack from '../assets/products/bath-shower-gel-ingredients-back.webp';
import BeardLineUp1 from '../assets/products/Beard-Line-Up-1.webp';
import BeardLineUp2 from '../assets/products/Beard-Line-Up-2.webp';

const TopProducts = ({ limit }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Refs to card containers, name elements, and rating elements
  const cardRefs = useRef([]);
  const nameRefs = useRef([]);
  const ratingRefs = useRef([]);

  // Dynamic first-row syncing
  const [firstRowNameHeight, setFirstRowNameHeight] = useState(null); // px number
  const [firstRowRatingHeight, setFirstRowRatingHeight] = useState(null); // px number
  const [firstRowIndices, setFirstRowIndices] = useState(new Set());

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
      id: 2,
      name: "Magic Beard Balm",
      price: 25,
      rating: 5,
      image: BalmFront,
      hoverImage: BalmBack,
      slug: "magic-beard-balm",
      size: "6.8 oz",
      isNewDrop: true
    },
    {
      id: 3,
      name: "Premium Beard Oil",
      price: 25,
      rating: 5,
      image: OilFront,
      hoverImage: OilBack,
      slug: "premium-beard-oil",
      size: "3.38 oz",
      isNewDrop: true
    },
    {
      id: 4,
      name: "Therapeutic Shampoo",
      price: 25,
      rating: 5,
      image: ShampooFront,
      hoverImage: ShampooBack,
      slug: "therapeutic-shampoo",
      size: null,
      isNewDrop: true
    },
    {
      id: 5,
      name: "Rich Shea Butter",
      price: 25,
      rating: 4.6,
      image: LotionFront,
      hoverImage: LotionBack,
      slug: "rich-shea-butter",
      size: null,
      isNewDrop: true
    },
    {
      id: 6,
      name: "Bath & Shower Gel",
      price: 25,
      rating: 4,
      image: GelFront,
      hoverImage: GelBack,
      slug: "bath-shower-gel",
      size: "16.9 oz",
      isNewDrop: true
    },
    {
      id: 1,
      name: "Curl Twist",
      price: 25,
      rating: 5,
      image: Product1,
      hoverImage: CurlTwistBack,
      slug: "curl-twist",
      size: null
    },
    {
      id: 0,
      name: "Beard & Line Up Enhancement",
      price: 25,
      rating: null,
      image: BeardLineUp1,
      hoverImage: BeardLineUp2,
      slug: "beard-line-up-enhancement",
      sizes: ["2 oz", "4 oz"]
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
                onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHoveredProduct(product.id); }}
                onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHoveredProduct(null); }}
              >
                <div className="product-card__image-container">
                  {product.hoverImage ? (
                    <button
                      type="button"
                      className="product-card__image-toggle"
                      aria-label={`Show ${selectedProduct === product.id ? 'front' : 'back'} of ${product.name}`}
                      aria-pressed={selectedProduct === product.id}
                      onClick={() => setSelectedProduct(current => current === product.id ? null : product.id)}
                    >
                      <img
                        src={hoveredProduct === product.id || selectedProduct === product.id ? product.hoverImage : product.image}
                        alt={hoveredProduct === product.id || selectedProduct === product.id ? `${product.name} back label` : product.name}
                        className="product-card__image"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
                  )}
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
                    ${product.price}
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
                  <div className="product-card__in-store-notice">
                    <span className="product-card__in-store-badge">In-Store Only</span>
                  </div>
                  <div className="product-card__actions product-card__actions--single">
                    <Link 
                      to={`/products/${product.slug}`} 
                      state={{ from: isHomePage ? 'home' : 'shop' }}
                      className="productbtn--learn-more productbtn--full-width"
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

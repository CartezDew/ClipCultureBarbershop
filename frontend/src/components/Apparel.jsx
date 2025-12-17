import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import '../styles/top-products.css';
import Product7 from '../assets/products/Product-7.webp';
import Product10 from '../assets/products/Product-10.webp';
import Product11 from '../assets/products/Product-11.webp';
import Product8 from '../assets/products/Product-12.webp';
import Product9 from '../assets/products/Product-13.webp';
import Product12 from '../assets/products/Product-8.webp';

const Apparel = ({ limit }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Refs to card containers, name elements, and rating elements
  const cardRefs = useRef([]);
  const nameRefs = useRef([]);
  const ratingRefs = useRef([]);

  // Dynamic first-row syncing
  const [firstRowNameHeight, setFirstRowNameHeight] = useState(null);
  const [firstRowRatingHeight, setFirstRowRatingHeight] = useState(null);
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
      setFirstRowNameHeight(maxNameHeight);
      setFirstRowRatingHeight(maxRatingHeight);
    };

    const id = window.setTimeout(computeSync, 100);
    const id2 = window.setTimeout(computeSync, 500);
    
    window.addEventListener('resize', computeSync);
    
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(id2);
      window.removeEventListener('resize', computeSync);
    };
  }, []);

  const products = [
    {
      id: 0,
      name: "Clip Culture Barbershop Sweatpants",
      price: 19.99,
      rating: null,
      image: Product7,
      slug: "clip-culture-sweatpants",
      isSoldOut: true
    },
    {
      id: 1,
      name: "Clip Culture Snapback Bundle (3-Pack)",
      price: 59.99,
      originalPrice: 90.00,
      rating: null,
      image: Product11,
      slug: "clip-culture-snapback-bundle",
      isOnSale: true
    },
    {
      id: 2,
      name: "Clip Culture Barbershop Snapback – Black & Red Edition",
      price: 29.99,
      rating: null,
      image: Product10,
      slug: "clip-culture-snapback-black-red"
    },
    {
      id: 3,
      name: "Clip Culture Barbershop Snapback – Signature Green Edition",
      price: 29.99,
      rating: null,
      image: Product8,
      slug: "clip-culture-snapback-signature-green"
    },
    {
      id: 4,
      name: "Clip Culture Barbershop T-Shirt",
      price: 10.99,
      rating: null,
      image: Product9,
      slug: "clip-culture-barbershop-tshirt",
      isSoldOut: true
    },
    {
      id: 5,
      name: "Clip Culture Barbershop Beanie – Black & White Collection",
      price: 9.99,
      rating: null,
      image: Product12,
      slug: "clip-culture-barbershop-beanie",
      isSoldOut: true
    }
  ];

  const renderStars = (rating) => {
    if (rating === null || rating === undefined) {
      return null;
    }
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star full">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">★</span>
      );
    }

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
      <section className="top-products" id="apparel">
        <div className="top-products__container">
          <div className="top-products__header">
            <h2 className="top-products__title">Apparel</h2>
            <p className="top-products__subtitle">Rep the culture in style</p>
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
                  {product.isSoldOut && (
                    <div className="product-card__sold-out">Sold out</div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="product-card__content">
                  <h3 
                    className="product-card__name"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <div className="product-card__price">
                    {product.isOnSale ? (
                      <>
                        <span className="product-card__sale-price">${product.price}</span>
                        <span className="product-card__original-price">${product.originalPrice}</span>
                      </>
                    ) : (
                      `$${product.price}`
                    )}
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
                      to={`/apparel/${product.slug}`} 
                      state={{ from: 'shop' }}
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
        </div>
      </section>
    </>
  );
};

export default Apparel;


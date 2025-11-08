import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import '../styles/top-products.css';
import Gallery from '../components/Gallery.jsx';
import Product1 from '../assets/products/Product-1.png';
import Product2 from '../assets/products/Product-2.png';
import Product3 from '../assets/products/Product-3.png';
import Product4 from '../assets/products/Product-4.png';
import Product5 from '../assets/products/Product-5 .png';
import Product6 from '../assets/products/Product-6.png';

const TopProducts = () => {
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
  const products = [
    {
      id: 1,
      name: "Curl Twist",
      price: 15,
      rating: 5,
      image: Product1,
      slug: "curl-twist",
      size: "8 oz"
    },
    {
      id: 2,
      name: "Beard Balm",
      price: 20,
      rating: 5,
      image: Product2,
      slug: "beard-balm",
      size: "8 oz"
    },
    {
      id: 3,
      name: "Beard Oil",
      price: 20,
      rating: 5,
      image: Product3,
      slug: "beard-oil",
      size: "4 oz"
    },
    {
      id: 4,
      name: "Beard Wash",
      price: 18,
      rating: 5,
      image: Product4,
      slug: "beard-wash",
      size: "8 oz"
    },
    {
      id: 5,
      name: "Body Lotion",
      price: 15,
      rating: 4.6,
      image: Product5,
      slug: "body-lotion",
      size: "16 oz"
    },
    {
      id: 6,
      name: "Body Wash",
      price: 15,
      rating: 4,
      image: Product6,
      slug: "body-wash",
      size: "16 oz"
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
    <>
      <section className="top-products">
        <div className="top-products__container">
          <div className="top-products__header">
            <h2 className="top-products__title">Premium Grooming Products</h2>
            <p className="top-products__subtitle">Investing in yourself goes beyond the chair…</p>
          </div>
          
          <div className="top-products__grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card__image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>
                <div className="product-card__content">
                  <h3 className="product-card__name">{product.name}</h3>
                  {product.size && <div className="product-card__size">{product.size}</div>}
                  <div className="product-card__price">${product.price}</div>
                  <div className="product-card__rating">
                    {renderStars(product.rating)}
                    <span className="product-card__rating-text">({product.rating})</span>
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
                    <button className="productbtn--add-cart">
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                    <Link to={`/products/${product.slug}`} className="productbtn--learn-more">
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
      <div className="top-products-gallery-wrapper">
        <Gallery />
      </div>
    </>
  );
};

export default TopProducts;

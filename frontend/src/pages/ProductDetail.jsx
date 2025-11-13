import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import '../styles/product-detail.css';
import Product1 from '../assets/products/Product-1.webp';
import Product2 from '../assets/products/Product-2.webp';
import Product3 from '../assets/products/Product-3.webp';
import Product4 from '../assets/products/Product-4.webp';
import Product5 from '../assets/products/Product-5 .webp';
import Product6 from '../assets/products/Product-6.webp';
import BeardLineUp1 from '../assets/products/Beard-Line-Up-1.webp';
import BeardLineUp2 from '../assets/products/Beard-Line-Up-2.webp';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const products = {
    'premium-beard-line-up-enhancement': {
      id: 0,
      name: "Revive by Clip Culture Haircare",
      price: 18,
      size: "4 fl oz (120 ml)",
      rating: null,
      reviewCount: 12,
      image: BeardLineUp1,
      hoverImage: BeardLineUp2,
      isNewDrop: true,
      description: "Developed by master barber David Brown, owner of Clip Culture Barbershop. <strong>Revive</strong> is a premium beard and hair line-up enhancement designed for precision, performance, and staying power. This semi-permanent airbrush dye delivers a clean, natural-looking definition that holds through sweat, humidity, and long days behind the chair.",
      features: [
        "Enhances beard and hairline definition for a sharp, clean finish",
        "Sweat-resistant and long-lasting formula for active lifestyles",
        "Semi-permanent color that maintains a natural look",
        "Easy-apply nozzle for professional precision",
        "Safe and skin-friendly ingredients"
      ],
      ingredients: "Water, Acrylic Acid (Ester) C/VA Copolymer, Propylene Glycol, CI 42090, CI 19140, CI 16035, Phenoxyethanol",
      howToUse: [
        "Start with a clean, dry hairline or beard.",
        "Apply Revive directly to the desired area using an applicator or fine brush.",
        "Allow 30–60 seconds to set before blending.",
        "For a lasting finish, avoid heavy friction or water immediately after application."
      ]
    },
    'curl-twist': {
      id: 1,
      name: "Curl Twist",
      price: 15,
      size: "8 oz",
      rating: 5,
      image: Product1,
      description: "Premium curl defining cream that enhances natural texture and provides long-lasting hold without stiffness.",
      features: [
        "Defines and enhances natural curls",
        "Long-lasting hold without stiffness",
        "Moisturizing formula",
        "Suitable for all curl types"
      ],
      ingredients: "Water, Glycerin, Shea Butter, Coconut Oil, Natural Curl Enhancers"
    },
    'beard-balm': {
      id: 2,
      name: "Beard Balm",
      price: 20,
      size: "8 oz",
      rating: 5,
      image: Product2,
      description: "Nourishing beard balm that conditions, styles, and tames unruly facial hair while promoting healthy growth.",
      features: [
        "Conditions and softens beard hair",
        "Provides light to medium hold",
        "Promotes healthy beard growth",
        "All-day moisture"
      ],
      ingredients: "Beeswax, Shea Butter, Jojoba Oil, Argan Oil, Vitamin E"
    },
    'beard-oil': {
      id: 3,
      name: "Beard Oil",
      price: 20,
      size: "4 oz",
      rating: 5,
      image: Product3,
      description: "Lightweight beard oil that moisturizes the skin underneath while adding shine and softness to your beard.",
      features: [
        "Moisturizes skin and hair",
        "Reduces itchiness and irritation",
        "Adds natural shine",
        "Lightweight and non-greasy"
      ],
      ingredients: "Jojoba Oil, Argan Oil, Sweet Almond Oil, Vitamin E, Essential Oils"
    },
    'beard-wash': {
      id: 4,
      name: "Beard Wash",
      price: 18,
      size: "8 oz",
      rating: 5,
      image: Product4,
      description: "Gentle cleansing wash specifically formulated for facial hair and the sensitive skin underneath.",
      features: [
        "Gentle cleansing formula",
        "Removes dirt and buildup",
        "Maintains natural oils",
        "Suitable for daily use"
      ],
      ingredients: "Coconut-derived surfactants, Tea Tree Oil, Aloe Vera, Chamomile Extract"
    },
    'body-lotion': {
      id: 5,
      name: "Body Lotion",
      price: 15,
      size: "16 oz",
      rating: 4.6,
      image: Product5,
      description: "Intensive body lotion that deeply moisturizes and nourishes skin, leaving it soft and smooth all day.",
      features: [
        "Deep moisturizing formula",
        "24-hour hydration",
        "Non-greasy finish",
        "Suitable for all skin types"
      ],
      ingredients: "Hyaluronic Acid, Shea Butter, Glycerin, Vitamin E, Natural Oils"
    },
    'body-wash': {
      id: 6,
      name: "Body Wash",
      price: 15,
      size: "16 oz",
      rating: 4,
      image: Product6,
      description: "Refreshing body wash that cleanses while moisturizing, leaving skin feeling clean and refreshed.",
      features: [
        "Gentle cleansing action",
        "Moisturizing formula",
        "Refreshing scent",
        "Rich, luxurious lather"
      ],
      ingredients: "Coconut-derived surfactants, Glycerin, Aloe Vera, Vitamin E, Natural Fragrance"
    }
  };

  const product = products[slug];

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn--primary">Back to Home</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star full" size={20} fill="currentColor" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="star half" size={20} fill="currentColor" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star empty" size={20} fill="currentColor" />);
    }

    return stars;
  };

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <Link to="/" className="product-detail__back">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="product-detail__content">
          <div className="product-detail__left-column">
            <div 
              className="product-detail__image"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img 
                src={isHovering && product.hoverImage ? product.hoverImage : product.image} 
                alt={product.name} 
                loading="lazy" 
              />
            </div>

            {/* Quantity and Add to Cart for desktop (above 700px) */}
            <div className="product-detail__actions-desktop">
              <div className="product-detail__quantity">
                <label className="product-detail__quantity-label">Quantity</label>
                <div className="product-detail__quantity-selector">
                  <button 
                    className="quantity-btn quantity-btn--minus"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input" 
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantity(value > 0 ? value : 1);
                    }}
                    min="1"
                  />
                  <button 
                    className="quantity-btn quantity-btn--plus"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail__actions">
                <button className="btn btn--add-cart">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price-container">
              <span className="product-detail__price">${product.price}</span>
              <span className="product-detail__divider">|</span>
              <span className="product-detail__size">{product.size}</span>
            </div>
            <div className="product-detail__rating">
              {product.isNewDrop ? (
                <span className="product-detail__new-drop">
                  new drop{' '}
                  <span className="fire-emoji">🔥</span>
                  <span className="fire-emoji">🔥</span>
                  <span className="fire-emoji">🔥</span>
                </span>
              ) : (
                <>
                  {renderStars(product.rating)}
                  <span className="product-detail__rating-text">({product.reviewCount || product.rating})</span>
                </>
              )}
            </div>
            <p className="product-detail__description" dangerouslySetInnerHTML={{ __html: product.description }}></p>

            <div className="product-detail__features">
              <h3>Key Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail__ingredients">
              <h3>Ingredients:</h3>
              <p>{product.ingredients}</p>
            </div>

            {product.howToUse && (
              <div className="product-detail__how-to-use">
                <h3>How to Use:</h3>
                <ol>
                  {product.howToUse.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Quantity and Add to Cart for mobile (below 700px) */}
            <div className="product-detail__actions-mobile">
              <div className="product-detail__quantity">
                <label className="product-detail__quantity-label">Quantity</label>
                <div className="product-detail__quantity-selector">
                  <button 
                    className="quantity-btn quantity-btn--minus"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input" 
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantity(value > 0 ? value : 1);
                    }}
                    min="1"
                  />
                  <button 
                    className="quantity-btn quantity-btn--plus"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-detail__actions">
                <button className="btn btn--add-cart">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

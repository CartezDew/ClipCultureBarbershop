import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import '../styles/product-detail.css';
import Product1 from '../assets/products/Product-1.png';
import Product2 from '../assets/products/Product-2.png';
import Product3 from '../assets/products/Product-3.png';
import Product4 from '../assets/products/Product-4.png';
import Product5 from '../assets/products/Product-5 .png';
import Product6 from '../assets/products/Product-6.png';

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const products = {
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
          <div className="product-detail__image">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price-container">
              <span className="product-detail__price">${product.price}</span>
              <span className="product-detail__divider">|</span>
              <span className="product-detail__size">{product.size}</span>
            </div>
            <div className="product-detail__rating">
              {renderStars(product.rating)}
              <span className="product-detail__rating-text">({product.rating})</span>
            </div>
            <p className="product-detail__description">{product.description}</p>

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
  );
};

export default ProductDetail;

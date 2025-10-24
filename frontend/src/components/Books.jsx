import React from 'react';
import '../styles/books.css';
import AmazonImage from '../assets/books/Amazon.png';

const Books = () => {
  const products = [
    {
      id: 1,
      name: "Clip Culture Manual",
      price: 9.99,
      rating: 4.8,
      image: "/src/assets/books/Clip Culture Manual.webp",
      slug: "Clip Culture Manual",
      amazonLink: "https://a.co/d/6JUYT4X"
    },
    {
      id: 2,
      name: "Clip Culture Mnaual 2",
      price: 9.19,
      rating: 5,
      image: "/src/assets/books/Clip Culture Manual 2.webp",
      slug: "Clip Culture Mnaual 2",
      amazonLink: "https://a.co/d/5lDgae3"
    },
    {
      id: 3,
      name: "Clip Culture Mnaual 2- Extended Edition",
      price: 9.19,
      rating: 4.9,
      image: "/src/assets/books/Clip Culture Manual 2- Extended Edition.webp",
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
        
        <div className="books__grid">
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

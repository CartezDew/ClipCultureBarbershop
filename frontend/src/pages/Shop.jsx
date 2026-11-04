import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShopByCategory from '../components/ShopByCategory.jsx';
import ProductsBanner from '../components/ProductsBanner.jsx';
import TopProducts from '../components/TopProducts.jsx';
import ProductStories from '../components/ProductStories.jsx';
import Apparel from '../components/Apparel.jsx';
import '../styles/shop.css';
import '../styles/about.css';
import Books from '../components/Books.jsx';
import JoinUs from '../components/JoinUs.jsx';

// Scroll a shop section just below the fixed navbar.
const scrollToSection = (targetId) => {
  const el = document.getElementById(targetId);
  if (!el) return;
  // Use specific offset for books, apparel, and premium-grooming-products sections
  const offset = targetId === 'books' || targetId === 'apparel' || targetId === 'premium-grooming-products' ? 80 : 100;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - offset,
    behavior: 'smooth'
  });
};

const Shop = () => {
  const location = useLocation();

  // Scroll to anchors when arriving on this page with a hash (e.g., /shop#books)
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');

    const scrollWithOffset = () => scrollToSection(targetId);

    // Wait for images and content to load before scrolling
    const handleLoad = () => {
      setTimeout(scrollWithOffset, 100);
    };

    if (document.readyState === 'complete') {
      setTimeout(scrollWithOffset, 300);
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    const timeoutId = setTimeout(scrollWithOffset, 1000);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, [location.hash]);
  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <h1 className="shop-title">The Culture Collection</h1>
          <p className="shop-subtitle">Curated products and experiences that elevate how you look, lead, and live.</p>
          <a
            className="shop-header__cta"
            href="#premium-grooming-products"
            onClick={(event) => {
              // Same landing spot as the home page's category carousel.
              event.preventDefault();
              scrollToSection('premium-grooming-products');
            }}
          >
            Shop Grooming Products
          </a>
        </div>
        
        <div className="shop-category-wrapper">
          <ShopByCategory />
        </div>

        <div className="shop-product-stories-wrapper">
          <ProductStories />
        </div>
        
        <div className="shop-products-wrapper">
          <TopProducts />
        </div>
        <ProductsBanner />
        <div className="shop-apparel-wrapper">
          <Apparel />
        </div>
        <div className="shop-books-wrapper">
          <Books />
        </div>
        
        <JoinUs />  
      </div>
    </div>
  );
};

export default Shop;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ShopByCategory from '../components/ShopByCategory.jsx';
import TopProducts from '../components/TopProducts.jsx';
import Apparel from '../components/Apparel.jsx';
import '../styles/shop.css';
import '../styles/about.css';
import Books from '../components/Books.jsx';
import JoinUs from '../components/JoinUs.jsx';

const Shop = () => {
  const location = useLocation();

  // Scroll to anchors when arriving on this page with a hash (e.g., /shop#books)
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace('#', '');

    const scrollWithOffset = () => {
      const el = document.getElementById(targetId);
      if (!el) {
        console.log('Element not found:', targetId);
        return;
      }

      // Get the element's position
      const elementPosition = el.getBoundingClientRect().top;
      // Use specific offset for books, apparel, and premium-grooming-products sections
      const offset = targetId === 'books' || targetId === 'apparel' || targetId === 'premium-grooming-products' ? 80 : 100;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      console.log('Scrolling to:', targetId, 'offset:', offsetPosition, 'elementTop:', elementPosition);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    };

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
        </div>
        
        <div className="shop-category-wrapper">
          <ShopByCategory />
        </div>
        
        <div className="shop-products-wrapper">
          <TopProducts />
        </div>
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

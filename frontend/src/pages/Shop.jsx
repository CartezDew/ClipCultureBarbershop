import React from 'react';
import TopProducts from '../components/TopProducts.jsx';
import '../styles/shop.css';
import Books from '../components/Books.jsx';

const Shop = () => {
  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <h1 className="shop-title">The Culture Collection</h1>
          <p className="shop-subtitle">Curated products and experiences that elevate how you look, lead, and live.</p>
        </div>
        
        <div className="shop-products-wrapper">
          <TopProducts />
        </div>
        <div className="shop-books-wrapper">
          <Books />
        </div>
      </div>
    </div>
  );
};

export default Shop;

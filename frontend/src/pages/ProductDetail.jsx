import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Star, ChevronLeft, ChevronRight, Store } from 'lucide-react';
import '../styles/product-detail.css';
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

const ProductDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [hoveredImageSlug, setHoveredImageSlug] = useState(null);
  const [selectedImageSlug, setSelectedImageSlug] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  
  // Determine back navigation destination based on where user came from
  const fromPage = location.state?.from;
  const backPath = fromPage === 'shop' ? '/shop' : '/';
  const backText = fromPage === 'shop' ? 'Back to Shop' : 'Back to Home';

  const products = {
    'beard-line-up-enhancement': {
      id: 0,
      name: "Beard & Line Up Enhancement",
      rating: null,
      reviewCount: 12,
      image: BeardLineUp1,
      hoverImage: BeardLineUp2,
      description: "Developed by master barber David Brown, owner of Clip Culture Barbershop. <strong>Revive</strong> is a premium beard and hair line-up enhancement designed for precision, performance, and staying power. This semi-permanent airbrush dye delivers a clean, natural-looking definition that holds through sweat, humidity, and long days behind the chair.",
      variants: [
        { sku: "BLINE-2OZ", size: "2 oz", price: 25 },
        { sku: "BLINE-4OZ", size: "4 oz", price: 25 }
      ],
      features: [
        "Enhances beard and hairline definition for a sharp, clean finish",
        "Sweat-resistant and long-lasting formula",
        "Semi-permanent color with a natural appearance",
        "Precision nozzle for controlled application",
        "Professional barber-grade formula"
      ],
      ingredients: "Water, Acrylic Acid (Ester) C/VA Copolymer, Propylene Glycol, CI 42090, CI 19140, CI 16035, Phenoxyethanol. Made in P.R.C.",
      howToUse: [
        "Start with a clean, dry hairline or beard.",
        "Apply lightly using an applicator or fine brush.",
        "Allow 30–60 seconds to set before blending.",
        "Avoid moisture or heavy friction immediately after application."
      ]
    },
    'curl-twist': {
      id: 1,
      name: "Curl Twist",
      price: 25,
      size: null,
      rating: 5,
      image: Product1,
      hoverImage: CurlTwistBack,
      description: "Premium curl defining cream that enhances natural texture and provides long-lasting hold without stiffness.",
      features: [
        "Defines and enhances natural curls",
        "Long-lasting hold without stiffness",
        "Moisturizing formula",
        "Suitable for all curl types"
      ],
      ingredients: "Aqua (Water), Glycerin, Aloe Barbadensis Leaf Juice, PVP, Hydrolyzed Wheat Protein, Triethanolamine, Carbomer, Polysorbate 20, Argania Spinosa Kernel Oil, Lavandula Angustifolia Oil, Fragrance (Parfum), Tetrasodium EDTA, Sodium Hydroxymethylglycinate."
    },
    'magic-beard-balm': {
      id: 2,
      name: "Magic Beard Balm",
      price: 25,
      size: "6.8 oz / 200 mL",
      rating: 5,
      image: BalmFront,
      hoverImage: BalmBack,
      isNewDrop: true,
      description: "Nourishing beard balm that conditions, styles, and tames unruly facial hair while promoting healthy growth.",
      features: [
        "Conditions and softens beard hair",
        "Provides light to medium hold",
        "Promotes healthy beard growth",
        "All-day moisture"
      ],
      ingredients: "Vitis Vinifera (Grape) Seed Oil, Prunus Dulcis (Almond) Oil, Beeswax, Butyrospermum Parkii (Shea Butter), Theobroma Cacao (Cocoa) Seed Butter, Cocos Nucifera (Coconut) Oil, Tocopherol (Vitamin E) Oil, Scented with Essential Oils."
    },
    'premium-beard-oil': {
      id: 3,
      name: "Premium Beard Oil",
      price: 25,
      size: "3.38 oz",
      rating: 5,
      image: OilFront,
      hoverImage: OilBack,
      isNewDrop: true,
      description: "Lightweight beard oil that moisturizes the skin underneath while adding shine and softness to your beard.",
      features: [
        "Moisturizes skin and hair",
        "Reduces itchiness and irritation",
        "Adds natural shine",
        "Lightweight and non-greasy"
      ],
      ingredients: "Prunus Amygdalus Dulcis (Sweet Almond) Oil, Ricinus Communis (Castor) Seed Oil, Vitis Vinifera (Grape) Seed Oil, Olea Europaea (Olive) Fruit Oil, Virgin Organic Argania Spinosa (Argan) Kernel Oil, Oryza Sativa (Rice) Bran Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Helianthus Annuus (Sunflower) Extract, Tocopherols."
    },
    'therapeutic-shampoo': {
      id: 4,
      name: "Therapeutic Shampoo",
      price: 25,
      size: "8.4 oz / 250 mL",
      rating: 5,
      image: ShampooFront,
      hoverImage: ShampooBack,
      isNewDrop: true,
      description: "Clip Culture Hair Care Therapeutic Shampoo.",
      features: [
        "Gentle cleansing formula",
        "Removes dirt and buildup",
        "Maintains natural oils",
        "Suitable for daily use"
      ],
      ingredients: "Saponified Oils of Cocos Nucifera (Coconut) Oil, Olea Europaea (Olive) Oil, Simmondsia Chinensis (Jojoba) Seed Oil and Helianthus Annuus (Sunflower) Seed Oil, Cyamopsis Tetragonoloba (Guar) Gum, Vegetable Glycerin, Aloe Barbadensis Leaf Juice, Rosmarinus Officinalis (Rosemary) Leaf Extract, Butyrospermum Parkii (Shea Butter), Citric Acid, Essential Oils."
    },
    'rich-shea-butter': {
      id: 5,
      name: "Rich Shea Butter",
      price: 25,
      size: "8 oz",
      rating: 4.6,
      image: LotionFront,
      hoverImage: LotionBack,
      isNewDrop: true,
      description: "Intensive body lotion that deeply moisturizes and nourishes skin, leaving it soft and smooth all day.",
      features: [
        "Deep moisturizing formula",
        "24-hour hydration",
        "Non-greasy finish",
        "Suitable for all skin types"
      ],
      ingredients: "Deionized Water, Carthamus Tinctorius (Safflower) Seed Oil, Isopropyl Myristate, Glycerin, Stearic Acid, Cetyl Alcohol, Glyceryl Stearate, Butyrospermum Parkii (Shea) Butter, Dimethicone, Tocopheryl Acetate (Vitamin E Acetate), Retinyl Palmitate (Vitamin A Palmitate), Tetrahexyldecyl Ascorbate (Vitamin C), Organic Aloe Barbadensis (Aloe Vera) Leaf Extract, Organic Calendula Officinalis (Marigold) Flower Extract, Organic Chamomilla Recutita (Chamomile) Flower Extract, Symphytum Officinale (Comfrey) Root Extract, Cucumis Sativus (Cucumber) Fruit Extract, Carbomer, Xanthan Gum, Triethanolamine, Phenoxyethanol, Hexylene Glycol, Caprylyl Glycol, Ethylhexylglycerin."
    },
    'bath-shower-gel': {
      id: 6,
      name: "Bath & Shower Gel",
      price: 25,
      size: "16.9 oz / 500 mL",
      rating: 4,
      image: GelFront,
      hoverImage: GelBack,
      isNewDrop: true,
      description: "A creamy wash, rich in lather, pearlescent liquid which is soft enough for the face, yet concentrated enough to be used all over the body. It nourishes and cleanses skin down to its deepest layers.",
      features: [
        "Gentle cleansing action",
        "Moisturizing formula",
        "Refreshing scent",
        "Rich, luxurious lather"
      ],
      ingredients: "Deionized Water, Sodium Lauryl Sulfate, Sodium Methyl Cocoyl Taurate, Cocamidopropyl Betaine, Cocamide DIPA, Glycol Distearate, Laureth-4, Whole Milk, Buttermilk, Organic Aloe Barbadensis (Aloe Vera) Leaf Extract, Hamamelis Virginiana (Witch Hazel) Distillate, Organic Chamomilla Recutita (Chamomile) Flower Extract, Phenoxyethanol, Ethylhexylglycerin, Caprylyl Glycol, Hexylene Glycol, Citric Acid, Sodium Chloride."
    }
  };

  const product = products[slug];

  // All products for "You may also like" - exclude current product
  const allProducts = [
    {
      id: 2,
      name: "Magic Beard Balm",
      price: 25,
      image: BalmFront,
      slug: "magic-beard-balm",
      isNewDrop: true,
    },
    {
      id: 3,
      name: "Premium Beard Oil",
      price: 25,
      image: OilFront,
      slug: "premium-beard-oil",
      isNewDrop: true,
    },
    {
      id: 4,
      name: "Therapeutic Shampoo",
      price: 25,
      image: ShampooFront,
      slug: "therapeutic-shampoo",
      isNewDrop: true,
    },
    {
      id: 5,
      name: "Rich Shea Butter",
      price: 25,
      image: LotionFront,
      slug: "rich-shea-butter",
      isNewDrop: true,
    },
    {
      id: 6,
      name: "Bath & Shower Gel",
      price: 25,
      image: GelFront,
      slug: "bath-shower-gel",
      isNewDrop: true,
    },
    {
      id: 1,
      name: "Curl Twist",
      price: 25,
      image: Product1,
      slug: "curl-twist",
    },
    {
      id: 0,
      name: "Beard & Line Up Enhancement",
      price: 25,
      image: BeardLineUp1,
      slug: "beard-line-up-enhancement",
    }
  ];

  // Filter out current product from related products
  const relatedProducts = allProducts.filter(p => p.slug !== slug);
  
  // Carousel configuration
  const visibleCount = isMobile ? 2 : 4;
  const maxCarouselIndex = Math.max(0, relatedProducts.length - visibleCount);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scroll offset
  useEffect(() => {
    const calculateOffset = () => {
      if (!carouselRef.current) return;
      const containerWidth = carouselRef.current.offsetWidth;
      const gap = 16;
      const cardWidth = (containerWidth - (visibleCount - 1) * gap) / visibleCount;
      setScrollOffset(carouselIndex * (cardWidth + gap));
    };
    
    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, [carouselIndex, visibleCount]);

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
        <Link to={backPath} className="product-detail__back">
          <ArrowLeft size={20} />
          {backText}
        </Link>

        <div className="product-detail__content">
          <div className="product-detail__left-column">
            <div 
              className="product-detail__image"
              onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHoveredImageSlug(slug); }}
              onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHoveredImageSlug(null); }}
              onClick={() => { if (product.hoverImage) setSelectedImageSlug(current => current === slug ? null : slug); }}
              onKeyDown={(event) => {
                if (product.hoverImage && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault();
                  setSelectedImageSlug(current => current === slug ? null : slug);
                }
              }}
              role={product.hoverImage ? 'button' : undefined}
              tabIndex={product.hoverImage ? 0 : undefined}
              aria-label={product.hoverImage ? `Show ${selectedImageSlug === slug ? 'front' : 'back'} of ${product.name}` : undefined}
              aria-pressed={product.hoverImage ? selectedImageSlug === slug : undefined}
            >
              <img 
                src={(hoveredImageSlug === slug || selectedImageSlug === slug) && product.hoverImage ? product.hoverImage : product.image}
                alt={(hoveredImageSlug === slug || selectedImageSlug === slug) && product.hoverImage ? `${product.name} back label` : product.name}
                loading="lazy" 
              />
            </div>

            {/* In-store notice for desktop (above 700px) */}
            <div className="product-detail__actions-desktop">
              <div className="product-detail__in-store-notice">
                <div className="product-detail__in-store-badge">
                  <Store size={18} />
                  <span>In-Store Purchase Only</span>
                </div>
                <p className="product-detail__in-store-text">Visit our Sandy Springs shop to purchase this item.</p>
              </div>
            </div>
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price-container">
              {product.variants ? (
                <>
                  <span className="product-detail__price">${product.variants[selectedVariant].price}</span>
                  <span className="product-detail__divider">|</span>
                  <span className="product-detail__size">{product.variants[selectedVariant].size}</span>
                </>
              ) : (
                <>
                  <span className="product-detail__price">${product.price}</span>
                  {product.size && (
                    <>
                      <span className="product-detail__divider">|</span>
                      <span className="product-detail__size">{product.size}</span>
                    </>
                  )}
                </>
              )}
            </div>
            
            {product.variants && (
              <div className="product-detail__variants">
                <label className="product-detail__variants-label">Select Size:</label>
                <div className="product-detail__variants-options">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.sku}
                      className={`product-detail__variant-btn ${selectedVariant === index ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(index)}
                    >
                      {variant.size} - ${variant.price}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

            {/* In-store notice for mobile (below 700px) */}
            <div className="product-detail__actions-mobile">
              <div className="product-detail__in-store-notice">
                <div className="product-detail__in-store-badge">
                  <Store size={18} />
                  <span>In-Store Purchase Only</span>
                </div>
                <p className="product-detail__in-store-text">Visit our Sandy Springs shop to purchase this item.</p>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="product-detail__related">
          <h2 className="product-detail__related-title">You may also like</h2>
          
          <div className="product-detail__carousel" ref={carouselRef}>
            {/* Left Arrow */}
            {carouselIndex > 0 && (
              <button 
                className="product-detail__carousel-arrow product-detail__carousel-arrow--left"
                onClick={() => setCarouselIndex(prev => Math.max(prev - 1, 0))}
                aria-label="Previous products"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            <div className="product-detail__carousel-wrapper">
              <div 
                className="product-detail__carousel-track"
                style={{ transform: `translateX(-${scrollOffset}px)` }}
              >
                {relatedProducts.map((relProduct) => (
                  <Link
                    key={relProduct.id}
                    to={`/products/${relProduct.slug}`}
                    state={{ from: fromPage || 'home' }}
                    className="product-detail__related-card"
                  >
                    <div className="product-detail__related-image">
                      {relProduct.isNewDrop && (
                        <span className="product-detail__related-badge">New</span>
                      )}
                      <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                    </div>
                    <div className="product-detail__related-info">
                      <h4 className="product-detail__related-name">{relProduct.name}</h4>
                      <p className="product-detail__related-price">
                        ${relProduct.price}.00 USD · In-Store Only
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right Arrow */}
            {carouselIndex < maxCarouselIndex && (
              <button 
                className="product-detail__carousel-arrow product-detail__carousel-arrow--right"
                onClick={() => setCarouselIndex(prev => Math.min(prev + 1, maxCarouselIndex))}
                aria-label="Next products"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Mobile Grid */}
          <div className="product-detail__related-grid-mobile">
            {relatedProducts.slice(0, 4).map((relProduct) => (
              <Link
                key={relProduct.id}
                to={`/products/${relProduct.slug}`}
                state={{ from: fromPage || 'home' }}
                className="product-detail__related-card"
              >
                <div className="product-detail__related-image">
                  {relProduct.isNewDrop && (
                    <span className="product-detail__related-badge">New</span>
                  )}
                  <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                </div>
                <div className="product-detail__related-info">
                  <h4 className="product-detail__related-name">{relProduct.name}</h4>
                  <p className="product-detail__related-price">
                    ${relProduct.price}.00 USD · In-Store Only
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/shop" className="product-detail__view-all">
            View All Products
            <ChevronRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;

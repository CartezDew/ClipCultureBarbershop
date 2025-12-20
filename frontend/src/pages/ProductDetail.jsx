import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const location = useLocation();
  const [isHovering, setIsHovering] = useState(false);
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
      isNewDrop: true,
      buyLink: "https://shopclipculture.com/products/revive-premium-beard-line-up-enhancement?variant=47472947200225",
      description: "Developed by master barber David Brown, owner of Clip Culture Barbershop. <strong>Revive</strong> is a premium beard and hair line-up enhancement designed for precision, performance, and staying power. This semi-permanent airbrush dye delivers a clean, natural-looking definition that holds through sweat, humidity, and long days behind the chair.",
      variants: [
        { sku: "BLINE-2OZ", size: "2 oz", price: 25 },
        { sku: "BLINE-4OZ", size: "4 oz", price: 40 }
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
      price: 20,
      size: null,
      rating: 5,
      image: Product1,
      buyLink: "https://shopclipculture.com/products/curl-twist",
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
      price: 20,
      size: null,
      rating: 5,
      image: Product2,
      buyLink: "https://shopclipculture.com/products/magic-beard-balm",
      description: "Nourishing beard balm that conditions, styles, and tames unruly facial hair while promoting healthy growth.",
      features: [
        "Conditions and softens beard hair",
        "Provides light to medium hold",
        "Promotes healthy beard growth",
        "All-day moisture"
      ],
      ingredients: "Vitis Vinifera Seed Oil, Prunus Amygdalus Dulcis Oil, Cera Alba (Beeswax), Butyrospermum Parkii Butter, Theobroma Cacao Seed Butter, Cocos Nucifera Oil, Tocopherol, Fragrance (Parfum)."
    },
    'premium-beard-oil': {
      id: 3,
      name: "Premium Beard Oil",
      price: 20,
      size: null,
      rating: 5,
      image: Product3,
      buyLink: "https://shopclipculture.com/products/premium-beard-oil",
      description: "Lightweight beard oil that moisturizes the skin underneath while adding shine and softness to your beard.",
      features: [
        "Moisturizes skin and hair",
        "Reduces itchiness and irritation",
        "Adds natural shine",
        "Lightweight and non-greasy"
      ],
      ingredients: "Simmondsia Chinensis Seed Oil, Cocos Nucifera Oil, Corylus Avellana Seed Oil, Vitis Vinifera Seed Oil, Aloe Barbadensis Leaf Extract, Ricinus Communis Seed Oil, Argania Spinosa Kernel Oil, Rosa Canina Seed Oil, Lavandula Angustifolia Oil, Eucalyptus Globulus Leaf Oil, Mentha Piperita Oil, Tocopheryl Acetate, Algae Extract, Glycerin, Rosmarinus Officinalis Leaf Extract, Camellia Oleifera Leaf Extract."
    },
    'beard-wash': {
      id: 4,
      name: "Beard Wash",
      price: 20,
      size: null,
      rating: 5,
      image: Product4,
      buyLink: "https://shopclipculture.com/products/beard-wash",
      description: "Gentle cleansing wash specifically formulated for facial hair and the sensitive skin underneath.",
      features: [
        "Gentle cleansing formula",
        "Removes dirt and buildup",
        "Maintains natural oils",
        "Suitable for daily use"
      ],
      ingredients: "Saponified Oils of Cocos Nucifera Oil, Olea Europaea Fruit Oil, Simmondsia Chinensis Seed Oil, Helianthus Annuus Seed Oil, Cyamopsis Tetragonoloba Gum, Glycerin, Aloe Barbadensis Leaf Juice, Rosmarinus Officinalis Leaf Extract, Butyrospermum Parkii Butter, Citric Acid, Fragrance (Parfum)."
    },
    'body-lotion': {
      id: 5,
      name: "Body Lotion",
      price: 20,
      size: null,
      rating: 4.6,
      image: Product5,
      buyLink: "https://shopclipculture.com/products/intensive-body-lotion",
      description: "Intensive body lotion that deeply moisturizes and nourishes skin, leaving it soft and smooth all day.",
      features: [
        "Deep moisturizing formula",
        "24-hour hydration",
        "Non-greasy finish",
        "Suitable for all skin types"
      ],
      ingredients: "Aqua (Water), Caprylic/Capric Triglyceride, Glycerin, Carthamus Tinctorius Seed Oil, Stearic Acid, Caprae Lac (Goat Milk), Glyceryl Stearate, Prunus Amygdalus Dulcis Oil, Cetyl Alcohol, Aloe Barbadensis Leaf Extract, Avena Sativa Bran Extract, Citrus Aurantium Dulcis Peel Extract, Oryza Sativa Bran Extract, Rosmarinus Officinalis Leaf Extract, Helianthus Annuus Extract, Tocopherol, Xanthan Gum, Carbomer, Triethanolamine, Phenoxyethanol, Hexylene Glycol, Caprylyl Glycol, Ethylhexylglycerin."
    },
    'body-wash': {
      id: 6,
      name: "Body Wash",
      price: 20,
      size: "16 oz",
      rating: 4,
      image: Product6,
      buyLink: "https://shopclipculture.com/products/body-wash",
      description: "A creamy wash, rich in lather, pearlescent liquid which is soft enough for the face, yet concentrated enough to be used all over the body. It nourishes and cleanses skin down to its deepest layers.",
      features: [
        "Gentle cleansing action",
        "Moisturizing formula",
        "Refreshing scent",
        "Rich, luxurious lather"
      ],
      ingredients: "Deionized Water (Aqua), Sodium Methyl Cocoyl Taurate, Cocamidopropyl Betaine, Cocamide DIPA, Glycol Distearate, Laureth-4, Aloe Barbadensis Leaf Extract*, Hamamelis Virginiana (Witch Hazel) Distillate, Chamomilla Recutita (Chamomile) Flower Extract*, Phenoxyethanol, Ethylhexylglycerin, Caprylyl Glycol, Hexylene Glycol, Citric Acid, Sodium Chloride."
    }
  };

  const product = products[slug];

  // All products for "You may also like" - exclude current product
  const allProducts = [
    {
      id: 0,
      name: "Beard & Line Up Enhancement",
      priceFrom: 25,
      image: BeardLineUp1,
      slug: "beard-line-up-enhancement",
      buyLink: "https://shopclipculture.com/products/revive-premium-beard-line-up-enhancement?variant=47472947200225"
    },
    {
      id: 1,
      name: "Curl Twist",
      price: 20,
      image: Product1,
      slug: "curl-twist",
      buyLink: "https://shopclipculture.com/products/curl-twist"
    },
    {
      id: 2,
      name: "Magic Beard Balm",
      price: 20,
      image: Product2,
      slug: "magic-beard-balm",
      buyLink: "https://shopclipculture.com/products/magic-beard-balm"
    },
    {
      id: 3,
      name: "Premium Beard Oil",
      price: 20,
      image: Product3,
      slug: "premium-beard-oil",
      buyLink: "https://shopclipculture.com/products/premium-beard-oil"
    },
    {
      id: 4,
      name: "Beard Wash",
      price: 20,
      image: Product4,
      slug: "beard-wash",
      buyLink: "https://shopclipculture.com/products/beard-wash"
    },
    {
      id: 5,
      name: "Body Lotion",
      price: 20,
      image: Product5,
      slug: "body-lotion",
      buyLink: "https://shopclipculture.com/products/intensive-body-lotion"
    },
    {
      id: 6,
      name: "Body Wash",
      price: 15,
      image: Product6,
      slug: "body-wash",
      buyLink: "https://shopclipculture.com/products/body-wash"
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
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img 
                src={isHovering && product.hoverImage ? product.hoverImage : product.image} 
                alt={product.name} 
                loading="lazy" 
              />
            </div>

            {/* Buy Now for desktop (above 700px) */}
            <div className="product-detail__actions-desktop">
              <div className="product-detail__actions">
                <a 
                  href={product.buyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn--buy-now"
                >
                  <ExternalLink size={20} />
                  Buy Now
                </a>
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
                  <span className="product-detail__divider">|</span>
                  <span className="product-detail__size">{product.size}</span>
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

            {/* Buy Now for mobile (below 700px) */}
            <div className="product-detail__actions-mobile">
              <div className="product-detail__actions">
                <a 
                  href={product.buyLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn--buy-now"
                >
                  <ExternalLink size={20} />
                  Buy Now
                </a>
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
                  <a
                    key={relProduct.id}
                    href={relProduct.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-detail__related-card"
                  >
                    <div className="product-detail__related-image">
                      <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                    </div>
                    <div className="product-detail__related-info">
                      <h4 className="product-detail__related-name">{relProduct.name}</h4>
                      <p className="product-detail__related-price">
                        {relProduct.priceFrom ? `From $${relProduct.priceFrom}` : `$${relProduct.price}.00 USD`}
                      </p>
                    </div>
                  </a>
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
              <a
                key={relProduct.id}
                href={relProduct.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="product-detail__related-card"
              >
                <div className="product-detail__related-image">
                  <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                </div>
                <div className="product-detail__related-info">
                  <h4 className="product-detail__related-name">{relProduct.name}</h4>
                  <p className="product-detail__related-price">
                    {relProduct.priceFrom ? `From $${relProduct.priceFrom}` : `$${relProduct.price}.00 USD`}
                  </p>
                </div>
              </a>
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

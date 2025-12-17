import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Store } from 'lucide-react';
import '../styles/product-detail.css';
import Product7 from '../assets/products/Product-7.webp';
import Product10 from '../assets/products/Product-10.webp';
import Product11 from '../assets/products/Product-11.webp';
import Product8 from '../assets/products/Product-8.webp';
import Product9 from '../assets/products/Product-9.webp';
import Product12 from '../assets/products/Product-12.webp';

const ApparelDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  
  // Determine back navigation destination based on where user came from
  const fromPage = location.state?.from;
  const backPath = fromPage === 'home' ? '/' : '/shop#apparel';
  const backText = fromPage === 'home' ? 'Back to Home' : 'Back to Apparel';
  
  // Get product to determine initial color
  const products = {
    'clip-culture-sweatpants': {
      id: 0,
      name: "Clip Culture Barbershop Sweatpants",
      price: 19.99,
      image: Product7,
      isSoldOut: true,
      description: "The Clip Culture Barbershop Sweatpants deliver the perfect blend of comfort and athleisure wear. Featuring a soft fleece interior and a clean grey profile, these sweats are designed for anyone who appreciates comfort, versatility, and a touch of culture in their everyday style.",
      description2: "With the embroidered Clip Culture Barbershop logo along the leg, these sweatpants elevate your relaxed look while staying lightweight, warm, and functional. Whether you're in the shop, at home, at the gym, or on the move, these sweats offer a polished, comfortable fit you can count on.",
      features: [
        "Soft, premium fleece interior for all-day comfort",
        "Clean grey color that pairs effortlessly with any outfit",
        "Embroidered Clip Culture Barbershop logo for a bold, polished finish",
        "Elastic waistband with adjustable drawstring for a customizable fit",
        "Deep side pockets for convenience and everyday functionality",
        "Relaxed, unisex design crafted for comfort and modern athleisure style"
      ],
      tagline: "Everyday comfort meets Clip Culture identity. Perfect for shop days, gym days, travel days, and everything in between."
    },
    'clip-culture-snapback-bundle': {
      id: 1,
      name: "Clip Culture Snapback Bundle (3-Pack)",
      price: 59.99,
      originalPrice: 90.00,
      image: Product11,
      isOnSale: true,
      description: "Elevate your style with the complete Clip Culture Snapback Collection.",
      description2: "The Clip Culture 3-Hat Bundle brings together three bold, versatile colorways — Green, Black, and Red — giving you the full lineup at a special discounted price. Whether you're in the barbershop, out with friends, or repping your brand on the move, this bundle gives you options to match every fit and every mood.",
      description3: "Each snapback features a structured front panel, breathable mesh backing, and the signature Clip Culture Barbershop logo printed across the crown. Designed for everyday wear and built for comfort, these hats let you represent the culture in a way that feels authentic, stylish, and effortless.",
      bundleIncludes: [
        "Green Snapback – Vibrant and energetic",
        "Black Snapback – Sleek, clean, and easy to pair with any outfit",
        "Red Snapback – Bold, confident, and attention-grabbing"
      ],
      features: [
        "Structured foam front panel that holds its shape",
        "Breathable mesh backing for lightweight comfort",
        "Adjustable snapback closure for a personalized fit",
        "High-quality Clip Culture Barbershop logo print",
        "Unisex design for any style and any occasion"
      ],
      whyBuy: [
        "Save with a bundled discount compared to buying individually",
        "Rotate between multiple color options for different looks",
        "Perfect for barbers, creators, and supporters who want variety",
        "Ideal as a collector's pack or gift set"
      ],
      tagline: "Own the full collection and bring Clip Culture energy into your everyday style — three hats, one movement, unlimited ways to wear it."
    },
    'clip-culture-snapback-black-red': {
      id: 2,
      name: "Clip Culture Barbershop Snapback – Black & Red Edition",
      price: 29.99,
      image: Product10,
      description: "Bold. Clean. Unmistakably Clip Culture.",
      description2: "The Black & Red Clip Culture Snapback is the definition of sleek style and confident energy. Featuring a deep black crown with a striking red Clip Culture Barbershop logo, this hat makes a statement without saying a word. Whether you're behind the chair, out in the city, or representing your craft, this snapback adds a sharp, polished look to any fit.",
      description3: "Crafted with a structured foam front and breathable mesh back, it delivers durability, comfort, and that perfect shape that holds strong all day long. The adjustable snap closure ensures a secure, personalized fit—made for everyday wear and made for the culture.",
      features: [
        "Vibrant red Clip Culture Barbershop logo on a matte black front panel",
        "Structured foam crown that keeps its shape and stands tall",
        "Breathable mesh backing for maximum comfort",
        "Adjustable snapback closure for a tailored fit",
        "Clean, unisex design that pairs effortlessly with any style"
      ],
      tagline: "Classic. Elevated. Culture-driven. This snapback isn't just an accessory — it's a representation of the movement and the craft you stand behind."
    },
    'clip-culture-snapback-signature-green': {
      id: 3,
      name: "Clip Culture Barbershop Snapback – Signature Green Edition",
      price: 29.99,
      image: Product8,
      description: "Rep the culture in style.",
      description2: "The Clip Culture Barbershop Snapback is crafted for anyone who moves with confidence and intention. Designed in Clip Culture's bold signature green, this premium snapback features the iconic white Clip Culture logo across the structured front panel — clean, sharp, and instantly recognizable.",
      description3: "Built with a breathable mesh back, firm foam front, and adjustable snap closure, this snapback delivers the perfect blend of comfort, durability, and style. Whether you're in the shop, on the go, or off the clock, this hat completes the look.",
      features: [
        "Bold Clip Culture Barbershop logo printed across the front",
        "Premium signature green colorway for a standout aesthetic",
        "Structured foam front panel that keeps its shape",
        "Breathable mesh backing for all-day comfort",
        "Adjustable snapback closure for the perfect fit",
        "Unisex design that complements any style"
      ],
      tagline: "More than merch — this is a symbol of the movement. Wear it with pride, represent your craft, and bring Clip Culture energy wherever you go.",
      hasColorOptions: true,
      colors: ['Green', 'Red', 'Black']
    },
    'clip-culture-barbershop-tshirt': {
      id: 4,
      name: "Clip Culture Barbershop T-Shirt",
      price: 10.99,
      image: Product9,
      isSoldOut: true,
      description: "Timeless. Clean. Designed for everyday confidence.",
      description2: "The Clip Culture Barbershop T-Shirt is crafted for those who want comfort, quality, and culture woven into every fit. Made from soft, breathable cotton and finished in a deep black tone, this tee delivers a sleek, understated look with premium details.",
      description3: "The front features the iconic Clip Culture logo in a textured, high-quality chenille-style patch—giving the shirt a bold, elevated aesthetic that stands out without trying too hard. Whether you're in the shop, out with friends, or on the move, this tee brings versatility and style to any wardrobe.",
      features: [
        "Premium chenille-style Clip Culture logo patch for a standout finish",
        "Soft, high-quality cotton for comfort and breathability",
        "Clean black base that pairs easily with any outfit",
        "Unisex design suitable for all styles and occasions",
        "Durable construction that holds color and shape over time",
        "Perfect for layering or wearing on its own"
      ],
      tagline: "Classic look. Premium feel. Culture in every stitch. This T-shirt is more than merch—it's a statement piece for anyone who lives and represents the Clip Culture lifestyle."
    },
    'clip-culture-barbershop-beanie': {
      id: 5,
      name: "Clip Culture Barbershop Beanie – Black & White Collection",
      price: 9.99,
      image: Product12,
      isSoldOut: true,
      description: "Stay warm. Stay fresh. Stay rooted in the culture.",
      description2: "The Clip Culture Barbershop Beanie blends comfort, simplicity, and style into an everyday essential. Available in classic black and clean white, each beanie features the iconic Clip Culture logo embroidered across the cuff—bold, crisp, and unmistakably part of the movement.",
      description3: "Whether you're headed to the shop, running errands, or elevating your cold-weather fits, this beanie delivers a look that's effortless and culture-forward. Made with a soft, stretch-knit fabric, it provides warmth without sacrificing style, making it the perfect piece for barbers, creators, and anyone who carries Clip Culture pride.",
      availableColors: [
        "Black – Timeless, versatile, and always in style",
        "White – Clean, modern, and eye-catching"
      ],
      features: [
        "High-quality embroidered Clip Culture Barbershop logo",
        "Soft, flexible knit fabric for a comfortable fit",
        "Fold-over cuff for added warmth and style",
        "Unisex design suitable for any head shape or style",
        "Perfect for everyday wear, cold-weather seasons, or shop branding"
      ],
      tagline: "Minimalist. Comfortable. Culture-approved. This beanie is more than warmth—it's a statement, a lifestyle, and a symbol of the community Clip Culture continues to shape.",
      hasColorOptions: true,
      colors: ['Black', 'White']
    }
  };

  const product = products[slug];
  const [selectedColor, setSelectedColor] = useState(null);

  // All apparel products for "You may also like"
  const allApparelProducts = [
    { id: 0, name: "Clip Culture Barbershop Sweatpants", price: 19.99, image: Product7, slug: "clip-culture-sweatpants", isSoldOut: true },
    { id: 1, name: "Snapback Bundle (3-Pack)", price: 59.99, originalPrice: 90.00, image: Product11, slug: "clip-culture-snapback-bundle", isOnSale: true },
    { id: 2, name: "Snapback – Black & Red", price: 29.99, image: Product10, slug: "clip-culture-snapback-black-red" },
    { id: 3, name: "Snapback – Signature Green", price: 29.99, image: Product8, slug: "clip-culture-snapback-signature-green" },
    { id: 4, name: "Clip Culture T-Shirt", price: 10.99, image: Product9, slug: "clip-culture-barbershop-tshirt", isSoldOut: true },
    { id: 5, name: "Beanie – Black & White", price: 9.99, image: Product12, slug: "clip-culture-barbershop-beanie", isSoldOut: true }
  ];

  // Filter out current product from related products
  const relatedProducts = allApparelProducts.filter(p => p.slug !== slug);
  
  // Carousel configuration
  const visibleCount = isMobile ? 2 : 4;
  const maxCarouselIndex = Math.max(0, relatedProducts.length - visibleCount);

  useEffect(() => {
    if (product?.hasColorOptions && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [slug, product]);

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
        <Link to="/shop" className="btn btn--primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <Link to={backPath} className="product-detail__back">
          <ArrowLeft size={20} />
          {backText}
        </Link>

        <div className="product-detail__content">
          <div className="product-detail__left-column">
            <div className="product-detail__image">
              <img 
                src={product.image} 
                alt={product.name} 
                loading="lazy" 
              />
              {product.isSoldOut && (
                <div className="product-detail__sold-out">Sold out</div>
              )}
            </div>

            {/* Color selector and In-Store notice for desktop (above 700px) */}
            <div className="product-detail__actions-desktop">
              {product.hasColorOptions && (
                <div className="product-detail__color-selector">
                  <label className="product-detail__color-label">Color</label>
                  <div className="product-detail__color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`product-detail__color-btn ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-detail__in-store-notice">
                <div className="product-detail__in-store-badge">
                  <Store size={18} />
                  <span>In-Store Purchase Only</span>
                </div>
                <p className="product-detail__in-store-text">
                  Visit one of our locations to purchase this item.
                </p>
              </div>
            </div>
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__name">{product.name}</h1>
            <div className="product-detail__price-container">
              {product.isOnSale ? (
                <>
                  <span className="product-detail__price">Sale price ${product.price}</span>
                  <span className="product-detail__original-price">Regular price ${product.originalPrice}</span>
                </>
              ) : (
                <span className="product-detail__price">${product.price}</span>
              )}
            </div>
            
            <p className="product-detail__description">{product.description}</p>
            {product.description2 && (
              <p className="product-detail__description">{product.description2}</p>
            )}
            {product.description3 && (
              <p className="product-detail__description">{product.description3}</p>
            )}

            {product.bundleIncludes && (
              <div className="product-detail__features">
                <h3>Bundle Includes:</h3>
                <ul>
                  {product.bundleIncludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.availableColors && (
              <div className="product-detail__features">
                <h3>Available Colors:</h3>
                <ul>
                  {product.availableColors.map((color, index) => (
                    <li key={index}>{color}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-detail__features">
              <h3>Features:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {product.whyBuy && (
              <div className="product-detail__features">
                <h3>Why Buy the Bundle?</h3>
                <ul>
                  {product.whyBuy.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.tagline && (
              <p className="product-detail__tagline" style={{ 
                fontStyle: 'italic', 
                marginTop: '1.5rem',
                fontSize: '1.1rem',
                color: '#666'
              }}>
                {product.tagline}
              </p>
            )}

            {/* Color selector and In-Store notice for mobile (below 700px) */}
            <div className="product-detail__actions-mobile">
              {product.hasColorOptions && (
                <div className="product-detail__color-selector">
                  <label className="product-detail__color-label">Color</label>
                  <div className="product-detail__color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`product-detail__color-btn ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-detail__in-store-notice">
                <div className="product-detail__in-store-badge">
                  <Store size={18} />
                  <span>In-Store Purchase Only</span>
                </div>
                <p className="product-detail__in-store-text">
                  Visit one of our locations to purchase this item.
                </p>
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
                    to={`/apparel/${relProduct.slug}`}
                    state={{ from: fromPage || 'shop' }}
                    className="product-detail__related-card"
                  >
                    <div className="product-detail__related-image">
                      <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                      {relProduct.isSoldOut && (
                        <span className="product-detail__related-sold-out">Sold out</span>
                      )}
                    </div>
                    <div className="product-detail__related-info">
                      <h4 className="product-detail__related-name">{relProduct.name}</h4>
                      <p className="product-detail__related-price">
                        {relProduct.isOnSale ? (
                          <>
                            <span className="product-detail__related-sale">${relProduct.price}</span>
                            <span className="product-detail__related-original">${relProduct.originalPrice}</span>
                          </>
                        ) : (
                          `$${relProduct.price}`
                        )}
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
                to={`/apparel/${relProduct.slug}`}
                state={{ from: fromPage || 'shop' }}
                className="product-detail__related-card"
              >
                <div className="product-detail__related-image">
                  <img src={relProduct.image} alt={relProduct.name} loading="lazy" />
                  {relProduct.isSoldOut && (
                    <span className="product-detail__related-sold-out">Sold out</span>
                  )}
                </div>
                <div className="product-detail__related-info">
                  <h4 className="product-detail__related-name">{relProduct.name}</h4>
                  <p className="product-detail__related-price">
                    {relProduct.isOnSale ? (
                      <>
                        <span className="product-detail__related-sale">${relProduct.price}</span>
                        <span className="product-detail__related-original">${relProduct.originalPrice}</span>
                      </>
                    ) : (
                      `$${relProduct.price}`
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link to="/shop#apparel" className="product-detail__view-all">
            View All Apparel
            <ChevronRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ApparelDetail;


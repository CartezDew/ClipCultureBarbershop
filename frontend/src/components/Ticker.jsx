import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/ticker.css';

const TickerItems = [
  'Products', 'Books', 'Mentorship', 'Advertise', 'Franchise', 
];

const Ticker = () => {
  const [animationsTriggered, setAnimationsTriggered] = useState({ ticker: false });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const tickerRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimationsTriggered(prev => ({ ...prev, ticker: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (tickerRef.current) {
      observer.observe(tickerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTickerClick = (index) => {
    setHighlightedIndex(index);
    // Reset highlight after animation
    setTimeout(() => setHighlightedIndex(-1), 1000);
  };

  return (
    <div
      ref={tickerRef}
      data-animate="ticker"
      className="services-ticker"
      style={{
        opacity: animationsTriggered.ticker ? 1 : 0,
        transform: animationsTriggered.ticker ? 'translateY(0)' : 'translateY(24px)',
        transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1)',
        willChange: 'transform, opacity'
      }}
    >
      <div className="ticker-track">
        {TickerItems.map((label, i) => (
          <React.Fragment key={`${label}-${i}`}>
            <motion.div
              className="ticker-item"
              onClick={() => handleTickerClick(i)}
              style={{ cursor: 'pointer' }}
              animate={{
                color: highlightedIndex === i ? 'var(--green)' : '#19231A',
                scale: highlightedIndex === i ? 1.1 : 1
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              whileHover={{ scale: 1.15, color: 'var(--green)' }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.div>
            {i < (TickerItems.length - 1) && (
              <span className="ticker-separator">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

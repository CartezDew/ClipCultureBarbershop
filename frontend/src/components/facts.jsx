// src/components/facts.jsx
import React, { useState, useRef, useEffect } from "react";
import "../styles/facts.css";

/**
 * Usage:
 * <Facts items={myFactsArray} />
 * or drop in as-is with the sample items below.
 *
 * Each item: { id: number|string, q: string, a: ReactNode|string }
 */

export default function Facts({ items = sampleFacts }) {
  const [openId, setOpenId] = useState(null);
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const factsRef = useRef(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationsTriggered) {
            setAnimationsTriggered(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (factsRef.current) {
      observer.observe(factsRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  return (
    <section 
      id="faq"
      ref={factsRef}
      aria-labelledby="facts-heading" 
      className={`w-full ${animationsTriggered ? 'facts-animated' : ''}`}
    >
      <h2 id="facts-heading">Frequently Asked Questions</h2>
      <p className="facts-subtitle"> Everything you need to know before your visit.</p>
      <ul className={`facts-accordion ${animationsTriggered ? 'facts-accordion-animated' : ''}`}>
        {items.map(({ id, q, a }) => (
          <FactItem
            key={id}
            id={id}
            q={q}
            isOpen={openId === id}
            onToggle={() => setOpenId(openId === id ? null : id)}
          >
            {a}
          </FactItem>
        ))}
      </ul>
    </section>
  );
}

function FactItem({ id, q, isOpen, onToggle, children }) {
  const panelRef = useRef(null);
  const [maxH, setMaxH] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  // Measure content height for smooth max-height animation
  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      setMaxH(panelRef.current.scrollHeight);
    } else {
      setMaxH(0);
    }
  }, [isOpen, children]);

  // Recompute on window resize (content wrap may change)
  useEffect(() => {
    const onResize = () => {
      if (panelRef.current && isOpen) {
        setMaxH(panelRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  // Individual item animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, id * 150); // Staggered delay based on ID
          }
        });
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [id]);

  return (
    <li 
      ref={itemRef}
      className={`fact ${isOpen ? "open" : ""} ${isVisible ? 'fact-visible' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${id * 0.1}s, transform 0.6s ease ${id * 0.1}s`
      }}
    >
      <button
        type="button"
        className="fact-trigger"
        aria-expanded={isOpen}
        aria-controls={`fact-panel-${id}`}
        id={`fact-trigger-${id}`}
        onClick={onToggle}
      >
        <span className="chev" aria-hidden></span>
        <span>{q}</span>
      </button>

      <div
        id={`fact-panel-${id}`}
        role="region"
        aria-labelledby={`fact-trigger-${id}`}
        className="fact-panel"
        style={{ maxHeight: maxH }}
      >
        <div ref={panelRef}>
          {children}
        </div>
      </div>
    </li>
  );
}

/* --- Sample content you can replace --- */
const sampleFacts = [
  {
    id: 1,
    q: "I'm a new client—what should I know before my appointment?",
    a: (
      <>
        <p>
          Welcome to ClipCulture! Please arrive <strong>10–15 minutes early</strong> to allow time for your initial consultation prior to your service to your appointment.
        </p>
      </>
    ),
  },
  {
    id: 2,
    q: "What should I do to prepare before my appointment?",
    a: (
      <>
        <ul>
          <li>
            <strong>Clean, dry hair:</strong> All clients must arrive with hair <strong>washed and blow-dried</strong>.
          </li>
          <li>
            <strong>No products:</strong> Please avoid grease, heavy oils, foams, or styling products before service.
          </li>
          <li>
            <strong>No time to prep?</strong> Book a <em>Shampoo + Blow-Dry</em> add-on and arrive <strong>15–20 minutes early</strong>.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    q: "How early should I arrive? What if I'm running late?",
    a: (
      <>
        <ul>
          <li>Plan to arrive on time for your scheduled appointment.</li>
          <li>
            <strong>5+ minutes late</strong> may result in a <strong>canceled appointment</strong> and a
            <strong> $15 no-show fee</strong>.
          </li>
          <li>
            First-time clients who book and then <em>no-call/no-show</em> will be <strong>blocked from online booking</strong>.
          </li>
          <li>
            Missing <strong>3+ appointments</strong> without paying the missed-appointment fee can lead to a booking block.
          </li>
          <li>
            Consistently arriving <strong>7–10 minutes late</strong> may also result in being blocked—no questions asked.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 4,
    q: "Do I have to accompany my child to an appointment?",
    a: (
      <>
        <p>
          Yes— <strong>all children under 12</strong> must be
          accompanied by an adult.
        </p>
      </>
    ),
  },
  {
    id: 5,
    q: "What is your cancellation policy?",
    a: (
      <>
        <p>
          Cancellations must be submitted at least <strong>4 hours</strong> prior to your appointment time.
          This allows us to offer your slot to another client.
        </p>
      </>
    ),
  },
  {
    id: 6,
    q: "What happens if I miss my appointment?",
    a: (
      <>
        <p>
          Missed appointments incur a <strong>$15 no-show fee</strong>, which will be applied to your next booking.
        </p>
      </>
    ),
  },
  {
    id: 7,
    q: "What makes your grooming products different?",
    a: (
      <>
        <p>
        Our products are made with <strong>high-quality, barber-approved ingredients</strong> that nourish your hair and scalp without heavy buildup. 
        Each formula is tested by our team to ensure lasting style, comfort, and results that reflect the ClipCulture standard.
        </p>
      </>
    ),
  },
];

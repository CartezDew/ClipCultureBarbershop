import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BarberPole from './icons/BarberPole.jsx';
import { groomingSet, groomingSetImages, groomingSetItems } from '../lib/groomingSet.js';
import { loadProductDetail } from '../lib/productDetailRoute.js';
import '../styles/grooming-set-feature.css';

const preloadDetail = () => { loadProductDetail().catch(() => {}); };

// Home page introduction to the full grooming line, selling the five-product set.
const GroomingSetFeature = () => (
  <section className="grooming-set-feature" aria-labelledby="grooming-set-feature-title">
    <div className="grooming-set-feature__inner">
      <div className="grooming-set-feature__media">
        <picture>
          <source media="(max-width: 479px)" srcSet={groomingSetImages.tealCaseSquare} width="720" height="720" />
          <img
            src={groomingSetImages.tealCase}
            srcSet={`${groomingSetImages.tealCaseSmall} 720w, ${groomingSetImages.tealCase} 1280w`}
            sizes="(max-width: 1100px) 60vw, 720px"
            width="1280"
            height="853"
            alt="The five Clip Culture grooming products in a teal carrying case"
            loading="lazy"
            decoding="async"
          />
        </picture>
        {/* Spots on each product link to its page; hidden on phones, where the list below does that job. */}
        <ul className="grooming-set-feature__spots">
          {groomingSetItems.map((item) => (
            <li key={item.slug} style={{ left: `${item.spot.x}%`, top: `${item.spot.y}%` }}>
              <Link
                to={`/products/${item.slug}`}
                state={{ from: 'home' }}
                className="grooming-set-feature__spot"
                onPointerEnter={preloadDetail}
                onFocus={preloadDetail}
              >
                <span className="grooming-set-feature__spot-label">{item.name} · ${item.price}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grooming-set-feature__copy">
        <span className="grooming-set-feature__eyebrow">Clip Culture Hair Care / Since 2021</span>
        <h2 id="grooming-set-feature-title">Five essentials. <em>One set.</em></h2>
        <p>
          The full line, from wash day to finish: hair, beard and skin. Buy all five together
          and save ${groomingSet.savings}.
        </p>

        <ul className="grooming-set-feature__items">
          {groomingSetItems.map((item) => (
            <li key={item.slug}>
              <Link to={`/products/${item.slug}`} state={{ from: 'home' }} onPointerEnter={preloadDetail} onFocus={preloadDetail}>
                <span>{item.name}</span>
                <span className="grooming-set-feature__item-price">${item.price}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Price and button share a row when there is room, and wrap on narrow columns. */}
        <div className="grooming-set-feature__buy">
          <div className="grooming-set-feature__price">
            <strong>${groomingSet.price}</strong>
            <s><span className="visually-hidden">Regular price </span>${groomingSet.originalPrice}</s>
            <span className="grooming-set-feature__save">Save ${groomingSet.savings}</span>
          </div>

          <Link
            to={`/products/${groomingSet.slug}`}
            state={{ from: 'home' }}
            className="grooming-set-feature__cta"
            onPointerEnter={preloadDetail}
            onFocus={preloadDetail}
          >
            See the Grooming Set <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className="grooming-set-feature__note">
          <BarberPole className="grooming-set-feature__note-icon" accentClassName="grooming-set-feature__note-accent" strokeWidth={3.5} /> Available in store in Sandy Springs
        </p>
      </div>
    </div>
  </section>
);

export default GroomingSetFeature;

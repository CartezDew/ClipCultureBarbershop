import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useLayoutEffect } from 'react';
import { LazyMotion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingActionButtons from './components/FloatingActionButtons.jsx';
import Home from './pages/Home.jsx';
import { pageMeta, DEFAULT_SITE_URL } from './lib/seo.js';
import { setupScrollReveals } from './lib/scrollReveal.js';
import { setupPressFeedback } from './lib/pressFeedback.js';
import { loadProductDetail } from './lib/productDetailRoute.js';
import './styles/scroll-reveal.css';

// A preloaded page renders straight away instead of suspending, so the prerendered
// HTML is never replaced by the loading fallback.
function lazyPage(load) {
  let Loaded = null;
  const preload = () => load().then((module) => { Loaded = module.default; return module; });
  const Lazy = lazy(preload);
  const Page = (props) => {
    // Pick once per mount so the page is not remounted when loading finishes.
    const [Component] = useState(() => Loaded || Lazy);
    return <Component {...props} />;
  };
  Page.preload = preload;
  return Page;
}

const Services = lazyPage(() => import('./pages/Services.jsx'));
const SandySprings = lazyPage(() => import('./pages/SandySprings.jsx'));
const FAQs = lazyPage(() => import('./pages/FAQs.jsx'));
const About = lazyPage(() => import('./pages/About.jsx'));
const Shop = lazyPage(() => import('./pages/Shop.jsx'));
const Mentorship = lazyPage(() => import('./pages/Mentorship.jsx'));
const ProductDetail = lazyPage(loadProductDetail);
const ApparelDetail = lazyPage(() => import('./pages/ApparelDetail.jsx'));
const Franchise = lazyPage(() => import('./pages/Franchise.jsx'));
const Advertise = lazyPage(() => import('./pages/Advertise.jsx'));
const VendingMachines = lazyPage(() => import('./pages/VendingMachines.jsx'));
const Apply = lazyPage(() => import('./pages/Apply.jsx'));
const BookNow = lazyPage(() => import('./pages/BookNow.jsx'));
const SpeakingEngagements = lazyPage(() => import('./pages/SpeakingEngagements.jsx'));

const routePages = {
  '/sandysprings': SandySprings,
  '/faqs': FAQs,
  '/services': Services,
  '/about': About,
  '/shop': Shop,
  '/book-now': BookNow,
  '/mentorship': Mentorship,
  '/advertise': Advertise,
  '/vending-machines': VendingMachines,
  '/franchise': Franchise,
  '/apply': Apply,
  '/speaking-engagements': SpeakingEngagements,
};
const detailPages = { products: ProductDetail, apparel: ApparelDetail };

// Load the current route's page before the first render.
export function preloadRoute(pathname) {
  const page = routePages[pathname] || detailPages[pathname.split('/')[1]];
  return page ? page.preload() : Promise.resolve();
}

const loadMotionFeatures = () => import('./lib/motionFeatures.js').then((module) => module.default);

function AppContent() {
  const location = useLocation();
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const isHomePage = location.pathname === '/';

  useEffect(() => setupScrollReveals(location.pathname), [location.pathname]);
  useEffect(() => setupPressFeedback(), []);

  // Keep metadata in sync when navigating without a page request.
  useEffect(() => {
    const { title, description, url } = pageMeta(location.pathname, DEFAULT_SITE_URL);
    document.title = title;
    const values = [
      ['meta', 'name', 'description', 'content', description],
      ['meta', 'property', 'og:title', 'content', title],
      ['meta', 'property', 'og:description', 'content', description],
      ['meta', 'property', 'og:url', 'content', url],
      ['meta', 'name', 'twitter:title', 'content', title],
      ['meta', 'name', 'twitter:description', 'content', description],
      ['link', 'rel', 'canonical', 'href', url],
    ];
    values.forEach(([tag, key, name, attribute, value]) => {
      let element = document.head.querySelector(`${tag}[${key}="${name}"]`);
      if (!element) {
        element = document.createElement(tag);
        element.setAttribute(key, name);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    });
  }, [location.pathname]);

  // Reset scroll position on route change without animating
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // On home page, check if hero buttons are out of view
      if (isHomePage) {
        // Find all hero book buttons and check if any visible one is in view
        const heroBookButtons = document.querySelectorAll('.hero__btn--book');
        let visibleButton = null;
        
        // Find the first visible button (one with non-zero dimensions)
        for (const btn of heroBookButtons) {
          const rect = btn.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            visibleButton = btn;
            break;
          }
        }
        
        if (visibleButton) {
          const buttonRect = visibleButton.getBoundingClientRect();
          setShowFloatingButtons(buttonRect.bottom < 0);
        }
      } else {
        // On other pages, always show (CSS will handle 650px breakpoint)
        setShowFloatingButtons(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <div className="App">
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading Clip Culture…</div>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sandysprings" element={<><Navbar /><main><SandySprings /></main><Footer /></>} />
          <Route path="/faqs" element={<><Navbar /><main><FAQs /></main><Footer /></>} />
          <Route path="/services" element={
            <>
              <Navbar />
              <main>
                <Services />
              </main>
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <main>
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/shop" element={
            <>
              <Navbar />
              <main>
                <Shop />
              </main>
              <Footer />
            </>
          } />
          <Route path="/mentorship" element={
            <>
              <Navbar />
              <main>
                <Mentorship />
              </main>
              <Footer />
            </>
          } />
          <Route path="/vending-machines" element={
            <div className="vending-route">
              <Navbar />
              <main>
                <VendingMachines />
              </main>
              <div className="vending-footer"><Footer /></div>
            </div>
          } />
           <Route path="/advertise" element={
            <>
              <Navbar />
              <main>
                <Advertise />
              </main>
              <Footer />
            </>
          } />
          <Route path="/products/beard-wash" element={<Navigate to="/products/therapeutic-shampoo" replace />} />
          <Route path="/products/body-lotion" element={<Navigate to="/products/rich-shea-butter" replace />} />
          <Route path="/products/body-wash" element={<Navigate to="/products/bath-shower-gel" replace />} />
          <Route path="/products/:slug" element={
            <>
              <Navbar />
              <main>
                <ProductDetail />
              </main>
              <Footer />
            </>
          } />
          <Route path="/apparel/:slug" element={
            <>
              <Navbar />
              <main>
                <ApparelDetail />
              </main>
              <Footer />
            </>
          } />
          <Route path="/franchise" element={
            <>
              <Navbar />
              <main>
                <Franchise />
              </main>
              <Footer />
            </>
          } />
          <Route path="/apply" element={
            <>
              <Navbar />
              <main>
                <Apply />
              </main>
              <Footer />
            </>
          } />
          <Route path="/book-now" element={
            <BookNow />
          } />
          <Route path="/speaking-engagements" element={
            <>
              <Navbar />
              <main>
                <SpeakingEngagements />
              </main>
              <Footer />
            </>
          } />
          <Route path="*" element={<><Navbar /><main className="not-found"><h1>Page not found</h1><p>That page is unavailable.</p><Link to="/">Return to Clip Culture</Link></main><Footer /></>} />
        </Routes>
      </Suspense>
        
        {/* Floating Action Buttons - Show on all pages except booking, product details, apparel details, and speaking engagements */}
        {location.pathname !== '/book-now' && location.pathname !== '/vending-machines' && !location.pathname.startsWith('/products/') && !location.pathname.startsWith('/apparel/') && location.pathname !== '/speaking-engagements' && (
          <FloatingActionButtons showOnHome={showFloatingButtons} />
        )}
      </div>
    </LazyMotion>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export { AppContent };
export default App;

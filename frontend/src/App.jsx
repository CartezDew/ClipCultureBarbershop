import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingActionButtons from './components/FloatingActionButtons.jsx';
import Home from './pages/Home.jsx';
const Services = lazy(() => import('./pages/Services.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const Mentorship = lazy(() => import('./pages/Mentorship.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const ApparelDetail = lazy(() => import('./pages/ApparelDetail.jsx'));
const Franchise = lazy(() => import('./pages/Franchise.jsx'));
const Advertise = lazy(() => import('./pages/Advertise.jsx'));
const VendingMachines = lazy(() => import('./pages/VendingMachines.jsx'));
const Apply = lazy(() => import('./pages/Apply.jsx'));
const BarberBio = lazy(() => import('./pages/BarberBio.jsx'));
const Booking = lazy(() => import('./pages/Booking.jsx'));
const BookNow = lazy(() => import('./pages/BookNow.jsx'));
const SpeakingEngagements = lazy(() => import('./pages/SpeakingEngagements.jsx'));

function AppContent() {
  const location = useLocation();
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const isHomePage = location.pathname === '/';

  // Map routes to page names for dynamic titles
  const getPageName = (pathname) => {
    const routeMap = {
      '/': 'Home',
      '/services': 'Services',
      '/about': 'About',
      '/shop': 'Shop',
      '/mentorship': 'Mentorship',
      '/advertise': 'Advertise',
      '/vending-machines': 'Vending Machines',
      '/franchise': 'Franchise',
      '/apply': 'Apply',
      '/booking': 'Book Appointment',
      '/book-now': 'Book Now',
      '/speaking-engagements': 'Speaking Engagements',
    };
    
    // Handle dynamic routes
    if (pathname.startsWith('/products/')) {
      return 'Product';
    }
    if (pathname.startsWith('/apparel/')) {
      return 'Apparel';
    }
    if (pathname.startsWith('/barber/')) {
      return 'Barber';
    }
    
    return routeMap[pathname] || 'Home';
  };

  // Update document title dynamically based on route
  useEffect(() => {
    const pageName = getPageName(location.pathname);
    document.title = `Clip Culture | ${pageName}`;
  }, [location.pathname]);

  // Reset scroll position on route change without animating
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100); // 100ms delay before positioning at top
    
    return () => clearTimeout(timer);
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
    <div className="App">
      <Suspense fallback={<div className="route-loading" role="status" aria-live="polite">Loading Clip Culture…</div>}>
      <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/barber/:barberId" element={
            <>
              <Navbar />
              <main>
                <BarberBio />
              </main>
              <Footer />
            </>
          } />
          <Route path="/booking" element={
            <Booking />
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
        </Routes>
      </Suspense>
        
        {/* Floating Action Buttons - Show on all pages except booking, product details, apparel details, and speaking engagements */}
        {location.pathname !== '/booking' && location.pathname !== '/book-now' && location.pathname !== '/vending-machines' && !location.pathname.startsWith('/products/') && !location.pathname.startsWith('/apparel/') && location.pathname !== '/speaking-engagements' && (
          <FloatingActionButtons showOnHome={showFloatingButtons} />
        )}
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

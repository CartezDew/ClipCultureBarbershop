import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingActionButtons from './components/FloatingActionButtons.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Team from './pages/Team.jsx';
import About from './pages/About.jsx';
import Shop from './pages/Shop.jsx';
import Mentorship from './pages/Mentorship.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import ApparelDetail from './pages/ApparelDetail.jsx';
import Franchise from './pages/Franchise.jsx';
import Advertise from './pages/Advertise.jsx';
import Apply from './pages/Apply.jsx';
import BarberBio from './pages/BarberBio.jsx';
import Booking from './pages/Booking.jsx';
import BookNow from './pages/BookNow.jsx';
import SpeakingEngagements from './pages/SpeakingEngagements.jsx';

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
        const heroBookButton = document.querySelector('.hero__btn--book');
        if (heroBookButton) {
          const buttonRect = heroBookButton.getBoundingClientRect();
          setShowFloatingButtons(buttonRect.bottom < 0);
        }
      } else {
        // On other pages, always show (CSS will handle 605px breakpoint)
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
        
        {/* Floating Action Buttons - Show on all pages except booking, product details, apparel details, and speaking engagements */}
        {location.pathname !== '/booking' && location.pathname !== '/book-now' && !location.pathname.startsWith('/products/') && !location.pathname.startsWith('/apparel/') && location.pathname !== '/speaking-engagements' && (
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

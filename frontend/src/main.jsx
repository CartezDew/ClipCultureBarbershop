import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Ensure scroll is never blocked
const enableScroll = () => {
  document.documentElement.style.overflowY = 'scroll';
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowY = 'visible';
  document.body.style.overflowX = 'hidden';
};

enableScroll();
window.addEventListener('load', enableScroll);

// Keep the prerendered page visible until its route chunk is ready.
const routePreloads = {
  '/sandysprings': () => import('./pages/SandySprings.jsx'),
  '/faqs': () => import('./pages/FAQs.jsx'),
  '/services': () => import('./pages/Services.jsx'),
  '/about': () => import('./pages/About.jsx'),
  '/shop': () => import('./pages/Shop.jsx'),
  '/book-now': () => import('./pages/BookNow.jsx'),
  '/booking': () => import('./pages/Booking.jsx'),
  '/mentorship': () => import('./pages/Mentorship.jsx'),
  '/advertise': () => import('./pages/Advertise.jsx'),
  '/vending-machines': () => import('./pages/VendingMachines.jsx'),
  '/franchise': () => import('./pages/Franchise.jsx'),
  '/apply': () => import('./pages/Apply.jsx'),
  '/speaking-engagements': () => import('./pages/SpeakingEngagements.jsx'),
};

Promise.resolve(routePreloads[window.location.pathname.replace(/\/$/, '')]?.())
  .catch(() => {})
  .then(() => createRoot(document.getElementById('root')).render(
    <StrictMode><App /></StrictMode>,
  ));

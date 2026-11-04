import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App, { preloadRoute } from './App.jsx'

// Ensure scroll is never blocked
const enableScroll = () => {
  document.documentElement.style.overflowY = 'scroll';
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowY = 'visible';
  document.body.style.overflowX = 'hidden';
};

enableScroll();
window.addEventListener('load', enableScroll);

// After a new deploy, an open tab may ask for page chunks that no longer exist; reload once to pick up the new build.
window.addEventListener('vite:preloadError', (event) => {
  let lastReload = 0;
  try { lastReload = Number(sessionStorage.getItem('cc-chunk-reload')) || 0; } catch { /* storage unavailable */ }
  if (Date.now() - lastReload < 10000) return;
  event.preventDefault();
  try { sessionStorage.setItem('cc-chunk-reload', String(Date.now())); } catch { /* storage unavailable */ }
  window.location.reload();
});

// Netlify serves prerendered pages at /path/; the router and page checks expect /path.
if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
  const { pathname, search, hash } = window.location;
  window.history.replaceState(window.history.state, '', pathname.replace(/\/+$/, '') + search + hash);
}

// Keep the prerendered page visible until its route chunk is ready.
preloadRoute(window.location.pathname.replace(/\/$/, '') || '/')
  .catch(() => {})
  .then(() => {
    const root = document.getElementById('root');
    const app = <StrictMode><App /></StrictMode>;
    // Reuse the prerendered HTML instead of rebuilding it, so images and text don't jump.
    if (root.hasChildNodes()) hydrateRoot(root, app);
    else createRoot(root).render(app);
  });

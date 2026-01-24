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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

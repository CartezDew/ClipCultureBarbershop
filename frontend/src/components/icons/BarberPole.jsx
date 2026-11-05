import React from 'react';

// Barber pole drawn for the Shop Hours heading; also used beside small in-store notes.
const BarberPole = ({ className = '', accentClassName = '', detailClassName = '', strokeWidth = 1.8, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M27 10V8a5 5 0 0 1 10 0v2M27 55v1a5 5 0 0 0 10 0v-1M23 16v33m18-33v33" />
    <path d="M22 10h20a3 3 0 0 1 0 6H22a3 3 0 0 1 0-6ZM22 49h20a3 3 0 0 1 0 6H22a3 3 0 0 1 0-6Z" />
    <path className={accentClassName || undefined} d="m23 25 18-9m-18 27 18-9" />
    <path d="m23 32 18-9m-16 26 16-8" />
    <path className={detailClassName || undefined} d="M26 19v3m0 13v4m18-21v29" />
  </svg>
);

export default BarberPole;

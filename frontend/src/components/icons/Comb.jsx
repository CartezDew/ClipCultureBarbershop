import React from 'react';

const Comb = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    {/* Spine and Outline */}
    <path d="M14 2L2 14c-1.1 1.1-1.1 3 0 4.1l3.9 3.9c1.1 1.1 3 1.1 4.1 0L22 10" />
    <path d="M14 2L22 10" />
    {/* Teeth */}
    <path d="M12 4l7 7" />
    <path d="M10 6l7 7" />
    <path d="M8 8l7 7" />
    <path d="M6 10l7 7" />
    <path d="M4 12l7 7" />
  </svg>
);

export default Comb;


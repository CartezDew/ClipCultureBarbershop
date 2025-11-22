import React from 'react';

const Beard = ({ size = 24, color = 'currentColor', className = '', ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M18.5 3C16.8 5.2 14.8 6.2 14.8 8C14.8 9.5 13.5 10.8 12 10.8C10.5 10.8 9.2 9.5 9.2 8C9.2 6.2 7.2 5.2 5.5 3C5.5 3 5 8.5 5 10.5C5 15.5 8 19.5 12 19.5C16 19.5 19 15.5 19 10.5C19 8.5 18.5 3 18.5 3ZM12 13.5C11 13.5 10.2 12.7 10.2 11.7C10.2 10.7 11 9.9 12 9.9C13 9.9 13.8 10.7 13.8 11.7C13.8 12.7 13 13.5 12 13.5Z" 
    />
  </svg>
);

export default Beard;


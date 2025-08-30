import React from 'react';

interface SettingsIconProps {
  className?: string;
  color?: string;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({ 
  className, 
  color = "#62748E" 
}) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle 
      cx="2.08333" 
      cy="2.08333" 
      r="2.08333" 
      transform="matrix(1 0 0 -1 7.91699 12.0833)" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeMiterlimit="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M17.0837 13.1673V6.83268C17.0834 6.55496 17.0105 6.28221 16.8724 6.04177C16.7342 5.80133 16.5357 5.60167 16.2966 5.46281L10.7874 2.2955C10.5481 2.1565 10.2766 2.08333 10.0003 2.08333C9.72402 2.08333 9.45258 2.1565 9.21329 2.2955L3.70403 5.46281C3.46498 5.60167 3.26642 5.80133 3.12828 6.04177C2.99014 6.28221 2.91728 6.55496 2.91699 6.83268V13.1673C2.91728 13.445 2.99014 13.7178 3.12828 13.9582C3.26642 14.1987 3.46498 14.3983 3.70403 14.5372L9.21329 17.7045C9.45258 17.8435 9.72402 17.9167 10.0003 17.9167C10.2766 17.9167 10.5481 17.8435 10.7874 17.7045L16.2966 14.5372C16.5357 14.3983 16.7342 14.1987 16.8724 13.9582C17.0105 13.7178 17.0834 13.445 17.0837 13.1673Z" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeMiterlimit="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

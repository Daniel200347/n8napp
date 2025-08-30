import React from 'react';

interface FilterIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ 
  color = "currentColor", 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg 
        className={className} 
        width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.3335 14.1667H11.6668" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.8335 10H14.1668" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.75 5.83334H16.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};


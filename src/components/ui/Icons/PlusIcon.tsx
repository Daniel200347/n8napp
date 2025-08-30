import React from 'react';

interface PlusIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ 
  color = "currentColor", 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M10 4.16667V15.8333M4.16667 10H15.8333" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};


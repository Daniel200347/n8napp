import React from 'react';

interface CheckCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ 
  className, 
  width = 24, 
  height = 24 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#009966"/>
      <path 
        d="M8.67 9.3L11.34 12L15.33 8" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};





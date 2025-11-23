import React from 'react';

interface DangerCircleIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export const DangerCircleIcon: React.FC<DangerCircleIconProps> = ({ 
  className, 
  width = 20, 
  height = 20 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M9.9987 13.3333V9.16659H9.58203M9.58203 13.3333H10.4154" 
        stroke="#E7000B" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M10 7.08342V6.66675" 
        stroke="#E7000B" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle 
        cx="10" 
        cy="10" 
        r="7.5" 
        stroke="#E7000B" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};





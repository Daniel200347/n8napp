import React from 'react';

interface DashboardIconProps {
  className?: string;
  color?: string;
}

export const DashboardIcon: React.FC<DashboardIconProps> = ({ 
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
    <path 
      d="M5.11079 17.5C4.12895 17.5 3.33301 16.6829 3.33301 15.675V8.33986C3.33301 7.78547 3.5785 7.26114 4.00022 6.91481L8.8891 2.89991C9.53838 2.3667 10.461 2.3667 11.1102 2.8999L15.9991 6.91481C16.4208 7.26113 16.6663 7.78547 16.6663 8.33986V15.675C16.6663 16.6829 15.8704 17.5 14.8886 17.5H5.11079Z" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7.91699 17.5V12.9167C7.91699 11.9962 8.66318 11.25 9.58366 11.25H10.417C11.3375 11.25 12.0837 11.9962 12.0837 12.9167V17.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

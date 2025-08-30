import React from 'react';

interface TemplateIconProps {
  className?: string;
  color?: string;
}

export const TemplateIcon: React.FC<TemplateIconProps> = ({ 
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
      d="M4.16674 16.875C4.16674 17.2202 4.44657 17.5 4.79174 17.5H13.6684C14.6377 17.5 15.0001 17.1956 15.0001 16.1667V14.9624M4.16674 16.875C4.16674 15.8395 5.00621 15 6.04174 15H14.5018C14.6902 15 14.8557 14.9885 15.0001 14.9624M4.16674 16.875V5.16683C4.16674 4.22007 4.10674 3.17581 5.07657 2.68166C5.43309 2.5 5.90015 2.5 6.83357 2.5H14.5002C15.5296 2.5 15.8334 2.86381 15.8334 3.83341V13.6667C15.8334 14.4956 15.5982 14.8543 15.0001 14.9624" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

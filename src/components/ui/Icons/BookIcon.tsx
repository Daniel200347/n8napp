import React from 'react';

interface BookIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const BookIcon: React.FC<BookIconProps> = ({ 
  color = "#62748E", 
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
      <path d="M4.16667 2.5H15.8333C16.2754 2.5 16.6667 2.89134 16.6667 3.33333V16.6667C16.6667 17.1087 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.33333 17.1087 3.33333 16.6667V3.33333C3.33333 2.89134 3.72464 2.5 4.16667 2.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 5H13.3333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 8.33333H13.3333" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.66667 11.6667H10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

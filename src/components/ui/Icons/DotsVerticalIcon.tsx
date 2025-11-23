import React from 'react';

interface DotsVerticalIconProps {
  color?: string;
  size?: number;
  className?: string;
}

export const DotsVerticalIcon: React.FC<DotsVerticalIconProps> = ({
  color = "#62748E",
  size = 24,
  className = ""
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12.25 16H11.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 12H11.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 8H11.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

import React from 'react';

interface MinusIconProps {
  className?: string;
}

export const MinusIcon: React.FC<MinusIconProps> = ({ className = "" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 8H12" stroke="#020618" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


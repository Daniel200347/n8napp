import React from 'react';

interface FilterIconProps {
  className?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.3335 14.1667H11.6668" stroke="#0F172B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.8335 10H14.1668" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3.75 5.83334H16.25" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

);


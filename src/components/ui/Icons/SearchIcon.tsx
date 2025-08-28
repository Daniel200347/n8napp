import React from 'react';

interface SearchIconProps {
    className?: string;
}

export const SearchIcon: React.FC<SearchIconProps> = ({className}) => (

    <svg

        className={className}
        width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.0776 14.0999L16.6444 16.6667M15.9036 9.65093C15.9036 13.14 13.0847 15.9685 9.60733 15.9685C6.12998 15.9685 3.31104 13.14 3.31104 9.65093C3.31104 6.16182 6.12998 3.33334 9.60733 3.33334C13.0847 3.33334 15.9036 6.16182 15.9036 9.65093Z"
            stroke="#0F172B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

);


import React from 'react';

interface ChartIconProps {
    className?: string;
    color?: string;
}

export const ChartIcon: React.FC<ChartIconProps> = ({
                                                        className,
                                                        color = "#62748E"
                                                    }) => (

        <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 2.5V17.5H17.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.5 6.5L11.5 11.4999L9 8.99979L5.5 12.4998" stroke={color} stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>

    )
;

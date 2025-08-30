import React from 'react';

interface DashboardIconProps {
    className?: string;
    color?: string;
}

export const LogoutIcon: React.FC<DashboardIconProps> = ({
                                                                className,
                                                            }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.333 12.9167L16.2497 10L13.333 7.08337" stroke="#62748E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.2465 17.5H5.41667C4.49619 17.5 3.75 16.5406 3.75 15.3571V4.64286C3.75 3.45939 4.49619 2.5 5.41667 2.5H11.25" stroke="#62748E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.91699 9.99658H16.2503" stroke="#62748E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

);

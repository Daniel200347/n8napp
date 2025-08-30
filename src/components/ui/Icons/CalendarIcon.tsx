import React from 'react';

interface CalendarIconProps {
  color?: string;
  size?: number;
}

export const CalendarIcon: React.FC<CalendarIconProps> = ({ 
  color = "#62748E", 
  size = 20 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.91667 7.5H17.0833M4.16667 17.5H15.8333C16.2754 17.5 16.6992 17.3244 17.0118 17.0118C17.3244 16.6992 17.5 16.2754 17.5 15.8333V6.66667C17.5 6.22464 17.3244 5.80072 17.0118 5.48816C16.6992 5.17559 16.2754 5 15.8333 5H4.16667C3.72464 5 3.30072 5.17559 2.98816 5.48816C2.67559 5.80072 2.5 6.22464 2.5 6.66667V15.8333C2.5 16.2754 2.67559 16.6992 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

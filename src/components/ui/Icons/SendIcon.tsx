import React from 'react';

interface SendIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({ 
  width = 20, 
  height = 20,
  className 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16.6581 1.81833C17.6037 1.4874 18.5125 2.39625 18.1816 3.34177L13.2441 17.4492C12.8864 18.4712 11.4632 18.5294 11.0234 17.54L8.38762 11.6113L2.45989 8.97654C1.47053 8.53666 1.5287 7.11354 2.55071 6.75583L16.6581 1.81833ZM3.77043 7.91794L8.78996 10.1484L11.1366 7.80271C11.4296 7.51014 11.9044 7.50992 12.1972 7.80271C12.49 8.09549 12.4898 8.57034 12.1972 8.86326L9.85051 11.209L12.081 16.2285L16.5575 3.44138L3.77043 7.91794Z" 
        fill="#62748E"
      />
    </svg>
  );
};



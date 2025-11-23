import React from 'react';

interface AIAssistantIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const AIAssistantIcon: React.FC<AIAssistantIconProps> = ({ 
  width = 80, 
  height = 80,
  className 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 80 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M0 25C0 11.1929 11.1929 0 25 0H55C68.8071 0 80 11.1929 80 25V55C80 68.8071 68.8071 80 55 80H25C11.1929 80 0 68.8071 0 55V25Z" 
        fill="url(#paint0_linear_6932_3001)" 
        fillOpacity="0.08"
      />
      <path 
        d="M8 28C8 16.9543 16.9543 8 28 8H52C63.0457 8 72 16.9543 72 28V52C72 63.0457 63.0457 72 52 72H28C16.9543 72 8 63.0457 8 52V28Z" 
        fill="url(#paint1_linear_6932_3001)" 
        fillOpacity="0.16"
      />
      <path 
        d="M16.8906 31.3333C16.8906 23.3559 23.3576 16.8889 31.3351 16.8889H48.6684C56.6458 16.8889 63.1128 23.3559 63.1128 31.3333V48.6667C63.1128 56.6441 56.6458 63.1111 48.6684 63.1111H31.3351C23.3576 63.1111 16.8906 56.6441 16.8906 48.6667V31.3333Z" 
        fill="url(#paint2_linear_6932_3001)"
      />
      <path 
        d="M44.4287 28.5129C49.6729 28.513 53.9238 32.7648 53.9238 38.009C53.9238 41.186 52.3619 43.9962 49.9658 45.7199L49.9668 45.7219L39.96 53.0607V47.5197L47.3232 42.1193L47.3262 42.1232V42.1174C48.6144 41.2071 49.456 39.7062 49.4561 38.009C49.4561 35.2327 47.205 32.9818 44.4287 32.9816H35.4912C32.715 32.9818 30.4648 35.2327 30.4648 38.009C30.4649 40.7852 32.7151 43.0361 35.4912 43.0363H39.96V47.5041H35.4912C30.2472 47.5039 25.9962 43.2531 25.9961 38.009C25.9961 32.7648 30.2471 28.5131 35.4912 28.5129H44.4287ZM35.7676 35.7746C37.2014 35.7746 38.4063 36.8461 38.7451 38.2951C38.8504 38.7457 38.4647 39.1262 38.002 39.1262H33.5332C33.0707 39.1259 32.6857 38.7455 32.791 38.2951C33.1298 36.8462 34.334 35.7748 35.7676 35.7746ZM44.1465 35.7746C45.5803 35.7746 46.7852 36.8461 47.124 38.2951C47.2294 38.7457 46.8436 39.1262 46.3809 39.1262H41.9121C41.4496 39.1259 41.0646 38.7455 41.1699 38.2951C41.5087 36.8462 42.7129 35.7748 44.1465 35.7746Z" 
        fill="white"
      />
      <defs>
        <linearGradient 
          id="paint0_linear_6932_3001" 
          x1="0" 
          y1="0" 
          x2="80" 
          y2="80" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F97794"/>
          <stop offset="1" stopColor="#623AA2"/>
        </linearGradient>
        <linearGradient 
          id="paint1_linear_6932_3001" 
          x1="8" 
          y1="8" 
          x2="72" 
          y2="72" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F97794"/>
          <stop offset="1" stopColor="#623AA2"/>
        </linearGradient>
        <linearGradient 
          id="paint2_linear_6932_3001" 
          x1="16.8906" 
          y1="16.8889" 
          x2="63.1128" 
          y2="63.1111" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F97794"/>
          <stop offset="1" stopColor="#623AA2"/>
        </linearGradient>
      </defs>
    </svg>
  );
};



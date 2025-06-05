import React from 'react';

interface HyperionLogoProps {
  size?: number;
  className?: string;
}

const HyperionLogo: React.FC<HyperionLogoProps> = ({ size = 24, className = '' }) => {
  return (
    <div style={{ width: size, height: size }} className={className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M3 7L12 12L21 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HyperionLogo;
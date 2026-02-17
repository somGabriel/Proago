
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="phoenix-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a2a" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
      </defs>
      {/* Central Crown/Body */}
      <path 
        d="M100 50L120 70V90L100 110L80 90V70L100 50Z" 
        fill="url(#phoenix-gradient)" 
      />
      <path 
        d="M100 45L110 55H90L100 45Z" 
        fill="url(#phoenix-gradient)" 
      />
      
      {/* Right Wings */}
      <path d="M130 30C145 45 160 70 160 100C160 115 150 125 140 125C150 115 155 100 155 85C155 60 145 40 130 30Z" fill="url(#phoenix-gradient)" />
      <path d="M140 60C155 75 170 100 170 130C170 145 160 155 150 155C160 145 165 130 165 115C165 90 155 70 140 60Z" fill="url(#phoenix-gradient)" />
      <path d="M145 95C160 110 175 135 175 165C175 180 165 190 155 190C165 180 170 165 170 150C170 125 160 105 145 95Z" fill="url(#phoenix-gradient)" />
      
      {/* Left Wings */}
      <path d="M70 30C55 45 40 70 40 100C40 115 50 125 60 125C50 115 45 100 45 85C45 60 55 40 70 30Z" fill="url(#phoenix-gradient)" />
      <path d="M60 60C45 75 30 100 30 130C30 145 40 155 50 155C40 145 35 130 35 115C35 90 45 70 60 60Z" fill="url(#phoenix-gradient)" />
      <path d="M55 95C40 110 25 135 25 165C25 180 35 190 45 190C35 180 30 165 30 150C30 125 40 105 55 95Z" fill="url(#phoenix-gradient)" />

      {/* Tail/Bottom feathers */}
      <path d="M100 120C105 140 110 165 100 195C90 165 95 140 100 120Z" fill="url(#phoenix-gradient)" />
      <path d="M120 115C130 135 145 155 140 180C130 165 125 145 120 115Z" fill="url(#phoenix-gradient)" />
      <path d="M80 115C70 135 55 155 60 180C70 165 75 145 80 115Z" fill="url(#phoenix-gradient)" />
    </svg>
  );
};

export default Logo;

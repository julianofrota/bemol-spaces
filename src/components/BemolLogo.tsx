
import React from 'react';

interface BemolLogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

const BemolLogo: React.FC<BemolLogoProps> = ({ className = "", variant = "dark" }) => {
  const fillColor = variant === 'light' ? '#FFFFFF' : '#005EB8';
  
  return (
    <svg 
      width="130" 
      height="40" 
      viewBox="0 0 130 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M14.2 8H26.5C29.9 8 32 10.8 32 14.2C32 17.6 29.9 20.4 26.5 20.4H21.1V30H14.2V8ZM21.1 15.2H23.7C24.5 15.2 25.1 14.7 25.1 14C25.1 13.3 24.5 12.8 23.7 12.8H21.1V15.2Z" fill={fillColor}/>
      <path d="M36.4 8H43.3V22.5C43.3 23.8 44 24.5 45.2 24.5C46.4 24.5 47.1 23.8 47.1 22.5V8H54V22.5C54 27.5 50.8 30.7 45.2 30.7C39.6 30.7 36.4 27.5 36.4 22.5V8Z" fill={fillColor}/>
      <path d="M59.2 8H72.9V13.1H66.1V16.2H72.4V21.3H66.1V24.9H72.9V30H59.2V8Z" fill={fillColor}/>
      <path d="M77.9 8H84.8V18.9L91 8H97.9L90.9 20.6L98.4 30H91.3L84.8 21.8V30H77.9V8Z" fill={fillColor}/>
      <path d="M107.1 8H100.2V30H107.1V8Z" fill={fillColor}/>
      <path d="M40 34H90V36H40V34Z" fill={fillColor}/>
      <text x="92" y="28" fontFamily="Arial" fontSize="13" fontWeight="bold" fill={fillColor}>Spaces</text>
    </svg>
  );
};

export default BemolLogo;

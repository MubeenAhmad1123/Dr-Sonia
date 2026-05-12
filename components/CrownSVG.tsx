import React from "react";

interface CrownSVGProps {
  className?: string;
}

export default function CrownSVG({ className }: CrownSVGProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D080" />
          <stop offset="50%" stopColor="#E0BC65" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
        
        <linearGradient id="gemGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFF8DC" />
        </linearGradient>
        
        <pattern id="diamondPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 10 4 L 16 10 L 10 16 L 4 10 Z" fill="rgba(255,255,255,0.25)" />
        </pattern>
      </defs>

      {/* Main Crown Body */}
      <path
        d="M 10,90 
           L 30,50 
           L 55,80 
           L 75,25 
           L 95,75 
           L 100,15 
           L 105,75 
           L 125,25 
           L 145,80 
           L 170,50 
           L 190,90 
           L 190,110 
           L 10,110 Z"
        fill="url(#crownGold)"
        stroke="#9B7B2C"
        strokeWidth="1"
      />

      {/* Base Band Overaly for Pattern */}
      <rect x="10" y="90" width="180" height="20" fill="url(#diamondPattern)" />
      <line x1="10" y1="90" x2="190" y2="90" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />

      {/* Gems at the tips */}
      <circle cx="30" cy="50" r="4" fill="url(#gemGlow)" stroke="#9B7B2C" strokeWidth="0.5" />
      <circle cx="75" cy="25" r="4.5" fill="url(#gemGlow)" stroke="#9B7B2C" strokeWidth="0.5" />
      <circle cx="100" cy="15" r="5.5" fill="url(#gemGlow)" stroke="#9B7B2C" strokeWidth="0.5" />
      <circle cx="125" cy="25" r="4.5" fill="url(#gemGlow)" stroke="#9B7B2C" strokeWidth="0.5" />
      <circle cx="170" cy="50" r="4" fill="url(#gemGlow)" stroke="#9B7B2C" strokeWidth="0.5" />

      {/* Sparkles/Shimmers */}
      {/* Left Sparkle */}
      <path 
        d="M 50,60 Q 50,65 55,65 Q 50,65 50,70 Q 50,65 45,65 Q 50,65 50,60 Z" 
        fill="#FFFFFF" 
        opacity="0.8"
      />
      {/* Center-Right Sparkle */}
      <path 
        d="M 130,55 Q 130,60 135,60 Q 130,60 130,65 Q 130,60 125,60 Q 130,60 130,55 Z" 
        fill="#FFFFFF" 
        opacity="0.9"
      />
      {/* Middle Sparkle */}
      <path 
        d="M 95,40 Q 95,43 98,43 Q 95,43 95,46 Q 95,43 92,43 Q 95,43 95,40 Z" 
        fill="#FFFFFF" 
        opacity="0.7"
      />
    </svg>
  );
}

// CampusHub Brand Logo — reusable SVG component
import React from 'react';

/**
 * CampusHub logo mark — graduation cap inside a rounded square with gradient.
 * size: controls both width and height of the outer box.
 */
export function CampusHubLogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 8px 16px rgba(225,29,72,0.3))' }}>
      <defs>
        <linearGradient id="ch-red" x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#F43F5E"/>
          <stop offset="1" stopColor="#9F1239"/>
        </linearGradient>
        <linearGradient id="ch-purple" x1="0" y1="100" x2="100" y2="0">
          <stop stopColor="#A78BFA"/>
          <stop offset="1" stopColor="#5B21B6"/>
        </linearGradient>
        <linearGradient id="ch-orange" x1="100" y1="0" x2="0" y2="100">
          <stop stopColor="#FB923C"/>
          <stop offset="1" stopColor="#C2410C"/>
        </linearGradient>
      </defs>
      
      {/* 3D Geometric "Hub" Logo */}
      <path d="M50 10 L85 30 L50 50 L15 30 Z" fill="url(#ch-red)" />
      <path d="M85 30 L85 70 L50 90 L50 50 Z" fill="url(#ch-purple)" />
      <path d="M15 30 L15 70 L50 90 L50 50 Z" fill="url(#ch-orange)" />
      
      {/* Glow / Highlight lines */}
      <path d="M50 10 L85 30 L50 50 L15 30 Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.3" />
      <path d="M50 50 L50 90" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}

/**
 * Full brand lockup — logo mark + "CampusHub" wordmark side by side.
 */
export function CampusHubBrand({ size = 38 }: { size?: number }) {
  const fontSize = Math.round(size * 0.52);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <CampusHubLogoMark size={size} />
      <span style={{
        fontWeight: 800,
        fontSize,
        letterSpacing: '-0.5px',
        color: '#111',
        fontFamily: "'Righteous', sans-serif",
        lineHeight: 1,
      }}>
        CampusHub
      </span>
    </div>
  );
}

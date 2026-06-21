import React from 'react';

export default function BackgroundTexture() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.07]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
      fill="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="100%" stopColor="#33E0C7" />
        </linearGradient>
      </defs>
      {Array.from({ length: 9 }).map((_, i) => (
        <path
          key={i}
          d={`M ${-100 + i * 30} 0 Q ${300 + i * 40} ${150 + i * 60}, ${600 + i * 20} ${100 + i * 50} T ${1300 + i * 10} ${250 + i * 40}`}
          stroke="url(#lineGrad)"
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
}

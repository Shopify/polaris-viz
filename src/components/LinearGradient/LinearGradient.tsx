import React from 'react';

interface Props {
  id: string;
  startColor: string;
  endColor: string;
  transition?: string;
}

export function LinearGradient({id, startColor, endColor, transition}: Props) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" x2="0%" y1="100%" y2="0%">
        <stop offset="0%" style={{stopColor: startColor, transition}} />
        <stop offset="100%" style={{stopColor: endColor, transition}} />
      </linearGradient>
    </defs>
  );
}

import React from 'react';

interface Props {
  id: string;
  startColor: string;
  endColor: string;
}

export function LinearGradient({id, startColor, endColor}: Props) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" x2="0%" y1="100%" y2="0%">
        <stop offset="0%" style={{stopColor: startColor}} />
        <stop offset="100%" style={{stopColor: endColor}} />
      </linearGradient>
    </defs>
  );
}

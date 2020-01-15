import React from 'react';

import {Orientation} from '../../types';

import {Segment} from './BarSegment.style';

interface Props {
  scale: number;
  color: string;
  size: number;
  orientation: Orientation;
}

export function BarSegment({color, scale, size, orientation}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  return (
    <Segment
      scale={safeScale}
      height={orientation === 'horizontal' ? size : 0}
      width={orientation === 'vertical' ? size : 0}
      background={color}
    />
  );
}

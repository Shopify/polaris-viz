import React from 'react';
import {animated} from '@react-spring/web';

import {HORIZONTAL_BAR_LABEL_HEIGHT} from '../../constants';

type Size = 'small' | 'large';

const LABEL_HEIGHT = 20;

const LARGE_FONT = 20;

const SMALL_FONT = 14;

const FONT_SIZES = {
  small: SMALL_FONT,
  large: LARGE_FONT,
};

export interface LabelProps {
  barHeight: number;
  label: string;
  labelWidth: number;
  x: number;
  y: number;
  size: Size;
  color?: string;
}

export function Label({
  barHeight,
  label,
  labelWidth,
  x,
  y,
  size,
  color,
}: LabelProps) {
  const labelYOffset = (barHeight - HORIZONTAL_BAR_LABEL_HEIGHT) / 2;

  const fontSize = FONT_SIZES[size];

  return (
    <animated.foreignObject
      height={LABEL_HEIGHT}
      width={labelWidth}
      aria-hidden="true"
      y={y + labelYOffset}
      style={{
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
          color,
          lineHeight: `${HORIZONTAL_BAR_LABEL_HEIGHT}px`,
          height: HORIZONTAL_BAR_LABEL_HEIGHT,
          textAlign: 'center',
          paddingTop: '6px',
        }}
      >
        {label}
      </div>
    </animated.foreignObject>
  );
}

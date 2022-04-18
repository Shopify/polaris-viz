import React from 'react';
import {animated} from '@react-spring/web';
import {useTheme} from '@shopify/polaris-viz-core';

import {HORIZONTAL_BAR_LABEL_HEIGHT} from '../../constants';

const FONT_SIZE = 20;

export interface LabelProps {
  barHeight: number;
  label: string;
  labelWidth: number;
  x: number;
  y: number;
  animationDelay?: number;
  isAnimated?: boolean;
  theme?: string;
}

export function Label({barHeight, label, labelWidth, x, y, theme}: LabelProps) {
  const labelYOffset = (barHeight - HORIZONTAL_BAR_LABEL_HEIGHT) / 2;

  const selectedTheme = useTheme(theme);

  return (
    <animated.foreignObject
      height={FONT_SIZE}
      width={labelWidth}
      aria-hidden="true"
      y={y + labelYOffset}
      style={{
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: `${FONT_SIZE}px`,
          color: selectedTheme.xAxis.labelColor,
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

import {Direction, useTheme} from '@shopify/polaris-viz-core';
import React from 'react';

import styles from './AnnotationLine.scss';

const CARET_SIZE = 9;
const CARET_Y_OFFSET = -11;

export interface AnnotationLineProps {
  size: number;
  x: number;
  y: number;
  theme?: string;
  direction?: Direction;
}

function getLineCoords({
  direction,
  size,
  x,
  y,
}: Omit<AnnotationLineProps, 'color'>) {
  if (direction === 'vertical') {
    return {
      x1: x,
      x2: x,
      y1: y,
      y2: size,
    };
  }

  return {
    x1: x,
    x2: size,
    y1: y,
    y2: y,
  };
}

export function AnnotationLine({
  direction = 'vertical',
  size,
  theme,
  x,
  y,
}: AnnotationLineProps) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      <line
        className={styles.Line}
        stroke={selectedTheme.annotations.backgroundColor}
        strokeWidth="1"
        strokeDasharray="3 2"
        {...getLineCoords({direction, size, x, y})}
      />
      <path
        d="M5.80929 14.3661C5.05774 15.017 3.94222 15.017 3.19067 14.3661L-2.25902e-05 11.5L0 0.5L8.99998 0.500013L8.99997 11.5L5.80929 14.3661Z"
        transform={`translate(${x - CARET_SIZE / 2}, ${y + CARET_Y_OFFSET})`}
        fill={selectedTheme.annotations.backgroundColor}
      />
    </React.Fragment>
  );
}

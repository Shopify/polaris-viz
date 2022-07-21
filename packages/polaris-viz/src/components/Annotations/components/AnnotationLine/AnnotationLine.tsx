import {Direction, useTheme} from '@shopify/polaris-viz-core';
import React from 'react';

import {PILL_OPACITY} from '../../constants';
import {useBrowserCheck} from '../../../../hooks/useBrowserCheck';

import styles from './AnnotationLine.scss';

const CARET_SIZE = 16;
const CARET_Y_OFFSET = -4;

export interface AnnotationLineProps {
  size: number;
  x: number;
  y: number;
  direction?: Direction;
  hasCaret?: boolean;
}

function getLineCoords({
  direction,
  size,
  x,
  y,
}: Omit<AnnotationLineProps, 'theme'>) {
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
  hasCaret = true,
  size,
  x,
  y,
}: AnnotationLineProps) {
  const selectedTheme = useTheme();
  const {isFirefox} = useBrowserCheck();

  const yPosition = hasCaret ? y + Math.abs(CARET_Y_OFFSET) : y;

  return (
    <React.Fragment>
      <line
        className={styles.Line}
        stroke={selectedTheme.annotations.lineColor}
        strokeWidth="1"
        strokeDasharray="3 2"
        {...getLineCoords({direction, size, x, y: yPosition})}
      />
      {hasCaret && (
        <path
          d="M9.31 7.866a2 2 0 0 1-2.62 0L1.664 3.512C.263 2.3 1.12 0 2.973 0h10.055c1.852 0 2.709 2.3 1.31 3.512L9.308 7.866Z"
          transform={`translate(${x - CARET_SIZE / 2}, ${y + CARET_Y_OFFSET})`}
          fill={selectedTheme.annotations.backgroundColor}
          opacity={isFirefox ? 1 : PILL_OPACITY}
        />
      )}
    </React.Fragment>
  );
}

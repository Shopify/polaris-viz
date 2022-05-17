import {useTheme} from '@shopify/polaris-viz-core';
import React from 'react';

import type {AnnotationLine as AnnotationLineType} from '../../types';
import {PILL_HEIGHT} from '../../constants';

import styles from './AnnotationLine.scss';

const CARET_SIZE = 9;
const CARET_Y_OFFSET = 11;
const DOT_SIZE = 4;

export interface AnnotationLineProps {
  line: AnnotationLineType;
  theme?: string;
}

export function AnnotationLine({line, theme}: AnnotationLineProps) {
  const selectedTheme = useTheme(theme);

  const {height, color, x, y} = line;

  return (
    <React.Fragment>
      <line
        className={styles.Line}
        stroke={selectedTheme.annotations.backgroundColor}
        strokeWidth="1"
        strokeDasharray="3 2"
        x1={x}
        x2={x}
        y1={y}
        y2={height}
      />
      <path
        d="M5.80929 14.3661C5.05774 15.017 3.94222 15.017 3.19067 14.3661L-2.25902e-05 11.5L0 0.5L8.99998 0.500013L8.99997 11.5L5.80929 14.3661Z"
        transform={`translate(${x - CARET_SIZE / 2}, ${
          y + PILL_HEIGHT - CARET_Y_OFFSET
        })`}
        fill={selectedTheme.annotations.backgroundColor}
      />
      <circle
        cx={x}
        cy={height}
        r={DOT_SIZE}
        fill={color as string}
        stroke={selectedTheme.chartContainer.backgroundColor}
        strokeWidth="2"
      />
    </React.Fragment>
  );
}

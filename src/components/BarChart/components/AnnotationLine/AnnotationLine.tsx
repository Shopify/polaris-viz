import {Globals} from '@react-spring/web';
import React from 'react';

import {classNames, clamp} from '../../../../utilities';
import type {Annotation} from '../../types';

import styles from './AnnotationLine.scss';

const MEDIAN_OFFSET = 0.5;

export interface AnnotationLineProps extends Omit<Annotation, 'dataIndex'> {
  xPosition: number;
  barWidth: number;
  drawableHeight: number;
}

export function AnnotationLine({
  xPosition,
  barWidth,
  drawableHeight,
  width: annotationWidth,
  color,
  xOffset = MEDIAN_OFFSET,
}: AnnotationLineProps) {
  const halfAnnotationWidth = annotationWidth / 2;
  const offset = barWidth * xOffset;
  const xValueClamped = clamp({
    amount: xPosition + offset,
    min: xPosition + halfAnnotationWidth,
    max: xPosition + barWidth - halfAnnotationWidth,
  });

  return (
    <line
      className={classNames(!Globals.skipAnimation && styles.AnimatedLine)}
      stroke={color}
      strokeWidth={annotationWidth}
      x1={xValueClamped}
      x2={xValueClamped}
      y1={drawableHeight}
      y2={0}
    />
  );
}

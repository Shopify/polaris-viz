import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {clamp, getColorValue} from '../../../../utilities';
import {Annotation} from '../../types';

import styles from './AnnotationLine.scss';

const MEDIAN_OFFSET = 0.5;

export interface AnnotationLineProps extends Omit<Annotation, 'dataIndex'> {
  xPosition: number;
  barWidth: number;
  drawableHeight: number;
  shouldAnimate?: boolean;
}

export function AnnotationLine({
  xPosition,
  barWidth,
  drawableHeight,
  width: annotationWidth,
  shouldAnimate = false,
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
      className={classNames(styles.Line, shouldAnimate && styles.AnimatedLine)}
      stroke={getColorValue(color)}
      strokeWidth={annotationWidth}
      x1={xValueClamped}
      x2={xValueClamped}
      y1={drawableHeight}
      y2={0}
    />
  );
}

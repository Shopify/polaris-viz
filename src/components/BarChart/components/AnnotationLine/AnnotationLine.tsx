import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {clamp, getColorValue, isValidColorToken} from '../../../../utilities';
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

  const lookedUpColor = isValidColorToken(color) ? getColorValue(color) : color;

  return (
    <line
      className={classNames(shouldAnimate && styles.AnimatedLine)}
      stroke={lookedUpColor}
      strokeWidth={annotationWidth}
      x1={xValueClamped}
      x2={xValueClamped}
      y1={drawableHeight}
      y2={0}
    />
  );
}

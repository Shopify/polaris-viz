import React from 'react';
import {clamp, Direction, IS_ANIMATED_DEFAULT} from '@shopify/polaris-viz-core';

import {classNames} from '../../../../utilities';
import type {Annotation} from '../../types';

import styles from './AnnotationLine.scss';

const MEDIAN_OFFSET = 0.5;

export interface AnnotationLineProps
  extends Omit<Annotation, 'dataPointIndex' | 'dataSeriesIndex'> {
  position: number;
  barSize: number;
  drawableSize: number;
  direction?: Direction;
  isAnimated?: boolean;
}

export function AnnotationLine({
  barSize,
  color,
  direction = 'vertical',
  drawableSize,
  isAnimated = IS_ANIMATED_DEFAULT,
  offset = MEDIAN_OFFSET,
  position,
  width: annotationWidth,
}: AnnotationLineProps) {
  const halfAnnotationWidth = annotationWidth / 2;
  const centerOffset = barSize * offset;
  const xValueClamped = clamp({
    amount: position + centerOffset,
    min: position + halfAnnotationWidth,
    max: position + barSize - halfAnnotationWidth,
  });

  const xy =
    direction === 'vertical'
      ? {
          x1: xValueClamped,
          x2: xValueClamped,
          y1: drawableSize,
          y2: 0,
        }
      : {
          y1: xValueClamped,
          y2: xValueClamped,
          x1: drawableSize,
          x2: 0,
        };

  return (
    <line
      className={classNames(isAnimated && styles.AnimatedLine)}
      stroke={color}
      strokeWidth={annotationWidth}
      {...xy}
    />
  );
}

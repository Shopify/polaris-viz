import React from 'react';
import type {Direction} from 'types';

import {classNames, clamp} from '../../../../utilities';
import type {Annotation} from '../../types';

import styles from './AnnotationLine.scss';

const MEDIAN_OFFSET = 0.5;

export interface AnnotationLineProps
  extends Omit<Annotation, 'dataPointIndex' | 'dataSeriesIndex'> {
  position: number;
  barSize: number;
  drawableSize: number;
  shouldAnimate?: boolean;
  direction?: Direction;
}

export function AnnotationLine({
  barSize,
  color,
  direction = 'vertical',
  drawableSize,
  offset = MEDIAN_OFFSET,
  position,
  shouldAnimate = false,
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
      className={classNames(shouldAnimate && styles.AnimatedLine)}
      stroke={color}
      strokeWidth={annotationWidth}
      {...xy}
    />
  );
}

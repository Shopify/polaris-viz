import React from 'react';

import {clamp, getColorValue} from '../../../../utilities';
import {Annotation} from '../../types';

import styles from './AnnotationLine.scss';

export interface AnnotationLineProps extends Annotation {
  xPosition: number;
  barWidth: number;
  drawableHeight: number;
}

const MIN_OFFSET = 0;
const MEDIAN_OFFSET = 0.5;
const MAX_OFFSET = 1;

export function AnnotationLine({
  xPosition,
  barWidth,
  drawableHeight,
  width: annotationWidth,
  color,
  ariaLabel,
  xOffset = MEDIAN_OFFSET,
}: AnnotationLineProps) {
  const xOffsetClamped = clamp({
    amount: xOffset,
    min: MIN_OFFSET,
    max: MAX_OFFSET,
  });
  const halfBarWidth = barWidth / 2;
  const offset = barWidth * xOffsetClamped - halfBarWidth;
  const xValue = xPosition + halfBarWidth + offset;

  // This ensures that the annotation line stays inside of the bar and is:
  //   left aligned  when the value is 0
  //   centered      when the value is 0.5
  //   right aligned when the value is 1.0
  const halfAnnotationWidth = annotationWidth / 2;
  let xTranslate;
  if (xOffsetClamped === MIN_OFFSET) {
    xTranslate = halfAnnotationWidth;
  } else if (xOffsetClamped === MEDIAN_OFFSET) {
    xTranslate = 0;
  } else if (xOffsetClamped === MAX_OFFSET) {
    xTranslate = halfAnnotationWidth * -1;
  }

  return (
    <line
      className={styles.Line}
      stroke={getColorValue(color)}
      strokeWidth={annotationWidth}
      x1={xValue}
      x2={xValue}
      y1={drawableHeight}
      y2={0}
      aria-label={ariaLabel}
      tabIndex={0}
      role="img"
      style={{
        transform: `translateX(${xTranslate}px)`,
      }}
    />
  );
}

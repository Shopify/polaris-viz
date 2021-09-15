import React from 'react';

import {
  createCSSGradient,
  isGradientType,
  classNames,
} from 'utilities';
import type {Orientation, Size} from 'components/NormalizedStackedBarChart/types';
import type {Color} from 'types';

import styles from 'components/NormalizedStackedBarChart/components/BarSegment/BarSegment.scss';

interface Props {
  scale: number;
  color: Color;
  size: Size;
  orientation: Orientation;
  roundedCorners: boolean;
}

export function BarSegment({
  color,
  scale,
  size,
  orientation,
  roundedCorners,
}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  const angle = orientation === 'horizontal' ? 90 : 180;

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  return (
    <div
      className={classNames(
        styles.Segment,
        roundedCorners && styles[`${orientation}-RoundedCorners`],
        styles[`${orientation}-${size}`],
      )}
      style={{flexBasis: `${safeScale}%`, background: formattedColor}}
    />
  );
}

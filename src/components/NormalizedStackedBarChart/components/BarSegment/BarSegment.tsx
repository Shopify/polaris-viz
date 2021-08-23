import React from 'react';

import {createCSSGradient, isGradientType} from '../../../../utilities';
import type {Orientation, Size} from '../../types';
import type {Color} from '../../../../types';

import styles from './BarSegment.scss';

interface Props {
  scale: number;
  color: Color;
  size: Size;
  orientation: Orientation;
}

export function BarSegment({color, scale, size, orientation}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  const angle = orientation === 'horizontal' ? -90 : 180;

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  return (
    <div
      className={classNames(styles.Segment, styles[`${orientation}-${size}`])}
      style={{flexBasis: `${safeScale}%`, background: formattedColor}}
    />
  );
}

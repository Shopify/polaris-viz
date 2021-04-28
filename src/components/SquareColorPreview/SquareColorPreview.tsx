import React from 'react';
import {SeriesColor, GradientStop} from 'types';

import {getColorValue, isGradientType} from '../../utilities';

import styles from './SquareColorPreview.scss';

export interface SquareColorPreviewProps {
  color: SeriesColor;
}

const createCSSGradient = (gradient: GradientStop[]) => {
  const gradientStops = gradient.map(
    ({color, offset}) => `${color} ${offset}%`,
  );

  return `linear-gradient(0deg, ${gradientStops.join(',')})`;
};

export function SquareColorPreview({color}: SquareColorPreviewProps) {
  const background = isGradientType(color)
    ? createCSSGradient(color)
    : getColorValue(color);

  return <div className={styles.ColorPreview} style={{background}} />;
}

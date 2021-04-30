import React from 'react';
import {SeriesColor} from 'types';

import {
  getColorValue,
  isGradientType,
  createCSSGradient,
} from '../../utilities';

import styles from './SquareColorPreview.scss';

export interface SquareColorPreviewProps {
  color: SeriesColor;
}

export function SquareColorPreview({color}: SquareColorPreviewProps) {
  const background = isGradientType(color)
    ? createCSSGradient(color)
    : getColorValue(color);

  return <div className={styles.ColorPreview} style={{background}} />;
}

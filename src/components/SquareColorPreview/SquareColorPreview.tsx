import React from 'react';
import type {SeriesColor} from 'types';

import {isGradientType, createCSSGradient} from '../../utilities';

import styles from './SquareColorPreview.scss';

export interface SquareColorPreviewProps {
  color: SeriesColor;
}

export function SquareColorPreview({color}: SquareColorPreviewProps) {
  const background = isGradientType(color) ? createCSSGradient(color) : color;

  return <div className={styles.ColorPreview} style={{background}} />;
}

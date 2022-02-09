import React from 'react';
import type {Color} from 'types';

import {isGradientType, createCSSGradient} from '../../utilities';

import styles from './SquareColorPreview.scss';

export interface SquareColorPreviewProps {
  color: Color;
}

export function SquareColorPreview({color}: SquareColorPreviewProps) {
  const background = isGradientType(color)
    ? createCSSGradient(color, 305)
    : color;

  return <span className={styles.ColorPreview} style={{background}} />;
}

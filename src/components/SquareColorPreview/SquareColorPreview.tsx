import React from 'react';
import type {Color} from 'types';

import {isGradientType, createCSSGradient} from '../../utilities';

import styles from './SquareColorPreview.scss';

export interface SquareColorPreviewProps {
  color: Color;
  as?: 'div' | 'span';
}

export function SquareColorPreview({
  as = 'div',
  color,
}: SquareColorPreviewProps) {
  const background = isGradientType(color)
    ? createCSSGradient(color, 305)
    : color;

  const Tag = as;

  return <Tag className={styles.ColorPreview} style={{background}} />;
}

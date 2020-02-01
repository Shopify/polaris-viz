import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Orientation, Size} from '../../types';

import styles from './BarSegment.scss';

interface Props {
  scale: number;
  color: string;
  size: Size;
  orientation: Orientation;
}

export function BarSegment({color, scale, size, orientation}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  return (
    <div
      className={classNames(styles.Segment, styles[`${orientation}-${size}`])}
      style={{flex: `0 0 ${safeScale}%`, background: color}}
    />
  );
}

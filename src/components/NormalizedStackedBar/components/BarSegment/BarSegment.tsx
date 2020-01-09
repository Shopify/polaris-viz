import React from 'react';
import {Orientation} from '../../types';
import * as styles from './BarSegment.scss';

interface Props {
  scale: number;
  color: string;
  size: number;
  orientation: Orientation;
}

export function BarSegment({color, scale, size, orientation}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;
  const sizeStyle =
    orientation === Orientation.Horizontal ? {height: size} : {width: size};

  return (
    <div
      style={{flex: `${safeScale} 0 0`, ...sizeStyle, background: color}}
      className={styles.BarSegment}
    />
  );
}

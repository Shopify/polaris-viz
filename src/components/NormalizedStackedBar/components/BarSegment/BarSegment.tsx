import React from 'react';
import {Orientation} from '../../types';
import * as styles from './BarSegment.scss';

interface Props {
  barWidth: number;
  color: string;
  size: number;
  orientation: Orientation;
}

export function BarSegment({color, barWidth, size, orientation}: Props) {
  const widthNeedsRounding = barWidth > 0 && barWidth < 1.5;
  const safeWidth = widthNeedsRounding ? 1.5 : barWidth;
  const sizeStyle =
    orientation === Orientation.Horizontal ? {height: size} : {width: size};

  return (
    <div
      style={{flex: `${safeWidth} 0 0`, ...sizeStyle, background: color}}
      className={styles.BarSegment}
    />
  );
}

import React from 'react';
import {animated} from 'react-spring';

import {CROSSHAIR_WIDTH} from '../../constants';

import styles from './Crosshair.scss';

interface Props {
  x: number | null;
  height: number;
  opacity?: number;
  crossHairColor?: string;
}

export function Crosshair({x, height, opacity = 1, crossHairColor}: Props) {
  return (
    <animated.rect
      x={x === null ? 0 : x}
      width={CROSSHAIR_WIDTH}
      height={height}
      stroke="none"
      className={styles.Crosshair}
      style={{
        opacity,
        fill: crossHairColor,
      }}
    />
  );
}

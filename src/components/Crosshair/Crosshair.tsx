import React from 'react';

import {CROSSHAIR_WIDTH} from '../../constants';

import styles from './Crosshair.scss';

interface Props {
  x: number;
  height: number;
  opacity?: number;
  crossHairColor?: string;
}

export function Crosshair({x, height, opacity = 1, crossHairColor}: Props) {
  return (
    <rect
      x={x - CROSSHAIR_WIDTH / 2}
      width={CROSSHAIR_WIDTH}
      height={height}
      stroke="none"
      className={styles.Crosshair}
      style={{
        opacity,
        fill: crossHairColor ? 'rgb(14, 48, 94)' : undefined,
      }}
    />
  );
}

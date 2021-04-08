import React from 'react';
import {animated} from 'react-spring';

import {CROSSHAIR_WIDTH} from '../../constants';

import styles from './Crosshair.scss';

interface Props {
  x: number;
  height: number;
  opacity?: number;
}

export function Crosshair({x, height, opacity = 1}: Props) {
  return (
    <animated.rect
      x={x.interpolate((xPos) => (xPos as number) - CROSSHAIR_WIDTH / 2)}
      width={CROSSHAIR_WIDTH}
      height={height}
      stroke="none"
      className={styles.Crosshair}
      style={{
        opacity,
      }}
    />
  );
}

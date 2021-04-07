import React from 'react';
import {useSpring, animated} from 'react-spring';

import {CROSSHAIR_WIDTH} from '../../constants';

import styles from './Crosshair.scss';

interface Props {
  x: number;
  height: number;
  opacity?: number;
  isAnimated: boolean;
}

export function Crosshair({x, height, isAnimated, opacity = 1}: Props) {
  const {animatedXPosition} = useSpring({
    animatedXPosition: x,
  });

  return (
    <animated.rect
      x={
        isAnimated
          ? animatedXPosition.interpolate(
              (xPos) => (xPos as number) - CROSSHAIR_WIDTH / 2,
            )
          : x - CROSSHAIR_WIDTH / 2
      }
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

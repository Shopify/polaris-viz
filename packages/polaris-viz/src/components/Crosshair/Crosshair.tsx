import React from 'react';
import {animated, Interpolation} from '@react-spring/web';
import {useTheme} from '@shopify/polaris-viz-core';

import style from './Crosshair.scss';

interface Props {
  x: number | Interpolation;
  height: number;

  opacity?: number;
  theme: string;
}

export function Crosshair({x, height, opacity = 1, theme}: Props) {
  const selectedTheme = useTheme(theme);
  return (
    <animated.rect
      className={style.Crosshair}
      x={x}
      width={selectedTheme.crossHair.width}
      height={height}
      stroke="none"
      style={{
        opacity,
        fill: selectedTheme.crossHair.color,
      }}
    />
  );
}

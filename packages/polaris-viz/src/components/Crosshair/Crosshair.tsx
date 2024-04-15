import type {Interpolation} from '@react-spring/web';
import {animated} from '@react-spring/web';
import {useTheme} from '@shopify/polaris-viz-core';

import style from './Crosshair.scss';

interface Props {
  x: number | Interpolation;
  height: number;
  theme: string;

  id?: string;
  opacity?: number;
}

export function Crosshair({x, height, opacity = 1, theme, id}: Props) {
  const selectedTheme = useTheme(theme);

  return (
    <animated.rect
      className={style.Crosshair}
      x={x}
      width={selectedTheme.crossHair.width}
      height={height}
      stroke="none"
      id={id}
      style={{
        opacity,
        fill: selectedTheme.crossHair.color,
      }}
    />
  );
}

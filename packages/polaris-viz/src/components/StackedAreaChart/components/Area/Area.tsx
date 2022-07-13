import React, {useState} from 'react';
import {animated, useSpring} from '@react-spring/web';
import type {Area as D3Area, Line} from 'd3-shape';
import {
  LinearGradientWithStops,
  isGradientType,
  getColorVisionEventAttrs,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {Color, Theme, GradientStop} from '@shopify/polaris-viz-core';

import type {StackedSeries} from '../../../../types';
import {LINES_LOAD_ANIMATION_CONFIG} from '../../../../constants';

import styles from './Area.scss';

export interface AreaProps {
  activeLineIndex: number;
  animationIndex: number;
  areaGenerator: D3Area<number[]>;
  colors: Color[];
  data: StackedSeries;
  duration: number;
  id: string;
  index: number;
  lineGenerator: Line<number[]>;
  selectedTheme: Theme;
}

export function Area({
  activeLineIndex,
  animationIndex,
  areaGenerator,
  colors,
  data,
  duration,
  id,
  index,
  lineGenerator,
  selectedTheme,
}: AreaProps) {
  const [mounted, setMounted] = useState(false);
  const {shouldAnimate} = useChartContext();

  const delay = animationIndex * (duration / 2);

  const spring = useSpring({
    from: {transform: 'translateY(25%)', opacity: 0},
    to: {transform: 'translateY(0)', opacity: 1},
    delay: mounted ? 0 : delay,
    duration,
    config: LINES_LOAD_ANIMATION_CONFIG,
    default: {
      immediate: !shouldAnimate || mounted,
    },
    onRest: () => setMounted(true),
  });

  const areaSpring = useSpring({
    from: {opacity: 0},
    to: {opacity: 0.25},
    delay: !shouldAnimate ? 0 : delay + duration,
    duration,
    config: LINES_LOAD_ANIMATION_CONFIG,

    default: {
      immediate: !shouldAnimate || mounted,
    },
  });

  const shape = areaGenerator(data);
  const line = lineGenerator(data);

  if (shape == null || line == null) {
    return null;
  }

  const currentColor = colors[index];
  const isGradient = isGradientType(currentColor);

  const gradient = isGradient
    ? currentColor
    : [{offset: 0, color: currentColor}];

  return (
    <animated.g
      style={{
        ...spring,
        transformOrigin: 'bottom center',
      }}
      {...getColorVisionEventAttrs({
        type: COLOR_VISION_SINGLE_ITEM,
        index,
      })}
      tabIndex={-1}
    >
      <defs>
        <LinearGradientWithStops
          id={`area-${id}-${index}`}
          gradient={gradient as GradientStop[]}
          gradientUnits="userSpaceOnUse"
          y1="100%"
          y2="0%"
        />
      </defs>
      <g
        style={getColorVisionStylesForActiveIndex({
          activeIndex: activeLineIndex,
          index,
        })}
        aria-hidden="true"
        tabIndex={-1}
        className={styles.Group}
      >
        <path
          key={`line-${index}`}
          d={line}
          fill="none"
          stroke={`url(#area-${id}-${index})`}
          strokeWidth={selectedTheme.line.width}
        />
        <animated.path
          key={index}
          d={shape}
          fill={`url(#area-${id}-${index})`}
          style={areaSpring}
        />
      </g>
    </animated.g>
  );
}

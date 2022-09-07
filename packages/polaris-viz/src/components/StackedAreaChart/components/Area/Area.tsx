import React, {useRef} from 'react';
import {animated, useSpring} from '@react-spring/web';
import type {SpringValue} from '@react-spring/web';
import type {Area as D3Area, Line} from 'd3-shape';
import {
  LinearGradientWithStops,
  getColorVisionEventAttrs,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  useChartContext,
  AREAS_LOAD_ANIMATION_CONFIG,
  getGradientFromColor,
} from '@shopify/polaris-viz-core';
import type {Color, Theme, GradientStop} from '@shopify/polaris-viz-core';

import type {StackedSeries} from '../../../../types';

import styles from './Area.scss';

export interface AreaProps {
  activeLineIndex: number;
  animationIndex: number;
  areaGenerator: D3Area<number[]>;
  colors: Color[];
  data: StackedSeries;
  zeroLineValues: StackedSeries;
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
  zeroLineValues,
}: AreaProps) {
  const {shouldAnimate} = useChartContext();

  const delay = animationIndex * (duration / 2);

  const mounted = useRef(false);

  const {
    animatedAreaShape,
    animatedLineShape,
    opacity,
  }: {
    animatedAreaShape: SpringValue;
    animatedLineShape: SpringValue;
    opacity: SpringValue;
  } = useSpring({
    from: {
      opacity: 0,
      animatedAreaShape: areaGenerator(mounted.current ? data : zeroLineValues),
      animatedLineShape: lineGenerator(mounted.current ? data : zeroLineValues),
    },
    to: {
      opacity: 0.25,
      animatedAreaShape: areaGenerator(data),
      animatedLineShape: lineGenerator(data),
    },
    delay: mounted.current ? 0 : delay,
    config: AREAS_LOAD_ANIMATION_CONFIG,
    default: {immediate: !shouldAnimate},
    onRest: () => (mounted.current = true),
  });

  if (animatedAreaShape == null || animatedLineShape == null) {
    return null;
  }

  const gradient = getGradientFromColor(colors[index]);

  return (
    <g
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
        <animated.path
          key={`line-${index}`}
          d={animatedLineShape}
          fill="none"
          stroke={`url(#area-${id}-${index})`}
          strokeWidth={selectedTheme.line.width}
        />
        <animated.path
          key={index}
          style={{opacity}}
          d={animatedAreaShape}
          fill={`url(#area-${id}-${index})`}
        />
      </g>
    </g>
  );
}

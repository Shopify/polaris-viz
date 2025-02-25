import {Fragment, useRef} from 'react';
import {useSpring} from '@react-spring/core';
import type {Line} from 'd3-shape';

import type {DataPoint, LineChartDataSeriesWithDefaults} from '../../../../';
import {
  usePolarisVizContext,
  LINES_LOAD_ANIMATION_CONFIG,
  getColorVisionStylesForActiveIndex,
} from '../../../../';
import {useSpringConfig} from '../../../../hooks/useSpringConfig';
import {LINES_TRANSITION_CONFIG} from '../../../../constants';

interface AnimatedLineProps {
  activeLineIndex: number;
  delay: number;
  fromData: LineChartDataSeriesWithDefaults;
  immediate: boolean;
  index: number;
  isComparisonLine: boolean;
  lastY: number;
  lineGenerator: Line<DataPoint>;
  strokeDasharray: string;
  strokeWidth: number;
  toData: LineChartDataSeriesWithDefaults;
  zeroLineData: DataPoint[];
  zeroLineY: number;
}

export function AnimatedLine({
  activeLineIndex,
  delay,
  fromData,
  immediate,
  index,
  isComparisonLine,
  lastY,
  lineGenerator,
  strokeDasharray,
  strokeWidth,
  toData,
  zeroLineData,
  zeroLineY,
}: AnimatedLineProps) {
  const {
    components: {Path},
    animated,
  } = usePolarisVizContext();
  const AnimatedPath = animated(Path);

  const springConfig = useSpringConfig({
    shouldAnimate: !immediate,
    animationDelay: immediate ? 0 : delay,
    mountedSpringConfig: LINES_TRANSITION_CONFIG,
    unmountedSpringConfig: LINES_LOAD_ANIMATION_CONFIG,
  });

  const mounted = useRef(false);

  const {animatedLineShape} = useSpring({
    from: {
      cy: mounted.current ? lastY : zeroLineY,
      animatedLineShape: lineGenerator(
        mounted.current ? fromData.data : zeroLineData,
      ),
    },
    to: {
      cy: lastY,
      animatedLineShape: lineGenerator(toData.data),
    },
    ...springConfig,
  });

  return (
    <Fragment>
      <AnimatedPath
        d={animatedLineShape}
        stroke="white"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{
          ...(isComparisonLine
            ? {}
            : getColorVisionStylesForActiveIndex({
                activeIndex: activeLineIndex,
                index,
              })),
          strokeDasharray,
        }}
      />
    </Fragment>
  );
}

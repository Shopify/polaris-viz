import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG} from '../../../constants';
import type {Data} from '../types';
import {Size} from '../types';
import {LABEL_HEIGHT, STACKED_BAR_GAP} from '../constants';

import {StackedBar} from './StackedBar';

export interface StackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  groupIndex: number;
  series: Data[];
  size: Size;
  xScale: ScaleLinear<number, number>;
}

export function StackedBars({
  animationDelay,
  ariaLabel,
  groupIndex,
  series,
  size = Size.Small,
  xScale,
}: StackedBarsProps) {
  const xOffsets = useMemo(() => {
    const offsets: number[] = [];

    series.forEach((_, index) => {
      const prevIndex = index - 1;

      if (series[prevIndex] == null) {
        offsets.push(0);
      } else {
        const previousScale = offsets[index - 1];
        offsets.push(xScale(series[prevIndex].rawValue) + previousScale);
      }
    });

    return offsets;
  }, [series, xScale]);

  const {transform} = useSpring({
    from: {transform: `scale(0, 1) translate(0, ${LABEL_HEIGHT}px`},
    to: {transform: `scale(1, 1) translate(0, ${LABEL_HEIGHT}px`},
    config: BARS_TRANSITION_CONFIG,
    delay: animationDelay,
  });

  return (
    <animated.g aria-label={ariaLabel} role="listitem" style={{transform}}>
      {series.map(({rawValue}, seriesIndex) => {
        const x = xOffsets[seriesIndex] + STACKED_BAR_GAP * seriesIndex;

        return (
          <StackedBar
            groupIndex={groupIndex}
            key={seriesIndex}
            seriesIndex={seriesIndex}
            size={size}
            width={xScale(rawValue)}
            x={x}
          />
        );
      })}
    </animated.g>
  );
}

import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG} from '../../../constants';
import type {Data} from '../types';
import {GRADIENT_ID, LABEL_HEIGHT, STACKED_BAR_GAP} from '../constants';
import {getBarId} from '../utilities';

import {StackedBar} from './StackedBar';
import {getGradientDefId} from './GradientDefs';

export interface StackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  groupIndex: number;
  name: string;
  series: Data[];
  xScale: ScaleLinear<number, number>;
  theme?: string;
}

export function StackedBars({
  animationDelay,
  ariaLabel,
  barHeight,
  groupIndex,
  name,
  series,
  theme,
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
      {series.map(({rawValue, color}, seriesIndex) => {
        const x = xOffsets[seriesIndex] + STACKED_BAR_GAP * seriesIndex;
        const id = getBarId(groupIndex, seriesIndex);

        const sliceColor = color ? id : `${GRADIENT_ID}${seriesIndex}`;

        return (
          <StackedBar
            color={color ? id : getGradientDefId(theme, seriesIndex)}
            groupIndex={groupIndex}
            height={barHeight}
            key={`${name}${sliceColor}`}
            seriesIndex={seriesIndex}
            width={xScale(rawValue)}
            x={x}
          />
        );
      })}
    </animated.g>
  );
}

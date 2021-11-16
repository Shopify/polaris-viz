import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG} from '../../../../constants';
import {GRADIENT_ID, LABEL_HEIGHT, STACKED_BAR_GAP} from '../../constants';
import {getBarId} from '../../utilities';
import {StackedBar} from '../StackedBar';
import {getGradientDefId} from '../GradientDefs';
import {DataSeries, RoundedBorder} from '../../../../types';

export interface StackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  groupIndex: number;
  isAnimated: boolean;
  name: string;
  series: DataSeries;
  xScale: ScaleLinear<number, number>;
  theme?: string;
}

export function StackedBars({
  animationDelay,
  ariaLabel,
  barHeight,
  groupIndex,
  isAnimated,
  name,
  series,
  theme,
  xScale,
}: StackedBarsProps) {
  const xOffsets = useMemo(() => {
    const offsets: number[] = [];

    series.data.forEach((_, index) => {
      const prevIndex = index - 1;

      if (series.data[prevIndex] == null) {
        offsets.push(0);
      } else {
        const previousScale = offsets[index - 1];
        offsets.push(xScale(series.data[prevIndex].value) + previousScale);
      }
    });

    return offsets;
  }, [series, xScale]);

  const {transform} = useSpring({
    from: {transform: `scale(0, 1) translate(0, ${LABEL_HEIGHT}px`},
    to: {transform: `scale(1, 1) translate(0, ${LABEL_HEIGHT}px`},
    config: BARS_TRANSITION_CONFIG,
    delay: animationDelay,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g aria-label={ariaLabel} role="listitem" style={{transform}}>
      {series.data.map(({value}, seriesIndex) => {
        const x = xOffsets[seriesIndex] + STACKED_BAR_GAP * seriesIndex;
        const id = getBarId(groupIndex, seriesIndex);
        const isLast = seriesIndex === series.data.length - 1;

        const sliceColor = series.color ? id : `${GRADIENT_ID}${seriesIndex}`;

        return (
          <StackedBar
            color={series.color ? id : getGradientDefId(theme, seriesIndex)}
            groupIndex={groupIndex}
            height={barHeight}
            isAnimated={isAnimated}
            key={`${name}${sliceColor}`}
            seriesIndex={seriesIndex}
            width={xScale(value)}
            x={x}
            roundedBorder={isLast ? RoundedBorder.Right : RoundedBorder.None}
          />
        );
      })}
    </animated.g>
  );
}

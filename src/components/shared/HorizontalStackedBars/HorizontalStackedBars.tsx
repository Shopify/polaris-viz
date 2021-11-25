import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {getBarId} from '../../../utilities';
import {
  BARS_TRANSITION_CONFIG,
  GRADIENT_ID,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../../constants';
import {DataSeries, RoundedBorder} from '../../../types';
import {getGradientDefId} from '..';

import {StackedBar} from './components';

const STACKED_BAR_GAP = 2;

export interface HorizontalStackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  data: DataSeries[];
  groupIndex: number;
  id: string;
  isAnimated: boolean;
  name: string;
  xScale: ScaleLinear<number, number>;
  theme?: string;
}

export function HorizontalStackedBars({
  animationDelay,
  ariaLabel,
  barHeight,
  data,
  groupIndex,
  id,
  isAnimated,
  name,
  theme,
  xScale,
}: HorizontalStackedBarsProps) {
  const xOffsets = useMemo(() => {
    const offsets: number[] = [];

    data.forEach((_, index) => {
      const prevIndex = index - 1;

      if (data[prevIndex] == null) {
        offsets.push(0);
      } else {
        const previousScale = offsets[index - 1];
        offsets.push(
          xScale(data[prevIndex].data[groupIndex].value ?? 0) + previousScale,
        );
      }
    });

    return offsets;
  }, [data, xScale, groupIndex]);

  const {transform} = useSpring({
    from: {
      transform: `scale(0, 1) translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT}px`,
    },
    to: {
      transform: `scale(1, 1) translate(0, ${HORIZONTAL_GROUP_LABEL_HEIGHT}px`,
    },
    config: BARS_TRANSITION_CONFIG,
    delay: animationDelay,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.g aria-label={ariaLabel} role="listitem" style={{transform}}>
      {data.map((dataPoint, seriesIndex) => {
        const {value} = data[seriesIndex].data[groupIndex];

        const x = xOffsets[seriesIndex] + STACKED_BAR_GAP * seriesIndex;
        const barId = getBarId(id, groupIndex, seriesIndex);
        const isLast = seriesIndex === data.length - 1;

        const sliceColor = dataPoint.color
          ? barId
          : `${GRADIENT_ID}${seriesIndex}`;

        return (
          <StackedBar
            color={
              dataPoint.color ? barId : getGradientDefId(theme, seriesIndex)
            }
            groupIndex={groupIndex}
            height={barHeight}
            isAnimated={isAnimated}
            key={`${name}${sliceColor}`}
            seriesIndex={seriesIndex}
            width={xScale(value ?? 0)}
            x={x}
            roundedBorder={isLast ? RoundedBorder.Right : RoundedBorder.None}
          />
        );
      })}
    </animated.g>
  );
}

import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG} from '../../../constants';
import type {NullableData} from '../types';
import {GRADIENT_ID, LABEL_HEIGHT, STACKED_BAR_GAP} from '../constants';
import {getBarId} from '../utilities';
import {cleanNullData} from '../utilities/cleanNullData';

import {StackedBar} from './StackedBar';

export interface StackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  data: NullableData[];
  groupIndex: number;
  xScale: ScaleLinear<number, number>;
}

export function StackedBars({
  animationDelay,
  ariaLabel,
  barHeight,
  data,
  groupIndex,
  xScale,
}: StackedBarsProps) {
  const xOffsets = useMemo(() => {
    const offsets: number[] = [];
    const cleanData = cleanNullData(data);

    data.forEach((_, index) => {
      const prevIndex = index - 1;

      if (cleanData[index] == null || cleanData[prevIndex] == null) {
        offsets.push(0);
      } else {
        const previousScale = offsets[index - 1];
        offsets.push(xScale(cleanData[prevIndex].rawValue) + previousScale);
      }
    });

    return offsets;
  }, [data, xScale]);

  const {transform} = useSpring({
    from: {transform: `scale(0, 1) translate(0, ${LABEL_HEIGHT}px`},
    to: {transform: `scale(1, 1) translate(0, ${LABEL_HEIGHT}px`},
    config: BARS_TRANSITION_CONFIG,
    delay: animationDelay,
  });

  return (
    <animated.g aria-label={ariaLabel} role="listitem" style={{transform}}>
      {data.map((values, seriesIndex) => {
        if (values == null) {
          return null;
        }

        const {rawValue, color} = values;

        const x = xOffsets[seriesIndex] + STACKED_BAR_GAP * seriesIndex;
        const id = getBarId(groupIndex, seriesIndex);

        return (
          <StackedBar
            color={color ? id : `${GRADIENT_ID}${seriesIndex}`}
            groupIndex={groupIndex}
            height={barHeight}
            key={seriesIndex}
            seriesIndex={seriesIndex}
            width={xScale(rawValue)}
            x={x}
          />
        );
      })}
    </animated.g>
  );
}

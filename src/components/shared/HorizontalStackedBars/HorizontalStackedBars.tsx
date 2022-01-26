import React, {useMemo} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {getBarId} from '../../../utilities';
import {
  BARS_TRANSITION_CONFIG,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../../constants';
import {
  DataSeries,
  FormattedStackedSeries,
  RoundedBorder,
} from '../../../types';
import {getGradientDefId} from '..';

import {StackedBar} from './components';
import {useStackedGaps} from './hooks';
import {getXPosition} from './utilities';

export interface HorizontalStackedBarsProps {
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  data: DataSeries[];
  groupIndex: number;
  id: string;
  isAnimated: boolean;
  name: string;
  stackedValues: FormattedStackedSeries[];
  xScale: ScaleLinear<number, number>;
  theme?: string;
}

function getRoundedBorder({
  lastIndexes,
  seriesIndex,
}: {
  lastIndexes: number[];
  seriesIndex: number;
}) {
  const [positive, negative] = lastIndexes;

  if (positive === seriesIndex) {
    return RoundedBorder.Right;
  }

  if (negative === seriesIndex) {
    return RoundedBorder.Left;
  }

  return RoundedBorder.None;
}

export function HorizontalStackedBars({
  animationDelay,
  ariaLabel,
  barHeight,
  groupIndex,
  id,
  isAnimated,
  name,
  stackedValues,
  theme,
  xScale,
}: HorizontalStackedBarsProps) {
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

  const lastIndexes = useMemo(() => {
    let lastPos = -1;
    let lastNeg = -1;

    stackedValues[groupIndex].forEach(([start, end], index) => {
      if (start < 0) {
        lastNeg = index;
      }

      if (end > 0) {
        lastPos = index;
      }
    });

    return [lastPos, lastNeg];
  }, [groupIndex, stackedValues]);

  const gaps = useStackedGaps({stackedValues, groupIndex});

  return (
    <animated.g
      aria-label={ariaLabel}
      role="listitem"
      style={{transform, transformOrigin: `${xScale(0)}px 0px`}}
    >
      {stackedValues[groupIndex].map(([start, end], seriesIndex) => {
        const barId = getBarId(id, groupIndex, seriesIndex);
        const width = Math.abs(xScale(end) - xScale(start));

        if (width === 0) {
          return null;
        }

        const roundedBorder = getRoundedBorder({
          lastIndexes,
          seriesIndex,
        });

        const x = getXPosition({start, end, seriesIndex, gaps, xScale});

        return (
          <StackedBar
            color={getGradientDefId(theme, seriesIndex, id)}
            groupIndex={groupIndex}
            height={barHeight}
            isAnimated={isAnimated}
            key={`${name}${barId}`}
            seriesIndex={seriesIndex}
            width={width}
            x={x}
            roundedBorder={roundedBorder}
          />
        );
      })}
    </animated.g>
  );
}

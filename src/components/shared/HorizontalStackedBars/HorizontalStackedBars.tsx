import React, {useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';

import {useWatchColorVisionEvents} from '../../../hooks';
import {getBarId} from '../../../utilities';
import {
  BARS_TRANSITION_CONFIG,
  COLOR_VISION_SINGLE_ITEM,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../../constants';
import {FormattedStackedSeries, RoundedBorder} from '../../../types';
import {getGradientDefId} from '..';

import {StackedBar} from './components';
import {useStackedGaps} from './hooks';
import {getXPosition} from './utilities';

export interface HorizontalStackedBarsProps {
  activeGroupIndex: number;
  animationDelay: number;
  ariaLabel: string;
  barHeight: number;
  dataKeys: string[];
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
  activeGroupIndex,
  animationDelay,
  barHeight,
  dataKeys,
  groupIndex,
  id,
  isAnimated,
  name,
  stackedValues,
  theme,
  xScale,
}: HorizontalStackedBarsProps) {
  const [activeBarIndex, setActiveBarIndex] = useState(-1);

  useWatchColorVisionEvents({
    type: COLOR_VISION_SINGLE_ITEM,
    onIndexChange: ({detail}) => {
      if (activeGroupIndex === -1 || activeGroupIndex === groupIndex) {
        setActiveBarIndex(detail.index);
      }
    },
  });

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
      style={{
        transform,
        transformOrigin: `${xScale(0)}px 0px`,
      }}
      aria-hidden="true"
    >
      {stackedValues[groupIndex].map((item, seriesIndex) => {
        const [start, end] = item;
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
        const key = dataKeys[seriesIndex] ?? '';
        const ariaLabel = `${key} ${end}`;

        return (
          <StackedBar
            activeBarIndex={activeBarIndex}
            ariaLabel={ariaLabel}
            color={getGradientDefId(theme, seriesIndex, id)}
            height={barHeight}
            isAnimated={isAnimated}
            key={`${name}${barId}`}
            roundedBorder={roundedBorder}
            seriesIndex={seriesIndex}
            setActiveBarIndex={setActiveBarIndex}
            width={width}
            x={x}
          />
        );
      })}
    </animated.g>
  );
}

import React, {useMemo, useState} from 'react';
import type {ScaleLinear} from 'd3-scale';
import {animated, useSpring} from '@react-spring/web';
import {
  COLOR_VISION_SINGLE_ITEM,
  BORDER_RADIUS,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {useWatchColorVisionEvents} from '../../../hooks';
import {getBarId} from '../../../utilities';
import {
  BARS_TRANSITION_CONFIG,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
} from '../../../constants';
import type {FormattedStackedSeries} from '../../../types';
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
  name: string;
  stackedValues: FormattedStackedSeries[];
  xScale: ScaleLinear<number, number>;
  theme: string;
}

function getBorderRadius({
  lastIndexes,
  seriesIndex,
}: {
  lastIndexes: number[];
  seriesIndex: number;
}) {
  const [positive, negative] = lastIndexes;

  if (positive === seriesIndex) {
    return BORDER_RADIUS.Right;
  }

  if (negative === seriesIndex) {
    return BORDER_RADIUS.Left;
  }

  return BORDER_RADIUS.None;
}

export function HorizontalStackedBars({
  activeGroupIndex,
  animationDelay,
  barHeight,
  dataKeys,
  groupIndex,
  id,
  name,
  stackedValues,
  theme,
  xScale,
}: HorizontalStackedBarsProps) {
  const {shouldAnimate} = useChartContext();
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
    default: {immediate: !shouldAnimate},
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

        const borderRadius = getBorderRadius({
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
            borderRadius={borderRadius}
            color={getGradientDefId(theme, seriesIndex, id)}
            height={barHeight}
            key={`${name}${barId}`}
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

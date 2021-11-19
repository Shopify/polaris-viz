import {useTransition} from '@react-spring/web';
import {useMemo, useState} from 'react';

import {BARS_SORT_TRANSITION_CONFIG} from '../constants';
import type {DataSeries} from '../types';

interface Props {
  series: DataSeries[];
  groupHeight: number;
  isAnimated: boolean;
}

export function useHorizontalTransitions({
  series,
  groupHeight,
  isAnimated,
}: Props) {
  const seriesWithIndex = useMemo(() => {
    return series.map((series, index) => ({
      series,
      index,
    }));
  }, [series]);

  const getTransform = (index: number) => {
    return `translate(0px,${groupHeight * index}px)`;
  };

  const animationTrail = 50;
  const outOfChartPosition = getTransform(series.length + 1);

  const transitions = useTransition(seriesWithIndex, {
    keys: (item) => {
      return item.series.name ?? '';
    },
    initial: ({index}) => ({
      opacity: 1,
      transform: getTransform(index),
    }),
    from: ({index}) => ({
      opacity: 0,
      transform: isAnimated ? outOfChartPosition : getTransform(index),
    }),
    leave: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    update: ({index}) => ({opacity: 1, transform: getTransform(index)}),
    expires: true,
    config: BARS_SORT_TRANSITION_CONFIG,
    trail: isAnimated ? animationTrail : 0,
    immediate: !isAnimated,
  });

  return {transitions};
}

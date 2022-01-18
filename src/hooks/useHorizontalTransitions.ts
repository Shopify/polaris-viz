import {SpringValue, useTransition} from '@react-spring/web';
import {useMemo} from 'react';

import {BARS_SORT_TRANSITION_CONFIG} from '../constants';
import type {DataSeries} from '../types';

// There is a bug where type inference is broken
// when returning values from a function. It's fixed
// in v9.2.5-beta.0 but until it's stable
// we're going to cast.
// https://github.com/pmndrs/react-spring/issues/1483
export interface HorizontalTransitionStyle {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

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
    return series[0].data.map(({key}, index) => ({
      key: `${key}`,
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
      return item.key ?? '';
    },
    initial: ({index}) => ({
      opacity: 0,
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

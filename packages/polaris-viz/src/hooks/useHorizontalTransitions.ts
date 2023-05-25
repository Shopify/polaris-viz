import type {SpringValue} from '@react-spring/web';
import {useTransition} from '@react-spring/web';
import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {useChartContext} from '@shopify/polaris-viz-core';

import {BARS_SORT_TRANSITION_CONFIG} from '../constants';

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
  chartXPosition: number;
  groupHeight: number;
  series: DataSeries[];
}

export function useHorizontalTransitions({
  chartXPosition,
  groupHeight,
  series,
}: Props) {
  const {shouldAnimate, id} = useChartContext();
  const seriesWithIndex = useMemo(() => {
    return series[0].data.map(({key}, index) => ({
      key: `${key}`,
      index,
    }));
  }, [series]);

  const getTransform = (index: number) => {
    return `translate(${chartXPosition}px,${groupHeight * index}px)`;
  };

  const animationTrail = 50;
  const outOfChartPosition = getTransform(series.length + 1);

  const transitions = useTransition(seriesWithIndex, {
    keys: (item) => {
      return item.key === '' ? `${id}-${item.index}` : item.key;
    },
    initial: ({index}) => ({
      opacity: 1,
      transform: getTransform(index),
    }),
    from: ({index}) => ({
      opacity: 0,
      transform: shouldAnimate ? outOfChartPosition : getTransform(index),
    }),
    leave: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    update: ({index}) => ({opacity: 1, transform: getTransform(index)}),
    expires: true,
    config: BARS_SORT_TRANSITION_CONFIG,
    trail: shouldAnimate ? animationTrail : 0,
    immediate: !shouldAnimate,
  });

  return {transitions};
}

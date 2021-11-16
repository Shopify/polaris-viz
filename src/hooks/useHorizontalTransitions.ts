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

  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleOnTransitionRest = () => {
    setIsFirstRender(false);
  };

  const animationTrail = isFirstRender ? 0 : 50;
  const outOfChartPosition = getTransform(series.length + 1);

  const transitions = useTransition(seriesWithIndex, {
    keys: (item) => {
      return item.series.name ?? '';
    },
    initial: ({index}) => ({
      opacity: isFirstRender ? 1 : 0,
      transform: isFirstRender ? getTransform(index) : outOfChartPosition,
    }),
    from: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    leave: {
      opacity: 0,
      transform: outOfChartPosition,
    },
    enter: () => ({
      opacity: 0,
      transform: outOfChartPosition,
    }),
    update: ({index}) => ({opacity: 1, transform: getTransform(index)}),
    expires: true,
    config: BARS_SORT_TRANSITION_CONFIG,
    trail: isAnimated ? animationTrail : 0,
    default: {
      immediate: !isAnimated,
      onRest: handleOnTransitionRest,
    },
  });

  return {transitions, isFirstRender};
}

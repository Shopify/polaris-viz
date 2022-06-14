import {useMemo} from 'react';

import type {Axis} from '../types';

export function useMixedDataValues(axes: Axis[]) {
  return useMemo(() => {
    const areAllValuesNegative = axes.every(
      ({areAllValuesNegative}) => areAllValuesNegative,
    );
    const doesOneChartContainAllNegativeValues = axes.some(
      ({areAllValuesNegative}) => areAllValuesNegative,
    );
    const doBothChartsContainMixedValues = axes.every(
      ({areSomeValuesNegative}) => areSomeValuesNegative,
    );

    const shouldPlaceZeroInMiddleOfChart =
      !areAllValuesNegative &&
      (doesOneChartContainAllNegativeValues || doBothChartsContainMixedValues);

    return {
      shouldPlaceZeroInMiddleOfChart,
      areAllValuesNegative,
      doesOneChartContainAllNegativeValues,
      doBothChartsContainMixedValues,
    };
  }, [axes]);
}

import {useMemo} from 'react';

import {Axis, AxisValueRange} from '../types';

export function useMixedDataValues(axes: Axis[]) {
  return useMemo(() => {
    const areAllValuesNegative = axes.every(
      ({valuesRange}) => valuesRange === AxisValueRange.AllNegative,
    );
    const doesOneChartContainAllNegativeValues = axes.some(
      ({valuesRange}) => valuesRange === AxisValueRange.AllNegative,
    );
    const doBothChartsContainMixedValues = axes.every(
      ({valuesRange}) => valuesRange === AxisValueRange.SomeNegative,
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

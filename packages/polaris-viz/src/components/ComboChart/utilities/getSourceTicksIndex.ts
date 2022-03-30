import {Axis, AxisValueRange} from '../types';

export function getSourceTicksIndex({
  axes,
  doBothChartsContainMixedValues,
  shouldPlaceZeroInMiddleOfChart,
}: {
  axes: Axis[];
  doBothChartsContainMixedValues: boolean;
  shouldPlaceZeroInMiddleOfChart: boolean;
}) {
  if (shouldPlaceZeroInMiddleOfChart) {
    const indexWithNegative = axes.findIndex(
      ({valuesRange}) => valuesRange !== AxisValueRange.AllNegative,
    );

    return indexWithNegative === -1 ? 0 : indexWithNegative;
  }

  // If all the values are negative, or both sets contain
  // negative values, find the index with the biggest difference.
  if (doBothChartsContainMixedValues) {
    const {index: indexWithBiggestDifference} = axes.reduce((prev, cur) => {
      const prevDiff = Math.abs(prev.max - prev.min);
      const curDiff = Math.abs(cur.max - cur.min);

      return prevDiff > curDiff ? prev : cur;
    });

    return indexWithBiggestDifference;
  }

  // Otherwise find the index that has negative values.
  const indexWithNegative = axes.findIndex(
    ({valuesRange}) => valuesRange === AxisValueRange.SomeNegative,
  );

  return indexWithNegative === -1 ? 0 : indexWithNegative;
}

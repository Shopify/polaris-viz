import {EMPTY_STATE_CHART_MIN, EMPTY_STATE_CHART_MAX} from '../../../constants';
import type {StackedSeries} from '../../../types';

export function yAxisMinMax(stackedValues: StackedSeries[]) {
  const minY = Math.min(
    ...stackedValues.map((value) => {
      return Math.min(
        ...value.map(([startingValue, endingValue]) =>
          Math.min(startingValue, endingValue),
        ),
      );
    }),
  );

  const maxY = Math.max(
    ...stackedValues.map((value) =>
      Math.max(
        ...value.map(([startingValue, endingValue]) =>
          Math.max(startingValue, endingValue),
        ),
      ),
    ),
  );

  if (minY === Infinity || maxY === -Infinity) {
    return {
      minY: Math.min(minY, EMPTY_STATE_CHART_MIN),
      maxY: Math.max(maxY, EMPTY_STATE_CHART_MAX),
    };
  }

  return {minY, maxY};
}

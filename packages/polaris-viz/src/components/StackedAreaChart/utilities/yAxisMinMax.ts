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

  return {minY, maxY};
}

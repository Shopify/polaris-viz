import type {Series, StackSeries} from '../types';

export function getMinMax(stackedValues: StackSeries[] | null, data: Series[]) {
  if (stackedValues != null) {
    const minStackedValues = stackedValues.map((value) =>
      Math.min(...value.map(([startingValue]) => startingValue)),
    );
    const maxStackedValues = stackedValues.map((value) =>
      Math.max(...value.map(([, endingValue]) => endingValue)),
    );

    return {
      min: Math.min(...minStackedValues),
      max: Math.max(...maxStackedValues),
    };
  } else {
    const groupedDataPoints = data.reduce<number[]>(
      (groupedData, series): number[] => {
        const rawValues = series.data.map(({rawValue}) => rawValue);
        return groupedData.concat(rawValues);
      },
      [],
    );

    return {
      min: Math.min(...groupedDataPoints, 0),
      max: Math.max(...groupedDataPoints),
    };
  }
}

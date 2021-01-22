import type {Data, StackSeries} from '../types';

export function getMinMax(stackedValues: StackSeries[] | null, data: Data[]) {
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
    const groupedDataPoints = data
      .map(({data}) => data)
      .reduce((acc, currentValue) => acc.concat(currentValue), []);

    return {
      min: Math.min(...groupedDataPoints, 0),
      max: Math.max(...groupedDataPoints),
    };
  }
}

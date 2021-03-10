import {DEFAULT_MAX_Y} from '../../../constants';
import {Series, StackSeries} from '../types';

export function getMinMax(stackedValues: StackSeries[] | null, data: Series[]) {
  if (stackedValues != null) {
    const minStackedValues = stackedValues.map((value) =>
      Math.min(...value.map(([startingValue]) => startingValue)),
    );
    const maxStackedValues = stackedValues.map((value) =>
      Math.max(...value.map(([, endingValue]) => endingValue)),
    );

    const calculatedMax = Math.max(...maxStackedValues);
    const min = Math.min(...minStackedValues);
    const max =
      calculatedMax === 0 && min === 0 ? DEFAULT_MAX_Y : calculatedMax;

    return {
      min,
      max,
    };
  } else {
    const groupedDataPoints = data.reduce<number[]>(
      (groupedData, series): number[] => {
        const rawValues = series.data.map(({rawValue}) => rawValue);
        return groupedData.concat(rawValues);
      },
      [],
    );

    const calculatedMax = Math.max(...groupedDataPoints);
    const min = Math.min(...groupedDataPoints, 0);
    const max =
      calculatedMax === 0 && min === 0 ? DEFAULT_MAX_Y : calculatedMax;

    return {
      min,
      max,
    };
  }
}

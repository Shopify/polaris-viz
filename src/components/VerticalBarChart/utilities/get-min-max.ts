import type {DataSeries} from 'types';

import {DEFAULT_MAX_Y} from '../../../constants';
import type {StackSeries} from '../types';

export function getMinMax({
  stackedValues,
  data,
  integersOnly,
}: {
  stackedValues: StackSeries[] | null;
  data: DataSeries[];
  integersOnly: boolean;
}) {
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
      data.length === 0 || (calculatedMax === 0 && min === 0)
        ? DEFAULT_MAX_Y
        : Math.max(0, calculatedMax);

    return {
      min: integersOnly ? Math.floor(min) : min,
      max: integersOnly ? Math.ceil(max) : max,
    };
  } else {
    const groupedDataPoints = data.reduce<number[]>(
      (groupedData, series): number[] => {
        const rawValues = series.data
          .map(({value}) => value)
          .filter((value) => value !== null) as number[];
        return groupedData.concat(rawValues);
      },
      [],
    );

    const calculatedMax = Math.max(...groupedDataPoints);
    const min = Math.min(...groupedDataPoints, 0);

    const max =
      data.length === 0 || (calculatedMax === 0 && min === 0)
        ? DEFAULT_MAX_Y
        : Math.max(0, calculatedMax);

    return {
      min: integersOnly ? Math.floor(min) : min,
      max: integersOnly ? Math.ceil(max) : max,
    };
  }
}

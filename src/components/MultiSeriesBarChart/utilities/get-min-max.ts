import {DEFAULT_MAX_Y} from 'consts';
import type {Series, StackSeries} from 'components/MultiSeriesBarChart/types';

export function getMinMax({
  stackedValues,
  data,
  integersOnly,
}: {
  stackedValues: StackSeries[] | null;
  data: Series[];
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
        const rawValues = series.data.map(({rawValue}) => rawValue);
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

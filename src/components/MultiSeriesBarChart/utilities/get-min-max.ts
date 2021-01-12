import {Series, StackSeries} from '../types';

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
    const groupedDataPoints = data
      .map(function getDataFromSeries(series) {
        return series.data;
      })
      .reduce<number[][]>(function getValuesFromDataObjects(
        values,
        data,
      ): number[][] {
        const rawValuesFromDataObjects = data.map(({rawValue}) => rawValue);
        values.push(rawValuesFromDataObjects);

        return values;
      },
      [])
      .reduce(function combineValuesIntoSingleArray(acc, currentValue) {
        return acc.concat(currentValue);
      }, []);

    return {
      min: Math.min(...groupedDataPoints, 0),
      max: Math.max(...groupedDataPoints),
    };
  }
}

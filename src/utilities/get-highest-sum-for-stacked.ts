import type {DataSeries} from 'types';

export function getHighestSumForStacked(series: DataSeries[]) {
  const numbers: number[] = [];

  series.forEach(({data}) => {
    const sum = data.reduce((prev, {value}) => {
      if (value == null) {
        return prev;
      }

      return prev + value;
    }, 0);

    numbers.push(sum);
  });

  return Math.max(...numbers);
}

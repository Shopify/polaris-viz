import {useMemo} from 'react';

import type {DataSeries} from '../types';

export function useFilteredSparkLineData(data: DataSeries[]) {
  const allNumbers = useMemo(() => {
    if (data.length <= 1) {
      return [];
    }

    return data.reduce<number[]>((prev, cur) => {
      const numbers = cur.data
        .map(({value}) => value)
        .filter((value) => value !== null) as number[];
      return prev.concat(...numbers);
    }, []);
  }, [data]);

  const areAllZeros = useMemo(() => {
    return !allNumbers.some((num) => num !== null && num !== 0);
  }, [allNumbers]);

  if (data.length > 1 && areAllZeros) {
    // If the data is all 0's and we have multiple series,
    // only render the main series and remove the comparison
    // line so they don't overlap
    return data.filter(({isComparison}) => isComparison !== true);
  } else {
    return data;
  }
}

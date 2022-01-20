import type {DataSeries} from 'types';

import {formatDataIntoGroups} from './format-data-into-groups';

export function getHighestSumForStacked(data: DataSeries[]) {
  const groups = formatDataIntoGroups(data);
  const numbers: number[] = [];

  groups.forEach((group) => {
    const sum = group.reduce((prev, value) => {
      if (value == null) {
        return prev;
      }

      return prev + value;
    }, 0);

    numbers.push(sum);
  });

  return Math.max(...numbers);
}

import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {getStackedMinMax, getStackedValues} from '../utilities';

interface Props {
  data: DataSeries[];
  isStacked: boolean;
}

export function useHorizontalStackedValues({data, isStacked}: Props) {
  const {stackedValues, stackedMin, stackedMax} = useMemo(() => {
    if (!isStacked || data.length === 0) {
      return {stackedMin: 0, stackedMax: 0, labels: [], stackedValues: []};
    }

    const longestSeries = data.reduce((prev, cur) => {
      if (cur.data.length > prev.data.length) {
        return cur;
      }
      return prev;
    }, data[0]);

    const labels = longestSeries.data.map(({key}) => `${key}`);
    const stackedValues = getStackedValues(data, labels);

    const {min, max} = getStackedMinMax({
      stackedValues,
      data,
      integersOnly: false,
    });

    const formattedStackedValues = labels.map((_, labelIndex) => {
      return stackedValues.map((data) => {
        return data[labelIndex];
      });
    });

    return {
      stackedMin: min,
      stackedMax: max,
      labels,
      stackedValues: formattedStackedValues,
    };
  }, [isStacked, data]);

  return {stackedValues, stackedMin, stackedMax};
}

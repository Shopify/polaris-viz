import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {getStackedMinMax} from '../utilities/getStackedMinMax';
import {getStackedValuesFromDataSeries} from '../utilities/getStackedValuesFromDataSeries';

interface Props {
  data: DataSeries[];
  isStacked: boolean;
}

export function useHorizontalStackedValues({data, isStacked}: Props) {
  const {stackedValues, stackedMin, stackedMax} = useMemo(() => {
    if (!isStacked || data.length === 0) {
      return {stackedMin: 0, stackedMax: 0, stackedValues: []};
    }

    const {stackedValues, formattedStackedValues} =
      getStackedValuesFromDataSeries(data);

    const {min, max} = getStackedMinMax({
      stackedValues,
      data,
      integersOnly: false,
    });

    return {
      stackedMin: min,
      stackedMax: max,
      stackedValues: formattedStackedValues,
    };
  }, [isStacked, data]);

  return {stackedValues, stackedMin, stackedMax};
}

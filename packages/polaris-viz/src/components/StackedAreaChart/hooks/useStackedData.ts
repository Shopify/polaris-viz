import {useMemo} from 'react';
import type {DataSeries, XAxisOptions} from '@shopify/polaris-viz-core';
import {stackOffsetNone, stackOrderReverse} from 'd3-shape';

import {useIndexForLabels} from '../../../hooks/useIndexForLabels';
import {getStackedValues} from '../../../utilities/getStackedValues';
import {useFormattedLabels} from '../../../hooks/useFormattedLabels';

interface Props {
  data: DataSeries[];
  xAxisOptions: Required<XAxisOptions>;
}

export function useStackedData({data, xAxisOptions}: Props) {
  const indexForLabels = useIndexForLabels(data);

  const {formattedLabels} = useFormattedLabels({
    data: [data[indexForLabels]],
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const stackedValues = getStackedValues({
    series: data,
    labels: formattedLabels,
    order: stackOrderReverse,
    offset: stackOffsetNone,
  });

  const longestSeriesLength = useMemo(() => {
    return Math.max(...stackedValues.map((stack) => stack.length)) - 1;
  }, [stackedValues]);

  const longestSeriesIndex = useMemo(
    () =>
      data.reduce((maxIndex, currentSeries, currentIndex) => {
        return data[maxIndex].data.length < currentSeries.data.length
          ? currentIndex
          : maxIndex;
      }, 0),
    [data],
  );

  return {
    labels: formattedLabels,
    longestSeriesIndex,
    longestSeriesLength,
    stackedValues,
  };
}

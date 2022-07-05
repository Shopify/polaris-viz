import {useMemo} from 'react';
import {stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';
import type {DataSeries, XAxisOptions} from '@shopify/polaris-viz-core';

import {useFormattedLabels} from '../../../hooks/useFormattedLabels';

interface Props {
  data: DataSeries[];
  xAxisOptions: Required<XAxisOptions>;
}

export function useStackedData({data, xAxisOptions}: Props) {
  const areaStack = useMemo(
    () =>
      stack()
        .keys(data.map(({name}) => name ?? ''))
        .order(stackOrderReverse)
        .offset(stackOffsetNone),
    [data],
  );

  const labels = useFormattedLabels({
    data,
    labelFormatter: xAxisOptions.labelFormatter,
  });

  const formattedData = useMemo(
    () =>
      labels.map((_, labelIndex) =>
        data.reduce((acc, {name, data}) => {
          const {value} = data[labelIndex];

          const dataPoint = {[name ?? '']: value};
          return Object.assign(acc, dataPoint);
        }, {}),
      ),
    [labels, data],
  );

  const stackedValues = useMemo(
    () => areaStack(formattedData),
    [areaStack, formattedData],
  );

  const longestSeriesLength = useMemo(() => {
    return Math.max(...stackedValues.map((stack) => stack.length)) - 1;
  }, [stackedValues]);

  return {labels, longestSeriesLength, stackedValues};
}

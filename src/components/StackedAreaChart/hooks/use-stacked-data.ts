import {useMemo} from 'react';
import {stack, stackOffsetNone, stackOrderReverse} from 'd3-shape';
import type {DataSeries, LinearXAxisOptions} from 'types';

interface Props {
  data: DataSeries[];
  xAxisOptions: LinearXAxisOptions;
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

  const formattedData = useMemo(
    () =>
      xAxisOptions.xAxisLabels.map((_, labelIndex) =>
        data.reduce((acc, {name, data}) => {
          const {value} = data[labelIndex];

          const dataPoint = {[name ?? '']: value};
          return Object.assign(acc, dataPoint);
        }, {}),
      ),
    [xAxisOptions.xAxisLabels, data],
  );

  const labels = useMemo(() => {
    return xAxisOptions.xAxisLabels.map(xAxisOptions.labelFormatter);
  }, [xAxisOptions]);

  const stackedValues = useMemo(() => areaStack(formattedData), [
    areaStack,
    formattedData,
  ]);

  const longestSeriesLength = useMemo(() => {
    return Math.max(...stackedValues.map((stack) => stack.length)) - 1;
  }, [stackedValues]);

  return {labels, longestSeriesLength, stackedValues};
}

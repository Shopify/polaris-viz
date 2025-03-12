import type {DataSeries} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import {sortBarChartData} from '../utilities/sortBarChartData';

import {useXScale} from './useXScale';

interface Props {
  colors: string[];
  data: DataSeries[];
  drawableWidth: number;
  labels: string[];
}

export function useVerticalBarChart({
  colors,
  data,
  drawableWidth,
  labels,
}: Props) {
  const sortedData = sortBarChartData(data, labels, colors);

  console.log({colors});

  const areAllNegative = useMemo(() => {
    return ![...sortedData]
      .reduce((prev, cur) => prev.concat(cur), [])
      // If one value is greater than zero,
      // bail out of the loop
      .some((num) => num !== null && num > 0);
  }, [sortedData]);

  const {xScale, gapWidth} = useXScale({
    drawableWidth,
    data: sortedData,
    labels,
  });

  return {sortedData, areAllNegative, xScale, gapWidth};
}

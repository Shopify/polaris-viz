import {DataSeries, useTheme} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

import {sortBarChartData} from '../../../utilities/sortBarChartData';
import {BarMargin} from '../../../types';

import {useXScale} from './useXScale';

interface Props {
  data: DataSeries[];
  drawableWidth: number;
  labels: string[];
  theme: string;
}

export function useVerticalBarChart({
  data,
  drawableWidth,
  labels,
  theme,
}: Props) {
  const selectedTheme = useTheme(theme);

  const sortedData = sortBarChartData(labels, data);

  const areAllNegative = useMemo(() => {
    return ![...sortedData]
      .reduce((prev, cur) => prev.concat(cur), [])
      // If one value is greater than zero,
      // bail out of the loop
      .some((num) => num > 0);
  }, [sortedData]);

  const {xScale, gapWidth} = useXScale({
    drawableWidth,
    data: sortedData,
    labels,
  });

  return {sortedData, areAllNegative, xScale, gapWidth};
}

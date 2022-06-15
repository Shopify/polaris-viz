import {DataSeries, useTheme} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

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

  const sortedData = labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter((value) => value !== null) as number[];
  });

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
    innerMargin: BarMargin[selectedTheme.bar.innerMargin] as number,
    outerMargin: BarMargin[selectedTheme.bar.outerMargin] as number,
    labels,
  });

  return {sortedData, areAllNegative, xScale, gapWidth};
}

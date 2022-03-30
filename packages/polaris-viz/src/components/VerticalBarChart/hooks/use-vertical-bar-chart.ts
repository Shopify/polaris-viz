import {DataSeries, useTheme} from '@shopify/polaris-viz-core';

import {getStackedMinMax} from '../../../utilities';
import {useYScale} from '../../../hooks';
import {BarMargin} from '../../../types';

import {useXScale} from './use-x-scale';

interface Props {
  data: DataSeries[];
  drawableWidth: number;
  drawableHeight: number;
  yAxisOptions: any;
  stackedValues: any;
  labels: string[];
  theme?: string;
}

export function useVerticalBarChart({
  data,
  drawableHeight,
  drawableWidth,
  labels,
  stackedValues,
  theme,
  yAxisOptions,
}: Props) {
  const selectedTheme = useTheme(theme);

  const sortedData = labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter((value) => value !== null) as number[];
  });

  const {xScale, gapWidth} = useXScale({
    drawableWidth,
    data: sortedData,
    innerMargin: BarMargin[selectedTheme.bar.innerMargin] as number,
    outerMargin: BarMargin[selectedTheme.bar.outerMargin] as number,
    labels,
  });

  const {min, max} = getStackedMinMax({
    stackedValues,
    data,
    integersOnly: yAxisOptions.integersOnly,
  });

  const {yScale, ticks} = useYScale({
    drawableHeight,
    min,
    max,
    formatYAxisLabel: yAxisOptions.labelFormatter,
    integersOnly: yAxisOptions.integersOnly,
  });

  return {labels, xScale, gapWidth, sortedData, yScale, ticks};
}

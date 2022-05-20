import React from 'react';
import type {
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';
import {useTheme, useThemeSeriesColors} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';
import {getYAxisOptionsWithDefaults} from '../../utilities';

import {Chart} from './Chart';

export interface FunnelChartProps {
  data: DataSeries[];
  xAxisOptions?: Omit<XAxisOptions, 'hide'>;
  yAxisOptions?: Omit<XAxisOptions, 'integersOnly'>;
  theme?: string;
}

export function FunnelChart({
  data,
  theme = 'Default',
  xAxisOptions,
  yAxisOptions,
}: FunnelChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    ...xAxisOptions,
  };

  const yAxisOptionsForChart: Required<YAxisOptions> =
    getYAxisOptionsWithDefaults(yAxisOptions);

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={seriesWithDefaults}
        xAxisOptions={xAxisOptionsForChart}
        yAxisOptions={yAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

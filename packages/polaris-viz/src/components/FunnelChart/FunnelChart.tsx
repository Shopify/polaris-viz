import React from 'react';
import type {
  DataSeries,
  XAxisOptions,
  YAxisOptions,
} from '@shopify/polaris-viz-core';

import {useTheme, useThemeSeriesColors} from '../../hooks';
import {ChartContainer} from '../../components/ChartContainer';
import { getYAxisOptionsWithDefaults } from '../../utilities';
import {Chart} from './Chart';

export interface FunnelChartProps {
  data: DataSeries[];
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
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

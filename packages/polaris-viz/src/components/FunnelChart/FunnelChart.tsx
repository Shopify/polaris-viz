import React from 'react';
import {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  DEFAULT_CHART_PROPS,
  useTheme,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';
import {getYAxisOptionsWithDefaults} from '../../utilities';

import {Chart} from './Chart';

export type FunnelChartProps = {
  xAxisOptions?: Omit<XAxisOptions, 'hide'>;
  yAxisOptions?: Omit<XAxisOptions, 'integersOnly'>;
} & ChartProps;

export function FunnelChart(props: FunnelChartProps) {
  const {data, theme, xAxisOptions, yAxisOptions, isAnimated} = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
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
    <ChartContainer data={data} isAnimated={isAnimated} theme={theme}>
      <Chart
        data={seriesWithDefaults}
        xAxisOptions={xAxisOptionsForChart}
        yAxisOptions={yAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

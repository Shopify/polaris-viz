import React from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {useTheme, useThemeSeriesColors} from '../../hooks';
import type {ChartType, DataSeries} from '../../types';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  xAxisOptions: XAxisOptions;
  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
  yAxisOptions?: Partial<YAxisOptions>;
  type?: ChartType;
}

export function VerticalBarChart({
  data,
  renderTooltipContent,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  emptyStateText,
  theme,
  type = 'default',
}: VerticalBarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const yAxisOptionsWithDefaults: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <React.Fragment>
      <ChartContainer theme={theme}>
        <Chart
          data={seriesWithDefaults}
          xAxisOptions={xAxisOptions}
          yAxisOptions={yAxisOptionsWithDefaults}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltipContent}
          emptyStateText={emptyStateText}
          type={type}
        />
      </ChartContainer>
    </React.Fragment>
  );
}

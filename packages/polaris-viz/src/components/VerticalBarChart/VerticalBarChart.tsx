import React from 'react';
import type {AnnotationLookupTable} from 'components/BarChart/types';

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
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
  type?: ChartType;
}

export function VerticalBarChart({
  annotationsLookupTable = {},
  data,
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  showLegend,
  theme,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: VerticalBarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <React.Fragment>
      <ChartContainer theme={theme}>
        <Chart
          annotationsLookupTable={annotationsLookupTable}
          data={seriesWithDefaults}
          emptyStateText={emptyStateText}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltipContent}
          showLegend={showLegend}
          type={type}
          xAxisOptions={xAxisOptions}
          yAxisOptions={yAxisOptions}
        />
      </ChartContainer>
    </React.Fragment>
  );
}

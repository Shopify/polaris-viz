import React from 'react';

import {HorizontalBarChart} from '../HorizontalBarChart';
import type {ChartType, DataSeries, Direction} from '../../types';
import {VerticalBarChart} from '../VerticalBarChart';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
} from '../BarChart';

export interface BarChartProps {
  data: DataSeries[];
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;

  direction?: Direction;
  emptyStateText?: string;
  isAnimated?: boolean;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function BarChart({
  data,
  direction = 'vertical',
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  skipLinkText,
  theme,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: BarChartProps) {
  return (
    <React.Fragment>
      {direction === 'vertical' ? (
        <VerticalBarChart
          data={data}
          xAxisOptions={xAxisOptions}
          yAxisOptions={yAxisOptions}
          theme={theme}
          type={type}
          emptyStateText={emptyStateText}
          isAnimated={isAnimated}
          skipLinkText={skipLinkText}
          renderTooltipContent={renderTooltipContent}
        />
      ) : (
        <HorizontalBarChart
          data={data}
          isAnimated={isAnimated}
          renderTooltipContent={renderTooltipContent}
          theme={theme}
          type={type}
          xAxisOptions={xAxisOptions}
        />
      )}
    </React.Fragment>
  );
}

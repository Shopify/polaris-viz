import React, {ReactNode} from 'react';

import type {ChartType, DataSeries} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';
import type {RenderTooltipContentData, XAxisOptions} from './types';

export interface HorizontalBarChartProps {
  series: DataSeries[];
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
  theme?: string;
  xAxisOptions?: XAxisOptions;
  type?: ChartType;
}

export function HorizontalBarChart({
  isAnimated = true,
  renderTooltipContent,
  series,
  theme,
  xAxisOptions,
  type = 'default',
}: HorizontalBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    ...xAxisOptions,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();

  function renderTooltip({data}: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({data});
    }

    const tooltipData = data.map(({value, label, color}) => {
      return {
        label,
        value: xAxisOptionsForChart.labelFormatter(value),
        color,
      };
    });

    return <TooltipContent data={tooltipData} theme={theme} />;
  }

  return (
    <ChartContainer theme={theme}>
      <Chart
        isAnimated={isAnimated && !prefersReducedMotion}
        renderTooltipContent={renderTooltip}
        series={series}
        xAxisOptions={xAxisOptionsForChart}
        type={type}
      />
    </ChartContainer>
  );
}

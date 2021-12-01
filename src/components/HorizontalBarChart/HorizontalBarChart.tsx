import React, {ReactNode} from 'react';

import type {ChartType, DataSeries} from '../../types';
import {TooltipContent} from '../TooltipContent';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';
import type {RenderTooltipContentData, XAxisOptions} from '../BarChart';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
}

export function HorizontalBarChart({
  data,
  isAnimated = true,
  renderTooltipContent,
  theme,
  type = 'default',
  xAxisOptions,
}: HorizontalBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    wrapLabels: false,
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
        value: xAxisOptionsForChart.labelFormatter!(value),
        color,
      };
    });

    return <TooltipContent data={tooltipData} theme={theme} />;
  }

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        renderTooltipContent={renderTooltip}
        type={type}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

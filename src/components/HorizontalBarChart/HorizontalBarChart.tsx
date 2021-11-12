import React, {ReactNode} from 'react';

import {TooltipContent} from '../TooltipContent';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';
import type {RenderTooltipContentData, Series, XAxisOptions} from './types';

export interface HorizontalBarChartProps {
  series: Series[];
  isAnimated?: boolean;
  isSimple?: boolean;
  isStacked?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => ReactNode;
  theme?: string;
  xAxisOptions?: XAxisOptions;
}

export function HorizontalBarChart({
  isAnimated = true,
  isSimple = false,
  isStacked = false,
  renderTooltipContent,
  series,
  theme,
  xAxisOptions,
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
        isSimple={isSimple}
        isStacked={isStacked}
        renderTooltipContent={renderTooltip}
        series={series}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

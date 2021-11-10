import React from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';
import type {Series, XAxisOptions} from './types';

export interface HorizontalBarChartProps {
  series: Series[];
  isAnimated?: boolean;
  isSimple?: boolean;
  isStacked?: boolean;
  theme?: string;
  xAxisOptions?: XAxisOptions;
}

export function HorizontalBarChart({
  isAnimated = true,
  isSimple = false,
  isStacked = false,
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

  return (
    <ChartContainer theme={theme}>
      <Chart
        isAnimated={isAnimated && !prefersReducedMotion}
        isSimple={isSimple}
        isStacked={isStacked}
        series={series}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

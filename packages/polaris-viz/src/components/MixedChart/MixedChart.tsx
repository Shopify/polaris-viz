import React from 'react';
import type {XAxisOptions} from 'types';

import {ChartContainer} from '../ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';
import type {MixedChartDataSeries} from './types';

export interface MixedChartProps {
  data: MixedChartDataSeries[];
  isAnimated?: boolean;
  showLegend?: boolean;
  theme?: string;
  xAxisOptions?: XAxisOptions;
}

export function MixedChart({
  isAnimated = true,
  data,
  showLegend = true,
  theme,
  xAxisOptions,
}: MixedChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    ...xAxisOptions,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        showLegend={showLegend}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

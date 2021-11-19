import React, {useState} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';
import type {ChartType, DataSeries} from '../../types';

import {Chart} from './Chart';
import type {XAxisOptions} from './types';

export interface SimpleBarChartProps {
  data: DataSeries[];
  isAnimated?: boolean;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
}

export function SimpleBarChart({
  isAnimated = true,
  data,
  theme,
  type = 'default',
  xAxisOptions,
}: SimpleBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    ...xAxisOptions,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        type={type}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}

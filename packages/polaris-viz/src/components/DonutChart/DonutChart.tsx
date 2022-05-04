import React from 'react';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

interface DonutChartProps {
  data: any;
  theme: any;
}

export function DonutChart({data, isAnimated = false, theme}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart data={data} />
    </ChartContainer>
  );
}

import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../../components/ChartContainer';

export interface FunnelChartProps {
  data: DataSeries[];
  theme?: string;
}

export function FunnelChart({theme}: FunnelChartProps) {
  return (
    <React.Fragment>
      <ChartContainer theme={theme}>
        <svg />
      </ChartContainer>
    </React.Fragment>
  );
}

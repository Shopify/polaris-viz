import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {useTheme, useThemeSeriesColors} from '../../hooks';
import {ChartContainer} from '../../components/ChartContainer';

import {Chart} from './Chart';

export interface FunnelChartProps {
  data: DataSeries[];
  theme?: string;
}

export function FunnelChart({theme = 'Default', data}: FunnelChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <ChartContainer theme={theme}>
      <Chart data={seriesWithDefaults} />
    </ChartContainer>
  );
}

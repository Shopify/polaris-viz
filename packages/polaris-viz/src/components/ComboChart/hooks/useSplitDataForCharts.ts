import type {Color, DataGroup} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';

export function useSplitDataForCharts(data: DataGroup[], colors: Color[]) {
  return useMemo(() => {
    const barChartDataIndex = data.findIndex(({shape}) => shape === 'Bar');

    const barChartData = data[barChartDataIndex];
    const lineChartData = data[barChartDataIndex === 0 ? 1 : 0];

    const firstLength = data[0].series.length;
    const chartColors = [
      colors.slice(0, firstLength),
      colors.slice(firstLength),
    ];

    const barChartColors = chartColors[barChartDataIndex];
    const lineChartColors = chartColors[barChartDataIndex === 0 ? 1 : 0];

    return {
      barChartData,
      lineChartData,
      barChartColors,
      lineChartColors,
    };
  }, [colors, data]);
}

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

    // Assume we have 3 bars and 2 lines.
    //
    // BarChart and LineChart have static placement in combo chart, so when we
    // render - their indexes are local to that set.
    //
    // 0,1,2 for BarChart and 0,1 for LineChart.
    //
    // Legends and Tooltips expect a DataSeries[] so a DataGroup[] is
    // flattened into DataSeries[].
    //
    // The order of the data in DataGroup[] has no meaning,
    // so we need to determine the indexOffset for each chart
    // so we can augment the indexes used for color vision.
    //
    // Example: 0,1,2 & 0,1 now become 0,1,2 & 3,4.
    //
    // This allows us to respond to index changes as if we were
    // rendering both charts using a flattened DataGroup[].
    const barChartIndexOffset = barChartDataIndex === 0 ? 0 : firstLength;
    const lineChartIndexOffset = barChartDataIndex !== 0 ? 0 : firstLength;

    return {
      barChartData,
      lineChartData,
      barChartColors,
      lineChartColors,
      barChartIndexOffset,
      lineChartIndexOffset,
    };
  }, [colors, data]);
}

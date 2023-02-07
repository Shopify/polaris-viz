import type {
  Color,
  DataSeries,
  LineChartDataSeriesWithDefaults,
} from '@shopify/polaris-viz-core';
import {
  changeColorOpacity,
  getAverageColor,
  isGradientType,
} from '@shopify/polaris-viz-core';

import {getOpacityByDataLength} from './getOpacityByLength';

export function getLineChartDataWithDefaults(
  data: DataSeries[],
  colors: Color[],
) {
  const areaOpacity = getOpacityByDataLength(data.length);

  const dataWithDefaults: LineChartDataSeriesWithDefaults[] = data.map(
    (series, index) => {
      const seriesColor = colors[index];

      const areaColor = isGradientType(seriesColor)
        ? getAverageColor(
            seriesColor[0].color,
            seriesColor[seriesColor.length - 1].color,
          )
        : seriesColor;

      return {
        ...series,
        areaColor: series.isComparison
          ? undefined
          : changeColorOpacity(areaColor as string, areaOpacity),
        // We want to override the color, not set a default
        // so it has to come last
        color: series.isComparison
          ? colors[index]
          : series.color ?? colors[index],
      };
    },
  );

  return dataWithDefaults;
}

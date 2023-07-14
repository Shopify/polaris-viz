import {HORIZONTAL_BAR_LABEL_OFFSET} from '@shopify/polaris-viz-core';

import {estimateTrendIndicatorWidth} from '../TrendIndicator';

import type {SimpleBarChartDataSeries} from './types';

/**
 * Returns the widths of the trend indicators associated with the highest positive value and the lowest negative value in the dataset, or 0 if the value doesn't have a trend indicator.
 */
export function getLongestTrendIndicator(
  data: SimpleBarChartDataSeries[],
  highestPositive: number,
  lowestNegative: number,
) {
  const longestTrendIndicator = data.reduce(
    (longestTrendIndicator, series) => {
      const {data: seriesData, metadata} = series;
      const trends = metadata?.trends ?? {};

      const trendEntries = Object.entries(trends);
      for (const [index, trend] of trendEntries) {
        const dataPoint = seriesData[index];

        if (dataPoint?.value === highestPositive) {
          longestTrendIndicator.positive = estimateTrendIndicatorWidth(
            trend.value,
          ).totalWidth;
        } else if (dataPoint?.value === lowestNegative) {
          longestTrendIndicator.negative = estimateTrendIndicatorWidth(
            trend.value,
          ).totalWidth;
        }
      }

      return longestTrendIndicator;
    },
    {positive: 0, negative: 0},
  );

  if (longestTrendIndicator.positive > 0) {
    longestTrendIndicator.positive += HORIZONTAL_BAR_LABEL_OFFSET;
  }

  if (longestTrendIndicator.negative > 0) {
    longestTrendIndicator.negative += HORIZONTAL_BAR_LABEL_OFFSET;
  }

  return longestTrendIndicator;
}

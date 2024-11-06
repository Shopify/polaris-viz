import {HORIZONTAL_BAR_LABEL_OFFSET} from '@shopify/polaris-viz-core';

import {
  estimateTrendIndicatorWidth,
  TREND_INDICATOR_FONT_WEIGHT,
} from '../TrendIndicator';

import type {SimpleBarChartDataSeries} from './types';

/**
 * Returns the widths of the trend indicators por positive or negative values,
 * or 0 if the value doesn't have a trend indicator.
 */
export function getLongestTrendIndicator(
  data: SimpleBarChartDataSeries[],
  fontSize: number,
) {
  const longestTrendIndicator = data.reduce(
    (longestTrendIndicator, series) => {
      const {data: seriesData, metadata} = series;
      const trends = metadata?.trends ?? {};

      const trendEntries = Object.entries(trends);
      for (const [index, trend] of trendEntries) {
        const dataPoint = seriesData[index];

        if (trend == null || trend.value == null || dataPoint?.value == null) {
          return longestTrendIndicator;
        }

        const trendStringWidth = estimateTrendIndicatorWidth(
          trend.value,
          fontSize,
          TREND_INDICATOR_FONT_WEIGHT,
        ).totalWidth;

        // Positive value
        if (dataPoint.value > 0) {
          if (trendStringWidth > longestTrendIndicator.positive) {
            longestTrendIndicator.positive = trendStringWidth;
          }
        } else if (dataPoint.value < 0) {
          // Negative value
          if (trendStringWidth > longestTrendIndicator.negative) {
            longestTrendIndicator.negative = trendStringWidth;
          }
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

import type {MetaDataTrendIndicator} from '../../../SimpleBarChart';
import {estimateTrendIndicatorWidth} from '../../../TrendIndicator';

export function getTrendIndicatorData(
  trendMetadata: MetaDataTrendIndicator | undefined,
) {
  if (trendMetadata != null) {
    const {totalWidth} = estimateTrendIndicatorWidth(`${trendMetadata.value}`);

    return {
      trendIndicatorProps: trendMetadata,
      trendIndicatorWidth: totalWidth,
    };
  }

  return {trendIndicatorProps: undefined, trendIndicatorWidth: 0};
}

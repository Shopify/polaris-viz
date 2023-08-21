import type {MetaDataTrendIndicator} from '../types';

import {estimateTrendIndicatorWidth} from './estimateTrendIndicatorWidth';

export interface TrendIndicatorData {
  trendIndicatorProps: MetaDataTrendIndicator | undefined;
  trendIndicatorWidth: number;
}

export function getTrendIndicatorData(
  trendMetadata: MetaDataTrendIndicator | undefined,
): TrendIndicatorData {
  if (trendMetadata != null) {
    const {totalWidth} = estimateTrendIndicatorWidth(`${trendMetadata.value}`);

    return {
      trendIndicatorProps: trendMetadata,
      trendIndicatorWidth: totalWidth,
    };
  }

  return {
    trendIndicatorProps: undefined,
    trendIndicatorWidth: 0,
  };
}

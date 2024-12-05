import type {MetaDataTrendIndicator} from 'types';

import {FONT_WEIGHT as TREND_INDICATOR_FONT_WEIGHT} from '../components/TrendIndicator/constants';
import {FONT_SIZE} from '../constants';
import {estimateTrendIndicatorWidth} from '../components/TrendIndicator/utilities/estimateTrendIndicatorWidth';

export function getTrendIndicatorData(
  trendMetadata: MetaDataTrendIndicator | undefined,
) {
  if (trendMetadata != null) {
    const {totalWidth} = estimateTrendIndicatorWidth(
      trendMetadata.value ?? '',
      FONT_SIZE,
      TREND_INDICATOR_FONT_WEIGHT,
    );

    return {
      trendIndicatorProps: trendMetadata,
      trendIndicatorWidth: totalWidth,
    };
  }

  return {trendIndicatorProps: undefined, trendIndicatorWidth: 0};
}

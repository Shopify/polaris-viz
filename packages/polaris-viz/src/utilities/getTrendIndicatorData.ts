import type {MetaDataTrendIndicator} from 'types';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {TREND_INDICATOR_FONT_WEIGHT} from '../components/TrendIndicator';
import {FONT_SIZE} from '../constants';
import {estimateTrendIndicatorWidth} from '../components';

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

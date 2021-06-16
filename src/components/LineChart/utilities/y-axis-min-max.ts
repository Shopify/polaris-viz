import {
  DEFAULT_MAX_Y,
  EMPTY_STATE_CHART_MIN,
  EMPTY_STATE_CHART_MAX,
} from '../../../constants';
import type {Series} from '../types';

export function yAxisMinMax({
  series,
  integersOnly,
}: {
  series: Series[];
  integersOnly: boolean;
}) {
  if (series.length === 0) {
    return [EMPTY_STATE_CHART_MIN, EMPTY_STATE_CHART_MAX];
  }

  let minY = Infinity;
  let maxY = -Infinity;

  series.forEach(({data}) => {
    data.forEach(({rawValue}) => {
      minY = Math.min(minY, rawValue);
      maxY = Math.max(maxY, rawValue);
    });
  });

  maxY = maxY === 0 && minY === 0 ? DEFAULT_MAX_Y : maxY;

  if (integersOnly) {
    return [Math.floor(minY), Math.ceil(maxY)];
  }

  return [minY, maxY];
}

import {
  DEFAULT_MAX_Y,
  EMPTY_STATE_CHART_MIN,
  EMPTY_STATE_CHART_MAX,
} from '../../../constants';
import {Series} from '../types';

export function yAxisMinMax(series: Series[]) {
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
  return [minY, maxY];
}

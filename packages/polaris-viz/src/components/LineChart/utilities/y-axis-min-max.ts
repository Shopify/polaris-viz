import type {DataSeries} from '../../../types';
import {
  DEFAULT_MAX_Y,
  EMPTY_STATE_CHART_MIN,
  EMPTY_STATE_CHART_MAX,
} from '../../../constants';

export function yAxisMinMax({
  data,
  integersOnly,
}: {
  data: DataSeries[];
  integersOnly: boolean;
}) {
  if (data.length === 0) {
    return [EMPTY_STATE_CHART_MIN, EMPTY_STATE_CHART_MAX];
  }

  let minY = Infinity;
  let maxY = -Infinity;

  data.forEach(({data}) => {
    data.forEach(({value}) => {
      if (value == null) {
        return;
      }

      minY = Math.min(minY, value);
      maxY = Math.max(maxY, value);
    });
  });

  maxY = maxY === 0 && minY === 0 ? DEFAULT_MAX_Y : maxY;

  if (integersOnly) {
    return [Math.floor(minY), Math.ceil(maxY)];
  }

  return [minY, maxY];
}

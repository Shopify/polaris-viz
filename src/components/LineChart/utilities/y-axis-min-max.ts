import {DEFAULT_MAX_Y} from '../../../constants';
import {Series} from '../types';

export function yAxisMinMax(series: Series[]) {
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

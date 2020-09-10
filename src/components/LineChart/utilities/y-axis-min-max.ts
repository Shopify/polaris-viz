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

  return [minY, maxY];
}

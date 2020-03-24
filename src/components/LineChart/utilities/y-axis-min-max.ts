import {Series} from '../types';

export function yAxisMinMax(series: Series[]) {
  let minY = Infinity;
  let maxY = -Infinity;

  series.forEach(({data}) => {
    data.forEach(({y}) => {
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
  });

  return [minY, maxY];
}

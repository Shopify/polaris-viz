import {Series} from '../types';

export function yAxisMinMax(series: Series[]) {
  let minY = Infinity;
  let maxY = -Infinity;

  series.forEach(({data}) => {
    data.forEach(([, yValue]) => {
      minY = Math.min(minY, yValue);
      maxY = Math.max(maxY, yValue);
    });
  });

  return [minY, maxY];
}

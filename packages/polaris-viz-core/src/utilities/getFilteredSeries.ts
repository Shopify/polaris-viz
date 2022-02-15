import type {DataSeries} from '../types';

export function getFilteredSeries(series: Partial<DataSeries>[]): number {
  // Only include solid lines (or non-lines) in the
  // count when grabbing the series color.
  return (
    series.filter((item) => {
      if (item.isComparison !== true) {
        return true;
      }
    }).length ?? 0
  );
}

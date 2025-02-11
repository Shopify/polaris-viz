import type {ComparisonSeriesIndex} from '../types';

export function getComparisonSeriesIndexes(data) {
  return data
    .map(({metadata}, index) => {
      if (metadata?.comparisonIndex != null) {
        return {
          originalIndex: index,
          comparisonIndex: metadata.comparisonIndex,
        };
      }
    })
    .filter(Boolean) as ComparisonSeriesIndex[];
}

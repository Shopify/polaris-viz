import type {ComparisonSeriesIndex} from '@shopify/polaris-viz-core/src/types';

export function hasHiddenComparisonSeries({
  activeColorVisionIndex,
  comparisonSeriesIndexes,
  index,
}: {
  activeColorVisionIndex: number;
  comparisonSeriesIndexes: ComparisonSeriesIndex[];
  index: number;
}) {
  if (comparisonSeriesIndexes.length === 0) {
    return false;
  }

  const comparisonSeries = comparisonSeriesIndexes.find(
    ({comparisonIndex}) => comparisonIndex === index,
  );

  if (comparisonSeries == null) {
    return false;
  }

  return (
    comparisonSeries.comparisonIndex === index &&
    activeColorVisionIndex !== comparisonSeries.originalIndex
  );
}

import type {DataSeries} from '@shopify/polaris-viz-core';

interface BucketDataSeriesProps {
  dataSeries: DataSeries[];
  maxSeries: number;
  renderBucketLegendLabel?: () => string;
}

export function bucketDataSeries({
  dataSeries,
  maxSeries,
  renderBucketLegendLabel = () => 'Other',
}: BucketDataSeriesProps) {
  if (dataSeries.length <= maxSeries || maxSeries <= 0) {
    return dataSeries;
  }

  const shownSeries = dataSeries.slice(0, maxSeries);
  const otherSeries = dataSeries.slice(maxSeries);
  const firstSeriesInOtherGroup = otherSeries[0];

  const otherGroup = otherSeries.reduce(
    (accumulator, current) => {
      current.data.forEach((dataPoint, index) => {
        accumulator.data[index].value! += dataPoint.value || 0;
      });

      return accumulator;
    },
    {
      ...firstSeriesInOtherGroup,
      name: renderBucketLegendLabel(),
      data: firstSeriesInOtherGroup.data.map((dataPoint) => ({
        ...dataPoint,
        value: 0,
      })),
    },
  );

  return [...shownSeries, otherGroup];
}

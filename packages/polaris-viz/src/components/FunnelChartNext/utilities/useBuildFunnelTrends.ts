import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {MetaDataTrendIndicator, FunnelChartMetaData} from '../types';
import type {FunnelChartNextProps} from '../FunnelChartNext';

export interface UseBuildFunnelTrendsProps {
  data: DataSeries[];
  percentageFormatter: FunnelChartNextProps['percentageFormatter'];
}

export function useBuildFunnelTrends({
  data,
  percentageFormatter,
}: UseBuildFunnelTrendsProps) {
  return useMemo(() => {
    const primarySeries = data.find((series) => !series.isComparison);
    const comparisonSeries = data.find((series) => series.isComparison);

    if (
      !primarySeries ||
      !comparisonSeries ||
      !primarySeries.metadata?.trends
    ) {
      return undefined;
    }

    const trends: FunnelChartMetaData['trends'] = {};

    primarySeries.data.forEach((_, index) => {
      const reachedTrend = primarySeries.metadata?.trends[index];

      if (!reachedTrend) return;

      const droppedPercentageChange = calculateDroppedPercentageChange({
        previousStepValue: primarySeries.data[index - 1]?.value,
        currentStepValue: primarySeries.data[index]?.value,
        comparisonPreviousStepValue: comparisonSeries.data[index - 1]?.value,
        comparisonCurrentStepValue: comparisonSeries.data[index]?.value,
      });

      const droppedTrend =
        index === 0
          ? undefined
          : formatDroppedTrend(droppedPercentageChange, percentageFormatter);

      trends[index] = {
        reached: reachedTrend,
        ...(droppedTrend && {dropped: droppedTrend}),
      };
    });

    return {trends};
  }, [data, percentageFormatter]);
}

interface DropOffCalculationParams {
  previousStepValue: number | null;
  currentStepValue: number | null;
  comparisonPreviousStepValue: number | null;
  comparisonCurrentStepValue: number | null;
}

function calculateDroppedPercentageChange({
  previousStepValue,
  currentStepValue,
  comparisonPreviousStepValue,
  comparisonCurrentStepValue,
}: DropOffCalculationParams): number {
  const hasEmptyValues =
    previousStepValue == null ||
    currentStepValue == null ||
    comparisonPreviousStepValue == null ||
    comparisonCurrentStepValue == null;

  if (hasEmptyValues) return 0;

  const currentDropped = previousStepValue! - currentStepValue!;
  const comparisonDropped =
    comparisonPreviousStepValue! - comparisonCurrentStepValue!;

  if (currentDropped === 0) return 0;

  return (
    ((comparisonDropped - currentDropped) / Math.abs(currentDropped)) * 100
  );
}

function formatDroppedTrend(
  percentageChange: number,
  percentageFormatter: FunnelChartNextProps['percentageFormatter'],
): MetaDataTrendIndicator {
  const absolutePercentageChange = Math.abs(percentageChange);
  const defaultFormattedPercentage = `${absolutePercentageChange}%`;
  const formattedPercentage = percentageFormatter
    ? percentageFormatter(absolutePercentageChange)
    : defaultFormattedPercentage;

  if (percentageChange === 0) {
    return {
      value: formattedPercentage,
      trend: 'neutral',
      direction: 'upward',
    };
  }

  return {
    value: formattedPercentage,
    trend: percentageChange < 0 ? 'negative' : 'positive',
    direction: percentageChange < 0 ? 'upward' : 'downward',
  };
}

import {useMemo} from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {MetaDataTrendIndicator, FunnelChartMetaData} from '../types';

interface DropOffCalculationParams {
  previousStepValue: number | null;
  currentStepValue: number | null;
  comparisonPreviousStepValue: number | null;
  comparisonCurrentStepValue: number | null;
}

function hasValidValues(params: DropOffCalculationParams): params is {
  previousStepValue: number;
  currentStepValue: number;
  comparisonPreviousStepValue: number;
  comparisonCurrentStepValue: number;
} {
  return Object.values(params).every((value): value is number => value != null);
}

function calculateDroppedPercentageChange({
  previousStepValue,
  currentStepValue,
  comparisonPreviousStepValue,
  comparisonCurrentStepValue,
}: DropOffCalculationParams): number {
  if (
    !hasValidValues({
      previousStepValue,
      currentStepValue,
      comparisonPreviousStepValue,
      comparisonCurrentStepValue,
    })
  )
    return 0;

  const currentDropped = previousStepValue! - currentStepValue!;
  const comparisonDropped =
    comparisonPreviousStepValue! - comparisonCurrentStepValue!;

  if (currentDropped === 0) return 0;

  return (
    ((comparisonDropped - currentDropped) / Math.abs(currentDropped)) * 100
  );
}

function formatDroppedTrend(percentageChange: number): MetaDataTrendIndicator {
  if (percentageChange === 0) {
    return {
      value: `${Math.abs(percentageChange).toFixed(1)}%`,
      trend: 'neutral',
      direction: 'upward',
    };
  }

  return {
    value: `${Math.abs(percentageChange).toFixed(1)}%`,
    trend: percentageChange < 0 ? 'negative' : 'positive',
    direction: percentageChange < 0 ? 'upward' : 'downward',
  };
}

export function useBuildFunnelTrends(data: DataSeries[]) {
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
        index === 0 ? undefined : formatDroppedTrend(droppedPercentageChange);

      trends[index] = {
        reached: reachedTrend,
        ...(droppedTrend && {dropped: droppedTrend}),
      };
    });

    return {trends};
  }, [data]);
}

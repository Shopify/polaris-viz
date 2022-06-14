import {useYScale} from '@shopify/polaris-viz-core';
import type {ScaleLinear} from 'd3-scale';

import type {Axis} from '../types';
import {getSecondaryDataForMixedData} from '../utilities/getSecondaryDataForMixedData';

interface Props {
  doBothChartsContainMixedValues: boolean;
  doesOneChartContainAllNegativeValues: boolean;
  drawableHeight: number;
  primaryAxis: Axis;
  secondaryAxis: Axis;
  shouldPlaceZeroInMiddleOfChart: boolean;
  yScale: ScaleLinear<number, number>;
}

export function useDualAxisScale({
  doBothChartsContainMixedValues,
  doesOneChartContainAllNegativeValues,
  drawableHeight,
  primaryAxis,
  secondaryAxis,
  shouldPlaceZeroInMiddleOfChart,
  yScale,
}: Props) {
  const {secondaryDrawableHeight, secondaryMax, secondaryMin} =
    getSecondaryDataForMixedData({
      doBothChartsContainMixedValues,
      doesOneChartContainAllNegativeValues,
      drawableHeight,
      secondaryAxis,
      shouldPlaceZeroInMiddleOfChart,
      yScale,
    });

  const {yScale: secondaryYScale} = useYScale({
    drawableHeight: secondaryDrawableHeight,
    formatYAxisLabel: secondaryAxis.yAxisOptions.labelFormatter,
    integersOnly: secondaryAxis.yAxisOptions.integersOnly,
    max: secondaryMax,
    min: secondaryMin,
    // For non-source of truth, the ticks are exactly
    // what they should be, so we don't want to apply .nice()
    // to the scale.
    shouldRoundUp: false,
  });

  const barYScale = primaryAxis.shape === 'Bar' ? yScale : secondaryYScale;
  const lineYScale = primaryAxis.shape === 'Bar' ? secondaryYScale : yScale;

  return {
    barYScale,
    lineYScale,
  };
}

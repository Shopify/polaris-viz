import type {ScaleLinear} from 'd3-scale';

import {Axis, AxisValueRange} from '../types';

interface Props {
  shouldPlaceZeroInMiddleOfChart: boolean;
  doesOneChartContainAllNegativeValues: boolean;
  doBothChartsContainMixedValues: boolean;
  drawableHeight: number;
  secondaryAxis: Axis;
  yScale: ScaleLinear<number, number>;
}

export function getSecondaryDataForMixedData({
  shouldPlaceZeroInMiddleOfChart,
  doesOneChartContainAllNegativeValues,
  doBothChartsContainMixedValues,
  drawableHeight,
  secondaryAxis,
  yScale,
}: Props) {
  if (shouldPlaceZeroInMiddleOfChart) {
    let min = -secondaryAxis.max;
    let max = secondaryAxis.max;

    if (secondaryAxis.valuesRange === AxisValueRange.AllNegative) {
      min = secondaryAxis.min;
      max = -secondaryAxis.min;
    }

    return {
      secondaryDrawableHeight: drawableHeight,
      secondaryMin: min,
      secondaryMax: max,
    };
  }

  if (doesOneChartContainAllNegativeValues) {
    return {
      secondaryDrawableHeight: drawableHeight,
      secondaryMin: secondaryAxis.min,
      secondaryMax: secondaryAxis.max,
    };
  }

  if (doBothChartsContainMixedValues) {
    return {
      secondaryDrawableHeight: drawableHeight,
      secondaryMin: -secondaryAxis.max,
      secondaryMax: secondaryAxis.max,
    };
  }

  return {
    secondaryDrawableHeight: yScale(0),
    secondaryMax: secondaryAxis.max,
    secondaryMin: secondaryAxis.min,
  };
}

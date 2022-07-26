import {
  getClosestDivisibleNumber,
  roundToDecimals,
  useYScale,
} from '@shopify/polaris-viz-core';
import type {DataGroup} from '@shopify/polaris-viz-core';

import {getZeroIndex} from '../utilities/getZeroIndex';
import {getTicksBetweenZeroAndMax} from '../utilities/getTicksBetweenZeroAndMax';
import {getSourceTicksIndex} from '../utilities/getSourceTicksIndex';
import {getInitialYScaleValues} from '../utilities/getInitialYScaleValues';

import {useGetDualAxis} from './useGetDualAxis';
import {useMixedDataValues} from './useMixedDataValues';

interface Props {
  data: DataGroup[];
  drawableHeight: number;
}

export function useDualAxisTicks({data, drawableHeight}: Props) {
  const axes = useGetDualAxis({data});

  const {
    areAllValuesNegative,
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    shouldPlaceZeroInMiddleOfChart,
  } = useMixedDataValues(axes);

  const sourceOfTruthIndex = getSourceTicksIndex({
    axes,
    doBothChartsContainMixedValues,
    shouldPlaceZeroInMiddleOfChart,
  });

  const primaryAxis = axes[sourceOfTruthIndex === 0 ? 0 : 1];
  const secondaryAxis = axes[sourceOfTruthIndex === 0 ? 1 : 0];

  const initialYScaleValues = getInitialYScaleValues({
    drawableHeight,
    primaryAxis,
    shouldPlaceZeroInMiddleOfChart,
  });

  const {ticks, yScale} = useYScale({
    ...initialYScaleValues,
    formatYAxisLabel: primaryAxis.yAxisOptions.labelFormatter,
    integersOnly: primaryAxis.yAxisOptions.integersOnly,
  });

  const ticksLength = ticks.length - 1;

  const zeroIndex = getZeroIndex({
    doesOneChartContainAllNegativeValues,
    shouldPlaceZeroInMiddleOfChart,
    ticks,
  });

  const ticksBetweenZeroAndMax = getTicksBetweenZeroAndMax({
    doesOneChartContainAllNegativeValues,
    shouldPlaceZeroInMiddleOfChart,
    ticksLength,
    zeroIndex,
  });

  let secondaryMaxforTicks = Math.abs(
    doesOneChartContainAllNegativeValues
      ? secondaryAxis.min
      : secondaryAxis.max,
  );

  // Make the ticks a nice round number between
  // 0 and max.
  secondaryMaxforTicks = getClosestDivisibleNumber(
    secondaryMaxforTicks,
    ticksBetweenZeroAndMax,
  );

  const tickHeight = Math.abs(secondaryMaxforTicks / ticksBetweenZeroAndMax);

  const intialSecondaryTicks = ticks.map((tick, index) => {
    const alteredIndex = index - zeroIndex;
    const formattedValue = roundToDecimals(tickHeight * alteredIndex, 2);

    return {
      value: tickHeight * alteredIndex,
      formattedValue: secondaryAxis.yAxisOptions.labelFormatter(
        `${formattedValue}`,
      ),
      yOffset: yScale(tick.value),
    };
  });

  const primaryTicks = sourceOfTruthIndex === 0 ? ticks : intialSecondaryTicks;
  const secondaryTicks =
    sourceOfTruthIndex === 0 ? intialSecondaryTicks : ticks;

  return {
    areAllValuesNegative,
    doesOneChartContainAllNegativeValues,
    doBothChartsContainMixedValues,
    primaryTicks,
    primaryAxis,
    secondaryTicks,
    secondaryAxis,
    yScale,
    shouldPlaceZeroInMiddleOfChart,
    ticksBetweenZeroAndMax,
  };
}

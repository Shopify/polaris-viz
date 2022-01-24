import {useMemo} from 'react';
import {maxIndex} from 'd3-array';

import {
  getTextWidth,
  getTextContainerHeight,
  getLongestLabelDetails,
  getMaxDiagonalDetails,
} from '../utilities';
import {
  SPACING_TIGHT,
  MIN_HORIZONTAL_LABEL_SPACE,
  LINE_HEIGHT,
  MIN_HORIZONTAL_TICKS,
  LineChartMargin as Margin,
  SPACING_EXTRA_TIGHT,
  SMALL_LABEL_WIDTH,
  LABEL_SPACE_MINUS_FIRST_AND_LAST,
  LABEL_ELLIPSIS_LENGTH,
} from '../constants';
import type {StringLabelFormatter, YAxisTick, DataSeries} from '../types';

import {useLinearXScale} from './useLinearXScale';

function getDatumSpace(width: number, numberOfTicks: number) {
  return (
    (width / numberOfTicks) * LABEL_SPACE_MINUS_FIRST_AND_LAST +
    SPACING_EXTRA_TIGHT
  );
}

export interface ChartDetails {
  data: DataSeries[];
  fontSize: number;
  width: number;
  formatXAxisLabel: StringLabelFormatter;
  initialTicks: YAxisTick[];
  xAxisLabels: string[];
  useMinimalLabels?: boolean;
  wrapLabels: boolean;
}

export function useLinearXAxisDetails({
  data,
  fontSize,
  width,
  formatXAxisLabel,
  initialTicks,
  xAxisLabels,
  useMinimalLabels,
  wrapLabels,
}: ChartDetails) {
  const {estimatedYAxisWidth, drawableWidth} = useMemo(() => {
    // determine how much space will be taken up by the yaxis
    // and its labels, in order to know width of xaxis
    const longestYAxisLabel = maxIndex(
      initialTicks,
      ({formattedValue}: {formattedValue: string}) => formattedValue.length,
    );

    const text =
      longestYAxisLabel < 0
        ? ''
        : initialTicks[longestYAxisLabel].formattedValue;

    const approxYAxisLabelWidth = getTextWidth({
      text,
      fontSize,
    });

    const estimatedYAxisWidth = SPACING_TIGHT + approxYAxisLabelWidth;

    const drawableWidth = width - estimatedYAxisWidth - Margin.Right;

    return {
      estimatedYAxisWidth,
      drawableWidth,
    };
  }, [fontSize, initialTicks, width]);

  const longestSeriesLastIndex = useMemo(
    () =>
      data.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [data],
  );

  // using the estimated width, use the xscale hook so we can then get the d3's estimated ticks
  const initialXScale = useLinearXScale({
    drawableWidth,
    longestSeriesLength: longestSeriesLastIndex,
  });

  const ticks = useMemo(() => {
    const minimalLabelIndexes = [
      0,
      Math.floor(longestSeriesLastIndex / 2),
      longestSeriesLastIndex,
    ];
    const xScaleTicks =
      initialXScale.xScale == null
        ? []
        : initialXScale.xScale
            .ticks()
            .filter(function removeNonIntegerTicks(value) {
              return Number.isInteger(value);
            });

    return useMinimalLabels &&
      longestSeriesLastIndex > minimalLabelIndexes.length
      ? minimalLabelIndexes
      : xScaleTicks;
  }, [initialXScale.xScale, longestSeriesLastIndex, useMinimalLabels]);

  const {
    horizontalLabelWidth,
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    diagonalTicks,
    horizontalTicks,
  } = useMemo(() => {
    const xLabels = xAxisLabels.map((label, index) =>
      formatXAxisLabel(label, index, xAxisLabels),
    );
    // xAxis label spacing will be based on the longest label
    const longestXLabelDetails = getLongestLabelDetails(xLabels, fontSize);
    // the actual space available will each label
    const datumXLabelSpace = getDatumSpace(drawableWidth, ticks.length);

    // layout option 1: use full label horizontally, allow it to wrap up to three lines
    const initialHorizontalLabelHeight = getTextContainerHeight({
      text: longestXLabelDetails.label,
      fontSize,
      containerWidth: datumXLabelSpace,
    });

    const smallLabelGoingMultiline =
      longestXLabelDetails.length < SMALL_LABEL_WIDTH &&
      initialHorizontalLabelHeight > LINE_HEIGHT;

    const maxTextBoxHeight = wrapLabels ? LINE_HEIGHT * 3 : LINE_HEIGHT;

    // determine if we need to reduce the ticks
    const needToReduceTicks =
      smallLabelGoingMultiline ||
      initialHorizontalLabelHeight > maxTextBoxHeight ||
      datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

    const reducedTicks = ticks.filter((_, index) => index % 3 === 0);

    const reducedTicksDatumXLabelSpace = getDatumSpace(
      drawableWidth,
      reducedTicks.length,
    );

    // layout option 2: see if layout is acceptable with fewer ticks
    const reducedHorizontalLabelHeight = getTextContainerHeight({
      text: longestXLabelDetails.label,
      fontSize,
      containerWidth: reducedTicksDatumXLabelSpace,
    });
    const diagonalLabelSpacePerDatum = Math.max(
      Math.floor((LINE_HEIGHT * 2) / datumXLabelSpace),
      2,
    );

    // use a trig utility to determine how long the diagonal labels can be
    const {
      angledLabelMaxLength,
      maxDiagonalLabelHeight,
    } = getMaxDiagonalDetails(longestXLabelDetails.length, estimatedYAxisWidth);
    // determine if we need to go to our last option: making the ticks go diagonal
    const needsDiagonalLabels =
      needToReduceTicks &&
      (reducedTicksDatumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE ||
        reducedTicks.length < MIN_HORIZONTAL_TICKS ||
        reducedHorizontalLabelHeight > maxTextBoxHeight);

    // the max horizontal height is determined by whether the ticks are reduced
    const horizontalLabelHeight = needToReduceTicks
      ? reducedHorizontalLabelHeight
      : initialHorizontalLabelHeight;

    // max height is determined by whether the labels are diagonal or not
    const maxXLabelHeight = needsDiagonalLabels
      ? maxDiagonalLabelHeight
      : horizontalLabelHeight;

    const horizontalLabelWidth = needToReduceTicks
      ? reducedTicksDatumXLabelSpace
      : datumXLabelSpace;

    // the max diagonal length is whatever is smaller: longest label or where it gets cut off
    const maxDiagonalLabelLength =
      Math.min(longestXLabelDetails.length, angledLabelMaxLength) +
      LABEL_ELLIPSIS_LENGTH;

    // reduce the ticks if they start runing into each other
    const diagonalTicks = ticks.filter(
      (_, index) => index % Math.abs(diagonalLabelSpacePerDatum) === 0,
    );

    const horizontalTicks = needToReduceTicks ? reducedTicks : ticks;

    return {
      horizontalLabelWidth,
      horizontalLabelHeight,
      maxXLabelHeight,
      maxDiagonalLabelLength,
      needsDiagonalLabels,
      diagonalTicks,
      horizontalTicks,
    };
  }, [
    drawableWidth,
    estimatedYAxisWidth,
    fontSize,
    formatXAxisLabel,
    ticks,
    xAxisLabels,
    wrapLabels,
  ]);

  return {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    ticks: needsDiagonalLabels ? diagonalTicks : horizontalTicks,
    horizontalLabelWidth,
  };
}

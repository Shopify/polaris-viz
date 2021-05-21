import {useMemo} from 'react';

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
  MAX_TEXT_LINE_HEIGHT,
  LineChartMargin as Margin,
  SPACING_EXTRA_TIGHT,
  SMALL_LABEL_WIDTH,
  LABEL_SPACE_MINUS_FIRST_AND_LAST,
} from '../constants';
import {
  StringLabelFormatter,
  NullableData,
  Data,
  DataSeries,
  SeriesColor,
  YAxisTick,
} from '../types';

import {useLinearXScale} from './useLinearXScale';

function getDatumSpace(width: number, numberOfTicks: number) {
  return (
    (width / numberOfTicks) * LABEL_SPACE_MINUS_FIRST_AND_LAST +
    SPACING_EXTRA_TIGHT
  );
}

export interface ChartDetails {
  series: DataSeries<Data | NullableData, SeriesColor>[];
  fontSize: number;
  width: number;
  formatXAxisLabel: StringLabelFormatter;
  initialTicks: YAxisTick[];
  xAxisLabels: string[];
  useMinimalLabels?: boolean;
}

export function useLinearXAxisDetails({
  series,
  fontSize,
  width,
  formatXAxisLabel,
  initialTicks,
  xAxisLabels,
  useMinimalLabels,
}: ChartDetails) {
  // determine how much space will be taken up by the yaxis and its labels, in order to know width of xaxis
  const approxYAxisLabelWidth = useMemo(
    () =>
      Math.max(
        ...initialTicks.map(({formattedValue}) =>
          getTextWidth({text: formattedValue, fontSize}),
        ),
      ),
    [fontSize, initialTicks],
  );

  const estimatedYAxisWidth = SPACING_TIGHT + approxYAxisLabelWidth;

  const drawableWidth = width - estimatedYAxisWidth - Margin.Right;

  const longestSeriesLastIndex = useMemo(
    () =>
      series.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [series],
  );

  // using the estimated width, use the xscale hook so we can then get the d3's estimated ticks
  const initialXScale = useLinearXScale({
    drawableWidth,
    longestSeriesLength: longestSeriesLastIndex,
  });

  const {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    ticks,
    horizontalLabelWidth,
  } = useMemo(() => {
    const xScaleTicks =
      initialXScale.xScale == null
        ? []
        : initialXScale.xScale
            .ticks()
            .filter(function removeNonIntegerTicks(value) {
              return Number.isInteger(value);
            });

    const minimalLabelIndexes = [
      0,
      Math.floor(longestSeriesLastIndex / 2),
      longestSeriesLastIndex,
    ];

    const ticks =
      useMinimalLabels && longestSeriesLastIndex > minimalLabelIndexes.length
        ? minimalLabelIndexes
        : xScaleTicks;

    // xAxis label spacing will be based on the longest label
    const xLabels = xAxisLabels.map((label) => formatXAxisLabel(label));
    const longestXLabelDetails = getLongestLabelDetails(xLabels, fontSize);

    // the actual space available will each label
    const datumXLabelSpace = getDatumSpace(drawableWidth, ticks.length);

    // layout option 1: use full label horizontally, allow it to wrap up to three lines
    const initialHorizontalLabelHeight = getTextContainerHeight({
      text: longestXLabelDetails.label,
      fontSize,
      containerWidth: datumXLabelSpace,
    });

    const lineHeightInPx = LINE_HEIGHT * fontSize;

    const smallLabelGoingMultiline =
      longestXLabelDetails.length < SMALL_LABEL_WIDTH &&
      initialHorizontalLabelHeight > lineHeightInPx;

    const maxTextBoxHeight = MAX_TEXT_LINE_HEIGHT * fontSize;
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

    const horizontalTicks = needToReduceTicks ? reducedTicks : ticks;

    // determine if we need to go to our last option: making the ticks go diagonal
    const needsDiagonalLabels =
      needToReduceTicks &&
      (reducedTicksDatumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE ||
        reducedTicks.length < MIN_HORIZONTAL_TICKS ||
        reducedHorizontalLabelHeight > maxTextBoxHeight);

    // use a trig utility to determine how long the diagonal labels can be
    const {
      angledLabelMaxLength,
      maxDiagonalLabelHeight,
    } = getMaxDiagonalDetails(longestXLabelDetails.length, estimatedYAxisWidth);

    const diagonalLabelSpacePerDatum = Math.max(
      Math.floor((lineHeightInPx * 2) / datumXLabelSpace),
      2,
    );

    // reduce the ticks if they start runing into each other
    const diagonalTicks = ticks.filter(
      (_, index) => index % Math.abs(diagonalLabelSpacePerDatum) === 0,
    );

    // the max diagonal length is whatever is smaller: longest label or where it gets cut off
    const maxDiagonalLabelLength = Math.min(
      longestXLabelDetails.length,
      angledLabelMaxLength,
    );

    // the max horizontal height is determined by whether the ticks are reduced
    const horizontalLabelHeight = needToReduceTicks
      ? reducedHorizontalLabelHeight
      : initialHorizontalLabelHeight;

    // max height is determined by whether the labels are diagonal or not
    const maxXLabelHeight = needsDiagonalLabels
      ? maxDiagonalLabelHeight
      : horizontalLabelHeight;

    return {
      maxXLabelHeight,
      maxDiagonalLabelLength,
      needsDiagonalLabels,
      ticks: needsDiagonalLabels ? diagonalTicks : horizontalTicks,
      horizontalLabelWidth: needToReduceTicks
        ? reducedTicksDatumXLabelSpace
        : datumXLabelSpace,
    };
  }, [
    drawableWidth,
    estimatedYAxisWidth,
    fontSize,
    formatXAxisLabel,
    initialXScale.xScale,
    longestSeriesLastIndex,
    useMinimalLabels,
    xAxisLabels,
  ]);

  return {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    ticks,
    horizontalLabelWidth,
  };
}

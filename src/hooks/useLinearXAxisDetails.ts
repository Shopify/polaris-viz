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
  MAX_TEXT_BOX_HEIGHT,
  Margin,
  SPACING_EXTRA_TIGHT,
  SMALL_LABEL_WIDTH,
  LABEL_SPACE_MINUS_FIRST_AND_LAST,
} from '../constants';
import {DataSeries, StringLabelFormatter, NumberLabelFormatter} from '../types';

import {useLinearXScale} from './useLinearXScale';

function getDatumSpace(width: number, numberOfTicks: number) {
  return (
    (width / numberOfTicks) * LABEL_SPACE_MINUS_FIRST_AND_LAST +
    SPACING_EXTRA_TIGHT
  );
}

export function useLinearXAxisDetails({
  series,
  fontSize,
  chartDimensions,
  formatXAxisLabel,
  formatYAxisLabel,
  xAxisLabels,
}: {
  series: DataSeries[];
  fontSize: number;
  chartDimensions: DOMRect;
  formatXAxisLabel: StringLabelFormatter;
  formatYAxisLabel: NumberLabelFormatter;
  xAxisLabels: string[];
}) {
  // returns the details needed to layout the chart and the xaxis labels
  // initially tries to use all d3's ticks, then tries reducing them if neccessary
  // then finally makes them diagonal

  // determine how much space will be taken up by the yaxis, in order to know width of xaxis
  const longestYLabel = useMemo(() => {
    const flattenedYLabels = Array.prototype.concat.apply(
      [],
      series.map(({data}) =>
        data.map(({rawValue}) => formatYAxisLabel(rawValue)),
      ),
    );

    return Math.max(
      ...flattenedYLabels.map((label) =>
        getTextWidth({text: formatYAxisLabel(label), fontSize}),
      ),
    );
  }, [fontSize, formatYAxisLabel, series]);

  const estimatedYAxisWidth = SPACING_TIGHT + longestYLabel;

  const drawableWidth =
    chartDimensions.width - estimatedYAxisWidth - Margin.Right;

  const longestSeriesLength = useMemo(
    () =>
      series.reduce<number>(
        (max, currentSeries) => Math.max(max, currentSeries.data.length - 1),
        0,
      ),
    [series],
  );

  // use the xscale method on the estimated width, to use the ticks method
  const initialXScale = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  const ticks =
    initialXScale.xScale == null ? [] : initialXScale.xScale.ticks();

  // xAxis label spacing will be based on the longest label
  const longestXLabelDetails = useMemo(() => {
    const xLabels = xAxisLabels.map((label) => formatXAxisLabel(label));
    return getLongestLabelDetails(xLabels, fontSize);
  }, [fontSize, formatXAxisLabel, xAxisLabels]);

  // the actual space available will each label
  const datumXLabelSpace = getDatumSpace(drawableWidth, ticks.length);

  // layout option 1: use full label horizontally, allow it to wrap up to three lines
  const initialHorizontalLabelHeight = useMemo(
    () =>
      getTextContainerHeight({
        text: longestXLabelDetails.label,
        fontSize,
        containerWidth: datumXLabelSpace,
      }),
    [datumXLabelSpace, fontSize, longestXLabelDetails.label],
  );

  const smallLabelGoingMultiline =
    longestXLabelDetails.length < SMALL_LABEL_WIDTH &&
    initialHorizontalLabelHeight > LINE_HEIGHT;

  // determine if we need to reduce the ticks
  const needToReduceTicks =
    smallLabelGoingMultiline ||
    initialHorizontalLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  const reducedTicks = ticks.filter((_, index) => index % 3 === 0);

  const reducedTicksDatumXLabelSpace = getDatumSpace(
    drawableWidth,
    reducedTicks.length,
  );

  // layout option 2: see if layout is acceptable with fewer ticks
  const reducedHorizontalLabelHeight = useMemo(
    () =>
      getTextContainerHeight({
        text: longestXLabelDetails.label,
        fontSize,
        containerWidth: reducedTicksDatumXLabelSpace,
      }),
    [fontSize, longestXLabelDetails.label, reducedTicksDatumXLabelSpace],
  );

  const horizontalTicks = needToReduceTicks ? reducedTicks : ticks;

  // determine if we need to go to our last option: making the ticks go diagonal
  const needsDiagonalLabels =
    needToReduceTicks &&
    (reducedTicksDatumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE ||
      reducedTicks.length < MIN_HORIZONTAL_TICKS ||
      reducedHorizontalLabelHeight > MAX_TEXT_BOX_HEIGHT);

  // use a trig utility to determine how long the diagonal labels can be
  const {angledLabelMaxLength, maxDiagonalLabelHeight} = getMaxDiagonalDetails(
    longestXLabelDetails.length,
    estimatedYAxisWidth,
  );

  const diagonalLabelSpacePerDatum = Math.max(
    Math.floor((LINE_HEIGHT * 2) / datumXLabelSpace),
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
}

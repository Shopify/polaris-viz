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
} from '../constants';
import {DataSeries, StringLabelFormatter, NumberLabelFormatter} from '../types';

import {useLinearXScale} from './useLinearXScale';

function getDatumSpace(width: number, numberOfTicks: number) {
  return (width / numberOfTicks) * 0.6 + SPACING_EXTRA_TIGHT;
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

  const initialXScale = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  const ticks =
    initialXScale.xScale == null ? [] : initialXScale.xScale.ticks();

  const longestXLabelDetails = useMemo(() => {
    const xLabels = xAxisLabels.map((label) => formatXAxisLabel(label));
    return getLongestLabelDetails(xLabels, fontSize);
  }, [fontSize, formatXAxisLabel, xAxisLabels]);

  const datumXLabelSpace = getDatumSpace(drawableWidth, ticks.length);

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

  const needToReduceTicks =
    smallLabelGoingMultiline ||
    initialHorizontalLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  const reducedTicks = ticks.filter((_, index) => index % 3 === 0);

  const reducedTicksDatumXLabelSpace = getDatumSpace(
    drawableWidth,
    reducedTicks.length,
  );

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

  const needsDiagonalLabels =
    needToReduceTicks &&
    (reducedTicksDatumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE ||
      reducedTicks.length < MIN_HORIZONTAL_TICKS ||
      reducedHorizontalLabelHeight > MAX_TEXT_BOX_HEIGHT);

  const {angledLabelMaxLength, maxDiagonalLabelHeight} = getMaxDiagonalDetails(
    longestXLabelDetails.length,
    estimatedYAxisWidth,
  );

  const diagonalLabelSpacePerDatum = Math.max(
    Math.floor((LINE_HEIGHT * 2) / datumXLabelSpace),
    2,
  );

  const diagonalTicks = ticks.filter(
    (_, index) => index % Math.abs(diagonalLabelSpacePerDatum) === 0,
  );

  const maxDiagonalLabelLength = Math.min(
    longestXLabelDetails.length,
    angledLabelMaxLength,
  );

  const horizontalLabelHeight = needToReduceTicks
    ? reducedHorizontalLabelHeight
    : initialHorizontalLabelHeight;

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

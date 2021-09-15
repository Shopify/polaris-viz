import {
  BarChartMargin as Margin,
  MAX_TEXT_BOX_HEIGHT,
  MIN_HORIZONTAL_LABEL_SPACE,
  SPACING,
  LABEL_SPACE_MINUS_FIRST_AND_LAST,
  SPACING_EXTRA_TIGHT,
} from 'consts';

import {getTextContainerHeight} from 'utilities/get-text-container-height';
import {getLongestLabelDetails} from 'utilities/get-longest-label-details';
import {getMaxDiagonalDetails} from 'utilities/get-max-diagonal-details';

interface LayoutDetails {
  yAxisLabelWidth: number;
  fontSize: number;
  xLabels: string[];
  width: number;
  innerMargin: number;
  outerMargin: number;
  minimalLabelIndexes?: number[] | null;
}

export function getBarXAxisDetails({
  xLabels,
  yAxisLabelWidth,
  fontSize,
  width,
  innerMargin,
  outerMargin,
  minimalLabelIndexes,
}: LayoutDetails) {
  const labelsToUse =
    minimalLabelIndexes == null
      ? xLabels
      : xLabels.filter((_, index) => minimalLabelIndexes.includes(index));

  if (labelsToUse.length === 0) {
    return {
      maxXLabelHeight: 0,
      maxDiagonalLabelLength: 0,
      needsDiagonalLabels: false,
      maxWidth: 0,
    };
  }

  const drawableWidth = width - yAxisLabelWidth - Margin.Right - SPACING;

  // distance from the start of one bar to the start of the next, same as scaleBand.step();
  // you can see this visualized here: https://observablehq.com/@d3/d3-scaleband
  const step = drawableWidth / (xLabels.length + outerMargin * 2 - innerMargin);

  const spaceForMinimalLabels = minimalLabelIndexes
    ? (drawableWidth / minimalLabelIndexes.length) *
      LABEL_SPACE_MINUS_FIRST_AND_LAST
    : null;

  const spaceBetweenLabels = Math.min(SPACING_EXTRA_TIGHT, step / 2);

  // width each label is allowed to take up
  const datumXLabelSpace =
    spaceForMinimalLabels == null
      ? step - spaceBetweenLabels
      : spaceForMinimalLabels;

  // calculations are based on the longest label
  const longestXLabelDetails = getLongestLabelDetails(labelsToUse, fontSize);

  // how tall the xaxis would be if we use horizontal labels
  const horizontalLabelHeight = getTextContainerHeight({
    text: longestXLabelDetails.label,
    fontSize,
    containerWidth: Math.abs(datumXLabelSpace),
  });

  // use horizontal labels if horizontal labels are too tall, or the column space is too narrow
  const needsDiagonalLabels =
    horizontalLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  // width of all outer padding
  const outerPadding = step * outerMargin * 2;

  // width of all inner padding
  const innerPadding = (xLabels.length - 1) * step * innerMargin;

  // width of single bar
  const barWidth =
    (drawableWidth - outerPadding - innerPadding) / xLabels.length;

  // use COS and pythagorean theorem to determine
  // height that a diagonal label would be cut off at
  const firstBarMidpoint = (outerPadding + barWidth) / 2;
  const distanceToFirstTick = yAxisLabelWidth + firstBarMidpoint;
  const {angledLabelMaxLength, maxDiagonalLabelHeight} = getMaxDiagonalDetails(
    longestXLabelDetails.length,
    distanceToFirstTick,
  );

  // max diagonal length is the length of the longest label, or the length of the cut off
  const maxDiagonalLabelLength = Math.min(
    longestXLabelDetails.length,
    angledLabelMaxLength,
  );

  // max height is determined by whether diagonal labels are used or not
  const maxXLabelHeight = needsDiagonalLabels
    ? maxDiagonalLabelHeight
    : horizontalLabelHeight;

  return {
    maxXLabelHeight,
    maxDiagonalLabelLength,
    needsDiagonalLabels,
    maxWidth: datumXLabelSpace,
  };
}

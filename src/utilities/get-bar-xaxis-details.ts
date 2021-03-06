import {
  MARGIN,
  MAX_TEXT_BOX_HEIGHT,
  MIN_HORIZONTAL_LABEL_SPACE,
} from '../constants';

import {getTextContainerHeight} from './get-text-container-height';
import {getLongestLabelDetails} from './get-longest-label-details';
import {getMaxDiagonalDetails} from './get-max-diagonal-details';

interface LayoutDetails {
  yAxisLabelWidth: number;
  fontSize: number;
  xLabels: string[];
  chartDimensions: DOMRect;
  padding?: number;
}

export function getBarXAxisDetails({
  xLabels,
  yAxisLabelWidth,
  fontSize,
  chartDimensions,
  padding = 0,
}: LayoutDetails) {
  // amount of space for label within individual column of data
  const datumXLabelSpace =
    ((chartDimensions.width - yAxisLabelWidth - MARGIN.Right) *
      (1 - padding / 2)) /
    xLabels.length;

  // calculations are be based on the longest label
  const longestXLabelDetails = getLongestLabelDetails(xLabels, fontSize);

  // how tall the xaxis would be if we use horizontal labels
  const horizontalLabelHeight = getTextContainerHeight({
    text: longestXLabelDetails.label,
    fontSize,
    containerWidth: Math.abs(datumXLabelSpace),
  });

  // use horizontal labels if horixontal labels are too tall, or the column space is too narrow
  const needsDiagonalLabels =
    horizontalLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  // use COS and pythagorean theorem to determine
  // height that a diagonal label would be cut off at
  const firstBarMidpoint = datumXLabelSpace / 2;
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

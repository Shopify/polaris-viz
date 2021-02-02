import {
  MARGIN,
  DIAGONAL_ANGLE,
  SPACING_LOOSE,
  MAX_TEXT_BOX_HEIGHT,
  MIN_HORIZONTAL_LABEL_SPACE,
} from '../constants';

import {degreesToRadians} from './degrees-to-radians';
import {getTextWidth} from './get-text-width';
import {getTextContainerHeight} from './get-text-container-height';
import {RightAngleTriangle} from './RightAngleTriangle';

interface LayoutDetails {
  yAxisLabelWidth: number;
  fontSize: number;
  formatYAxisLabel: (val: number) => string;
  xLabels: string[];
  chartDimensions: DOMRect;
  padding?: number;
}

export function getBarXAxisDetails({
  yAxisLabelWidth,
  fontSize,
  xLabels,
  chartDimensions,
  padding = 0,
}: LayoutDetails) {
  // amount of space for label within individual column of data
  const datumXLabelSpace =
    ((chartDimensions.width - yAxisLabelWidth - MARGIN.Right) *
      (1 - padding / 2)) /
    xLabels.length;

  // calculations are be based on the longest label
  const longestXLabelDetails = xLabels
    .map((label) => {
      return {
        label,
        length: getTextWidth({text: label, fontSize}) + SPACING_LOOSE,
      };
    })
    .reduce((prev, current) => (prev.length > current.length ? prev : current));

  // how tall the xaxis would be if we use horizontal labels
  const horizontalLabelHeight = getTextContainerHeight({
    text: longestXLabelDetails.label,
    fontSize,
    containerWidth: Math.abs(datumXLabelSpace - SPACING_LOOSE),
  });

  // use horizontal labels if horixontal labels are too tall, or the column space is too narrow
  const needsDiagonalLabels =
    horizontalLabelHeight > MAX_TEXT_BOX_HEIGHT ||
    datumXLabelSpace < MIN_HORIZONTAL_LABEL_SPACE;

  // treat angled labels as if they create a right angle triangle with the xaxis
  // use COS to get the height of that triangle
  const longestAngledLabelHeight =
    Math.cos(degreesToRadians(DIAGONAL_ANGLE)) * longestXLabelDetails.length;

  // use COS and pythagorean theorem to determine
  // height that a diagonal label would be cut off at
  const firstBarMidpoint = datumXLabelSpace / 2;
  const distanceToFirstTick = yAxisLabelWidth + firstBarMidpoint;
  const angledLabelMaxLength =
    distanceToFirstTick / Math.cos(degreesToRadians(DIAGONAL_ANGLE));

  const cutOffLabelHeight = new RightAngleTriangle({
    sideA: distanceToFirstTick,
    sideC: angledLabelMaxLength,
  }).getOppositeLength();

  // max diagonal height is the smaller of the longest label's height, or the cut off
  const maxDiagonalLabelHeight = Math.min(
    longestAngledLabelHeight,
    cutOffLabelHeight,
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
  };
}

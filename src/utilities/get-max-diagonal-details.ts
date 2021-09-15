import {DIAGONAL_ANGLE} from 'consts';

import {degreesToRadians} from 'utilities/degrees-to-radians';
import {RightAngleTriangle} from 'utilities/RightAngleTriangle';

export function getMaxDiagonalDetails(
  longestXLabelLength: number,
  distanceToFirstTick: number,
) {
  const longestAngledLabelHeight =
    Math.cos(degreesToRadians(DIAGONAL_ANGLE)) * longestXLabelLength;

  const angledLabelMaxLength =
    distanceToFirstTick / Math.cos(degreesToRadians(DIAGONAL_ANGLE));

  const cutOffLabelHeight = new RightAngleTriangle({
    sideA: distanceToFirstTick,
    sideC: angledLabelMaxLength,
  }).getOppositeLength();

  const maxDiagonalLabelHeight = Math.min(
    longestAngledLabelHeight,
    cutOffLabelHeight,
  );

  return {
    angledLabelMaxLength,
    maxDiagonalLabelHeight,
  };
}

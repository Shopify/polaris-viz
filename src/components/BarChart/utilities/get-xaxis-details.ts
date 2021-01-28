import {Data} from 'types';

import {
  getTextWidth,
  getTextContainerHeight,
  getLongestLabelDetails,
  getMaxDiagonalDetails,
} from '../../../utilities';
import {MARGIN, SPACING_LOOSE, SPACING_TIGHT} from '../constants';
import {
  MIN_HORIZONTAL_LABEL_SPACE,
  MAX_TEXT_BOX_HEIGHT,
} from '../../../constants';

export function getXAxisDetails({
  data,
  fontSize,
  formatYAxisLabel,
  formatXAxisLabel,
  chartDimensions,
}: {
  data: Data[];
  fontSize: number;
  formatYAxisLabel: (val: number) => string;
  formatXAxisLabel: (val: string) => string;
  chartDimensions: DOMRect;
}) {
  // for the purposes of the xaxis, estimate amount of space yaxis will take up
  // at this point we do not have yscale info to use
  const approxLongestYLabel = Math.max(
    ...data.map(({rawValue}) =>
      getTextWidth({text: formatYAxisLabel(rawValue), fontSize}),
    ),
  );
  const estimatedYAxisWidth = SPACING_TIGHT + approxLongestYLabel;

  // amount of space for label within individual column of data
  const datumXLabelSpace =
    (chartDimensions.width - estimatedYAxisWidth - MARGIN.Right) / data.length;

  // calculations are be based on the longest label
  const xLabels = data.map(({label}) => formatXAxisLabel(label));
  const longestXLabelDetails = getLongestLabelDetails(xLabels, fontSize);

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

  const firstBarMidpoint = datumXLabelSpace / 2;
  const distanceToFirstTick = estimatedYAxisWidth + firstBarMidpoint;
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
  };
}

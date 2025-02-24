import type {LabelFormatter} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import {useHorizontalTicksAndScale} from './useHorizontalTicksAndScale';

interface Props {
  allNumbers: number[];
  isStacked: boolean;
  maxWidth: number;
  stackedMax: number;
  stackedMin: number;
  labelFormatter: LabelFormatter;
  longestLabel: {positive: number; negative: number};
  isSimple: boolean;
}

export function useHorizontalXScale({
  allNumbers,
  isStacked,
  labelFormatter,
  maxWidth,
  stackedMax = 0,
  stackedMin = 0,
  longestLabel,
  isSimple,
}: Props) {
  const selectedTheme = useTheme();

  const hideGroupLabel = selectedTheme.groupLabel.hide;
  const shouldRenderLabels = isSimple || !hideGroupLabel;

  let drawableWidth = shouldRenderLabels
    ? maxWidth - longestLabel.negative - longestLabel.positive
    : maxWidth;
  let chartXPosition = 0;

  const labelWidth = shouldRenderLabels
    ? longestLabel.positive + longestLabel.negative
    : 0;

  drawableWidth -= labelWidth;
  chartXPosition += labelWidth / 2;

  const {xScale, ticks, ticksFormatted} = useHorizontalTicksAndScale({
    maxWidth: drawableWidth,
    allNumbers,
    labelFormatter,
    isStacked,
    stackedMin,
    stackedMax,
  });

  return {
    xScale,
    ticks,
    ticksFormatted,
    drawableWidth,
    chartXPosition,
  };
}

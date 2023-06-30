import type {LabelFormatter} from '@shopify/polaris-viz-core';

import {useHorizontalTicksAndScale} from './useHorizontalTicksAndScale';

interface Props {
  allNumbers: number[];
  isStacked: boolean;
  maxWidth: number;
  stackedMax: number;
  stackedMin: number;
  labelFormatter: LabelFormatter;
  longestLabel: {positive: number; negative: number};
}

export function useHorizontalXScale({
  allNumbers,
  isStacked,
  labelFormatter,
  maxWidth,
  stackedMax = 0,
  stackedMin = 0,
  longestLabel,
}: Props) {
  let drawableWidth = maxWidth;
  let chartXPosition = 0;

  const labelWidth = longestLabel.positive + longestLabel.negative;

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

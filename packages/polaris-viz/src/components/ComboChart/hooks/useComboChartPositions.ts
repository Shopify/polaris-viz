import {
  LINE_HEIGHT,
  useTheme,
  Y_AXIS_CHART_SPACING,
} from '@shopify/polaris-viz-core';

import type {Axis} from '../types';

interface Props {
  leftTickWidth: number;
  primaryAxis: Axis;
  rightTickWidth: number;
  secondaryAxis: Axis;
  width: number;
}

export function useComboChartPostions({
  leftTickWidth,
  primaryAxis,
  rightTickWidth,
  secondaryAxis,
  width,
}: Props) {
  const selectedTheme = useTheme();

  const horizontalMargin = selectedTheme.grid.horizontalMargin;

  const primaryLabelWidth = primaryAxis.name == null ? 0 : LINE_HEIGHT * 2;
  const secondaryLabelWidth = secondaryAxis.name == null ? 0 : LINE_HEIGHT;

  const leftTotalWidth =
    primaryLabelWidth + leftTickWidth + Y_AXIS_CHART_SPACING;
  const rightTotalWidth =
    Y_AXIS_CHART_SPACING + rightTickWidth + secondaryLabelWidth;

  const primaryLabelXPosition = horizontalMargin;
  const leftYAxisXPosition = primaryLabelXPosition + primaryLabelWidth;

  const chartXPosition = horizontalMargin + leftTotalWidth;
  const drawableWidth =
    width -
    chartXPosition -
    rightTotalWidth -
    horizontalMargin -
    secondaryLabelWidth;

  const rightAxisXPosition =
    chartXPosition + drawableWidth + Y_AXIS_CHART_SPACING;
  const secondaryLabelXPosition =
    rightAxisXPosition + rightTickWidth + secondaryLabelWidth;

  return {
    chartXPosition,
    drawableWidth,
    leftAxis: {
      x: leftYAxisXPosition,
      labelX: primaryLabelXPosition,
    },
    rightAxis: {
      x: rightAxisXPosition,
      labelX: secondaryLabelXPosition,
    },
  };
}

import {
  ChartMargin,
  LABEL_AREA_TOP_SPACING,
  Y_AXIS_CHART_SPACING,
  Y_AXIS_BOTTOM_SPACING,
} from '../constants';

import {useTheme} from './useTheme';

export interface Props {
  annotationsHeight: number;
  height: number;
  width: number;
  xAxisHeight: number;
  yAxisWidth: number;
}

export function useChartPositions({
  annotationsHeight,
  height,
  width,
  xAxisHeight,
  yAxisWidth,
}: Props) {
  const {
    grid: {horizontalMargin},
  } = useTheme();

  const chartXPosition = horizontalMargin + yAxisWidth + Y_AXIS_CHART_SPACING;
  const chartYPosition = (ChartMargin.Top as number) + annotationsHeight;

  const topLabelSpacing =
    xAxisHeight === 0 ? Y_AXIS_BOTTOM_SPACING : LABEL_AREA_TOP_SPACING;

  const drawableHeight =
    height - chartYPosition - xAxisHeight - topLabelSpacing;

  const drawableWidth = width - chartXPosition - horizontalMargin;

  return {
    chartXPosition,
    chartYPosition,
    drawableHeight,
    drawableWidth,
    xAxisBounds: {
      x: chartXPosition,
      y: drawableHeight + topLabelSpacing + chartYPosition,
    },
    yAxisBounds: {
      x: horizontalMargin,
      y: chartYPosition,
    },
  };
}

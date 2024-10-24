import {
  ChartMargin,
  LABEL_AREA_TOP_SPACING,
  Y_AXIS_CHART_SPACING,
  LABEL_AREA_MIN_SPACING,
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

  const xAxisLabelSpacing =
    xAxisHeight === 0 ? LABEL_AREA_MIN_SPACING : LABEL_AREA_TOP_SPACING;

  const drawableHeight =
    height - chartYPosition - xAxisHeight - xAxisLabelSpacing;

  const drawableWidth = width - chartXPosition - horizontalMargin;

  return {
    chartXPosition,
    chartYPosition,
    drawableHeight,
    drawableWidth,
    xAxisBounds: {
      x: chartXPosition,
      y: drawableHeight + xAxisLabelSpacing + chartYPosition,
    },
    yAxisBounds: {
      x: horizontalMargin,
      y: chartYPosition,
    },
  };
}

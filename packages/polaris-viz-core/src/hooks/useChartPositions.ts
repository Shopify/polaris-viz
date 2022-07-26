import {
  ChartMargin,
  LABEL_AREA_TOP_SPACING,
  Y_AXIS_CHART_SPACING,
} from '../constants';

import {useTheme} from './useTheme';

interface Props {
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

  const drawableHeight =
    height - chartYPosition - xAxisHeight - LABEL_AREA_TOP_SPACING;
  const drawableWidth = width - chartXPosition - horizontalMargin;

  return {
    chartXPosition,
    chartYPosition,
    drawableHeight,
    drawableWidth,
    xAxisBounds: {
      x: chartXPosition,
      y: drawableHeight + LABEL_AREA_TOP_SPACING + chartYPosition,
    },
    yAxisBounds: {
      x: horizontalMargin,
      y: chartYPosition,
    },
  };
}

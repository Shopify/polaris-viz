import type {Axis} from '../types';

interface Props {
  drawableHeight: number;
  primaryAxis: Axis;
  shouldPlaceZeroInMiddleOfChart: boolean;
}

export function getInitialYScaleValues({
  drawableHeight,
  primaryAxis,
  shouldPlaceZeroInMiddleOfChart,
}: Props) {
  if (shouldPlaceZeroInMiddleOfChart) {
    return {
      drawableHeight,
      max: primaryAxis.max,
      min: -primaryAxis.max,
    };
  }

  return {
    drawableHeight,
    max: primaryAxis.max,
    min: primaryAxis.min,
  };
}

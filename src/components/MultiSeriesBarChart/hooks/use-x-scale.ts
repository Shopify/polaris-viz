import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';

export function useXScale({
  drawableWidth,
  data,
  labels,
  barMargin,
}: {
  drawableWidth: number;
  data: number[][];
  labels: string[];
  barMargin: number;
}) {
  const xScale = scaleBand()
    .range([0, drawableWidth])
    .paddingInner(barMargin)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return labels.map((label, index) => {
      const barXPosition = xScale(index.toString());
      const xOffset =
        barXPosition == null ? barWidthOffset : barWidthOffset + barXPosition;

      return {
        value: label,
        xOffset,
      };
    });
  }, [labels, xScale, barWidthOffset]);

  return {xScale, xAxisLabels};
}

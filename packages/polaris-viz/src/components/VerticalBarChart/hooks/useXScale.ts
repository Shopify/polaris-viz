import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';

export function useXScale({
  drawableWidth,
  data,
  labels,
  innerMargin,
  outerMargin,
}: {
  drawableWidth: number;
  data: number[][];
  labels: string[];
  innerMargin: number;
  outerMargin: number;
}) {
  const xScale = scaleBand()
    .range([0, drawableWidth])
    .paddingInner(innerMargin)
    .paddingOuter(outerMargin)
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

  const gapWidth = useMemo(() => {
    return xScale.step() - xScale.bandwidth();
  }, [xScale]);

  return {xScale, xAxisLabels, gapWidth};
}

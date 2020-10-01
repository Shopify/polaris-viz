import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';

export function useXScale({
  drawableWidth,
  data,
  labels,
}: {
  drawableWidth: number;
  data: number[][];
  labels: string[];
}) {
  const xScale = scaleBand()
    .rangeRound([0, drawableWidth])
    .paddingInner(0.3)
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

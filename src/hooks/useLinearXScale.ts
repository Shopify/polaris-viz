import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

export function useLinearXScale({
  drawableWidth,
  longestSeriesLength,
}: {
  drawableWidth: number;
  longestSeriesLength: number;
}) {
  const xScale = useMemo(() => {
    return scaleLinear()
      .range([0, drawableWidth])
      .domain([0, longestSeriesLength]);
  }, [drawableWidth, longestSeriesLength]);

  return {xScale};
}

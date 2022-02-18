import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

export function useLinearXScale({
  drawableWidth,
  longestSeriesLength,
}: {
  drawableWidth: number | null;
  longestSeriesLength: number;
}) {
  const xScale = useMemo(() => {
    if (drawableWidth == null) {
      return null;
    }

    return scaleLinear()
      .range([0, drawableWidth])
      .domain([0, longestSeriesLength]);
  }, [drawableWidth, longestSeriesLength]);

  return {xScale};
}

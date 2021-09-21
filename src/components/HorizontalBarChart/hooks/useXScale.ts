import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {useMemo} from 'react';

export function useXScale({
  allNumbers,
  isStacked,
  maxWidth,
  seriesLength,
}: {
  allNumbers: number[];
  isStacked: boolean;
  maxWidth: number;
  seriesLength: number;
}) {
  const xScale = useMemo(() => {
    return scaleLinear()
      .range([0, maxWidth])
      .domain(extent([0, ...allNumbers], (num) => num) as [number, number])
      .nice();
  }, [maxWidth, allNumbers]);

  const ticks = useMemo(() => {
    return xScale.ticks();
  }, [xScale]);

  const xScaleStacked = useMemo(() => {
    if (!isStacked) {
      return null;
    }

    return scaleLinear()
      .domain([0, ticks[ticks.length - 1]])
      .range([0, maxWidth / seriesLength]);
  }, [isStacked, maxWidth, seriesLength, ticks]);

  return {xScale, xScaleStacked, ticks};
}

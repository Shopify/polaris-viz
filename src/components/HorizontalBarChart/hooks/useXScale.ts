import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {useMemo} from 'react';

export function useXScale({
  allNumbers,
  highestSumForStackedGroup,
  isStacked,
  longestSeriesCount,
  maxWidth,
}: {
  allNumbers: number[];
  highestSumForStackedGroup: number;
  isStacked: boolean;
  longestSeriesCount: number;
  maxWidth: number;
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
      .range([0, maxWidth / longestSeriesCount]);
  }, [isStacked, maxWidth, longestSeriesCount, ticks]);

  const ticksStacked = useMemo(() => {
    if (!isStacked) {
      return [];
    }

    return scaleLinear().domain([0, highestSumForStackedGroup]).nice().ticks();
  }, [highestSumForStackedGroup, isStacked]);

  return {xScale, xScaleStacked, ticks, ticksStacked};
}

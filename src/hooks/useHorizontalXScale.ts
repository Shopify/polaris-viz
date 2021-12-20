import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {useMemo} from 'react';

import {clamp} from '../utilities';

const MIN_Y_LABEL_SPACE = 80;
const MAX_TICKS = 12;
const MIN_TICKS = 3;

export function useHorizontalXScale({
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
    const maxTicks = clamp({
      amount: Math.max(1, Math.floor(maxWidth / MIN_Y_LABEL_SPACE)),
      min: MIN_TICKS,
      max: MAX_TICKS,
    });

    return xScale.ticks(maxTicks);
  }, [xScale, maxWidth]);

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

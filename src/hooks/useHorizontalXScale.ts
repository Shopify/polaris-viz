import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {useMemo} from 'react';

import {clamp} from '../utilities';

const MIN_Y_LABEL_SPACE = 80;
const MAX_TICKS = 12;
const MIN_TICKS = 3;

export function useHorizontalXScale({
  allNumbers,
  isStacked,
  maxWidth,
  stackedMax = 0,
  stackedMin = 0,
}: {
  allNumbers: number[];
  isStacked: boolean;
  maxWidth: number;
  stackedMax: number;
  stackedMin: number;
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

    const xScale = scaleLinear()
      .range([0, maxWidth])
      .domain([stackedMin, stackedMax])
      .nice();

    return xScale;
  }, [isStacked, maxWidth, stackedMin, stackedMax]);

  const ticksStacked = useMemo(() => {
    if (!isStacked || !xScaleStacked) {
      return null;
    }

    return xScaleStacked.ticks();
  }, [isStacked, xScaleStacked]);

  return {
    xScale: isStacked ? xScaleStacked! : xScale,
    ticks: isStacked ? ticksStacked! : ticks,
  };
}

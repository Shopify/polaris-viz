import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {useMemo} from 'react';

import type {LabelFormatter} from '../types';

interface Props {
  allNumbers: number[];
  isStacked: boolean;
  labelFormatter: LabelFormatter;
  maxWidth: number;
  stackedMax: number;
  stackedMin: number;
}

export function useHorizontalTicksAndScale({
  maxWidth,
  allNumbers,
  labelFormatter,
  isStacked,
  stackedMin,
  stackedMax,
}: Props) {
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

    const xScale = scaleLinear()
      .range([0, maxWidth])
      .domain([stackedMin, stackedMax])
      .nice();

    return xScale;
  }, [isStacked, maxWidth, stackedMin, stackedMax]);

  const ticksStacked = useMemo(() => {
    if (!isStacked || !xScaleStacked) {
      return [];
    }

    return xScaleStacked.ticks();
  }, [isStacked, xScaleStacked]);

  const finalTicks = isStacked ? ticksStacked! : ticks;

  return {
    ticks: finalTicks,
    xScale: isStacked ? xScaleStacked! : xScale,
    ticksFormatted: finalTicks.map((tick) => `${labelFormatter(tick)}`),
  };
}

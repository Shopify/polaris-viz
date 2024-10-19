import {scaleLinear} from 'd3-scale';

import type {DataSeries} from '../types';

export function useSparkLine({
  data,
  height,
  svgMargin = 2,
}: {
  data: DataSeries[];
  height: number;
  svgMargin?: number;
}) {
  const dataLengths = data.map((series) => series.data.length - 1);

  const maxDataLength = Math.max(...dataLengths);

  const yValues = Array.prototype.concat.apply(
    [],
    data.map(({data}) => data.map(({value}) => value)),
  );

  const minYValues = yValues.length ? Math.min(...yValues) : 0;
  const maxYValues = yValues.length ? Math.max(...yValues) : 0;

  if (!Number.isFinite(minYValues) || !Number.isFinite(maxYValues)) {
    throw new Error('Data must be finite');
  }

  const rangeStart = height - svgMargin;
  let rangeEnd = svgMargin;

  if (minYValues === 0 && maxYValues === 0) {
    rangeEnd = rangeStart;
  }

  const yScale = scaleLinear()
    .range([rangeStart, rangeEnd])
    .domain([minYValues, maxYValues]);

  return {
    minXDomain: 0,
    maxXDomain: maxDataLength,
    yScale,
  };
}

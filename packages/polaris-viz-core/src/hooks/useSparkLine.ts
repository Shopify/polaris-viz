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

  const minYValue = yValues.length ? Math.min(...yValues) : 0;
  const maxYValue = yValues.length ? Math.max(...yValues) : 0;

  if (!Number.isFinite(minYValue) || !Number.isFinite(maxYValue)) {
    throw new Error('Data must be finite');
  }

  const rangeStart = height - svgMargin;
  let rangeEnd = svgMargin;

  if (minYValue === 0 && maxYValue === 0) {
    rangeEnd = rangeStart;
  }

  const yScale = scaleLinear()
    .range([rangeStart, rangeEnd])
    .domain([minYValue, maxYValue]);

  return {
    minXDomain: 0,
    maxXDomain: maxDataLength,
    yScale,
  };
}

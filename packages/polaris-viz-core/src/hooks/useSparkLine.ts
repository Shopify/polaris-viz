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

  const yScale = scaleLinear()
    .range([height - svgMargin, svgMargin])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

  return {
    minXDomain: 0,
    maxXDomain: maxDataLength,
    yScale,
  };
}

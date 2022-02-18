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
  const dataLenghts = data.map((series) => series.data.length);

  const maxDataLength = Math.max(...dataLenghts);

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

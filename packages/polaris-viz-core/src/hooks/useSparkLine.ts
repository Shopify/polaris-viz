import {scaleLinear} from 'd3-scale';

export function useSparkLine({data, height, svgMargin = 2}) {
  const xValues = Array.prototype.concat.apply(
    [],
    data.map(({data}) => data.map(({key}) => key)),
  );

  const minXValues = Math.min(...xValues);
  const maxXValues = Math.max(...xValues);

  const yValues = Array.prototype.concat.apply(
    [],
    data.map(({data}) => data.map(({value}) => value)),
  );

  const yScale = scaleLinear()
    .range([height - svgMargin, svgMargin])
    .domain([Math.min(...yValues), Math.max(...yValues)]);

  return {
    minXValues,
    maxXValues,
    yScale,
  };
}

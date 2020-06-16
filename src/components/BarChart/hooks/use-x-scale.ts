import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';
import {BarData} from '../types';
import {wrapLabel} from '../../../utilities';

export function useXScale({
  drawableWidth,
  histogram,
  data,
}: {
  drawableWidth: number;
  histogram?: boolean;
  data: BarData[];
}) {
  const xScale = scaleBand()
    .rangeRound([0, drawableWidth])
    .padding(histogram ? 0 : 0.1)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return data.map(({label}, index) => {
      const pointOffset = xScale(index.toString());
      const xOffset =
        pointOffset == null ? barWidthOffset : barWidthOffset + pointOffset;

      return {
        value: wrapLabel(label, xScale.bandwidth()),
        xOffset,
      };
    });
  }, [xScale, data]);

  return {xScale, xAxisLabels};
}

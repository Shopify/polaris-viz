import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';

import {BarData} from '../types';
import {wrapLabel} from '../../../utilities';

export function useXScale({
  drawableWidth,
  histogram,
  data,
  fontSize,
}: {
  drawableWidth: number;
  histogram?: boolean;
  data: BarData[];
  fontSize: number;
}) {
  const xScale = scaleBand()
    .rangeRound([0, drawableWidth])
    .padding(histogram ? 0 : 0.1)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return data.map(({label}, index) => {
      const barXPosition = xScale(index.toString());
      const xOffset =
        barXPosition == null ? barWidthOffset : barWidthOffset + barXPosition;

      return {
        value: wrapLabel({
          label,
          maxWidth: xScale.bandwidth(),
          fontSize,
        }),
        xOffset,
      };
    });
  }, [data, xScale, barWidthOffset]);

  return {xScale, xAxisLabels};
}

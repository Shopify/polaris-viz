import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';

import {BarData} from '../types';

export function useXScale({
  drawableWidth,
  barMargin,
  data,
  formatXAxisLabel,
}: {
  drawableWidth: number;
  barMargin: number;
  data: BarData[];
  formatXAxisLabel: (value: string, index: number) => string;
}) {
  const xScale = scaleBand()
    .rangeRound([0, drawableWidth])
    .paddingInner(barMargin)
    .domain(data.map((_, index) => index.toString()));

  const barWidthOffset = xScale.bandwidth() / 2;

  const xAxisLabels = useMemo(() => {
    return data.map(({label}, index) => {
      const barXPosition = xScale(index.toString());
      const xOffset =
        barXPosition == null ? barWidthOffset : barWidthOffset + barXPosition;

      return {
        value: formatXAxisLabel(label, index),
        xOffset,
      };
    });
  }, [data, xScale, barWidthOffset, formatXAxisLabel]);

  return {xScale, xAxisLabels};
}

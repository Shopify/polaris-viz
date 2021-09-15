import {useMemo} from 'react';
import {scaleBand} from 'd3-scale';
import type {Data} from 'types';

import type {StringLabelFormatter} from 'types';

export function useXScale({
  drawableWidth,
  innerMargin,
  outerMargin,
  data,
  formatXAxisLabel,
}: {
  drawableWidth: number;
  innerMargin: number;
  outerMargin: number;
  data: Data[];
  formatXAxisLabel: StringLabelFormatter;
}) {
  const xScale = useMemo(() => {
    return scaleBand()
      .range([0, drawableWidth])
      .paddingInner(innerMargin)
      .paddingOuter(outerMargin)
      .domain(data.map((_, index) => index.toString()));
  }, [drawableWidth, innerMargin, outerMargin, data]);

  const xAxisLabels = useMemo(() => {
    const barWidthOffset = xScale.bandwidth() / 2;

    const labels = data.map(({label}) => label);

    return data.map(({label}, index) => {
      const barXPosition = xScale(index.toString());
      const xOffset =
        barXPosition == null ? barWidthOffset : barWidthOffset + barXPosition;

      return {
        value: formatXAxisLabel(label, index, labels),
        xOffset,
      };
    });
  }, [data, xScale, formatXAxisLabel]);

  return {xScale, xAxisLabels};
}

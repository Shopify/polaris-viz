import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {BarData} from '../types';
import {wrapLabel} from '../../../utilities';

export function useHistogramXScale({
  drawableWidth,
  data,
  fontSize,
  formatXAxisLabel,
  startingHistogramValue,
}: {
  drawableWidth: number;
  startingHistogramValue: string;
  data: BarData[];
  fontSize: number;
  formatXAxisLabel(value: string, index: number): string;
}) {
  const modifiedData = [
    startingHistogramValue,
    ...data.map(({label}) => label),
  ];

  const xScale = scaleLinear()
    .rangeRound([0, drawableWidth])
    .domain([0, data.length]);

  const bandwidth = xScale(1) - xScale(0);

  const xAxisLabels = useMemo(() => {
    return modifiedData.map((label, index) => {
      const barXPosition = xScale(index);
      const xOffset = barXPosition == null ? 0 : barXPosition;

      return {
        value: wrapLabel({
          label: formatXAxisLabel(label, index),
          maxWidth: bandwidth,
          fontSize,
        }),
        xOffset,
      };
    });
  }, [data, xScale, formatXAxisLabel, fontSize]);

  return {
    xScale,
    xAxisLabels,
    bandwidth,
    step: bandwidth,
    range: xScale.range(),
  };
}

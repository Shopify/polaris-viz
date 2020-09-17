import {MIN_Y_LABEL_SPACE} from 'consts';
import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {BarData} from '../types';

export function useYScale({
  drawableHeight,
  data,
  formatYValue,
}: {
  drawableHeight: number;
  data: BarData[];
  formatYValue(value: number): string;
}) {
  const {yScale, ticks} = useMemo(() => {
    const min = Math.min(...data.map(({rawValue}) => rawValue), 0);
    const max = Math.max(...data.map(({rawValue}) => rawValue));

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([min, max])
      .nice(maxTicks);

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYValue(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [drawableHeight, data, formatYValue]);

  return {yScale, ticks};
}

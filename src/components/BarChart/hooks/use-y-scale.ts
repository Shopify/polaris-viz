import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {BarData} from '../types';

export const MIN_Y_LABEL_SPACE = 80;

export function useYScale({
  drawableHeight,
  data,
  formatValue,
}: {
  drawableHeight: number;
  data: BarData[];
  formatValue(value: number): string;
}) {
  const {yScale, ticks} = useMemo(() => {
    const min = Math.min(...data.map(({rawValue}) => rawValue), 0);
    const max = Math.max(...data.map(({rawValue}) => rawValue));

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([min, max]);

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatValue(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [drawableHeight, data, formatValue]);

  return {yScale, ticks};
}

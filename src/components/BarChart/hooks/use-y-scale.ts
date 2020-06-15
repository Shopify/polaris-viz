import {useMemo, useEffect, useState} from 'react';
import {scaleLinear} from 'd3-scale';
import {BarData} from '../types';

export const MIN_Y_LABEL_SPACE = 80;
export const SPACING_TIGHT = 8;

export function useYScale({
  drawableHeight,
  data,
  formatValue,
}: {
  drawableHeight: number;
  data: BarData[];
  formatValue(value: number): string;
}) {
  const [maxTickLength, setMaxTickLength] = useState<number>();

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

  useEffect(() => {
    let currentMaxTickLength = 0;

    const tick = document.createElement('p');
    tick.style.fontSize = '12px';
    tick.style.display = 'inline-block';
    tick.style.visibility = 'hidden';
    document.body.appendChild(tick);

    ticks.forEach(({formattedValue}) => {
      tick.innerText = formattedValue;

      currentMaxTickLength = Math.max(currentMaxTickLength, tick.clientWidth);
    });

    document.body.removeChild(tick);

    setMaxTickLength(currentMaxTickLength);
  }, [ticks, maxTickLength]);

  const axisMargin = maxTickLength == null ? 0 : maxTickLength + SPACING_TIGHT;

  return {yScale, ticks, axisMargin};
}

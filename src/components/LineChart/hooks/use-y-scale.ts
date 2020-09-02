import {useMemo, useEffect, useState} from 'react';
import {scaleLinear} from 'd3-scale';
import {SPACING_LOOSE} from 'components/constants';

import {yAxisMinMax} from '../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {Series} from '../types';

export function useYScale({
  drawableHeight,
  series,
  formatYAxisValue,
}: {
  drawableHeight: number;
  series: Series[];
  formatYAxisValue(value: number): string;
}) {
  const [maxTickLength, setMaxTickLength] = useState<number>();

  const {yScale, ticks} = useMemo(() => {
    const [minY, maxY] = yAxisMinMax(series);

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, minY), maxY])
      .nice(maxTicks);

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYAxisValue(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [drawableHeight, series, formatYAxisValue]);

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

  const axisMargin =
    maxTickLength == null ? null : maxTickLength + SPACING_LOOSE;

  return {yScale, ticks, axisMargin};
}

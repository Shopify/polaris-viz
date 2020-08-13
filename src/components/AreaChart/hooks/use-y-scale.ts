import {useMemo, useEffect, useState} from 'react';
import {scaleLinear} from 'd3-scale';
import {Series} from 'd3-shape';

import {
  MIN_Y_LABEL_SPACE,
  SPACING_LOOSE,
  SPACING_EXTRA_TIGHT,
} from '../constants';

export function useYScale({
  drawableHeight,
  stackedValues,
  formatYAxisValue,
}: {
  drawableHeight: number;
  stackedValues: Series<
    {
      [key: string]: number;
    },
    string
  >[];
  formatYAxisValue(value: number): string;
}) {
  const [maxTickLength, setMaxTickLength] = useState<number>();

  const {yScale, ticks} = useMemo(() => {
    const minY = Math.min(
      ...stackedValues[0].map((pathPoints) => pathPoints[0]),
    );

    const maxY = Math.max(
      ...stackedValues[stackedValues.length - 1].map(
        (pathPoints) => pathPoints[1],
      ),
    );

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
  }, [drawableHeight, stackedValues, formatYAxisValue]);

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
    maxTickLength == null
      ? null
      : maxTickLength + SPACING_LOOSE + SPACING_EXTRA_TIGHT;

  return {yScale, ticks, axisMargin};
}

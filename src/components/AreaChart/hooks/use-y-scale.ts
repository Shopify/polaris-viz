import {useMemo, useEffect, useState} from 'react';
import {scaleLinear} from 'd3-scale';
import {Series} from 'd3-shape';

import {
  MIN_Y_LABEL_SPACE,
  SPACING_LOOSE,
  SPACING_EXTRA_TIGHT,
} from '../constants';
import {getTextWidth} from 'utilities';

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

  const {yScale, ticks, axisMargin} = useMemo(() => {
    const minY = Math.min(
      ...stackedValues.map((value) =>
        Math.min(...value.map(([startingValue]) => startingValue)),
      ),
    );

    const maxY = Math.max(
      ...stackedValues.map((value) =>
        Math.max(...value.map(([, endingValue]) => endingValue)),
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

    const axisMargin =
      maxTickLength == null
        ? null
        : maxTickLength + SPACING_LOOSE + SPACING_EXTRA_TIGHT;

    return {yScale, ticks, axisMargin};
  }, [formatYAxisValue, drawableHeight, stackedValues, maxTickLength]);

  useEffect(() => {
    let currentMaxTickLength = 0;

    ticks.forEach(({formattedValue}) => {
      const width = getTextWidth({fontSize: 12, text: formattedValue});
      currentMaxTickLength = Math.max(currentMaxTickLength, width);
    });

    setMaxTickLength(currentMaxTickLength);
  }, [ticks, maxTickLength]);

  return {yScale, ticks, axisMargin};
}

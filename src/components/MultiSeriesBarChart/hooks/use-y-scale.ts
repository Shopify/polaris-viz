import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {Data, StackSeries} from '../types';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {getMinMax} from '../utilities';

export function useYScale({
  drawableHeight,
  data,
  formatYValue,
  stackedValues,
}: {
  drawableHeight: number;
  data: Data[];
  formatYValue(value: number): string;
  stackedValues: StackSeries[] | null;
}) {
  const {yScale, ticks} = useMemo(() => {
    const {min, max} = getMinMax(stackedValues, data);

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
  }, [data, drawableHeight, formatYValue, stackedValues]);

  return {yScale, ticks};
}

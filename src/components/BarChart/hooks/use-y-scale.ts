import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {BarData} from '../types';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
}: {
  drawableHeight: number;
  data: BarData[];
  formatYAxisLabel: NumberLabelFormatter;
}) {
  const {yScale, ticks} = useMemo(() => {
    const min = Math.floor(Math.min(...data.map(({rawValue}) => rawValue), 0));
    const max = Math.ceil(Math.max(...data.map(({rawValue}) => rawValue)));

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([min, max])
      .nice(maxTicks);

    const ticks = yScale
      .ticks(maxTicks)
      .filter((tick) => Number.isInteger(tick))
      .map((value) => ({
        value,
        formattedValue: formatYAxisLabel(value),
        yOffset: yScale(value),
      }));

    return {yScale, ticks};
  }, [drawableHeight, data, formatYAxisLabel]);

  return {yScale, ticks};
}

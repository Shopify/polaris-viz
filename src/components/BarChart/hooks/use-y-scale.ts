import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {Data} from 'types';

import {MIN_Y_LABEL_SPACE} from '../constants';
import {DEFAULT_MAX_Y} from '../../../constants';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
}: {
  drawableHeight: number;
  data: Data[];
  formatYAxisLabel: NumberLabelFormatter;
}) {
  const {yScale, ticks} = useMemo(() => {
    const min = Math.min(...data.map(({rawValue}) => rawValue), 0);

    const calculatedMax =
      data.length === 0 ? 0 : Math.max(...data.map(({rawValue}) => rawValue));

    const max =
      calculatedMax === 0 && min === 0
        ? DEFAULT_MAX_Y
        : Math.max(calculatedMax, 0);

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
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [drawableHeight, data, formatYAxisLabel]);

  return {yScale, ticks};
}

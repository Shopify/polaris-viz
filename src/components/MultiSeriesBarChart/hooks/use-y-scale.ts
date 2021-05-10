import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {shouldRoundScaleUp} from '../../../utilities';
import {Series, StackSeries} from '../types';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {getMinMax} from '../utilities';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
  stackedValues,
}: {
  drawableHeight: number;
  data: Series[];
  formatYAxisLabel: NumberLabelFormatter;
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
      .domain([min, max]);

    if (shouldRoundScaleUp({yScale, maxValue: max, maxTicks})) {
      yScale.nice(maxTicks);
    }

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [data, drawableHeight, formatYAxisLabel, stackedValues]);

  return {yScale, ticks};
}

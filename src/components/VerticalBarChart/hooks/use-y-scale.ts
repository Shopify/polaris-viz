import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {shouldRoundScaleUp, getStackedMinMax} from '../../../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import type {
  DataSeries,
  NumberLabelFormatter,
  StackedSeries,
} from '../../../types';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
  stackedValues,
  integersOnly,
}: {
  drawableHeight: number;
  data: DataSeries[];
  formatYAxisLabel: NumberLabelFormatter;
  stackedValues: StackedSeries[] | null;
  integersOnly: boolean;
}) {
  const {yScale, ticks} = useMemo(() => {
    const {min, max} = getStackedMinMax({stackedValues, data, integersOnly});

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear().range([drawableHeight, 0]).domain([min, max]);

    if (shouldRoundScaleUp({yScale, maxValue: max, maxTicks})) {
      yScale.nice(maxTicks);
    } else {
      const roundedDownMin = yScale.copy().nice(maxTicks).ticks(maxTicks)[0];

      yScale.domain([Math.min(roundedDownMin, min), max]);
    }

    const filteredTicks = integersOnly
      ? yScale.ticks(maxTicks).filter((tick) => Number.isInteger(tick))
      : yScale.ticks(maxTicks);

    const ticks = filteredTicks.map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    return {yScale, ticks};
  }, [data, drawableHeight, formatYAxisLabel, integersOnly, stackedValues]);

  return {yScale, ticks};
}

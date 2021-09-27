import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import type {Data} from 'types';

import {shouldRoundScaleUp} from '../../../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {DEFAULT_MAX_Y} from '../../../constants';
import type {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
  integersOnly,
}: {
  drawableHeight: number;
  data: Data[];
  formatYAxisLabel: NumberLabelFormatter;
  integersOnly: boolean;
}) {
  const {yScale, ticks} = useMemo(() => {
    const minY = Math.min(...data.map(({rawValue}) => rawValue), 0);

    const calculatedMax =
      data.length === 0 ? 0 : Math.max(...data.map(({rawValue}) => rawValue));

    const maxY =
      calculatedMax === 0 && minY === 0
        ? DEFAULT_MAX_Y
        : Math.max(calculatedMax, 0);

    const min = integersOnly ? Math.floor(minY) : minY;
    const max = integersOnly ? Math.ceil(maxY) : maxY;

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
  }, [data, integersOnly, drawableHeight, formatYAxisLabel]);

  return {yScale, ticks};
}

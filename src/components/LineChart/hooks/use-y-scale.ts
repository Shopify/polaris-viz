import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {getTextWidth, shouldRoundScaleUp} from '../../../utilities';
import {yAxisMinMax} from '../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {Series} from '../types';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  series,
  formatYAxisLabel,
  fontSize,
  integersOnly,
}: {
  fontSize: number;
  drawableHeight: number;
  series: Series[];
  formatYAxisLabel: NumberLabelFormatter;
  integersOnly: boolean;
}) {
  const {yScale, ticks, axisMargin} = useMemo(() => {
    const [minY, maxY] = yAxisMinMax({series, integersOnly});

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, minY), Math.max(0, maxY)]);

    if (shouldRoundScaleUp({yScale, maxValue: maxY, maxTicks})) {
      yScale.nice(maxTicks);
    } else {
      const roundedDownMin = yScale
        .copy()
        .nice(maxTicks)
        .ticks(maxTicks)[0];

      yScale.domain([roundedDownMin, Math.max(0, maxY)]);
    }

    const filteredTicks = integersOnly
      ? yScale.ticks(maxTicks).filter((tick) => Number.isInteger(tick))
      : yScale.ticks(maxTicks);

    const ticks = filteredTicks.map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    const axisMargin = Math.max(
      ...ticks.map(({formattedValue}) =>
        getTextWidth({fontSize, text: formattedValue}),
      ),
    );

    return {yScale, ticks, axisMargin};
  }, [series, integersOnly, drawableHeight, formatYAxisLabel, fontSize]);

  return {yScale, ticks, axisMargin};
}

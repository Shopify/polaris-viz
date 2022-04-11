import {useContext, useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex} from 'd3-array';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {estimateStringWidth, shouldRoundScaleUp} from '../../../utilities';
import {yAxisMinMax} from '../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import type {NumberLabelFormatter} from '../../../types';
import {ChartContext} from '../../ChartContainer';

export function useYScale({
  drawableHeight,
  data,
  formatYAxisLabel,
  integersOnly,
}: {
  drawableHeight: number;
  data: DataSeries[];
  formatYAxisLabel: NumberLabelFormatter;
  integersOnly: boolean;
}) {
  const {characterWidths} = useContext(ChartContext);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const [minY, maxY] = yAxisMinMax({data, integersOnly});

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
      const roundedDownMin = yScale.copy().nice(maxTicks).ticks(maxTicks)[0];

      yScale.domain([Math.min(roundedDownMin, minY), Math.max(0, maxY)]);
    }

    const filteredTicks = integersOnly
      ? yScale.ticks(maxTicks).filter((tick) => Number.isInteger(tick))
      : yScale.ticks(maxTicks);

    const ticks = filteredTicks.map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    const longestYAxisLabel = maxIndex(
      ticks,
      ({formattedValue}: {formattedValue: string}) =>
        formattedValue == null ? 0 : formattedValue.length,
    );

    const text = ticks[longestYAxisLabel]
      ? ticks[longestYAxisLabel].formattedValue
      : '';

    const yAxisLabelWidth = estimateStringWidth(text, characterWidths);

    return {yScale, ticks, yAxisLabelWidth};
  }, [data, integersOnly, drawableHeight, formatYAxisLabel, characterWidths]);

  return {yScale, ticks, yAxisLabelWidth};
}

import {useContext, useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex} from 'd3-array';

import {estimateStringWidth} from '../utilities/estimateStringWidth';
import type {LabelFormatter} from '../types';
import {DEFAULT_MAX_Y} from '../constants';
import {ChartContext} from '../contexts';
import {shouldRoundScaleUp} from '../utilities/shouldRoundScaleUp';

export interface Props {
  drawableHeight: number;
  formatYAxisLabel: LabelFormatter;
  integersOnly: boolean;
  max: number;
  min: number;
  minLabelSpace: number;
}

export function useYScale({
  drawableHeight,
  formatYAxisLabel,
  integersOnly,
  max,
  min,
  minLabelSpace,
}: Props) {
  const {characterWidths} = useContext(ChartContext);

  const [minY, maxY] = useMemo(() => {
    const minY = min;
    const maxY = max === 0 && min === 0 ? DEFAULT_MAX_Y : max;

    if (integersOnly) {
      return [Math.floor(minY), Math.ceil(maxY)];
    }

    return [minY, maxY];
  }, [min, max, integersOnly]);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const maxTicks = Math.max(1, Math.floor(drawableHeight / minLabelSpace));

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
  }, [
    characterWidths,
    drawableHeight,
    formatYAxisLabel,
    integersOnly,
    maxY,
    minY,
    minLabelSpace,
  ]);

  return {yScale, ticks, yAxisLabelWidth};
}

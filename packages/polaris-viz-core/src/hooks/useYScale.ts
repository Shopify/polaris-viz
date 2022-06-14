import {useContext, useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex} from 'd3-array';
import type {LabelFormatter} from 'types';

import {ChartContext} from '../contexts';
import {estimateStringWidth} from '../utilities';

const MINIMAL_LABEL_SPACE = 80;

export function useYScale({
  drawableHeight,
  formatYAxisLabel,
  integersOnly = false,
  max,
  min,
  shouldRoundUp = true,
}: {
  drawableHeight: number;
  formatYAxisLabel: LabelFormatter;
  max: number;
  min: number;
  integersOnly?: boolean;
  shouldRoundUp?: boolean;
}) {
  const {characterWidths} = useContext(ChartContext);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MINIMAL_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, min), Math.max(0, max)]);

    if (shouldRoundUp) {
      yScale.nice(maxTicks);
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
    shouldRoundUp,
    characterWidths,
    drawableHeight,
    formatYAxisLabel,
    integersOnly,
    max,
    min,
  ]);

  return {yScale, ticks, yAxisLabelWidth};
}

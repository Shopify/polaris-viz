import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex} from 'd3-array';
import type {LabelFormatter} from 'types';

import {DEFAULT_MAX_Y} from '../constants';
import {estimateStringWidth, shouldRoundScaleUp} from '../utilities';

import {useChartContext} from './useChartContext';

const MINIMAL_LABEL_SPACE = 80;

export interface Props {
  drawableHeight: number;
  formatYAxisLabel: LabelFormatter;
  max: number;
  min: number;
  integersOnly?: boolean;
  shouldRoundUp?: boolean;
  verticalOverflow?: boolean;
  fixedWidth?: number;
}

export function useYScale({
  drawableHeight,
  formatYAxisLabel,
  integersOnly = false,
  max,
  min,
  shouldRoundUp = true,
  verticalOverflow = true,
  fixedWidth,
}: Props) {
  const {characterWidths} = useChartContext();

  const [minY, maxY] = useMemo(() => {
    const minY = min;
    const maxY = max === 0 && min === 0 ? DEFAULT_MAX_Y : max;

    if (integersOnly) {
      return [Math.floor(minY), Math.ceil(maxY)];
    }

    return [minY, maxY];
  }, [min, max, integersOnly]);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const maxTicks = Math.max(
      1,
      Math.ceil(drawableHeight / MINIMAL_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, minY), Math.max(0, maxY)]);

    // if verticalOverflow is false, always round up
    // if verticalOverflow is true, only round up if both shouldRoundUp and shouldRoundScaleUp is true
    if (
      !verticalOverflow ||
      (shouldRoundUp && shouldRoundScaleUp({yScale, maxValue: maxY, maxTicks}))
    ) {
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
    verticalOverflow,
    shouldRoundUp,
    characterWidths,
    drawableHeight,
    formatYAxisLabel,
    integersOnly,
    maxY,
    minY,
  ]);

  return {yScale, ticks, yAxisLabelWidth: fixedWidth ?? yAxisLabelWidth};
}

import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex} from 'd3-array';

import type {LabelFormatter} from '../types';
import {DEFAULT_MAX_Y} from '../constants';
import {
  estimateStringWidth,
  shouldRoundScaleUp,
  isInfinity,
} from '../utilities';

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
  fixedWidth?: number | false;
  maxYOverride?: number | null;
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
  maxYOverride,
}: Props) {
  const {characterWidths} = useChartContext();

  if (maxYOverride != null && maxYOverride < 0) {
    throw new Error('maxYOverride must be a non-negative number.');
  }

  const [minY, maxY] = useMemo(() => {
    const isDataEmpty = min === 0 && max === 0;
    const minY = min;

    let maxY = isDataEmpty ? DEFAULT_MAX_Y : max;

    if (maxYOverride != null && isDataEmpty) {
      maxY = maxYOverride;
    }

    if (integersOnly) {
      return [Math.floor(minY), Math.ceil(maxY)];
    }

    return [minY, maxY];
  }, [min, max, integersOnly, maxYOverride]);

  if (isInfinity(maxY) || isInfinity(minY)) {
    throw new Error('Data must be finite.');
  }

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

  return {
    yScale,
    ticks,
    yAxisLabelWidth: getLabelWidth(yAxisLabelWidth, fixedWidth),
  };
}

export function getLabelWidth(
  yAxisLabelWidth: number,
  fixedWidth?: number | false,
): number {
  if (fixedWidth === false || fixedWidth == null) {
    return yAxisLabelWidth;
  }

  return fixedWidth;
}

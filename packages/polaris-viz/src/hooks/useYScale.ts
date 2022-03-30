import {useContext, useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {maxIndex, range} from 'd3-array';

import {shouldRoundScaleUp, estimateStringWidth} from '../utilities';
import type {NumberLabelFormatter} from '../types';
import {ChartContext} from '../components';

export function useYScale({
  drawableHeight,
  formatYAxisLabel,
  integersOnly,
  max,
  min,
  minLabelSpace,
}: {
  drawableHeight: number;
  formatYAxisLabel: NumberLabelFormatter;
  integersOnly: boolean;
  max: number;
  min: number;
  minLabelSpace: number;
}) {
  const {characterWidths} = useContext(ChartContext);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const maxTicks = Math.max(1, Math.floor(drawableHeight / 80));

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, min), Math.max(0, max)]);

    // SEcond scale is height to

    // console.log(
    //   'shouldRoundScaleUp',
    //   shouldRoundScaleUp({yScale, maxValue: max, maxTicks}),
    // );

    yScale.nice(maxTicks);

    // if (shouldRoundScaleUp({yScale, maxValue: max, maxTicks})) {
    //   yScale.nice(maxTicks);
    // } else {
    //   const roundedDownMin = yScale.copy().nice(maxTicks).ticks(maxTicks)[0];

    //   yScale.domain([Math.min(roundedDownMin, min), Math.max(0, max)]);
    // }

    const filteredTicks = integersOnly
      ? yScale.ticks(maxTicks).filter((tick) => Number.isInteger(tick))
      : yScale.ticks(maxTicks);

    console.log({filteredTicks});

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
    max,
    min,
    minLabelSpace,
  ]);

  return {yScale, ticks, yAxisLabelWidth};
}

import {useContext, useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import type {Series} from 'd3-shape';
import type {LabelFormatter} from '@shopify/polaris-viz-core';

import {ChartContext} from '../../../components/ChartContainer';
import {estimateStringWidth, shouldRoundScaleUp} from '../../../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {DEFAULT_MAX_Y} from '../../../constants';

export function useYScale({
  drawableHeight,
  stackedValues,
  formatYAxisLabel,
}: {
  drawableHeight: number;
  stackedValues: Series<
    {
      [key: string]: number;
    },
    string
  >[];
  formatYAxisLabel: LabelFormatter;
}) {
  const {characterWidths} = useContext(ChartContext);

  const {yScale, ticks, yAxisLabelWidth} = useMemo(() => {
    const minY = Math.min(
      ...stackedValues.map((value) => {
        return Math.min(
          ...value.map(([startingValue, endingValue]) =>
            Math.min(startingValue, endingValue),
          ),
        );
      }),
    );

    const calculatedMax = Math.max(
      ...stackedValues.map((value) =>
        Math.max(
          ...value.map(([startingValue, endingValue]) =>
            Math.max(startingValue, endingValue),
          ),
        ),
      ),
    );

    const maxY =
      calculatedMax === 0 && minY === 0 ? DEFAULT_MAX_Y : calculatedMax;

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.min(0, minY), Math.max(0, maxY)])
      .nice(maxTicks);

    if (shouldRoundScaleUp({yScale, maxValue: maxY, maxTicks})) {
      yScale.nice(maxTicks);
    } else {
      const roundedDownMin = yScale.copy().nice(maxTicks).ticks(maxTicks)[0];

      yScale.domain([Math.min(roundedDownMin, minY), Math.max(0, maxY)]);
    }

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    const maxTickWidth = Math.max(
      ...ticks.map(({formattedValue}) =>
        estimateStringWidth(formattedValue, characterWidths),
      ),
    );

    const yAxisLabelWidth = maxTickWidth;

    return {yScale, ticks, yAxisLabelWidth};
  }, [stackedValues, drawableHeight, formatYAxisLabel, characterWidths]);

  return {yScale, ticks, yAxisLabelWidth};
}
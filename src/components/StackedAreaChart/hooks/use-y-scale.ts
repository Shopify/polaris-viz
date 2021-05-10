import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {Series} from 'd3-shape';

import {getTextWidth} from '../../../utilities';
import {MIN_Y_LABEL_SPACE} from '../constants';
import {DEFAULT_MAX_Y} from '../../../constants';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  fontSize,
  drawableHeight,
  stackedValues,
  formatYAxisLabel,
}: {
  fontSize: number;
  drawableHeight: number;
  stackedValues: Series<
    {
      [key: string]: number;
    },
    string
  >[];
  formatYAxisLabel: NumberLabelFormatter;
}) {
  const {yScale, ticks, axisMargin} = useMemo(() => {
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

    const ticks = yScale.ticks(maxTicks).map((value) => ({
      value,
      formattedValue: formatYAxisLabel(value),
      yOffset: yScale(value),
    }));

    const maxTickWidth = Math.max(
      ...ticks.map(({formattedValue}) =>
        getTextWidth({fontSize, text: formattedValue}),
      ),
    );

    const axisMargin = maxTickWidth;

    return {yScale, ticks, axisMargin};
  }, [stackedValues, drawableHeight, formatYAxisLabel, fontSize]);

  return {yScale, ticks, axisMargin};
}

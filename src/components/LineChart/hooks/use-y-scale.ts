import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import {getTextWidth} from 'utilities';

import {yAxisMinMax} from '../utilities';
import {MIN_Y_LABEL_SPACE, SPACING_LOOSE, FONT_SIZE} from '../constants';
import {Series} from '../types';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  series,
  formatYAxisLabel,
}: {
  drawableHeight: number;
  series: Series[];
  formatYAxisLabel: NumberLabelFormatter;
}) {
  const {yScale, ticks} = useMemo(() => {
    const [minY, maxY] = yAxisMinMax(series);

    const maxTicks = Math.max(
      1,
      Math.floor(drawableHeight / MIN_Y_LABEL_SPACE),
    );

    const yScale = scaleLinear()
      .range([drawableHeight, 0])
      .domain([Math.floor(Math.min(0, minY)), Math.ceil(maxY)])
      .nice(maxTicks);

    const ticks = yScale
      .ticks(maxTicks)
      .filter((tick) => Number.isInteger(tick))
      .map((value) => ({
        value,
        formattedValue: formatYAxisLabel(value),
        yOffset: yScale(value),
      }));

    return {yScale, ticks};
  }, [drawableHeight, series, formatYAxisLabel]);

  const maxTickWidth = Math.max(
    ...ticks.map(({formattedValue}) =>
      getTextWidth({fontSize: FONT_SIZE, text: formattedValue}),
    ),
  );

  const axisMargin = maxTickWidth + SPACING_LOOSE;

  return {yScale, ticks, axisMargin};
}

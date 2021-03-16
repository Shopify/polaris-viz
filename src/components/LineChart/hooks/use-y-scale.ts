import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';

import {getTextWidth} from '../../../utilities';
import {yAxisMinMax} from '../utilities';
import {MIN_Y_LABEL_SPACE, SPACING} from '../constants';
import {Series} from '../types';
import {NumberLabelFormatter} from '../../../types';

export function useYScale({
  drawableHeight,
  series,
  formatYAxisLabel,
  fontSize,
}: {
  fontSize: number;
  drawableHeight: number;
  series: Series[];
  formatYAxisLabel: NumberLabelFormatter;
}) {
  const {yScale, ticks, axisMargin} = useMemo(() => {
    const [minY, maxY] = yAxisMinMax(series);

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

    const axisMargin = maxTickWidth + SPACING;

    return {yScale, ticks, axisMargin};
  }, [series, drawableHeight, formatYAxisLabel, fontSize]);

  return {yScale, ticks, axisMargin};
}

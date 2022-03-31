import React, {useMemo} from 'react';
import {line} from 'd3-shape';
import {
  curveStepRounded,
  DataPoint,
  useTheme,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';
import type {YAxisOptions} from '@shopify/polaris-viz-core/src/types';

import {yAxisMinMax} from '../../../components/LineChart/utilities';
import {Lines} from '../../../components/LineChart/components/Lines/Lines';
import {useLinearXScale, useYScale} from '../../../hooks';
import {useFormatData} from '../../LineChart/hooks';
import type {MixedChartDataSeries} from '../types';

interface Props {
  data: MixedChartDataSeries;
  drawableHeight: number;
  drawableWidth: number;
  theme?: string;
}

export function MixedLineChart({
  data,
  theme,
  drawableHeight,
  drawableWidth,
  yScale,
}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data.series, selectedTheme);

  const yAxisOptionsForChart: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...data.yAxisOptions,
  };

  const dataWithDefaults: DataWithDefaults[] = data.series.map(
    (series, index) => {
      const seriesColor = seriesColors[index];

      return {
        lineStyle: series.isComparison ? 'dotted' : selectedTheme.line.style,
        ...series,
        // We want to override the color, not set a default
        // so it has to come last
        color: 'white',
        // color: series.isComparison
        //   ? seriesColors[index]
        //   : series.color ?? seriesColors[index],
      };
    },
  );

  // TODO: MOVE ALL THIS TO A HOOK
  const {reversedSeries, longestSeriesLength, longestSeriesIndex} =
    useFormatData(dataWithDefaults);

  const {xScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  // const [min, max] = yAxisMinMax({
  //   data: data.series,
  //   integersOnly: yAxisOptionsForChart.integersOnly,
  // });

  // const {yScale} = useYScale({
  //   drawableHeight,
  //   min,
  //   max,
  //   formatYAxisLabel: yAxisOptionsForChart.labelFormatter,
  //   integersOnly: yAxisOptionsForChart.integersOnly,
  // });

  // console.log(yScale(0));

  const lineGenerator = useMemo(() => {
    const generator = line<DataPoint>()
      .x((_, index) => (xScale == null ? 0 : xScale(index)))
      .y(({value}) => {
        // console.log(value, yScale(value ?? 0));
        return yScale(value ?? 0);
      });

    if (selectedTheme.line.hasSpline) {
      generator.curve(curveStepRounded);
    }
    return generator;
  }, [selectedTheme.line.hasSpline, xScale, yScale]);

  return (
    <Lines
      gradientId={{current: ''}}
      isAnimated={false}
      lineGenerator={lineGenerator}
      reversedSeries={reversedSeries}
      theme={theme}
    />
  );
}

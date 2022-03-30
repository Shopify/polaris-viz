import {DataSeries, useTheme} from '@shopify/polaris-viz-core';
import React, {useMemo} from 'react';
import type {XAxisOptions, YAxisOptions} from 'types';

import {getFormattedLabels} from '../../../utilities/get-formatted-labels';
import {useThemeSeriesColors} from '../../../hooks/use-theme-series-colors';
import {useVerticalBarChart} from '../../VerticalBarChart/hooks/use-vertical-bar-chart';
import {VerticalBarGroups} from '../../VerticalBarChart/components';
import type {MixedChartDataSeries} from '../types';

interface Props {
  data: MixedChartDataSeries;
  drawableHeight: number;
  drawableWidth: number;
  theme?: string;
  xAxisOptions?: XAxisOptions;
}

export function MixedVerticalBarChart({
  data,
  drawableHeight,
  drawableWidth,
  theme,
  xAxisOptions,
}: Props) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data.series, selectedTheme);

  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    ...xAxisOptions,
  };

  const yAxisOptionsForChart: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...data.yAxisOptions,
  };

  const seriesWithDefaults = data.series.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  console.log(seriesWithDefaults);

  // TODO: This is probably wrong
  const labels = useMemo(() => {
    return getFormattedLabels({
      data: seriesWithDefaults,
      labelFormatter: (value) => value,
      // labelFormatter: xAxisOptions.labelFormatter,
    });
  }, [seriesWithDefaults]);

  const {
    xScale,
    gapWidth,
    sortedData,
    yScale: barYScale,
  } = useVerticalBarChart({
    data: seriesWithDefaults,
    drawableHeight,
    drawableWidth,
    stackedValues: null,
    labels,
    theme,
    yAxisOptions: yAxisOptionsForChart,
  });

  return (
    <VerticalBarGroups
      activeBarGroup={-1}
      barColors={[]}
      data={seriesWithDefaults}
      drawableHeight={drawableHeight}
      gapWidth={gapWidth}
      id="id"
      isAnimated={false}
      labels={labels}
      sortedData={sortedData}
      stackedValues={null}
      theme={theme}
      xScale={xScale}
      yAxisOptions={yAxisOptionsForChart}
      yScale={barYScale}
    />
  );
}

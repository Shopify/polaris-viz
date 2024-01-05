import {
  DEFAULT_CHART_PROPS,
  useTheme,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';

import {LineChart} from '../LineChart';

import type {LineChartPredictiveProps} from './types';
import {PredictiveLineSeries} from './components';

export function LineChartPredictive(props: LineChartPredictiveProps) {
  const {
    annotations = [],
    data,
    errorText,
    emptyStateText,
    id,
    isAnimated,
    renderLegendContent,
    showLegend = true,
    skipLinkText,
    state,
    theme,
    tooltipOptions,
    xAxisOptions,
    yAxisOptions,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const nonPredictiveData: LineChartPredictiveProps['data'] = [];
  const predictiveData: LineChartPredictiveProps['data'] = [];

  for (const series of data) {
    if (series.metadata?.isPredictive === true) {
      predictiveData.push(series);
    } else {
      nonPredictiveData.push(series);
    }
  }

  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(nonPredictiveData, selectedTheme);

  return (
    <LineChart
      annotations={annotations}
      data={nonPredictiveData}
      emptyStateText={emptyStateText}
      errorText={errorText}
      id={id}
      isAnimated={isAnimated}
      renderLegendContent={renderLegendContent}
      showLegend={showLegend}
      skipLinkText={skipLinkText}
      slots={{
        chart: ({xScale, yScale, drawableHeight, drawableWidth, theme}) => {
          return (
            <PredictiveLineSeries
              data={predictiveData}
              drawableHeight={drawableHeight}
              drawableWidth={drawableWidth}
              seriesColors={seriesColors}
              theme={theme}
              xScale={xScale}
              yScale={yScale}
            />
          );
        },
      }}
      state={state}
      theme={theme}
      tooltipOptions={tooltipOptions}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}

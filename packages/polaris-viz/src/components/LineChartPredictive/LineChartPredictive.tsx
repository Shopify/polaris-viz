import {
  DEFAULT_CHART_PROPS,
  DEFAULT_THEME_NAME,
  useTheme,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';

import {LineChart} from '../LineChart';

import type {LineChartPredictiveProps} from './types';
import {CustomLegend, PredictiveLineSeries} from './components';

export function LineChartPredictive(props: LineChartPredictiveProps) {
  const {
    annotations = [],
    data,
    errorText,
    emptyStateText,
    id,
    isAnimated,
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

  const predictiveSeriesNames = predictiveData
    .map(({metadata}) => {
      return data[metadata?.relatedIndex ?? -1].name;
    })
    .filter((value) => value != null) as string[];

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
      renderLegendContent={({
        getColorVisionStyles,
        getColorVisionEventAttrs,
      }) => {
        return (
          <CustomLegend
            getColorVisionStyles={getColorVisionStyles}
            getColorVisionEventAttrs={getColorVisionEventAttrs}
            predictiveSeriesNames={predictiveSeriesNames}
            data={nonPredictiveData}
            seriesColors={seriesColors}
            theme={theme ?? DEFAULT_THEME_NAME}
          />
        );
      }}
    />
  );
}

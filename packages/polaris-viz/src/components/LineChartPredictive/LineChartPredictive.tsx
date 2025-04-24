import type {DataSeries} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  DEFAULT_THEME_NAME,
  useTheme,
  useThemeSeriesColors,
} from '@shopify/polaris-viz-core';
import {useMemo} from 'react';
import type {RenderTooltipContentData} from 'types';

import {LineChart} from '../LineChart';

import type {LineChartPredictiveProps} from './types';
import {CustomLegend, PredictiveLinePoints} from './components';
import {renderLinearPredictiveTooltipContent} from './utilities/renderLinearPredictiveTooltipContent';

export function LineChartPredictive(props: LineChartPredictiveProps) {
  const {
    annotations = [],
    data,
    errorText,
    emptyStateText,
    id,
    isAnimated,
    legendPosition,
    seriesNameFormatter = (value) => `${value}`,
    showLegend = true,
    skipLinkText,
    state,
    theme,
    tooltipOptions: initialTooltipOptions,
    renderAnnotationContent,
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

  const predictiveSeriesNames = predictiveData
    .map(({metadata}) => {
      return data[metadata?.relatedIndex ?? -1].name;
    })
    .filter((value) => value != null) as string[];

  const dataWithColors: DataSeries[] = [];
  let index = -1;

  for (const series of data) {
    if (series.metadata?.relatedIndex == null) {
      index += 1;
    }

    dataWithColors.push({
      ...series,
      color: seriesColors[index],
    });
  }

  const tooltipOptions = useMemo(() => {
    function renderTooltipContent(tooltipData: RenderTooltipContentData) {
      return renderLinearPredictiveTooltipContent(tooltipData);
    }

    return {
      ...initialTooltipOptions,
      renderTooltipContent,
    };
  }, [initialTooltipOptions]);

  return (
    <LineChart
      annotations={annotations}
      data={dataWithColors}
      emptyStateText={emptyStateText}
      errorText={errorText}
      id={id}
      isAnimated={isAnimated}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      skipLinkText={skipLinkText}
      slots={{
        chart: ({xScale, yScale, drawableHeight, drawableWidth, theme}) => {
          return (
            <PredictiveLinePoints
              data={dataWithColors}
              drawableHeight={drawableHeight}
              drawableWidth={drawableWidth}
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
      legendPosition={legendPosition}
      renderAnnotationContent={renderAnnotationContent}
      renderLegendContent={({
        getColorVisionStyles,
        getColorVisionEventAttrs,
      }) => {
        return (
          <CustomLegend
            getColorVisionStyles={getColorVisionStyles}
            getColorVisionEventAttrs={getColorVisionEventAttrs}
            predictiveSeriesNames={predictiveSeriesNames}
            data={dataWithColors}
            theme={theme ?? DEFAULT_THEME_NAME}
            seriesNameFormatter={seriesNameFormatter}
          />
        );
      }}
    />
  );
}

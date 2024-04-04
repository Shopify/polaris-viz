import {
  DEFAULT_CHART_PROPS,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';
import {Fragment} from 'react';

import type {LineChartProps} from '../LineChart';
import {LineChart} from '../LineChart';

import {RelatedAreas, MissingDataArea, CustomLegend} from './components';

export type LineChartRelationalProps = Omit<
  LineChartProps,
  'renderLegendContent'
>;

export function LineChartRelational(props: LineChartRelationalProps) {
  const {
    annotations = [],
    data,
    errorText,
    emptyStateText,
    id,
    isAnimated,
    seriesNameFormatter = (value) => `${value}`,
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

  const dataWithHiddenRelational = data.map((series) => {
    return {
      ...series,
      metadata: {
        ...series.metadata,
        isVisuallyHidden: series.metadata?.relatedIndex != null,
      },
    };
  });

  return (
    <LineChart
      annotations={annotations}
      data={dataWithHiddenRelational}
      emptyStateText={emptyStateText}
      errorText={errorText}
      id={id}
      isAnimated={isAnimated}
      renderLegendContent={({
        getColorVisionStyles,
        getColorVisionEventAttrs,
      }) => {
        return (
          <CustomLegend
            getColorVisionStyles={getColorVisionStyles}
            getColorVisionEventAttrs={getColorVisionEventAttrs}
            data={data}
            theme={theme ?? DEFAULT_THEME_NAME}
            seriesNameFormatter={seriesNameFormatter}
          />
        );
      }}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      skipLinkText={skipLinkText}
      slots={{
        chart: (props) => {
          return (
            <Fragment>
              <MissingDataArea {...props} data={data} />
              <RelatedAreas {...props} data={data} />
            </Fragment>
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

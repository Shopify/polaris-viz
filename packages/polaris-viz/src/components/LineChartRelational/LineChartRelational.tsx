import type {DataSeries} from '@shopify/polaris-viz-core';
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
    renderAnnotationContent,
    renderHiddenLegendLabel,
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

  const relatedAreasKey = buildRelatedAreasKey(dataWithHiddenRelational);

  return (
    <LineChart
      annotations={annotations}
      data={dataWithHiddenRelational}
      emptyStateText={emptyStateText}
      errorText={errorText}
      id={id}
      isAnimated={isAnimated}
      renderAnnotationContent={renderAnnotationContent}
      renderLegendContent={(
        {getColorVisionStyles, getColorVisionEventAttrs},
        activeIndex,
      ) => {
        return (
          <CustomLegend
            getColorVisionStyles={getColorVisionStyles}
            getColorVisionEventAttrs={getColorVisionEventAttrs}
            data={data}
            theme={theme ?? DEFAULT_THEME_NAME}
            seriesNameFormatter={seriesNameFormatter}
            activeIndex={activeIndex ?? 0}
            renderHiddenLegendLabel={renderHiddenLegendLabel}
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
              <RelatedAreas
                data={data}
                // remount the area otherwise it can't animate
                // between areas that are differently sized
                key={relatedAreasKey}
                {...props}
              />
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

function buildRelatedAreasKey(data: DataSeries[]) {
  const relatedSeries = data.find((series) => {
    return series?.metadata?.relatedIndex != null;
  });

  if (relatedSeries == null) {
    return '';
  }

  return relatedSeries.data.map(({value}) => value?.toString()).join(':');
}

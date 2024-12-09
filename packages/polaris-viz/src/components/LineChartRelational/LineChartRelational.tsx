import type {DataSeries} from '@shopify/polaris-viz-core';
import {
  DEFAULT_CHART_PROPS,
  DEFAULT_THEME_NAME,
} from '@shopify/polaris-viz-core';
import {Fragment} from 'react';

import {useResizeObserver} from '../../hooks';
import type {LineChartProps} from '../LineChart';
import {LineChart} from '../LineChart';

import {RelatedAreas, MissingDataArea, CustomLegend} from './components';
import styles from './LineChartRelational.scss';

const SMALL_SCREEN_WIDTH = 400;

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

  const {setRef, entry} = useResizeObserver();

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
  const hideLegends = entry?.contentRect.width
    ? entry.contentRect.width < SMALL_SCREEN_WIDTH
    : false;

  return (
    <div ref={setRef} className={styles.Container}>
      <LineChart
        annotations={annotations}
        data={dataWithHiddenRelational}
        emptyStateText={emptyStateText}
        errorText={errorText}
        id={id}
        isAnimated={isAnimated}
        renderLegendContent={(
          {getColorVisionStyles, getColorVisionEventAttrs},
          activeIndex,
          legendItemDimensions,
        ) => {
          return (
            <CustomLegend
              getColorVisionStyles={getColorVisionStyles}
              getColorVisionEventAttrs={getColorVisionEventAttrs}
              data={data}
              theme={theme ?? DEFAULT_THEME_NAME}
              seriesNameFormatter={seriesNameFormatter}
              hideLegends={hideLegends}
              activeIndex={activeIndex ?? 0}
              legendItemDimensions={legendItemDimensions ?? {current: []}}
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
                <RelatedAreas data={data} key={relatedAreasKey} {...props} />
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
    </div>
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

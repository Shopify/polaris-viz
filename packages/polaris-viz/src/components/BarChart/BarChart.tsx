import {Fragment, useRef} from 'react';
import {
  uniqueId,
  ChartState,
  DEFAULT_CHART_PROPS,
  InternalChartType,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import type {
  Direction,
  XAxisOptions,
  YAxisOptions,
  ChartType,
  ChartProps,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {bucketDataSeries} from '../../utilities/bucketDataSeries';
import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {ChartContainer} from '../../components/ChartContainer';
import type {
  Annotation,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';
import {SkipLink} from '../SkipLink';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  normalizeData,
} from '../../utilities';
import {HorizontalBarChart} from '../HorizontalBarChart';
import {VerticalBarChart} from '../VerticalBarChart';
import {ChartSkeleton} from '../../components/ChartSkeleton';
import {fillMissingDataPoints} from '../../utilities/fillMissingDataPoints';

export type BarChartProps = {
  errorText?: string;
  tooltipOptions?: TooltipOptions;
  annotations?: Annotation[];
  direction?: Direction;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  seriesNameFormatter?: LabelFormatter;
  showLegend?: boolean;
  maxSeries?: number;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  renderHiddenLegendLabel?: (count: number) => string;
  renderBucketLegendLabel?: () => string;
  scrollContainer?: Element | null;
} & ChartProps;

export function BarChart(props: BarChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    annotations = [],
    data: dataSeries,
    state,
    errorText,
    direction = 'vertical',
    emptyStateText,
    id,
    isAnimated,
    tooltipOptions,
    renderLegendContent,
    showLegend = true,
    maxSeries,
    skipLinkText,
    theme = defaultTheme,
    type = 'default',
    xAxisOptions,
    yAxisOptions,
    onError,
    renderHiddenLegendLabel,
    renderBucketLegendLabel,
    seriesNameFormatter = (value) => `${value}`,
    scrollContainer,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const filledData = fillMissingDataPoints(
    dataSeries,
    isValidDate(dataSeries[0]?.data[0]?.key),
  );

  const data = maxSeries
    ? bucketDataSeries({
        dataSeries: filledData,
        maxSeries,
        renderBucketLegendLabel,
      })
    : filledData;

  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;
  const hideSkipLink =
    skipLinkText == null || skipLinkText.length === 0 || emptyState;

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startKey');

  const renderTooltip = getTooltipContentRenderer({
    tooltipOptions,
    theme,
    data,
  });

  const ChartByDirection =
    direction === 'vertical' ? (
      <VerticalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        emptyStateText={emptyStateText}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={renderTooltip}
        seriesNameFormatter={seriesNameFormatter}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
      />
    ) : (
      <HorizontalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={renderTooltip}
        seriesNameFormatter={seriesNameFormatter}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    );
  return (
    <Fragment>
      {hideSkipLink ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer
        id={id}
        isAnimated={isAnimated}
        data={data}
        onError={onError}
        theme={theme}
        type={InternalChartType.Bar}
        scrollContainer={scrollContainer}
      >
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          ChartByDirection
        )}
      </ChartContainer>

      {hideSkipLink ? null : <SkipLink.Anchor id={skipLinkAnchorId.current} />}
    </Fragment>
  );
}

function isValidDate(dateString: string | number | null) {
  if (dateString == null) {
    return false;
  }

  const parsedDate = Date.parse(dateString.toString());
  if (isNaN(parsedDate)) {
    return dateString
      .toString()
      .split(' · ')
      .some((date) => !isNaN(Date.parse(date)));
  }
  return true;
}

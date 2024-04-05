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
} from '@shopify/polaris-viz-core';

import {getFormattersWithDefaults} from '../../utilities/getFormattersWithDefaults';
import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {ChartContainer} from '../../components/ChartContainer';
import type {
  Annotation,
  Formatters,
  RenderLegendContent,
  RenderTooltipContent,
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
  annotations?: Annotation[];
  direction?: Direction;
  emptyStateText?: string;
  errorText?: string;
  formatters?: Partial<Formatters>;
  renderHiddenLegendLabel?: (count: number) => string;
  renderLegendContent?: RenderLegendContent;
  renderTooltipContent?: RenderTooltipContent;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
} & ChartProps;

export function BarChart(props: BarChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    annotations = [],
    data: dataSeries,
    direction = 'vertical',
    emptyStateText,
    errorText,
    formatters: partialFormatters,
    id,
    isAnimated,
    onError,
    renderHiddenLegendLabel,
    renderLegendContent,
    renderTooltipContent,
    showLegend = true,
    skipLinkText,
    state,
    theme = defaultTheme,
    type = 'default',
    xAxisOptions,
    yAxisOptions,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = fillMissingDataPoints(
    dataSeries,
    isValidDate(dataSeries[0]?.data[0]?.key),
  );

  const formatters = getFormattersWithDefaults(partialFormatters);

  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;
  const hideSkipLink =
    skipLinkText == null || skipLinkText.length === 0 || emptyState;

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startKey');

  const renderTooltip = getTooltipContentRenderer({
    data,
    formatters,
    renderTooltipContent,
    theme,
  });

  const ChartByDirection =
    direction === 'vertical' ? (
      <VerticalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        emptyStateText={emptyStateText}
        formatters={formatters}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    ) : (
      <HorizontalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={renderTooltip}
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
  return !isNaN(parsedDate);
}

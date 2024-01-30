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
import {useRenderTooltipContent} from '../../hooks';
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
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  enableHideLegendOverflow?: boolean;
  renderHiddenLegendLabel?: (count: number) => string;
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
    isAnimated,
    tooltipOptions,
    renderLegendContent,
    showLegend = true,
    skipLinkText,
    theme = defaultTheme,
    type = 'default',
    xAxisOptions,
    yAxisOptions,
    onError,
    enableHideLegendOverflow,
    renderHiddenLegendLabel,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = fillMissingDataPoints(
    dataSeries,
    isValidDate(dataSeries[0]?.data[0]?.key),
  );

  const skipLinkAnchorId = useRef(uniqueId('BarChart'));

  const emptyState = data.length === 0;
  const hideSkipLink =
    skipLinkText == null || skipLinkText.length === 0 || emptyState;

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startKey');

  const renderTooltip = useRenderTooltipContent({tooltipOptions, theme, data});

  const ChartByDirection =
    direction === 'vertical' ? (
      <VerticalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        emptyStateText={emptyStateText}
        renderLegendContent={renderLegendContent}
        renderTooltipContent={renderTooltip}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
        enableHideLegendOverflow={enableHideLegendOverflow}
        renderHiddenLegendLabel={renderHiddenLegendLabel}
      />
    ) : (
      <HorizontalBarChart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
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

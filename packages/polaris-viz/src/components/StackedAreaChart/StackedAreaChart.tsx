import type {ReactNode} from 'react';
import {Fragment, useRef} from 'react';
import {
  uniqueId,
  ChartState,
  DEFAULT_CHART_PROPS,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {getTooltipContentRenderer} from '../../utilities/getTooltipContentRenderer';
import {fillMissingDataPoints} from '../../utilities/fillMissingDataPoints';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  normalizeData,
} from '../../utilities';
import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import {SkipLink} from '../SkipLink';
import type {
  Annotation,
  RenderAnnotationContentData,
  RenderLegendContent,
  TooltipOptions,
} from '../../types';

import {Chart} from './Chart';

export type StackedAreaChartProps = {
  annotations?: Annotation[];
  tooltipOptions?: TooltipOptions;
  state?: ChartState;
  errorText?: string;
  renderLegendContent?: RenderLegendContent;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderHiddenLegendLabel?: (count: number) => string;
  seriesNameFormatter?: LabelFormatter;
  scrollContainer?: Element | null;
} & ChartProps;

export function StackedAreaChart(props: StackedAreaChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    annotations = [],
    xAxisOptions,
    yAxisOptions,
    data: dataSeries,
    state,
    errorText,
    onError,
    tooltipOptions,
    id,
    isAnimated,
    renderLegendContent,
    seriesNameFormatter = (value) => `${value}`,
    showLegend = true,
    skipLinkText,
    theme = defaultTheme,
    renderAnnotationContent,
    renderHiddenLegendLabel,
    scrollContainer,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const data = fillMissingDataPoints(dataSeries, true);

  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));
  const renderTooltip = getTooltipContentRenderer({
    tooltipOptions,
    theme,
    data,
  });

  if (data.length === 0) {
    return null;
  }

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  const annotationsLookupTable = normalizeData(annotations, 'startKey');

  return (
    <Fragment>
      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer
        data={data}
        theme={theme}
        id={id}
        isAnimated={isAnimated}
        onError={onError}
        scrollContainer={scrollContainer}
      >
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            annotationsLookupTable={annotationsLookupTable}
            data={data}
            renderLegendContent={renderLegendContent}
            renderTooltipContent={renderTooltip}
            seriesNameFormatter={seriesNameFormatter}
            showLegend={showLegend}
            theme={theme}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            renderAnnotationContent={renderAnnotationContent}
            renderHiddenLegendLabel={renderHiddenLegendLabel}
          />
        )}
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </Fragment>
  );
}

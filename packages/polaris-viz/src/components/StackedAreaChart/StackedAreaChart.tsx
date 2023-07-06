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
} from '@shopify/polaris-viz-core';

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
  RenderLegendContent,
  TooltipOptions,
} from '../../types';
import {useRenderTooltipContent} from '../../hooks';

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
} & ChartProps;

export function StackedAreaChart(props: StackedAreaChartProps) {
  const {defaultTheme} = usePolarisVizContext();

  const {
    annotations = [],
    xAxisOptions,
    yAxisOptions,
    data,
    state,
    errorText,
    tooltipOptions,
    isAnimated,
    renderLegendContent,
    showLegend = true,
    skipLinkText,
    theme = defaultTheme,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));
  const renderTooltip = useRenderTooltipContent({tooltipOptions, theme, data});

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
      <ChartContainer data={data} theme={theme} isAnimated={isAnimated}>
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            annotationsLookupTable={annotationsLookupTable}
            data={data}
            renderLegendContent={renderLegendContent}
            renderTooltipContent={renderTooltip}
            showLegend={showLegend}
            theme={theme}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
          />
        )}
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </Fragment>
  );
}

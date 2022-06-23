import React, {useRef} from 'react';
import {
  uniqueId,
  ChartState,
  ChartProps,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';
import type {XAxisOptions, YAxisOptions} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
  formatDataForTooltip,
} from '../../utilities';
import {TooltipContent} from '../';
import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import {SkipLink} from '../SkipLink';
import type {RenderTooltipContentData, TooltipOptions} from '../../types';

import {Chart} from './Chart';

export type StackedAreaChartProps = {
  tooltipOptions: TooltipOptions;
  state?: ChartState;
  errorText?: string;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
} & ChartProps;

export function StackedAreaChart(props: StackedAreaChartProps) {
  const {
    xAxisOptions,
    yAxisOptions,
    data,
    state,
    errorText,
    tooltipOptions,
    isAnimated,
    showLegend = true,
    skipLinkText,
    theme,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const skipLinkAnchorId = useRef(uniqueId('stackedAreaChart'));

  if (data.length === 0) {
    return null;
  }

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  function renderTooltipContent(tooltipData: RenderTooltipContentData) {
    if (tooltipOptions?.renderTooltipContent != null) {
      return tooltipOptions.renderTooltipContent({
        ...tooltipData,
        dataSeries: data,
      });
    }

    const {formattedData, title} = formatDataForTooltip({
      data: tooltipData,
      tooltipOptions,
    });

    return <TooltipContent theme={theme} title={title} data={formattedData} />;
  }

  return (
    <React.Fragment>
      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            data={data}
            isAnimated={isAnimated}
            renderTooltipContent={renderTooltipContent}
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
    </React.Fragment>
  );
}

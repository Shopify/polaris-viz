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
} from '../../utilities';
import {formatTooltipDataForLinearCharts} from '../../utilities/formatTooltipDataForLinearCharts';
import {TooltipContent} from '../';
import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import {SkipLink} from '../SkipLink';
import type {RenderTooltipContentData} from '../../types';

import {Chart} from './Chart';

export type StackedAreaChartProps = {
  renderTooltipContent?(data: RenderTooltipContentData): React.ReactNode;
  state?: ChartState;
  errorText?: string;
  showLegend?: boolean;
  skipLinkText?: string;
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
    renderTooltipContent,
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

  function renderDefaultTooltipContent(tooltipData: RenderTooltipContentData) {
    if (renderTooltipContent != null) {
      return renderTooltipContent({
        ...tooltipData,
        dataSeries: data,
      });
    }

    const {formattedData, title} = formatTooltipDataForLinearCharts({
      data: tooltipData,
      xAxisOptions: xAxisOptionsWithDefaults,
      yAxisOptions: yAxisOptionsWithDefaults,
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
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            showLegend={showLegend}
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

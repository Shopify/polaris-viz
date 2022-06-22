import React, {useRef} from 'react';
import type {
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  WithRequired,
} from '@shopify/polaris-viz-core';
import {
  uniqueId,
  ChartState,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {getLineChartDataWithDefaults} from '../../utilities/getLineChartDataWithDefaults';
import {formatTooltipDataForLinearCharts} from '../../utilities/formatTooltipDataForLinearCharts';
import type {RenderTooltipContentData} from '../../types';
import {TooltipContent} from '../../components/TooltipContent';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components/ChartSkeleton';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {usePrefersReducedMotion, useTheme} from '../../hooks';

import {Chart} from './Chart';

export type LineChartProps = {
  state?: ChartState;
  errorText?: string;
  emptyStateText?: string;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  showLegend?: boolean;
  skipLinkText?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
} & ChartProps;

export function LineChart(props: LineChartProps) {
  const {
    data,
    state,
    errorText,
    renderTooltipContent,
    showLegend = true,
    skipLinkText,
    emptyStateText,
    isAnimated,
    xAxisOptions,
    yAxisOptions,
    theme,
  }: WithRequired<LineChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults(yAxisOptions);

  function renderTooltip(tooltipData: RenderTooltipContentData) {
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

    return <TooltipContent title={title} data={formattedData} theme={theme} />;
  }

  const dataWithDefaults = getLineChartDataWithDefaults(data, seriesColors);

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      data.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        {state !== ChartState.Success ? (
          <ChartSkeleton state={state} errorText={errorText} theme={theme} />
        ) : (
          <Chart
            data={dataWithDefaults}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            isAnimated={isAnimated && !prefersReducedMotion}
            renderTooltipContent={renderTooltip}
            showLegend={showLegend}
            emptyStateText={emptyStateText}
          />
        )}
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}

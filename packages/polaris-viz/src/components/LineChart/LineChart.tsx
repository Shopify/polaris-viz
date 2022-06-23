import React, {useRef} from 'react';
import type {
  LineChartDataSeriesWithDefaults,
  XAxisOptions,
  YAxisOptions,
  ChartProps,
  WithRequired,
} from '@shopify/polaris-viz-core';
import {
  isGradientType,
  uniqueId,
  changeColorOpacity,
  getAverageColor,
  ChartState,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {ChartSkeleton} from '../../components/ChartSkeleton';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {SkipLink} from '../SkipLink';
import {
  useRenderTooltipContent,
  usePrefersReducedMotion,
  useTheme,
} from '../../hooks';
import type {TooltipOptions} from '../../types';

import {Chart} from './Chart';

export type LineChartProps = {
  state?: ChartState;
  errorText?: string;
  emptyStateText?: string;
  tooltipOptions?: TooltipOptions;
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
    tooltipOptions,
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

  const renderTooltip = useRenderTooltipContent({tooltipOptions, theme, data});

  const getOpacityByDataLength = (dataLength: number) => {
    if (dataLength <= 4) {
      return 0.25;
    }

    if (dataLength <= 7) {
      return 0.1;
    }

    return 0;
  };

  const areaOpacity = getOpacityByDataLength(data.length);

  const dataWithDefaults: LineChartDataSeriesWithDefaults[] = data.map(
    (series, index) => {
      const seriesColor = seriesColors[index];

      const areaColor = isGradientType(seriesColor)
        ? getAverageColor(
            seriesColor[0].color,
            seriesColor[seriesColor.length - 1].color,
          )
        : seriesColor;

      return {
        ...series,
        areaColor: series.isComparison
          ? undefined
          : changeColorOpacity(areaColor as string, areaOpacity),
        // We want to override the color, not set a default
        // so it has to come last
        color: series.isComparison
          ? seriesColors[index]
          : series.color ?? seriesColors[index],
      };
    },
  );

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

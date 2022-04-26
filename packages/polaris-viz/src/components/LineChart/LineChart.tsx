import React, {useRef} from 'react';
import {
  DataSeries,
  IS_ANIMATED_DEFAULT,
  LineChartDataSeriesWithDefaults,
  XAxisOptions,
  YAxisOptions,
  isGradientType,
  uniqueId,
} from '@shopify/polaris-viz-core';

import {formatTooltipDataForLinearCharts} from '../../utilities/formatTooltipDataForLinearCharts';
import type {RenderTooltipContentData} from '../../types';
import {TooltipContent} from '../../components/TooltipContent';
import {ChartContainer} from '../../components/ChartContainer';
import {useThemeSeriesColors} from '../../hooks/useThemeSeriesColors';
import {
  changeColorOpacity,
  getAverageColor,
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {usePrefersReducedMotion, useTheme} from '../../hooks';

import {Chart} from './Chart';

export interface LineChartProps {
  data: DataSeries[];

  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  showLegend?: boolean;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function LineChart({
  data,
  renderTooltipContent,
  showLegend = true,
  skipLinkText,
  emptyStateText,
  isAnimated = IS_ANIMATED_DEFAULT,
  xAxisOptions,
  yAxisOptions,
  theme,
}: LineChartProps) {
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
        <Chart
          data={dataWithDefaults}
          xAxisOptions={xAxisOptionsWithDefaults}
          yAxisOptions={yAxisOptionsWithDefaults}
          isAnimated={isAnimated && !prefersReducedMotion}
          renderTooltipContent={renderTooltip}
          showLegend={showLegend}
          emptyStateText={emptyStateText}
        />
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}

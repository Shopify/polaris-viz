import React, {useRef} from 'react';
import {useThemeSeriesColors, useTheme} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';
import type {DataSeries} from '../../types';
import {ChartContainer} from '../../components/ChartContainer';
import {
  isGradientType,
  changeColorOpacity,
  uniqueId,
  getAverageColor,
} from '../../utilities';
import {SkipLink} from '../SkipLink';

import {Chart} from './Chart';
import type {
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
  DataWithDefaults,
} from './types';
import {TooltipContent} from './components';

export interface LineChartProps {
  data: DataSeries[];

  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function LineChart({
  data,
  renderTooltipContent,
  skipLinkText,
  emptyStateText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  theme,
}: LineChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

  const xAxisOptionsWithDefaults: XAxisOptions = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
    xAxisLabels: [],
    wrapLabels: true,
    ...xAxisOptions,
  };

  const yAxisOptionsWithDefaults: Required<YAxisOptions> = {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
    ...yAxisOptions,
  };

  function renderDefaultTooltipContent({data}: RenderTooltipContentData) {
    const formattedData = data.map(
      ({name, point: {label, value}, color, lineStyle}) => ({
        name,
        color,
        lineStyle,
        point: {
          value: yAxisOptionsWithDefaults.labelFormatter(value),
          label: xAxisOptionsWithDefaults.labelFormatter(label),
        },
      }),
    );
    return <TooltipContent theme={theme} data={formattedData} />;
  }

  // I noticed that on charts that have several series, the accumulation of semi-transparent areas turns quite solid.
  // maybe we should define then opacity based on the amount of series on the chart? 🤔
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

  const dataWithDefaults: DataWithDefaults[] = data.map((series, index) => {
    const seriesColor = seriesColors[index];

    const areaColor = isGradientType(seriesColor)
      ? getAverageColor(
          seriesColor[0].color,
          seriesColor[seriesColor.length - 1].color,
        )
      : seriesColor;

    return {
      lineStyle: series.isComparison ? 'dotted' : selectedTheme.line.style,
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
  });

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
          renderTooltipContent={
            renderTooltipContent != null
              ? renderTooltipContent
              : renderDefaultTooltipContent
          }
          emptyStateText={emptyStateText}
        />
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}

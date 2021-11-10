import React, {useRef} from 'react';

import {ChartContainer} from '../../components/ChartContainer';
import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import type {GradientStop} from '../../types';
import {isGradientType, changeColorOpacity, uniqueId} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {usePrefersReducedMotion, useTheme} from '../../hooks';

import {Chart} from './Chart';
import type {
  Series,
  RenderTooltipContentData,
  XAxisOptions,
  YAxisOptions,
  SeriesWithDefaults,
} from './types';
import {TooltipContent} from './components';

export interface LineChartProps {
  series: Series[];

  emptyStateText?: string;
  isAnimated?: boolean;
  renderTooltipContent?: (data: RenderTooltipContentData) => React.ReactNode;
  skipLinkText?: string;
  theme?: string;
  xAxisOptions?: Partial<XAxisOptions>;
  yAxisOptions?: Partial<YAxisOptions>;
}

export function LineChart({
  series,
  renderTooltipContent,
  skipLinkText,
  emptyStateText,
  isAnimated = false,
  xAxisOptions,
  yAxisOptions,
  theme,
}: LineChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(series, selectedTheme);
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

  const seriesWithDefaults = series.map<SeriesWithDefaults>((series, index) => {
    const seriesColor = seriesColors[index];

    const isSolidLine =
      series.lineStyle == null || series.lineStyle === 'solid';

    const areaColor = isGradientType(seriesColor)
      ? (seriesColor[seriesColor.length - 1] as GradientStop).color
      : seriesColor;

    return {
      lineStyle: series.lineStyle ?? selectedTheme.line.style,
      areaColor: isSolidLine
        ? changeColorOpacity(areaColor as string, 0.5)
        : undefined,
      ...series,
      // We want to override the color, not set a default
      // so it has to come last
      color: isSolidLine
        ? series.color ?? seriesColors[index]
        : seriesColors[index],
    };
  });

  return (
    <React.Fragment>
      {skipLinkText == null ||
      skipLinkText.length === 0 ||
      series.length === 0 ? null : (
        <SkipLink anchorId={skipLinkAnchorId.current}>{skipLinkText}</SkipLink>
      )}
      <ChartContainer theme={theme}>
        <Chart
          series={seriesWithDefaults}
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

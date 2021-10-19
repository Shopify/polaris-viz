import React, {useLayoutEffect, useRef, useState, useCallback} from 'react';
import {useDebouncedCallback} from 'use-debounce';

import {ChartContainer} from '../../components/ChartContainer';
import {useThemeSeriesColors} from '../../hooks/use-theme-series-colors';
import type {Dimensions, GradientStop} from '../../types';
import {isGradientType, changeColorOpacity, uniqueId} from '../../utilities';
import {SkipLink} from '../SkipLink';
import {
  usePrefersReducedMotion,
  useResizeObserver,
  useTheme,
} from '../../hooks';

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

  const [chartDimensions, setChartDimensions] = useState<Dimensions | null>(
    null,
  );
  const {ref, setRef, entry} = useResizeObserver();
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const skipLinkAnchorId = useRef(uniqueId('lineChart'));

  const updateDimensions = useCallback(() => {
    if (entry != null) {
      const {width, height} = entry.contentRect;
      setChartDimensions((prevDimensions) => {
        if (
          prevDimensions != null &&
          width === prevDimensions.width &&
          height === prevDimensions.height
        ) {
          return prevDimensions;
        } else {
          return {width, height};
        }
      });
    }
  }, [entry]);

  const [debouncedUpdateDimensions] = useDebouncedCallback(() => {
    updateDimensions();
  }, 100);

  const handlePrintMediaQueryChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches && ref != null) {
        setChartDimensions(ref.getBoundingClientRect());
      }
    },
    [ref],
  );

  useLayoutEffect(() => {
    updateDimensions();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', debouncedUpdateDimensions);

      if (typeof window.matchMedia('print').addEventListener === 'function') {
        window
          .matchMedia('print')
          .addEventListener('change', handlePrintMediaQueryChange);
      } else if (typeof window.matchMedia('print').addListener === 'function') {
        window.matchMedia('print').addListener(handlePrintMediaQueryChange);
      }
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', debouncedUpdateDimensions);

        if (typeof window.matchMedia('print').addEventListener === 'function') {
          window
            .matchMedia('print')
            .removeEventListener('change', handlePrintMediaQueryChange);
        } else if (
          typeof window.matchMedia('print').addListener === 'function'
        ) {
          window
            .matchMedia('print')
            .removeListener(handlePrintMediaQueryChange);
        }
      }
    };
  }, [
    entry,
    updateDimensions,
    debouncedUpdateDimensions,
    handlePrintMediaQueryChange,
  ]);

  const xAxisOptionsWithDefaults: XAxisOptions = {
    labelFormatter: (value: string) => value,
    useMinimalLabels: false,
    xAxisLabels: [],
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
      <ChartContainer ref={setRef} theme={theme}>
        {chartDimensions == null ? null : (
          <Chart
            series={seriesWithDefaults}
            xAxisOptions={xAxisOptionsWithDefaults}
            yAxisOptions={yAxisOptionsWithDefaults}
            dimensions={chartDimensions}
            isAnimated={isAnimated && !prefersReducedMotion}
            renderTooltipContent={
              renderTooltipContent != null
                ? renderTooltipContent
                : renderDefaultTooltipContent
            }
            emptyStateText={emptyStateText}
            theme={theme}
          />
        )}
      </ChartContainer>

      {skipLinkText == null || skipLinkText.length === 0 ? null : (
        <SkipLink.Anchor id={skipLinkAnchorId.current} />
      )}
    </React.Fragment>
  );
}
